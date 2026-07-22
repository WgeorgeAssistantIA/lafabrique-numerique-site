"use client";

import { useEffect, useRef } from "react";
import { EGG_FLAGS, hasEggFlag } from "@/lib/easterEggProgress";

type Node = { x: number; y: number; pad: boolean; glow: number };
type Edge = { a: number; b: number; mx: number; my: number; len: number; l1: number };
type Signal = { edge: number; fromA: boolean; dist: number; speed: number; color: string; hops: number };

const CYAN = "#5fd8e8"; // halo bleu électrique — parcours HIBOU (fr), même bleu que "CIRCUITS" dans le Hero
const AMBER = "#e8a14f";
const HALO_EN = "#b026ff"; // halo violet électrique — parcours OWL (en)

// Ambient easter-egg reveal: once an hour, one letter of HIBOU (fr) / OWL (en)
// forms in the circuit for a few seconds, purely cosmetic — never a capture
// window. Each letter is a set of pen strokes (not connected to each other)
// in a normalized 60x100 box; a point travels along them in order, the
// already-drawn portion staying lit — a visible trace, not a fade-in.
type StrokePoint = { x: number; y: number };
const LETTER_STROKES: Record<string, StrokePoint[][]> = {
  H: [
    [{ x: 0, y: 0 }, { x: 0, y: 100 }],
    [{ x: 60, y: 0 }, { x: 60, y: 100 }],
    [{ x: 0, y: 50 }, { x: 60, y: 50 }],
  ],
  I: [
    [{ x: 10, y: 0 }, { x: 50, y: 0 }],
    [{ x: 30, y: 0 }, { x: 30, y: 100 }],
    [{ x: 10, y: 100 }, { x: 50, y: 100 }],
  ],
  B: [
    [{ x: 0, y: 0 }, { x: 0, y: 100 }],
    [{ x: 0, y: 0 }, { x: 38, y: 0 }, { x: 50, y: 12 }, { x: 50, y: 38 }, { x: 38, y: 50 }, { x: 0, y: 50 }],
    [{ x: 0, y: 50 }, { x: 42, y: 50 }, { x: 55, y: 63 }, { x: 55, y: 88 }, { x: 42, y: 100 }, { x: 0, y: 100 }],
  ],
  O: [
    [
      { x: 30, y: 0 }, { x: 48, y: 6 }, { x: 58, y: 22 }, { x: 60, y: 50 },
      { x: 58, y: 78 }, { x: 48, y: 94 }, { x: 30, y: 100 }, { x: 12, y: 94 },
      { x: 2, y: 78 }, { x: 0, y: 50 }, { x: 2, y: 22 }, { x: 12, y: 6 }, { x: 30, y: 0 },
    ],
  ],
  U: [
    [
      { x: 0, y: 0 }, { x: 0, y: 65 }, { x: 4, y: 86 }, { x: 16, y: 98 },
      { x: 30, y: 100 }, { x: 44, y: 98 }, { x: 56, y: 86 }, { x: 60, y: 65 }, { x: 60, y: 0 },
    ],
  ],
  W: [[{ x: 0, y: 0 }, { x: 15, y: 100 }, { x: 30, y: 40 }, { x: 45, y: 100 }, { x: 60, y: 0 }]],
  L: [
    [{ x: 0, y: 0 }, { x: 0, y: 100 }],
    [{ x: 0, y: 100 }, { x: 50, y: 100 }],
  ],
};
const WORDS = { fr: "HIBOU", en: "OWL" };
const HOUR_MS = 3_600_000;
const BLOCK_MS = 5 * 60_000;
const FORM_MS = 2600;
const HOLD_MS = 900;
const FADE_MS = 700;

export default function CircuitCanvas({ lang = "fr" }: { lang?: "fr" | "en" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // The letter draws on its own canvas layered ABOVE the hero's darkening
  // gradient overlays — on the main canvas it would be hidden behind the
  // near-opaque left side of the gradient (that's exactly what happened when
  // the letter moved from the right side to under the CTA).
  const letterCanvasRef = useRef<HTMLCanvasElement>(null);
  const langRef = useRef(lang);
  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const letterCanvas = letterCanvasRef.current;
    const lctx = letterCanvas ? letterCanvas.getContext("2d") : null;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let ctaCenterX = 0; // horizontal center of the header CTA, read from the real DOM
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let adjE: number[][] = [];
    let signals: Signal[] = [];
    const mouse = { x: -9999, y: -9999, inside: false };

    // Dev-only test trigger: press "L" to force the letter reveal to play
    // immediately (cycling through every letter) instead of waiting for the
    // real hourly/5-min schedule. Stripped out in production builds.
    let testOverride: { letter: string; start: number } | null = null;
    let testIdx = 0;
    const TEST_LETTERS = ["H", "I", "B", "O", "U", "W", "L"];
    const onTestKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "l") return;
      const active = document.activeElement;
      if (active instanceof HTMLElement && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable)) {
        return;
      }
      testOverride = { letter: TEST_LETTERS[testIdx % TEST_LETTERS.length], start: Date.now() };
      testIdx++;
    };
    if (process.env.NODE_ENV !== "production") {
      window.addEventListener("keydown", onTestKey);
    }

    let raf = 0;
    let started = false;
    let last = performance.now();
    const cleanup: Array<() => void> = [];

    const edgePoint = (e: Edge, d: number) => {
      const a = nodes[e.a];
      const b = nodes[e.b];
      if (d <= e.l1) {
        const t = e.l1 === 0 ? 0 : d / e.l1;
        return { x: a.x + (e.mx - a.x) * t, y: a.y + (e.my - a.y) * t };
      }
      const seg2 = e.len - e.l1;
      const t2 = seg2 === 0 ? 0 : (d - e.l1) / seg2;
      return { x: e.mx + (b.x - e.mx) * t2, y: e.my + (b.y - e.my) * t2 };
    };

    const spawn = (fromNode?: number) => {
      if (!edges.length) return;
      let start = fromNode ?? Math.floor(Math.random() * nodes.length);
      let tries = 0;
      while (adjE[start] && adjE[start].length === 0 && tries < 12) {
        start = Math.floor(Math.random() * nodes.length);
        tries++;
      }
      const list = adjE[start];
      if (!list || !list.length) return;
      const ei = list[Math.floor(Math.random() * list.length)];
      const e = edges[ei];
      signals.push({
        edge: ei,
        fromA: e.a === start,
        dist: 0,
        speed: 40 + Math.random() * 50,
        color: Math.random() < 0.72 ? CYAN : AMBER,
        hops: 5 + Math.floor(Math.random() * 8),
      });
    };

    const build = () => {
      nodes = [];
      edges = [];
      adjE = [];
      signals = [];
      const spacing = Math.max(72, Math.min(116, Math.round(Math.sqrt((width * height) / 130))));
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const grid: number[][] = [];
      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const jx = (Math.random() - 0.5) * spacing * 0.45;
          const jy = (Math.random() - 0.5) * spacing * 0.45;
          nodes.push({ x: c * spacing + jx, y: r * spacing + jy, pad: Math.random() < 0.2, glow: 0 });
          grid[r][c] = nodes.length - 1;
          adjE.push([]);
        }
      }
      const add = (a: number, b: number) => {
        const na = nodes[a];
        const nb = nodes[b];
        const horizFirst = Math.random() < 0.5;
        const mx = horizFirst ? nb.x : na.x;
        const my = horizFirst ? na.y : nb.y;
        const l1 = Math.hypot(mx - na.x, my - na.y);
        const l2 = Math.hypot(nb.x - mx, nb.y - my);
        const ei = edges.length;
        edges.push({ a, b, mx, my, len: l1 + l2, l1 });
        adjE[a].push(ei);
        adjE[b].push(ei);
      };
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const a = grid[r][c];
          if (c + 1 < cols && Math.random() < 0.62) add(a, grid[r][c + 1]);
          if (r + 1 < rows && Math.random() < 0.62) add(a, grid[r + 1][c]);
          if (c + 1 < cols && r + 1 < rows && Math.random() < 0.14) add(a, grid[r + 1][c + 1]);
        }
      }
      const count = reduce ? 0 : Math.min(22, Math.max(8, Math.round((width * height) / 42000)));
      for (let i = 0; i < count; i++) spawn();
    };

    const step = (dt: number) => {
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        const e = edges[s.edge];
        s.dist += s.speed * dt;
        if (s.dist >= e.len) {
          const arrived = s.fromA ? e.b : e.a;
          s.hops--;
          if (s.hops <= 0) {
            signals.splice(i, 1);
            spawn();
            continue;
          }
          const opts = adjE[arrived].filter((x) => x !== s.edge);
          const pool = opts.length ? opts : adjE[arrived];
          const ne = pool[Math.floor(Math.random() * pool.length)];
          const next = edges[ne];
          s.edge = ne;
          s.fromA = next.a === arrived;
          s.dist = 0;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(95,216,232,0.07)";
      ctx.beginPath();
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(e.mx, e.my);
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();

      if (mouse.inside) {
        for (const e of edges) {
          const dm = Math.hypot(e.mx - mouse.x, e.my - mouse.y);
          if (dm < 160) {
            const near = 1 - dm / 160;
            const a = nodes[e.a];
            const b = nodes[e.b];
            ctx.strokeStyle = `rgba(95,216,232,${(near * 0.32).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(e.mx, e.my);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const dm = mouse.inside ? Math.hypot(n.x - mouse.x, n.y - mouse.y) : 9999;
        const near = Math.max(0, 1 - dm / 140);
        const target = (n.pad ? 0.22 : 0) + near;
        n.glow += (target - n.glow) * 0.12;
        const g = Math.max(0, Math.min(1, n.glow));
        if (n.pad) {
          ctx.fillStyle = `rgba(95,216,232,${(0.22 + g * 0.7).toFixed(3)})`;
          ctx.fillRect(n.x - 2, n.y - 2, 4, 4);
        } else {
          ctx.fillStyle = `rgba(120,150,170,${(0.16 + g * 0.6).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.3, 0, 6.283);
          ctx.fill();
        }
        if (g > 0.06) {
          ctx.save();
          ctx.globalAlpha = g * 0.55;
          ctx.shadowColor = CYAN;
          ctx.shadowBlur = 8;
          ctx.fillStyle = CYAN;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2, 0, 6.283);
          ctx.fill();
          ctx.restore();
        }
      }

      for (const s of signals) {
        const e = edges[s.edge];
        for (let k = 4; k >= 1; k--) {
          const back = s.dist - k * 5;
          if (back < 0) continue;
          const dAlong = s.fromA ? back : e.len - back;
          const tp = edgePoint(e, Math.max(0, Math.min(e.len, dAlong)));
          ctx.globalAlpha = 0.06 * k;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, 1.6, 0, 6.283);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        const head = s.fromA ? s.dist : e.len - s.dist;
        const p = edgePoint(e, Math.max(0, Math.min(e.len, head)));
        ctx.save();
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.1, 0, 6.283);
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;

      if (lctx) {
        lctx.clearRect(0, 0, width, height);
        if (!reduce) drawLetter(lctx);
      }
    };

    const drawLetter = (out: CanvasRenderingContext2D) => {
      const activeLang = langRef.current;
      const now = Date.now();

      let letter: string;
      let msIntoBlock: number;
      if (testOverride) {
        const elapsed = now - testOverride.start;
        if (elapsed > FORM_MS + HOLD_MS + FADE_MS) {
          testOverride = null;
        }
      }
      if (testOverride) {
        letter = testOverride.letter;
        msIntoBlock = now - testOverride.start;
      } else {
        // The letter reveal only runs for players who solved levels 1 and 2 —
        // for everyone else the circuit stays purely ambient.
        if (!hasEggFlag(EGG_FLAGS.konami) || !hasEggFlag(EGG_FLAGS.rouage)) return;
        const word = WORDS[activeLang];
        const hourIdx = Math.floor(now / HOUR_MS) % word.length;
        letter = word[hourIdx];
        msIntoBlock = now % BLOCK_MS;
      }
      const strokes = LETTER_STROKES[letter];
      if (!strokes) return;

      let alpha = 0;
      let travelT = 1; // 0..1, how much of the letter has been traced so far
      if (msIntoBlock < FORM_MS) {
        alpha = 1;
        travelT = msIntoBlock / FORM_MS;
      } else if (msIntoBlock < FORM_MS + HOLD_MS) {
        alpha = 1;
      } else if (msIntoBlock < FORM_MS + HOLD_MS + FADE_MS) {
        alpha = 1 - (msIntoBlock - FORM_MS - HOLD_MS) / FADE_MS;
      } else {
        return;
      }
      if (alpha <= 0) return;

      // Horizontally aligned under the header's "Demander un devis" /
      // "Get a quote" button (top right, tagged data-egg-anchor), read from
      // the DOM on every draw so layout shifts can't move the letter.
      // Vertical center ~64% down the Hero — the placement William
      // validated on screenshots (2026-07-22).
      const canvasRect = canvas.getBoundingClientRect();
      const anchorEl = document.querySelector<HTMLElement>("[data-egg-anchor]");
      if (anchorEl) {
        const a = anchorEl.getBoundingClientRect();
        ctaCenterX = (a.left + a.right) / 2 - canvasRect.left;
      } else {
        ctaCenterX = width * 0.85;
      }
      const letterH = Math.max(160, Math.min(380, height * 0.4));
      const letterW = letterH * 0.6;
      const originX = ctaCenterX - letterW / 2;
      const originY = height * 0.64 - letterH / 2;
      const scaleX = letterW / 60;
      const scaleY = letterH / 100;
      const toCanvas = (p: StrokePoint) => ({ x: originX + p.x * scaleX, y: originY + p.y * scaleY });
      const color = activeLang === "fr" ? CYAN : HALO_EN;

      const strokeLengths = strokes.map((pts) => {
        let len = 0;
        for (let i = 1; i < pts.length; i++) {
          const a = toCanvas(pts[i - 1]);
          const b = toCanvas(pts[i]);
          len += Math.hypot(b.x - a.x, b.y - a.y);
        }
        return len;
      });
      const totalLen = strokeLengths.reduce((a, b) => a + b, 0);
      const target = totalLen * travelT;

      // The trail is as thin as the ambient circuit traces (1px); only the
      // traveling tip dot keeps the previous stroke's size.
      const tipRadius = Math.max(2, letterW * 0.012);
      out.save();
      out.globalAlpha = alpha * 0.15;
      out.strokeStyle = color;
      out.fillStyle = color;
      out.lineWidth = 1;
      out.lineCap = "round";
      out.lineJoin = "round";
      out.shadowColor = color;
      out.shadowBlur = 4;

      let consumed = 0;
      for (let s = 0; s < strokes.length && consumed < target; s++) {
        const pts = strokes[s];
        const segLen = strokeLengths[s];
        const remaining = target - consumed;

        out.beginPath();
        const p0 = toCanvas(pts[0]);
        out.moveTo(p0.x, p0.y);

        if (remaining >= segLen) {
          for (let i = 1; i < pts.length; i++) {
            const p = toCanvas(pts[i]);
            out.lineTo(p.x, p.y);
          }
          out.stroke();
        } else {
          let acc = 0;
          let tipX = p0.x;
          let tipY = p0.y;
          for (let i = 1; i < pts.length; i++) {
            const a = toCanvas(pts[i - 1]);
            const b = toCanvas(pts[i]);
            const segLenAB = Math.hypot(b.x - a.x, b.y - a.y);
            if (acc + segLenAB <= remaining) {
              out.lineTo(b.x, b.y);
              acc += segLenAB;
              tipX = b.x;
              tipY = b.y;
            } else {
              const t = segLenAB === 0 ? 0 : (remaining - acc) / segLenAB;
              tipX = a.x + (b.x - a.x) * t;
              tipY = a.y + (b.y - a.y) * t;
              out.lineTo(tipX, tipY);
              break;
            }
          }
          out.stroke();
          if (travelT < 1) {
            out.save();
            out.shadowBlur = 8;
            out.beginPath();
            out.arc(tipX, tipY, tipRadius, 0, 6.283);
            out.fill();
            out.restore();
          }
        }
        consumed += segLen;
      }
      out.restore();
    };

    const loop = (now: number) => {
      started = true;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const rect = canvas.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight && !document.hidden;
      if (visible) {
        step(dt);
        draw();
      }
    };

    const rafLoop = (now: number) => {
      loop(now);
      raf = requestAnimationFrame(rafLoop);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (letterCanvas && lctx) {
        letterCanvas.width = Math.round(width * dpr);
        letterCanvas.height = Math.round(height * dpr);
        lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      build();
      draw();
    };

    resize();

    if (!reduce) {
      raf = requestAnimationFrame(rafLoop);
      const fallback = window.setTimeout(() => {
        if (!started) {
          const iv = window.setInterval(() => loop(performance.now()), 1000 / 30);
          cleanup.push(() => window.clearInterval(iv));
        }
      }, 250);
      cleanup.push(() => window.clearTimeout(fallback));
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.inside = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= width && mouse.y <= height;
    };
    const onLeave = () => {
      mouse.inside = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onClick = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      if (mx < 0 || my < 0 || mx > width || my > height) return;
      let best = -1;
      let bestD = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        const d = Math.hypot(nodes[i].x - mx, nodes[i].y - my);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      if (best >= 0) for (let k = 0; k < 4; k++) spawn(best);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onClick);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
      canvas.removeEventListener("pointerleave", onLeave);
      if (process.env.NODE_ENV !== "production") {
        window.removeEventListener("keydown", onTestKey);
      }
      cleanup.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      {/* Letter layer: above the hero's darkening gradients (z-[2] > z-[1]),
          below the text content (z-10). Requires the wrapper in Hero.tsx to
          NOT create its own stacking context. */}
      <canvas
        ref={letterCanvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full z-[2] pointer-events-none"
      />
    </>
  );
}

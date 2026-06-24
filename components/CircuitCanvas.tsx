"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; pad: boolean; glow: number };
type Edge = { a: number; b: number; mx: number; my: number; len: number; l1: number };
type Signal = { edge: number; fromA: boolean; dist: number; speed: number; color: string; hops: number };

const CYAN = "#5fd8e8";
const AMBER = "#e8a14f";

export default function CircuitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let adjE: number[][] = [];
    let signals: Signal[] = [];
    const mouse = { x: -9999, y: -9999, inside: false };

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
      cleanup.forEach((fn) => fn());
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}

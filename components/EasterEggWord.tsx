"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { playSecretFoundSound, playOwlHoot } from "@/lib/easterEggAudio";

const WORDS = { fr: "hibou", en: "owl" };

// One wink cycle, played in sync with each hoot: neutral -> mid -> closed -> mid -> neutral.
const WINK_CYCLE = {
  fr: ["/img/logo.png", "/img/logo-wink-left-mid.png", "/img/logo-wink-left-closed.png", "/img/logo-wink-left-mid.png", "/img/logo.png"],
  en: ["/img/logo.png", "/img/logo-wink-right-mid.png", "/img/logo-wink-right-closed.png", "/img/logo-wink-right-mid.png", "/img/logo.png"],
};
const WINK_STEP_MS = 500;

// The clickable area is just the blinking eye, not the whole owl — roughly
// positioned as a % of the 220x220 logo box, left eye for fr, right eye for en.
const EYE_HOTSPOT = {
  fr: { left: "26%", top: "30%", width: "22%", height: "20%" },
  en: { left: "54%", top: "30%", width: "22%", height: "20%" },
};

const REVEAL_FRAMES = {
  fr: ["/img/logo.png", "/img/logo-wink-left-mid.png", "/img/logo-wink-left-closed.png"],
  en: ["/img/logo.png", "/img/logo-wink-right-mid.png", "/img/logo-wink-right-closed.png"],
};

const COPY = {
  fr: {
    title: "Circuit éveillé.",
    body: "Le hibou vient de se réveiller. Quelque chose t'attend.",
    cta: "Aller voir l'atelier secret",
    close: "Fermer",
  },
  en: {
    title: "System awakened.",
    body: "The owl just woke up. Something is waiting for you.",
    cta: "Go see the secret workshop",
    close: "Close",
  },
};

export const SECRET_STORAGE_KEY = { fr: "lfn:secret:hibou", en: "lfn:secret:owl" } as const;

// next/image renders a `srcset`, which browsers prefer over `src` — clear it
// first or a manual `.src =` swap is silently ignored.
function setImgSrc(el: HTMLImageElement, src: string) {
  el.removeAttribute("srcset");
  el.src = src;
}

function isTypingTarget(el: Element | null) {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
}

export default function EasterEggWord() {
  const pathname = usePathname();
  const lang: "fr" | "en" = pathname?.startsWith("/en") ? "en" : "fr";
  const langRef = useRef(lang);
  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  const buffer = useRef("");
  const [revealed, setRevealed] = useState(false);
  const [frame, setFrame] = useState(0);

  // Word detection: types the target word anywhere on the site (not while
  // typing in a form field), any time — the hourly circuit letter is only
  // a cosmetic hint, never a capture window.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(document.activeElement)) return;
      if (e.key.length !== 1 || !/[a-z]/i.test(e.key)) {
        buffer.current = "";
        return;
      }
      const word = WORDS[lang];
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-word.length);
      if (buffer.current === word) {
        buffer.current = "";
        startWaking();
      }
    };

    let hootInterval: number | null = null;
    let winkTimers: number[] = [];
    let clickTargets: HTMLElement[] = []; // the owl <img> itself: glow + wink frames
    let hotspots: HTMLElement[] = []; // small overlay on just the eye: the actual click target

    const stopBlinking = (resetSrc: boolean) => {
      if (hootInterval) window.clearInterval(hootInterval);
      hootInterval = null;
      winkTimers.forEach((id) => window.clearTimeout(id));
      winkTimers = [];
      clickTargets.forEach((el) => {
        el.classList.remove("logo-awaiting");
        if (resetSrc && el instanceof HTMLImageElement) setImgSrc(el, "/img/logo.png");
      });
      clickTargets = [];
      hotspots.forEach((el) => {
        el.removeEventListener("click", onLogoClick);
        el.remove();
      });
      hotspots = [];
    };

    const onLogoClick = () => {
      stopBlinking(true);
      const activeLang = langRef.current;
      try {
        localStorage.setItem(SECRET_STORAGE_KEY[activeLang], "1");
      } catch {
        // ignore (private browsing / storage disabled)
      }
      setFrame(0);
      setRevealed(true);
      window.setTimeout(() => setFrame(1), 250);
      window.setTimeout(() => setFrame(2), 550);
    };

    // Plays the hoot and winks the atelier owl at the same time, frame by
    // frame — the wink is the visible half of the same beat as the sound,
    // not a separate continuous animation.
    const hootAndWink = () => {
      playOwlHoot();
      const cycle = WINK_CYCLE[langRef.current];
      cycle.forEach((src, i) => {
        const id = window.setTimeout(() => {
          clickTargets.forEach((el) => {
            if (el instanceof HTMLImageElement) setImgSrc(el, src);
          });
        }, i * WINK_STEP_MS);
        winkTimers.push(id);
      });
    };

    // The mystery beat: play the success sound, then a few seconds later the
    // first hoot+wink with no visible source yet — only the atelier owl
    // (FIG. 06 — L'ATELIER, the large logo in About.tsx) glows continuously
    // as the clue, and winks in sync each time it hoots, until it's found
    // and clicked.
    const startWaking = () => {
      playSecretFoundSound();

      clickTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-atelier-owl]"));
      clickTargets.forEach((el) => el.classList.add("logo-awaiting"));

      const zone = EYE_HOTSPOT[langRef.current];
      hotspots = Array.from(
        document.querySelectorAll<HTMLElement>("[data-atelier-owl-wrapper]")
      ).map((wrapper) => {
        const hotspot = document.createElement("div");
        hotspot.setAttribute("aria-hidden", "true");
        Object.assign(hotspot.style, {
          position: "absolute",
          left: zone.left,
          top: zone.top,
          width: zone.width,
          height: zone.height,
          cursor: "pointer",
        });
        hotspot.addEventListener("click", onLogoClick);
        wrapper.appendChild(hotspot);
        return hotspot;
      });

      const firstHoot = window.setTimeout(hootAndWink, 3200);
      winkTimers.push(firstHoot);
      hootInterval = window.setInterval(hootAndWink, 28000);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      stopBlinking(false);
    };
  }, [lang]);

  if (!revealed) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={COPY[lang].title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background-deep/85 backdrop-blur-sm px-6"
    >
      <div className="max-w-sm w-full border border-cyan bg-background-deep p-8 text-center shadow-[0_24px_48px_-20px_rgba(95,216,232,0.5)]">
        <Image
          src={REVEAL_FRAMES[lang][frame]}
          alt="La Fabrik Numérique"
          width={96}
          height={96}
          className="mx-auto mb-6"
        />
        <p className="fig-label text-cyan mb-2">{COPY[lang].title}</p>
        <p className="text-sm text-foreground/90 mb-6">{COPY[lang].body}</p>
        <div className="flex flex-col gap-3">
          <Link
            href="/atelier-secret"
            className="fig-label bg-cyan text-background-deep px-6 py-3 hover:bg-amber transition-colors"
          >
            {COPY[lang].cta}
          </Link>
          <button
            type="button"
            onClick={() => setRevealed(false)}
            className="fig-label text-muted hover:text-foreground transition-colors"
          >
            {COPY[lang].close}
          </button>
        </div>
      </div>
    </div>
  );
}

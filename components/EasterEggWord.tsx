"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { playSecretFoundSound, playOwlHoot } from "@/lib/easterEggAudio";
import { EGG_FLAGS, hasEggFlag, setEggFlag } from "@/lib/easterEggProgress";

const WORDS = { fr: "hibou", en: "owl" };
// Level-2 password, answer to the humans.txt riddle. Typing it (after the
// Konami code) unlocks the circuit-letter reveal on the homepage.
const PASSWORDS = { fr: "rouage", en: "gear" };
const MAX_WORD_LEN = 6;

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

// Small transient toasts (same placement/style as the Konami one) used to
// steer players who type a word before unlocking the previous level, and to
// confirm the level-2 password.
const TOASTS = {
  fr: {
    locked: {
      title: "Rien ne se passe.",
      body: "Le circuit ne répond pas encore. Il manque des rouages — reprends depuis le début.",
    },
    password: {
      title: "Un rouage s'enclenche.",
      body: "Le circuit de la page d'accueil s'anime désormais. Prends le temps de le regarder vivre.",
    },
  },
  en: {
    locked: {
      title: "Nothing happens.",
      body: "The circuit isn't responding yet. Some gears are missing — start from the beginning.",
    },
    password: {
      title: "A gear clicks into place.",
      body: "The circuit on the homepage is now alive. Take the time to watch it.",
    },
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
  const [toast, setToast] = useState<{ title: string; body: string } | null>(null);
  const toastTimer = useRef<number | null>(null);

  // Word detection: types a target word anywhere on the site (not while
  // typing in a form field), any time — the hourly circuit letter is only
  // a cosmetic hint, never a capture window. Levels are chained: the
  // password needs the Konami flag, the final word needs both flags.
  useEffect(() => {
    const showToast = (t: { title: string; body: string }) => {
      setToast(t);
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 6000);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(document.activeElement)) return;
      if (e.key.length !== 1 || !/[a-z]/i.test(e.key)) {
        buffer.current = "";
        return;
      }
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-MAX_WORD_LEN);

      if (buffer.current.endsWith(PASSWORDS[lang])) {
        buffer.current = "";
        if (!hasEggFlag(EGG_FLAGS.konami)) {
          showToast(TOASTS[lang].locked);
        } else {
          setEggFlag(EGG_FLAGS.rouage);
          showToast(TOASTS[lang].password);
        }
        return;
      }

      if (buffer.current.endsWith(WORDS[lang])) {
        buffer.current = "";
        if (!hasEggFlag(EGG_FLAGS.konami) || !hasEggFlag(EGG_FLAGS.rouage)) {
          showToast(TOASTS[lang].locked);
        } else {
          startWaking();
        }
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
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      stopBlinking(false);
    };
  }, [lang]);

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-6 z-50 max-w-xs border border-cyan bg-background-deep/95 backdrop-blur px-4 py-3 shadow-[0_16px_32px_-18px_rgba(95,216,232,0.45)] transition-all duration-500 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <p className="fig-label text-cyan mb-1">{toast?.title}</p>
        <p className="text-sm text-foreground/90">{toast?.body}</p>
      </div>

      {revealed && (
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
      )}
    </>
  );
}

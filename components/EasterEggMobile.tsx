"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { EGG_EVENT, EGG_FLAGS, hasEggFlag } from "@/lib/easterEggProgress";
import { useCoarsePointer } from "@/lib/useCoarsePointer";

// Touch counterpart of the hunt. Phones have no arrow keys and no console, so
// a long press on the owl summons a small retro pad that replays the very same
// keystrokes on `window` — EasterEggKonami and EasterEggWord stay the single
// source of truth for every sequence, password and reward.

const LONG_PRESS_MS = 700;
// Past this much finger travel the gesture is a scroll, not a press.
const MOVE_TOLERANCE_PX = 12;
const CLOSE_AFTER_PROGRESS_MS = 450;
const MAX_WORD_LEN = 6;
// Longer than a tap-to-click delay, short enough that a real second tap on
// the backdrop still closes the pad right away.
const BACKDROP_GRACE_MS = 500;

const COPY = {
  fr: {
    label: "FIG. 07 — ENTRÉE MANUELLE",
    close: "Fermer",
    word: "mot",
    submit: "Valider",
    padUp: "Haut",
    padDown: "Bas",
    padLeft: "Gauche",
    padRight: "Droite",
  },
  en: {
    label: "FIG. 07 — MANUAL INPUT",
    close: "Close",
    word: "word",
    submit: "Enter",
    padUp: "Up",
    padDown: "Down",
    padLeft: "Left",
    padRight: "Right",
  },
};

/** Replays a keystroke the desktop listeners already understand. */
function pressKey(key: string) {
  window.dispatchEvent(new KeyboardEvent("keydown", { key }));
}

export default function EasterEggMobile() {
  const pathname = usePathname();
  const lang: "fr" | "en" = pathname?.startsWith("/en") ? "en" : "fr";
  const copy = COPY[lang];

  const isTouch = useCoarsePointer();
  const [open, setOpen] = useState(false);
  // The finger that opens the pad is still resting on the logo, right where
  // the pad's full-screen backdrop now sits — lifting it synthesizes a tap
  // that would otherwise land on that backdrop and close the pad the instant
  // it opened. Ignore backdrop dismissal for a moment after opening.
  const openedAt = useRef(0);
  // The text field is an affordance the desktop doesn't need, so it only shows
  // up once level 1 is cleared — before that it would hint at what's coming.
  const [canType, setCanType] = useState(false);
  const [word, setWord] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Long press on any logo, via delegation so client-side navigation and
  // late-mounting logos are handled without re-binding anything.
  useEffect(() => {
    if (!isTouch) return;

    let timer: number | null = null;
    let startX = 0;
    let startY = 0;

    const cancel = () => {
      if (timer) window.clearTimeout(timer);
      timer = null;
    };

    const onPointerDown = (e: PointerEvent) => {
      // No pointerType filter here: some browsers' "desktop site" mode (iPad
      // Safari, Android Chrome) synthesizes touch as pointerType "mouse", and
      // the outer `if (!isTouch) return` above already keeps this whole
      // effect from ever attaching on a real, non-touch desktop.
      const target = e.target as Element | null;
      if (!target?.closest?.('[data-easter-egg="logo"]')) return;
      startX = e.clientX;
      startY = e.clientY;
      cancel();
      timer = window.setTimeout(() => {
        timer = null;
        setCanType(hasEggFlag(EGG_FLAGS.konami));
        setOpen(true);
        openedAt.current = Date.now();
        navigator.vibrate?.(20);
      }, LONG_PRESS_MS);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!timer) return;
      if (
        Math.abs(e.clientX - startX) > MOVE_TOLERANCE_PX ||
        Math.abs(e.clientY - startY) > MOVE_TOLERANCE_PX
      ) {
        cancel();
      }
    };

    // Without this the browser's own "save image" sheet steals the long press.
    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.('[data-easter-egg="logo"]')) e.preventDefault();
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerup", cancel, { passive: true });
    document.addEventListener("pointercancel", cancel, { passive: true });
    document.addEventListener("scroll", cancel, { passive: true });
    document.addEventListener("contextmenu", onContextMenu);

    return () => {
      cancel();
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", cancel);
      document.removeEventListener("pointercancel", cancel);
      document.removeEventListener("scroll", cancel);
      document.removeEventListener("contextmenu", onContextMenu);
    };
  }, [isTouch]);

  // Any progress means something just happened behind the pad — the logo burst,
  // a toast, the owl waking up. Step out of the way so it can be seen.
  useEffect(() => {
    if (!open) return;
    const onProgress = () => {
      window.setTimeout(() => setOpen(false), CLOSE_AFTER_PROGRESS_MS);
    };
    window.addEventListener(EGG_EVENT, onProgress);
    return () => window.removeEventListener(EGG_EVENT, onProgress);
  }, [open]);

  // Lock the page behind the pad, and restore exactly what was there before.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!isTouch || !open) return null;

  const tap = (key: string) => {
    navigator.vibrate?.(10);
    pressKey(key);
  };

  const submitWord = () => {
    const letters = word.trim().toLowerCase().slice(-MAX_WORD_LEN);
    setWord("");
    if (!letters) return;
    // The word listener ignores keystrokes typed into a field, so hand focus
    // back to the page before replaying them.
    inputRef.current?.blur();
    for (const letter of letters) pressKey(letter);
    setOpen(false);
  };

  const padButton =
    "flex items-center justify-center w-14 h-14 border border-line bg-panel text-cyan text-lg active:bg-cyan active:text-background-deep transition-colors";
  const roundButton =
    "flex items-center justify-center w-14 h-14 rounded-full border border-cyan bg-panel font-display text-cyan active:bg-cyan active:text-background-deep transition-colors";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={copy.label}
      className="fixed inset-0 z-[90] flex items-end justify-center bg-background-deep/85 backdrop-blur-sm"
      onClick={() => {
        if (Date.now() - openedAt.current < BACKDROP_GRACE_MS) return;
        setOpen(false);
      }}
    >
      <div
        className="w-full border-t border-cyan bg-background-deep px-6 pt-5 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="fig-label text-cyan mb-5">{copy.label}</p>

        <div className="flex items-center justify-between gap-6">
          <div className="grid grid-cols-3 gap-1">
            <span />
            <button type="button" aria-label={copy.padUp} className={padButton} onClick={() => tap("ArrowUp")}>
              ▲
            </button>
            <span />
            <button type="button" aria-label={copy.padLeft} className={padButton} onClick={() => tap("ArrowLeft")}>
              ◀
            </button>
            <span />
            <button type="button" aria-label={copy.padRight} className={padButton} onClick={() => tap("ArrowRight")}>
              ▶
            </button>
            <span />
            <button type="button" aria-label={copy.padDown} className={padButton} onClick={() => tap("ArrowDown")}>
              ▼
            </button>
            <span />
          </div>

          <div className="flex items-center gap-3">
            <button type="button" aria-label="B" className={roundButton} onClick={() => tap("b")}>
              B
            </button>
            <button type="button" aria-label="A" className={roundButton} onClick={() => tap("a")}>
              A
            </button>
          </div>
        </div>

        {canType && (
          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitWord();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder={copy.word}
              aria-label={copy.word}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              maxLength={MAX_WORD_LEN}
              className="flex-1 min-w-0 border border-line bg-panel px-3 py-3 text-foreground placeholder:text-muted focus:border-cyan focus:outline-none"
            />
            <button type="submit" className="fig-label bg-cyan text-background-deep px-5 py-3">
              {copy.submit}
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="fig-label text-muted mt-6 block w-full text-center"
        >
          {copy.close}
        </button>
      </div>
    </div>
  );
}

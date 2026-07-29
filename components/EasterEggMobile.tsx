"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { EGG_EVENT, EGG_FLAGS, hasEggFlag } from "@/lib/easterEggProgress";
import { useCoarsePointer } from "@/lib/useCoarsePointer";

// Touch counterpart of the hunt. Phones have no arrow keys and no console, so
// a double-tap on the owl summons a small retro pad that replays the very
// same keystrokes on `window` — EasterEggKonami and EasterEggWord stay the
// single source of truth for every sequence, password and reward.
//
// This used to be a long-press. Dropped after live remote debugging on a
// Redmi Pad Pro 2 (real device, USB, Chrome DevTools) showed the browser
// firing a native pointercancel at a near-identical ~400ms mark on every
// attempt, with zero finger drift — consistent with a tablet-only OS/Chrome
// large-screen gesture (e.g. drag-to-split-view) hijacking any sustained
// hold, regardless of touch-action/-webkit-user-drag/draggable=false. The
// same phone (same brand, same browser) never had this problem. A double-tap
// never holds long enough to be mistaken for that gesture.

// Two taps within this window, close enough together, count as one gesture.
const DOUBLE_TAP_MS = 350;
// How far a single tap's own down->up may drift before it's a scroll, not a tap.
const TAP_MOVE_TOLERANCE_PX = 12;
// How far apart the two taps of a double-tap may land (thumbs aren't lasers).
const DOUBLE_TAP_DRIFT_PX = 40;
const CLOSE_AFTER_PROGRESS_MS = 450;
const MAX_WORD_LEN = 6;

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
  // it opened. Identify the exact pointer whose release opened the pad and
  // swallow only its own resulting click; any later, separate tap on the
  // backdrop still closes it normally.
  const openingPointerId = useRef<number | null>(null);
  const suppressNextBackdropClick = useRef(false);
  // The text field is an affordance the desktop doesn't need, so it only shows
  // up once level 1 is cleared — before that it would hint at what's coming.
  const [canType, setCanType] = useState(false);
  const [word, setWord] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Double-tap on any logo, via delegation so client-side navigation and
  // late-mounting logos are handled without re-binding anything.
  useEffect(() => {
    if (!isTouch) return;

    let downX = 0;
    let downY = 0;
    let downId: number | null = null;
    let lastTap: { x: number; y: number; t: number } | null = null;

    const onPointerDown = (e: PointerEvent) => {
      // No pointerType filter here: some browsers' "desktop site" mode (iPad
      // Safari, Android Chrome) synthesizes touch as pointerType "mouse", and
      // the outer `if (!isTouch) return` above already keeps this whole
      // effect from ever attaching on a real, non-touch desktop.
      const target = e.target as Element | null;
      if (!target?.closest?.('[data-easter-egg="logo"]')) return;
      e.preventDefault();
      downX = e.clientX;
      downY = e.clientY;
      downId = e.pointerId;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (downId === null || e.pointerId !== downId) return;
      const releaseDrift = Math.max(Math.abs(e.clientX - downX), Math.abs(e.clientY - downY));
      downId = null;
      if (releaseDrift > TAP_MOVE_TOLERANCE_PX) {
        // That was a scroll/swipe through the logo, not a tap — doesn't count.
        lastTap = null;
        return;
      }

      const now = performance.now();
      const isSecondTap =
        lastTap !== null &&
        now - lastTap.t <= DOUBLE_TAP_MS &&
        Math.max(Math.abs(e.clientX - lastTap.x), Math.abs(e.clientY - lastTap.y)) <= DOUBLE_TAP_DRIFT_PX;

      if (isSecondTap) {
        lastTap = null;
        // Suppress the ghost "click" this same release is about to
        // synthesize on the backdrop we're opening right now.
        openingPointerId.current = e.pointerId;
        suppressNextBackdropClick.current = true;
        setCanType(hasEggFlag(EGG_FLAGS.konami));
        setOpen(true);
        navigator.vibrate?.(20);
        return;
      }

      lastTap = { x: e.clientX, y: e.clientY, t: now };
    };

    const onPointerCancel = (e: PointerEvent) => {
      if (e.pointerId === downId) downId = null;
    };

    // A tap that turns into a scroll shouldn't count towards a double-tap.
    const onScroll = () => {
      downId = null;
      lastTap = null;
    };

    // Without this the browser's own "save image" sheet steals the second tap.
    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.('[data-easter-egg="logo"]')) e.preventDefault();
    };

    // Not passive: onPointerDown calls preventDefault() when the logo is the
    // target, which a passive listener would silently ignore.
    document.addEventListener("pointerdown", onPointerDown, { passive: false });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("pointercancel", onPointerCancel, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("contextmenu", onContextMenu);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerCancel);
      document.removeEventListener("scroll", onScroll);
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
        if (suppressNextBackdropClick.current) {
          suppressNextBackdropClick.current = false;
          return;
        }
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

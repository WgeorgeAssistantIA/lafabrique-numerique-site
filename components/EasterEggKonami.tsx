"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { EGG_FLAGS, setEggFlag } from "@/lib/easterEggProgress";

const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

const BURST_MS = 1700;
const TOAST_MS = 5000;

const COPY = {
  fr: {
    title: "Œil de lynx.",
    body: "Le rouage a bougé. Ce site cache d'autres secrets — regarde plus en profondeur.",
  },
  en: {
    title: "Sharp eyes.",
    body: "The gear just moved. This site hides more than it shows — look deeper.",
  },
};

function isTypingTarget(el: Element | null) {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
}

export default function EasterEggKonami() {
  const pathname = usePathname();
  const lang: "fr" | "en" = pathname?.startsWith("/en") ? "en" : "fr";
  const progress = useRef(0);
  const hideTimer = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setEggFlag(EGG_FLAGS.konami);
      document.querySelectorAll<HTMLElement>('[data-easter-egg="logo"]').forEach((el) => {
        el.classList.remove("logo-burst");
        void el.offsetWidth; // restart the animation if re-triggered mid-burst
        el.classList.add("logo-burst");
        window.setTimeout(() => el.classList.remove("logo-burst"), BURST_MS);
      });
      setVisible(true);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setVisible(false), TOAST_MS);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(document.activeElement)) return;
      const key = e.key.toLowerCase();
      const expected = SEQUENCE[progress.current];
      if (key === expected) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          progress.current = 0;
          trigger();
        }
      } else {
        progress.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-6 z-50 max-w-xs border border-cyan bg-background-deep/95 backdrop-blur px-4 py-3 shadow-[0_16px_32px_-18px_rgba(95,216,232,0.45)] transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <p className="fig-label text-cyan mb-1">{COPY[lang].title}</p>
      <p className="text-sm text-foreground/90">{COPY[lang].body}</p>
    </div>
  );
}

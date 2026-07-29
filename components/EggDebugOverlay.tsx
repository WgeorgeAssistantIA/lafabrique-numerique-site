"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useCoarsePointer } from "@/lib/useCoarsePointer";

// Temporary diagnostic panel for the mobile easter-egg long-press, which
// worked on some touch devices but stayed silent on others (e.g. a Redmi Pad
// Pro 2) — remote debugging wasn't an option, so this surfaces the real
// values straight on the page instead of guessing blind. Visit any page with
// ?eggdebug=1 to see it; every other visitor never mounts a single listener
// from this file. Delete this component once the mobile pad is confirmed
// working everywhere it needs to.

function readDebugFlag() {
  return new URLSearchParams(window.location.search).get("eggdebug") === "1";
}

function subscribeNever() {
  return () => {};
}

function useDebugFlag() {
  // Query params don't change without a navigation, so there is nothing to
  // subscribe to — this only exists to get a hydration-safe client read via
  // getServerSnapshot, the same trick as useCoarsePointer.
  return useSyncExternalStore(subscribeNever, readDebugFlag, () => false);
}

type LoggedEvent = {
  n: number;
  kind: string;
  pointerType: string;
  target: string;
  matchedLogo: boolean;
};

export default function EggDebugOverlay() {
  const enabled = useDebugFlag();
  const isTouch = useCoarsePointer();
  const [events, setEvents] = useState<LoggedEvent[]>([]);
  // Lazy initializer instead of an effect: this never disagrees with the
  // server-rendered output because the whole panel is already gated behind
  // `enabled`, which itself only ever flips true after hydration.
  const [env] = useState<Record<string, string> | null>(() =>
    typeof window === "undefined"
      ? null
      : {
          coarse: String(window.matchMedia("(pointer: coarse)").matches),
          anyCoarse: String(window.matchMedia("(any-pointer: coarse)").matches),
          maxTouchPoints: String(navigator.maxTouchPoints),
          ua: navigator.userAgent,
        }
  );

  useEffect(() => {
    if (!enabled) return;

    let count = 0;
    const log = (kind: string) => (e: PointerEvent) => {
      count += 1;
      const target = e.target as Element | null;
      const entry: LoggedEvent = {
        n: count,
        kind,
        pointerType: e.pointerType || "?",
        target: target ? target.tagName + (target.className ? "." + String(target.className).slice(0, 20) : "") : "?",
        matchedLogo: !!target?.closest?.('[data-easter-egg="logo"]'),
      };
      setEvents((prev) => [entry, ...prev].slice(0, 8));
    };

    const onDown = log("down");
    const onUp = log("up");
    const onCancel = log("cancel");
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointercancel", onCancel, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onCancel);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        left: 8,
        zIndex: 999,
        maxWidth: "92vw",
        background: "rgba(4,6,12,0.95)",
        border: "1px solid #5fd8e8",
        color: "#eef2f8",
        fontFamily: "monospace",
        fontSize: 11,
        lineHeight: 1.4,
        padding: "8px 10px",
        pointerEvents: "none",
      }}
    >
      <div style={{ color: "#5fd8e8" }}>EGG DEBUG — isTouch(hook)={String(isTouch)}</div>
      {env && (
        <div>
          coarse={env.coarse} anyCoarse={env.anyCoarse} maxTouchPoints={env.maxTouchPoints}
          <br />
          ua={env.ua}
        </div>
      )}
      <div style={{ marginTop: 4 }}>
        {events.length === 0 && <div>(touch the owl — events will appear here)</div>}
        {events.map((ev) => (
          <div key={ev.n}>
            #{ev.n} {ev.kind} type={ev.pointerType} target={ev.target} logo={String(ev.matchedLogo)}
          </div>
        ))}
      </div>
    </div>
  );
}

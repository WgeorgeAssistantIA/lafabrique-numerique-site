// Tells the easter-egg components whether they're facing a finger or a mouse.
// The hunt needs it in two places: the retro pad only exists on touch, and the
// level-2 clue moves out of the console (which phones don't have) into a toast.
//
// Subscribed rather than read once, so a tablet that gains or loses its
// keyboard switches journeys without a reload.
//
// `pointer` alone isn't enough: iPadOS's "Request Desktop Website" (on by
// default on many iPads) and Android Chrome's "Desktop site" both make the
// *primary* pointer report as fine even though the visitor is still tapping
// with a finger — `any-pointer: coarse` survives that switch since the
// touchscreen itself hasn't gone anywhere. `maxTouchPoints` is the last-resort
// fallback for browsers too old to support the media feature at all.

import { useSyncExternalStore } from "react";

const QUERIES = ["(pointer: coarse)", "(any-pointer: coarse)"];

function subscribe(onChange: () => void) {
  const queries = QUERIES.map((q) => window.matchMedia(q));
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

function getSnapshot() {
  return (
    QUERIES.some((q) => window.matchMedia(q).matches) || navigator.maxTouchPoints > 0
  );
}

// The server can't know the pointer type. Assume fine, so the prerendered
// markup matches the desktop case and hydration corrects it on phones.
function getServerSnapshot() {
  return false;
}

export function useCoarsePointer() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

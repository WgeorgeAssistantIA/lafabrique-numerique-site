// Tells the easter-egg components whether they're facing a finger or a mouse.
// The hunt needs it in two places: the retro pad only exists on touch, and the
// level-2 clue moves out of the console (which phones don't have) into a toast.
//
// Subscribed rather than read once, so a tablet that gains or loses its
// keyboard switches journeys without a reload.

import { useSyncExternalStore } from "react";

const QUERY = "(pointer: coarse)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// The server can't know the pointer type. Assume fine, so the prerendered
// markup matches the desktop case and hydration corrects it on phones.
function getServerSnapshot() {
  return false;
}

export function useCoarsePointer() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

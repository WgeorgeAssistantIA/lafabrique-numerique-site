// Shared progression state for the easter-egg hunt. Each level sets a flag
// once solved; the next level checks the previous flag before activating.
// Client-side only (localStorage) — a determined dev can bypass it, which is
// an accepted limit (almost a meta easter egg).

export const EGG_FLAGS = {
  konami: "lfn:egg:1", // level 1 — Konami code
  rouage: "lfn:egg:2", // level 2 — password found via console + humans.txt
} as const;

/** Fired on window whenever a flag is set, so mounted components react live. */
export const EGG_EVENT = "lfn-egg-progress";

export function hasEggFlag(key: string): boolean {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export function setEggFlag(key: string) {
  try {
    localStorage.setItem(key, "1");
  } catch {
    // private browsing / storage disabled — the hunt just won't persist
  }
  window.dispatchEvent(new Event(EGG_EVENT));
}

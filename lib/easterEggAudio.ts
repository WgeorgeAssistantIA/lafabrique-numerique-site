const SECRET_FOUND_SRC = "/audio/secret-found.mp3";
const OWL_HOOT_SRC = "/audio/owl-hoot.wav";

function playAudio(src: string, volume: number) {
  if (typeof window === "undefined") return;
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play().catch(() => {
    // Autoplay can be blocked without a prior user gesture, but typing the
    // word that triggers this already counts as one — failures should be rare.
  });
}

/** Plays once, immediately, when HIBOU/OWL is typed successfully. */
export function playSecretFoundSound() {
  playAudio(SECRET_FOUND_SRC, 0.35);
}

/**
 * The owl's hoot — played a few seconds after the success sound, then
 * repeated occasionally while the atelier owl waits to be found and clicked.
 */
export function playOwlHoot() {
  playAudio(OWL_HOOT_SRC, 0.3);
}

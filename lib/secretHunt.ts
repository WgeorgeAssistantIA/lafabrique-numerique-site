// Answers of the easter-egg hunt, shared by the client (keystroke detection)
// and the API routes (proof check before revealing a reward code). Only
// SHA-256 hashes live here: the repo is public and this file ships in the
// client bundle, so the plain answers and the reward codes must never appear
// in source. The codes themselves are read from env vars server-side only
// (see app/api/secret-codes/route.ts).

export type Track = "fr" | "en";

export const ANSWER_HASHES: Record<Track, { password: string; word: string }> = {
  fr: {
    password: "06d67f0e0bc98c48143a3ebad3059db433d0c274f983cb080b5ec70d629ffb2e",
    word: "45e24a004e5da525e0d57a40f0d8cb6261130f0e1f77771bc880eed2253db591",
  },
  en: {
    password: "70ad3de50a55e77d300b82cea7af0d27f45400465e128994b4a3bb16bbcda3b1",
    word: "10f7127b980b0b06ef157749f8a02cca1c606d22642729dcb2d24dbbf2bf30df",
  },
};

/** Shortest and longest answer, to bound the suffixes worth hashing. */
export const ANSWER_MIN_LEN = 3;
export const ANSWER_MAX_LEN = 6;

/** Proof of a solved hunt, kept in localStorage and sent to the API. */
export const PROOF_STORAGE_KEY: Record<Track, string> = {
  fr: "lfn:secret:proof:fr",
  en: "lfn:secret:proof:en",
};
/** Level-2 answer typed this session, needed to build the final proof. */
export const PASSWORD_SESSION_KEY: Record<Track, string> = {
  fr: "lfn:egg:pw:fr",
  en: "lfn:egg:pw:en",
};

export type HuntProof = { password: string; word: string };

export async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function isTrack(value: unknown): value is Track {
  return value === "fr" || value === "en";
}

/** Server-side check: both answers of the given track must match. */
export async function isValidProof(
  track: Track,
  proof: { password?: unknown; word?: unknown },
): Promise<boolean> {
  if (typeof proof.password !== "string" || typeof proof.word !== "string")
    return false;
  if (proof.password.length > ANSWER_MAX_LEN || proof.word.length > ANSWER_MAX_LEN)
    return false;
  const [pw, word] = await Promise.all([
    sha256Hex(proof.password.toLowerCase()),
    sha256Hex(proof.word.toLowerCase()),
  ]);
  return pw === ANSWER_HASHES[track].password && word === ANSWER_HASHES[track].word;
}

export function readProof(track: Track): HuntProof | null {
  try {
    const raw = localStorage.getItem(PROOF_STORAGE_KEY[track]);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<HuntProof>;
    if (typeof parsed.password !== "string" || typeof parsed.word !== "string")
      return null;
    return { password: parsed.password, word: parsed.word };
  } catch {
    return null;
  }
}

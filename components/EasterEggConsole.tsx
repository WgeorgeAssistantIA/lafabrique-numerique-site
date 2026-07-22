"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { EGG_EVENT, EGG_FLAGS, hasEggFlag } from "@/lib/easterEggProgress";

export default function EasterEggConsole() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname?.startsWith("/en") ? "en" : "fr";
    let loggedFull = false;

    const logClue = () => {
      console.log(
        "%c🦉 LA FABRIK NUMÉRIQUE",
        "color:#5fd8e8;font-size:16px;font-weight:bold;font-family:monospace;"
      );
      const lines = hasEggFlag(EGG_FLAGS.konami)
        ? lang === "en"
          ? [
              "Curious enough to open this? We like that.",
              "The next clue isn't read out loud here: /humans.txt",
            ]
          : [
              "Assez curieux pour ouvrir ceci ? On aime ça.",
              "Le prochain indice ne se lit pas ici : /humans.txt",
            ]
        : lang === "en"
          ? [
              "There is a secret here... but you're skipping steps.",
              "Start with the old gamers' code.",
            ]
          : [
              "Il y a un secret ici... mais tu brûles les étapes.",
              "Commence par le vieux code des joueurs.",
            ];
      lines.forEach((line) =>
        console.log(`%c${line}`, "color:#e8a14f;font-family:monospace;font-size:12px;")
      );
      if (hasEggFlag(EGG_FLAGS.konami)) loggedFull = true;
    };

    logClue();

    // If the Konami code is solved during this visit, print the real clue
    // right away instead of waiting for a reload.
    const onProgress = () => {
      if (!loggedFull && hasEggFlag(EGG_FLAGS.konami)) logClue();
    };
    window.addEventListener(EGG_EVENT, onProgress);
    return () => window.removeEventListener(EGG_EVENT, onProgress);
  }, [pathname]);

  return null;
}

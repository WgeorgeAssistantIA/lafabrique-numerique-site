"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function EasterEggConsole() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname?.startsWith("/en") ? "en" : "fr";
    const lines =
      lang === "en"
        ? [
            "Curious enough to open this? We like that.",
            "The next clue isn't read out loud here: /humans.txt",
          ]
        : [
            "Assez curieux pour ouvrir ceci ? On aime ça.",
            "Le prochain indice ne se lit pas ici : /humans.txt",
          ];

    console.log(
      "%c🦉 LA FABRIK NUMÉRIQUE",
      "color:#5fd8e8;font-size:16px;font-weight:bold;font-family:monospace;"
    );
    lines.forEach((line) =>
      console.log(`%c${line}`, "color:#e8a14f;font-family:monospace;font-size:12px;")
    );
  }, [pathname]);

  return null;
}

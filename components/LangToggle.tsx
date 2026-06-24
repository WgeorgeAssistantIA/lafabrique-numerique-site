"use client";

import { useLanguage, type Lang } from "@/lib/i18n";

const LANGS: Lang[] = ["fr", "en"];

export default function LangToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-full border border-line bg-panel/60 p-0.5 fig-label">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`rounded-full px-3 py-1 transition-colors ${
            lang === l ? "bg-cyan text-background-deep" : "text-muted hover:text-foreground"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

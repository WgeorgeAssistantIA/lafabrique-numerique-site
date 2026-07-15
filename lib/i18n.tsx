"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Lang, type Translation } from "./translations";

export { translations, type Lang, type Translation };

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  // When set, the language is bound to the route (/ = fr, /en = en) and the
  // toggle navigates instead of swapping state. When omitted (legal pages),
  // the language switches client-side as before.
  initialLang?: Lang;
}) {
  const routed = initialLang !== undefined;
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initialLang ?? "fr");

  useEffect(() => {
    const saved = localStorage.getItem("lfn-lang") as Lang | null;
    const browserLang = navigator.language?.toLowerCase() ?? "";
    const preferred: Lang =
      saved === "fr" || saved === "en" ? saved : browserLang.startsWith("fr") ? "fr" : "en";
    if (routed) {
      // Only auto-redirect away from the default route, never off /en,
      // so a shared /en link is always respected.
      if (initialLang === "fr" && preferred === "en") router.replace("/en");
    } else {
      // Post-hydration restore of the saved preference (SSR always renders fr)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(preferred);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    try {
      localStorage.setItem("lfn-lang", l);
    } catch {
      // ignore
    }
    if (routed) {
      router.push(l === "en" ? "/en" : "/");
    } else {
      setLangState(l);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

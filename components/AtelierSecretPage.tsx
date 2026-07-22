"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { SECRET_STORAGE_KEY } from "./EasterEggWord";

const PRODUCTS = [
  { name: "VoxCut Pro", url: "https://voxcutpro.com" },
  { name: "InOneShot Pro", url: "https://inoneshot.fr" },
  { name: "VectorPop Pro", url: "https://www.vectorpop.fr" },
];

const TRACKS = {
  hibou: {
    key: "fr" as const,
    label: "HIBOU",
    code: "ROUAGE40",
    eye: "/img/logo-wink-left-closed.png",
  },
  owl: {
    key: "en" as const,
    label: "OWL",
    code: "OWL40",
    eye: "/img/logo-wink-right-closed.png",
  },
};

export default function AtelierSecretPage() {
  return (
    <LanguageProvider>
      <AtelierSecretContent />
    </LanguageProvider>
  );
}

function AtelierSecretContent() {
  const { lang } = useLanguage();
  const [unlocked, setUnlocked] = useState<{ hibou: boolean; owl: boolean } | null>(null);
  const [openCode, setOpenCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUnlocked({
        hibou: localStorage.getItem(SECRET_STORAGE_KEY.fr) === "1",
        owl: localStorage.getItem(SECRET_STORAGE_KEY.en) === "1",
      });
    } catch {
      setUnlocked({ hibou: false, owl: false });
    }
  }, []);

  const anyUnlocked = unlocked?.hibou || unlocked?.owl;

  const copy = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="flex-1 circuit-bg min-h-screen flex items-center justify-center py-32 px-6">
        <div className="max-w-xl w-full text-center">
          {unlocked === null ? null : !anyUnlocked ? (
            <>
              <Image
                src="/img/logo.png"
                alt="La Fabrik Numérique"
                width={96}
                height={96}
                className="mx-auto mb-8 opacity-60"
              />
              <p className="fig-label mb-4">ATELIER SECRET</p>
              <h1 className="font-display uppercase text-3xl sm:text-4xl mb-4">
                {lang === "fr" ? "Le circuit dort encore." : "The circuit is still asleep."}
              </h1>
              <p className="text-muted leading-relaxed">
                {lang === "fr"
                  ? "Reviens quand tu l'auras réveillé."
                  : "Come back once you've woken it up."}
              </p>
            </>
          ) : (
            <>
              <p className="fig-label mb-4">ATELIER SECRET</p>
              <h1 className="font-display uppercase text-3xl sm:text-4xl mb-10">
                {lang === "fr" ? "Bienvenue dans l'atelier." : "Welcome to the workshop."}
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                {unlocked?.hibou && (
                  <button
                    type="button"
                    onClick={() => setOpenCode(TRACKS.hibou.code)}
                    className="card-lift border border-cyan p-6 flex flex-col items-center gap-3 bg-panel"
                  >
                    <Image src={TRACKS.hibou.eye} alt="HIBOU" width={96} height={96} />
                    <span className="fig-label text-cyan">HIBOU</span>
                  </button>
                )}
                {unlocked?.owl && (
                  <button
                    type="button"
                    onClick={() => setOpenCode(TRACKS.owl.code)}
                    className="card-lift border border-cyan p-6 flex flex-col items-center gap-3 bg-panel"
                  >
                    <Image src={TRACKS.owl.eye} alt="OWL" width={96} height={96} />
                    <span className="fig-label text-cyan">OWL</span>
                  </button>
                )}
              </div>
              <p className="text-muted mt-8 text-sm">
                {lang === "fr" ? "Clique sur l'œil qui cligne." : "Click the blinking eye."}
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />

      {openCode && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background-deep/85 backdrop-blur-sm px-6"
        >
          <div className="max-w-sm w-full border border-cyan bg-background-deep p-8 text-center shadow-[0_24px_48px_-20px_rgba(95,216,232,0.5)]">
            <p className="fig-label text-cyan mb-2">
              {lang === "fr" ? "5 exemplaires seulement." : "Only 5 available."}
            </p>
            <p className="font-display text-3xl uppercase mb-1">-40%</p>
            <button
              type="button"
              onClick={() => copy(openCode)}
              className="fig-label border border-amber text-amber px-4 py-2 mt-4 mb-6 hover:bg-amber hover:text-background-deep transition-colors"
            >
              {copied ? (lang === "fr" ? "Copié !" : "Copied!") : openCode}
            </button>
            <p className="text-muted text-sm mb-4">
              {lang === "fr"
                ? "Utilise ce code au moment de payer sur l'un de ces produits :"
                : "Use this code at checkout on one of these products:"}
            </p>
            <div className="flex flex-col gap-2 mb-6">
              {PRODUCTS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fig-label hover:text-cyan transition-colors"
                >
                  {p.name} →
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setOpenCode(null)}
              className="fig-label text-muted hover:text-foreground transition-colors"
            >
              {lang === "fr" ? "Fermer" : "Close"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

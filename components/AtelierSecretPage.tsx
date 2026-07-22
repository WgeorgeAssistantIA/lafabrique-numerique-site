"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { SECRET_STORAGE_KEY } from "./EasterEggWord";
import { FINDERS } from "@/lib/secretFinders";

const CONTACT_EMAIL = "lafabriknumerique@outlook.com";

const PRODUCTS = [
  {
    name: "VoxCut Pro",
    url: "https://voxcutpro.com",
    image: "/img/portfolio-voxcut.webp",
    pitch: {
      fr: "Supprime les silences de vos vidéos et podcasts, en local.",
      en: "Cuts the silences out of your videos and podcasts, locally.",
    },
  },
  {
    name: "InOneShot Pro",
    url: "https://inoneshot.fr",
    image: "/img/portfolio-inoneshot.webp",
    pitch: {
      fr: "Un modèle PDF + un Excel → tous vos documents en un clic.",
      en: "One PDF template + one Excel → every document in one click.",
    },
  },
  {
    name: "VectorPop Pro",
    url: "https://www.vectorpop.fr",
    image: "/img/portfolio-vectorpop.webp",
    pitch: {
      fr: "Transforme un logo pixellisé en SVG net et éditable.",
      en: "Turns a pixelated logo into a clean, editable SVG.",
    },
  },
];

// Wink frames per language track (left eye for HIBOU, right eye for OWL).
const WINK = {
  fr: ["/img/logo.png", "/img/logo-wink-left-mid.png", "/img/logo-wink-left-closed.png", "/img/logo-wink-left-mid.png"],
  en: ["/img/logo.png", "/img/logo-wink-right-mid.png", "/img/logo-wink-right-closed.png", "/img/logo-wink-right-mid.png"],
};

type TierStatus = { code: string; percent: number; remaining: number | null };
type CodesResponse =
  | { fallback: true }
  | { fallback: false; fr: TierStatus[]; en: TierStatus[] };

// Static fallback when the Lemon Squeezy API is not configured/reachable.
const FALLBACK_TIERS: Record<"fr" | "en", TierStatus[]> = {
  fr: [
    { code: "ROUAGE100", percent: 100, remaining: null },
    { code: "ROUAGE50", percent: 50, remaining: null },
  ],
  en: [
    { code: "OWL100", percent: 100, remaining: null },
    { code: "OWL50", percent: 50, remaining: null },
  ],
};

const SHARE_TEXT = {
  fr: "🦉 Il y a un secret sur lafabriknumerique.fr. Un vrai. Avec de vraies récompenses pour les premiers qui le percent. Premier indice : ceux qui ont grandi avec une manette connaissent déjà la clé d'entrée. ↑↑↓↓…",
  en: "🦉 There's a secret on lafabriknumerique.fr. A real one. With real rewards for the first to crack it. First hint: if you grew up with a controller, you already know the way in. ↑↑↓↓…",
};

export default function AtelierSecretPage() {
  return (
    <LanguageProvider>
      <AtelierSecretContent />
    </LanguageProvider>
  );
}

/** The atelier owl, blinking once every few seconds — alive, not frantic. */
function BlinkingOwl({ track, size }: { track: "fr" | "en"; size: number }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const timers: number[] = [];
    const interval = window.setInterval(() => {
      WINK[track].forEach((_, i) => {
        timers.push(window.setTimeout(() => setFrame(i), i * 200));
      });
      timers.push(window.setTimeout(() => setFrame(0), WINK[track].length * 200));
    }, 9000);
    return () => {
      window.clearInterval(interval);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [track]);

  return (
    <Image
      src={WINK[track][frame]}
      alt="La Fabrik Numérique"
      width={size}
      height={size}
      className="mx-auto"
    />
  );
}

function AtelierSecretContent() {
  const { lang } = useLanguage();
  const [unlocked, setUnlocked] = useState<{ hibou: boolean; owl: boolean } | null>(null);
  const [openTrack, setOpenTrack] = useState<"fr" | "en" | null>(null);
  const [codes, setCodes] = useState<CodesResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const fetched = useRef(false);

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

  // Load live redemption counts once the page is unlocked.
  useEffect(() => {
    if (!anyUnlocked || fetched.current) return;
    fetched.current = true;
    fetch("/api/secret-codes")
      .then((r) => r.json())
      .then((data: CodesResponse) => setCodes(data))
      .catch(() => setCodes({ fallback: true }));
  }, [anyUnlocked]);

  const tiersFor = (track: "fr" | "en"): TierStatus[] => {
    if (codes && !codes.fallback) return codes[track];
    return FALLBACK_TIERS[track];
  };

  /** First tier still available (remaining unknown counts as available). */
  const activeTier = (track: "fr" | "en"): TierStatus | null => {
    const tiers = tiersFor(track);
    return tiers.find((t) => t.remaining === null || t.remaining > 0) ?? null;
  };

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const share = () => {
    navigator.clipboard?.writeText(SHARE_TEXT[lang]).catch(() => {});
    setShared(true);
    window.setTimeout(() => setShared(false), 2500);
  };

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    lang === "fr" ? "Mon retour — atelier secret" : "My feedback — secret workshop"
  )}&body=${encodeURIComponent(
    lang === "fr"
      ? "Logiciel choisi :\nCe qui m'a plu :\nCe qui manque ou coince :\n"
      : "Software I picked:\nWhat I liked:\nWhat's missing or clunky:\n"
  )}`;

  return (
    <>
      <Header />
      <main className="flex-1 circuit-bg min-h-screen py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
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

              {(() => {
                // One owl only, matching the page language (fall back to the
                // other track if it's the only one unlocked).
                const preferred: "fr" | "en" = lang;
                const other: "fr" | "en" = lang === "fr" ? "en" : "fr";
                const isUnlocked = (t: "fr" | "en") =>
                  t === "fr" ? unlocked?.hibou : unlocked?.owl;
                const track = isUnlocked(preferred) ? preferred : other;
                return (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => setOpenTrack(track)}
                      className="card-lift border border-cyan p-8 inline-flex flex-col items-center gap-4 bg-panel"
                    >
                      <BlinkingOwl track={track} size={240} />
                      <span className="fig-label text-cyan">
                        {track === "fr" ? "HIBOU" : "OWL"}
                      </span>
                    </button>
                  </div>
                );
              })()}
              <p className="text-muted text-sm mb-16">
                {lang === "fr"
                  ? "Clique sur le hibou pour réclamer ta récompense."
                  : "Click the owl to claim your reward."}
              </p>

              <section className="mb-16 max-w-md mx-auto">
                <p className="fig-label mb-6">
                  {lang === "fr" ? "LE TABLEAU DES TROUVEURS" : "THE FINDERS' BOARD"}
                </p>
                {FINDERS[lang].length === 0 ? (
                  <p className="text-muted text-sm">
                    {lang === "fr"
                      ? "Personne n'est encore inscrit — les premières places sont à prendre."
                      : "No one on the board yet — the first spots are up for grabs."}
                  </p>
                ) : (
                  <ol className="space-y-2 text-left inline-block">
                    {FINDERS[lang].map((name, i) => (
                      <li key={name} className="flex items-baseline gap-4">
                        <span className="fig-label text-amber shrink-0 w-10">
                          {lang === "fr"
                            ? i === 0
                              ? "1er"
                              : `${i + 1}e`
                            : i === 0
                              ? "1st"
                              : i === 1
                                ? "2nd"
                                : i === 2
                                  ? "3rd"
                                  : `${i + 1}th`}
                        </span>
                        <span className="text-foreground/90">{name}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>

              <section className="mb-16">
                <p className="fig-label mb-6">
                  {lang === "fr" ? "CE QUI SE FABRIQUE ICI" : "WHAT GETS BUILT HERE"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                  {PRODUCTS.map((p) => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-lift border border-line bg-panel overflow-hidden group"
                    >
                      <div className="overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          width={400}
                          height={225}
                          className="w-full aspect-video object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="font-display uppercase text-lg mb-1">{p.name}</h2>
                        <p className="text-muted text-sm leading-relaxed">{p.pitch[lang]}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              <section className="mb-16 max-w-2xl mx-auto">
                <p className="fig-label mb-4">
                  {lang === "fr" ? "LES COULISSES" : "BEHIND THE SCENES"}
                </p>
                <p className="text-muted leading-relaxed">
                  {lang === "fr"
                    ? "Derrière ce site, il n'y a pas d'agence : un seul artisan, à Roanne, qui conçoit ses propres logiciels et les utilise tous les jours. VoxCut, InOneShot et VectorPop sont nés ici — dans le même atelier que le jeu de piste qui t'a mené jusqu'à cette page. Si tu lis ces lignes, tu fais un peu partie de l'atelier."
                    : "There's no agency behind this site: one craftsman, in Roanne, France, building his own software and using it every day. VoxCut, InOneShot and VectorPop were all born here — in the same workshop as the treasure hunt that led you to this page. If you're reading this, you're part of the workshop now."}
                </p>
              </section>

              <section>
                <p className="fig-label mb-4">
                  {lang === "fr" ? "FAIS TOURNER" : "PASS IT ON"}
                </p>
                <p className="text-muted text-sm mb-4">
                  {lang === "fr"
                    ? "Tu connais quelqu'un qui aime les énigmes ? Défie-le — sans spoiler."
                    : "Know someone who loves puzzles? Challenge them — no spoilers."}
                </p>
                <button
                  type="button"
                  onClick={share}
                  className="fig-label border border-cyan text-cyan px-6 py-3 hover:bg-cyan hover:text-background-deep transition-colors"
                >
                  {shared
                    ? lang === "fr"
                      ? "Copié ! Colle-le où tu veux."
                      : "Copied! Paste it anywhere."
                    : lang === "fr"
                      ? "Copier le défi"
                      : "Copy the challenge"}
                </button>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />

      {openTrack && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background-deep/85 backdrop-blur-sm px-6 overflow-y-auto py-10"
        >
          <div className="max-w-md w-full border border-cyan bg-background-deep p-8 text-center shadow-[0_24px_48px_-20px_rgba(95,216,232,0.5)] my-auto">
            {(() => {
              const tier = activeTier(openTrack);
              if (!tier) {
                return (
                  <>
                    <p className="fig-label text-amber mb-2">
                      {lang === "fr" ? "Trop tard..." : "Too late..."}
                    </p>
                    <p className="text-sm text-foreground/90 mb-6">
                      {lang === "fr"
                        ? "Toutes les récompenses ont trouvé preneur. Mais l'atelier reste ouvert — et il y aura d'autres secrets."
                        : "Every reward has been claimed. But the workshop stays open — and there will be other secrets."}
                    </p>
                  </>
                );
              }
              return (
                <>
                  <p className="fig-label text-cyan mb-2">
                    {tier.remaining !== null
                      ? lang === "fr"
                        ? `${tier.remaining}/5 ${tier.percent === 100 ? "licences offertes" : "codes -50%"} restant(s)`
                        : `${tier.remaining}/5 ${tier.percent === 100 ? "free licenses" : "-50% codes"} left`
                      : lang === "fr"
                        ? "Réservé aux 5 premiers."
                        : "First 5 only."}
                  </p>
                  <p className="font-display text-4xl uppercase mb-1">
                    {tier.percent === 100
                      ? lang === "fr"
                        ? "Offert"
                        : "Free"
                      : `-${tier.percent}%`}
                  </p>
                  <button
                    type="button"
                    onClick={() => copyCode(tier.code)}
                    className="fig-label border border-amber text-amber px-4 py-2 mt-4 mb-6 hover:bg-amber hover:text-background-deep transition-colors"
                  >
                    {copied ? (lang === "fr" ? "Copié !" : "Copied!") : tier.code}
                  </button>
                  <p className="text-sm text-foreground/90 leading-relaxed mb-4 text-left">
                    {lang === "fr"
                      ? "L'atelier vient d'ouvrir et il a besoin de soutien pour décoller. En échange de cette récompense, est-ce que tu pourrais nous envoyer un retour honnête sur le logiciel que tu choisiras — ce qui t'a plu, ce qui manque, ce qui coince ? Quelques lignes suffisent, et ça nous aide énormément."
                      : "The workshop just opened and needs support to take off. In exchange for this reward, could you send us honest feedback on the software you pick — what you liked, what's missing, what's clunky? A few lines are enough, and it helps enormously."}
                  </p>
                  <a href={mailto} className="fig-label text-cyan hover:text-amber transition-colors">
                    {lang === "fr" ? "Envoyer mon retour →" : "Send my feedback →"}
                  </a>
                  <p className="text-muted text-sm mt-6 mb-2">
                    {lang === "fr"
                      ? "Utilise ce code au moment de payer sur l'un de ces produits :"
                      : "Use this code at checkout on one of these products:"}
                  </p>
                  <div className="flex flex-col gap-2">
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
                </>
              );
            })()}
            <button
              type="button"
              onClick={() => setOpenTrack(null)}
              className="fig-label text-muted hover:text-foreground transition-colors mt-6"
            >
              {lang === "fr" ? "Fermer" : "Close"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

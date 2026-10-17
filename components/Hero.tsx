"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import CircuitCanvas from "./CircuitCanvas";

const HERO_SHOWCASE = [
  {
    name: "VoxCut",
    tagFr: "Audio & Vidéo · Logiciel",
    tagEn: "Audio & Video · Software",
    image: "/img/portfolio-voxcut.webp",
    imageEn: "/img/portfolio-voxcut.webp",
    domain: "voxcutpro.com",
    accent: "cyan" as const,
  },
  {
    name: "VotreAssistantIA",
    tagFr: "Site & SaaS · Artisans",
    tagEn: "Web & SaaS · Trades",
    image: "/img/portfolio-vaia.webp",
    imageEn: "/img/portfolio-vaia-en.webp",
    domain: "votreassistantia.fr",
    accent: "amber" as const,
  },
  {
    name: "InOneShot",
    tagFr: "PDF · Automatisation",
    tagEn: "PDF · Automation",
    image: "/img/portfolio-inoneshot.webp",
    imageEn: "/img/portfolio-inoneshot-en.webp",
    domain: "inoneshot.fr",
    accent: "cyan" as const,
  },
  {
    name: "VectorPop",
    tagFr: "Image · Vectorisation",
    tagEn: "Image · Vectorization",
    image: "/img/portfolio-vectorpop.webp",
    imageEn: "/img/portfolio-vectorpop-en.webp",
    domain: "vectorpop.fr",
    accent: "amber" as const,
  },
];

export default function Hero() {
  const { t, lang } = useLanguage();
  const h = t.hero;
  const isFr = lang === "fr";

  return (
    <section
      id="top"
      className="relative pt-28 pb-24 lg:pt-36 lg:pb-28 border-b border-white/[0.08] overflow-hidden bg-background-deep"
    >
      {/* No z-index here: it would create a stacking context and trap the
          letter canvas (z-20) below the overlays. */}
      <div className="absolute inset-0">
        <CircuitCanvas lang={lang} />
      </div>

      {/* Ambient radial spotlights for editorial depth */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 z-[1] h-[440px] w-[540px] rounded-full bg-cyan/[0.09] blur-[130px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 z-[1] h-[400px] w-[480px] rounded-full bg-amber/[0.07] blur-[130px] pointer-events-none"
      />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-background-deep/90 via-background-deep/70 to-background-deep/20" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-28 pointer-events-none bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left column: Clear editorial promise, 2 entry doors & CTAs */}
          <div className="lg:col-span-6">
            <div
              className="hero-in inline-flex items-center gap-2 rounded-full border border-white/10 bg-panel/80 backdrop-blur-md px-3 sm:px-3.5 py-1.5 mb-6 sm:mb-7 max-w-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
              style={{ animationDelay: "0ms" }}
            >
              <span className="node-dot shrink-0" />
              <span className="fig-label text-[0.62rem] sm:text-[0.72rem] text-cyan !tracking-[0.08em] sm:!tracking-[0.11em] truncate">
                {isFr
                  ? "STUDIO NUMÉRIQUE INDÉPENDANT · ROANNE"
                  : "INDEPENDENT DIGITAL STUDIO · FRANCE"}
              </span>
            </div>

            <h1
              className="hero-in font-display uppercase text-4xl sm:text-6xl lg:text-[4.25rem] leading-[0.96] sm:leading-[0.94] tracking-tight"
              style={{ animationDelay: "90ms" }}
            >
              {h.titleA}{" "}
              <span className="bg-gradient-to-r from-cyan via-[#8be9f5] to-amber bg-clip-text text-transparent glow-pulse">
                {h.titleHighlight}
              </span>{" "}
              {h.titleB}
            </h1>

            <p
              className="hero-in mt-6 max-w-xl text-muted text-lg sm:text-xl leading-relaxed"
              style={{ animationDelay: "180ms" }}
            >
              {h.desc}
            </p>

            <p
              className="hero-in mt-3 max-w-xl text-foreground/90 font-medium text-sm sm:text-base flex items-center gap-2.5"
              style={{ animationDelay: "215ms" }}
            >
              <span className="inline-block h-px w-5 bg-amber" />
              {h.tagline}
            </p>

            {/* The 2 Entry Doors: immediately orient both target audiences */}
            <div
              className="hero-in mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3"
              style={{ animationDelay: "250ms" }}
            >
              <a
                href="#services"
                className="group rounded-xl border border-white/10 bg-panel/70 backdrop-blur-md p-3.5 hover:border-amber/60 hover:bg-panel transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="fig-label text-[0.62rem] text-amber">
                    {isFr ? "ARTISANS · TPE · PME" : "LOCAL BUSINESSES · SMB"}
                  </span>
                  <span className="text-amber text-xs transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
                <p className="font-display uppercase text-base text-foreground group-hover:text-amber transition-colors">
                  {isFr
                    ? "Créer ou moderniser mon site web"
                    : "Create or modernize my website"}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {isFr
                    ? "Présence pro, visibilité Google & devis"
                    : "Showcase site, Google SEO & leads"}
                </p>
              </a>

              <a
                href="#realisations"
                className="group rounded-xl border border-white/10 bg-panel/70 backdrop-blur-md p-3.5 hover:border-cyan/60 hover:bg-panel transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="fig-label text-[0.62rem] text-cyan">
                    {isFr ? "ENTREPRENEURS · MÉTIERS" : "FOUNDERS · TEAMS"}
                  </span>
                  <span className="text-cyan text-xs transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
                <p className="font-display uppercase text-base text-foreground group-hover:text-cyan transition-colors">
                  {isFr
                    ? "Développer un produit numérique"
                    : "Build a software product"}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {isFr
                    ? "Applications web, SaaS, IA & logiciels"
                    : "Web apps, SaaS, AI & desktop tools"}
                </p>
              </a>
            </div>

            <div
              className="hero-in mt-7 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
              style={{ animationDelay: "300ms" }}
            >
              <a href="#contact" className="btn-shine btn-primary w-full sm:w-auto">
                <span>{isFr ? "Parler de mon projet" : "Discuss my project"}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
              <a href="#realisations" className="btn-secondary w-full sm:w-auto">
                <span>{h.seeWork}</span>
              </a>
            </div>
          </div>

          {/* Right column: Real visual showcase of shipped interfaces */}
          <div
            className="hero-in lg:col-span-6"
            style={{ animationDelay: "220ms" }}
          >
            <div className="rounded-2xl border border-white/10 bg-background-deep/75 backdrop-blur-md p-3.5 sm:p-5 shadow-[0_28px_70px_-15px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.1)]">
              <div className="flex items-center justify-between gap-2 pb-3 mb-3.5 border-b border-white/[0.08]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-rose-500/70 shrink-0" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber/70 shrink-0" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-cyan/70 shrink-0" />
                  <span className="ml-1.5 fig-label text-[0.6rem] sm:text-[0.65rem] text-foreground/80 truncate">
                    {isFr
                      ? "INTERFACES & PRODUITS EN PRODUCTION"
                      : "SHIPPED INTERFACES & PRODUCTS"}
                  </span>
                </div>
                <a
                  href="#realisations"
                  className="fig-label text-[0.6rem] sm:text-[0.62rem] text-cyan hover:text-amber transition-colors shrink-0"
                >
                  {isFr ? "Tout voir ↓" : "See all ↓"}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                {HERO_SHOWCASE.map((prod) => (
                  <a
                    key={prod.name}
                    href="#realisations"
                    className="group rounded-xl border border-white/[0.08] bg-panel/80 overflow-hidden flex flex-col hover:border-cyan/50 transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-background-deep border-b border-white/[0.06]">
                      <Image
                        src={isFr ? prod.image : prod.imageEn}
                        alt={prod.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, 45vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background-deep/80 to-transparent pointer-events-none" />
                    </div>
                    <div className="p-2.5 sm:p-3 flex items-center justify-between gap-1.5">
                      <div className="min-w-0">
                        <p className="font-display uppercase text-sm sm:text-base text-foreground group-hover:text-cyan transition-colors leading-tight truncate">
                          {prod.name}
                        </p>
                        <p
                          className={`fig-label text-[0.55rem] sm:text-[0.6rem] mt-0.5 truncate ${
                            prod.accent === "cyan" ? "text-cyan" : "text-amber"
                          }`}
                        >
                          {isFr ? prod.tagFr : prod.tagEn}
                        </p>
                      </div>
                      <span className="hidden sm:inline-block rounded-md border border-white/10 bg-background-deep/80 px-2 py-0.5 font-mono text-[0.62rem] text-muted group-hover:text-foreground transition-colors shrink-0">
                        {prod.domain}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="node-dot" />
                  <span className="text-muted text-xs">
                    {isFr
                      ? "Publiés sur Microsoft Store, Google Play & Snapcraft"
                      : "Published on Microsoft Store, Google Play & Snapcraft"}
                  </span>
                </div>
                <span className="fig-label text-[0.62rem] text-amber">
                  {isFr ? "SUR-MESURE · ZÉRO ABONNEMENT" : "BESPOKE · ZERO LOCK-IN"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

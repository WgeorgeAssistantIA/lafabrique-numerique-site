"use client";

import { useLanguage } from "@/lib/i18n";
import CircuitCanvas from "./CircuitCanvas";

export default function Hero() {
  const { t, lang } = useLanguage();
  const h = t.hero;

  return (
    <section
      id="top"
      className="relative pt-32 pb-24 border-b border-line overflow-hidden bg-background-deep"
    >
      <div className="absolute inset-0 z-0">
        <CircuitCanvas lang={lang} />
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-background-deep via-background-deep/85 to-background-deep/30" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-24 pointer-events-none bg-gradient-to-t from-background-deep to-transparent" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <p className="hero-in fig-label mb-6" style={{ animationDelay: "0ms" }}>
          {h.figLabel}
        </p>
        <h1
          className="hero-in font-display uppercase text-5xl sm:text-7xl leading-[0.95] max-w-3xl"
          style={{ animationDelay: "90ms" }}
        >
          {h.titleA} <span className="text-cyan glow-pulse">{h.titleHighlight}</span> {h.titleB}
        </h1>
        <p className="hero-in mt-8 max-w-xl text-muted text-lg leading-relaxed" style={{ animationDelay: "180ms" }}>
          {h.desc}
        </p>
        <div className="hero-in mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "270ms" }}>
          <a
            href="#contact"
            className="btn-shine fig-label bg-cyan text-background-deep px-6 py-3 hover:bg-amber transition-colors"
          >
            {t.cta.quote}
          </a>
          <a
            href="#realisations"
            className="fig-label border border-line px-6 py-3 hover:border-cyan hover:text-cyan transition-colors"
          >
            {h.seeWork}
          </a>
        </div>
        <div className="hero-in mt-16 flex items-center gap-3 fig-label" style={{ animationDelay: "360ms" }}>
          <span className="node-dot" />
          {h.rating}
        </div>
      </div>
    </section>
  );
}

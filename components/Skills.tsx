"use client";

import { useLanguage } from "@/lib/i18n";

const DEV_META: Record<number, { fr: string; en: string }> = {
  0: { fr: "Typage strict & fiabilité", en: "Strict typing & reliability" },
  1: { fr: "Interfaces ultra-rapides & SEO", en: "Ultra-fast UI & SSR SEO" },
  2: { fr: "API, backend & automatisation", en: "APIs, backend & automation" },
  3: { fr: "Écosystème web & sur-mesure", en: "Web ecosystem & custom backends" },
  4: { fr: "Architecture de données robuste", en: "Robust relational data" },
};

const DESIGN_META: Record<number, { fr: string; en: string }> = {
  0: { fr: "Maquettes interactives & UI/UX", en: "Interactive wireframes & UI/UX" },
  1: { fr: "Retouche & optimisation visuelle", en: "Visual retouching & assets" },
  2: { fr: "Identité vectorielle & icônes", en: "Vector identity & iconography" },
  3: { fr: "Composants cohérents & durables", en: "Cohesive, scalable components" },
  4: { fr: "Identité de marque sur mesure", en: "Bespoke brand direction" },
};

export default function Skills() {
  const { t, lang } = useLanguage();
  const s = t.skills;
  const isFr = lang === "fr";

  const steps = isFr
    ? [
        { num: "01", title: "Cadrage & Maquette", desc: "Définition du besoin, structure et direction visuelle." },
        { num: "02", title: "Développement Sur-Mesure", desc: "Code propre, rapide et sans dépendance superflue." },
        { num: "03", title: "Performance & SEO", desc: "Optimisation Lighthouse 95+, mobile et référencement." },
        { num: "04", title: "Mise en ligne & Suivi", desc: "Déploiement clé en main, accompagnement et évolutions." },
      ]
    : [
        { num: "01", title: "Scoping & Wireframes", desc: "Requirements, architecture and visual direction." },
        { num: "02", title: "Custom Engineering", desc: "Clean, fast code with zero bloated templates." },
        { num: "03", title: "Performance & SEO", desc: "Lighthouse 95+ tuning, mobile & search indexing." },
        { num: "04", title: "Launch & Support", desc: "Turnkey deployment, training and ongoing care." },
      ];

  return (
    <section id="competences" className="py-24 border-b border-white/[0.08] circuit-bg">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <p className="fig-label text-cyan mb-3">{s.figLabel}</p>
        <h2 className="font-display uppercase text-4xl sm:text-5xl mb-12">{s.title}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Development Panel */}
          <div className="rounded-2xl border border-white/[0.08] glass-panel p-6 sm:p-8">
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10 text-cyan">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display uppercase text-2xl text-foreground">{s.dev}</h3>
                  <p className="fig-label text-cyan text-[0.65rem]">
                    {isFr ? "ARCHITECTURE & CODE" : "ARCHITECTURE & CODE"}
                  </p>
                </div>
              </div>
              <span className="node-dot" />
            </div>

            <ul className="space-y-3">
              {s.devItems.map((item, idx) => (
                <li
                  key={item}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-background-deep/65 px-4 py-3 hover:border-cyan/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="node-dot shrink-0" />
                    <span className="font-medium text-foreground">{item}</span>
                  </div>
                  <span className="fig-label text-[0.65rem] text-muted text-right hidden sm:inline">
                    {DEV_META[idx]?.[lang] ?? ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Design Panel */}
          <div className="rounded-2xl border border-white/[0.08] glass-panel p-6 sm:p-8">
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber/30 bg-amber/10 text-amber">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display uppercase text-2xl text-foreground">{s.design}</h3>
                  <p className="fig-label text-amber text-[0.65rem]">
                    {isFr ? "INTERFACES & IDENTITÉ" : "INTERFACES & IDENTITY"}
                  </p>
                </div>
              </div>
              <span
                className="node-dot"
                style={{
                  background: "var(--amber)",
                  boxShadow: "0 0 8px var(--amber)",
                }}
              />
            </div>

            <ul className="space-y-3">
              {s.designItems.map((item, idx) => (
                <li
                  key={item}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-background-deep/65 px-4 py-3 hover:border-amber/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="node-dot shrink-0"
                      style={{
                        background: "var(--amber)",
                        boxShadow: "0 0 8px var(--amber)",
                      }}
                    />
                    <span className="font-medium text-foreground">{item}</span>
                  </div>
                  <span className="fig-label text-[0.65rem] text-muted text-right hidden sm:inline">
                    {DESIGN_META[idx]?.[lang] ?? ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4-Step Delivery Circuit */}
        <div className="mt-8 rounded-2xl border border-white/[0.08] glass-panel p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="fig-label text-cyan">
              {isFr ? "PROCESSUS DE FABRICATION — EN 4 ÉTAPES" : "DELIVERY PROCESS — 4 STEPS"}
            </span>
            <span className="hidden sm:inline fig-label text-amber">
              {isFr ? "UN SEUL INTERLOCUTEUR" : "SINGLE POINT OF CONTACT"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="relative rounded-xl border border-white/[0.06] bg-background-deep/60 p-4"
              >
                <span className="fig-label text-amber text-xs">{step.num}</span>
                <h4 className="font-display uppercase text-lg mt-1.5 mb-1 text-foreground">
                  {step.title}
                </h4>
                <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

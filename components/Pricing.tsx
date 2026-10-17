"use client";

import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Pricing() {
  const { t, lang } = useLanguage();
  const p = t.pricing;
  const isFr = lang === "fr";

  const idealFor = isFr
    ? [
        "Artisans, indépendants & lancement d'activité",
        "Artisans, commerçants, TPE & PME locales",
        "Porteurs de projet, startups & PME",
        "Entreprises & processus métier spécifiques",
      ]
    : [
        "Tradespeople, freelancers & new businesses",
        "Local shops, tradespeople & growing SMBs",
        "Founders, startups & scaling teams",
        "Businesses with custom technical workflows",
      ];

  return (
    <section id="tarifs" className="py-28 border-b border-white/[0.08] circuit-bg">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="fig-label text-cyan mb-3">{p.figLabel}</p>
            <h2 className="font-display uppercase text-4xl sm:text-5xl">{p.title}</h2>
          </div>

          {p.scopeNote && (
            <p className="text-muted text-sm sm:text-base max-w-md leading-relaxed">
              {p.scopeNote}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {p.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 70} className="h-full">
              <div
                className={`card-lift relative h-full rounded-2xl border p-6 flex flex-col ${
                  plan.highlight
                    ? "border-cyan/60 bg-gradient-to-b from-cyan/[0.09] via-panel to-background-deep shadow-[0_0_40px_-15px_rgba(95,216,232,0.35),inset_0_1px_0_0_rgba(95,216,232,0.35)]"
                    : "border-white/[0.08] glass-panel"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2 min-h-[24px]">
                  <span className="font-mono text-[0.65rem] tracking-[0.12em] text-muted">
                    {isFr ? "IDÉAL POUR" : "BEST FOR"}
                  </span>
                  {plan.highlight && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan/15 border border-cyan/40 px-2.5 py-0.5 font-mono text-[0.62rem] tracking-wider uppercase text-cyan shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                      {isFr ? "Recommandé" : "Recommended"}
                    </span>
                  )}
                </div>

                <p className="text-xs font-medium text-amber/95 mb-4 min-h-[32px]">
                  {idealFor[i]}
                </p>

                <h3 className="font-display uppercase text-2xl text-foreground leading-tight">
                  {plan.name}
                </h3>

                <div className="mt-3 mb-4 pb-4 border-b border-white/[0.08]">
                  <span className="text-cyan font-display text-2xl sm:text-[1.7rem] leading-tight whitespace-nowrap">
                    {plan.price}
                  </span>
                </div>

                {"scope" in plan && plan.scope && (
                  <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed mb-5">
                    {plan.scope}
                  </p>
                )}

                <ul className="space-y-2.5 flex-1 text-sm text-foreground/90">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-amber shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-muted text-xs sm:text-sm leading-snug">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {"note" in plan && plan.note && (
                  <p className="mt-4 pt-3 border-t border-white/[0.06] text-xs text-muted/80 italic">
                    {plan.note}
                  </p>
                )}

                <a
                  href="#contact"
                  className={`mt-6 w-full ${
                    plan.highlight ? "btn-shine btn-primary" : "btn-secondary"
                  }`}
                >
                  {t.cta.quote}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Reassurance Strip */}
        <div className="mt-12 rounded-2xl border border-white/[0.08] glass-panel px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted">
            <span className="inline-flex items-center gap-2 text-foreground/90 font-medium">
              <span className="h-2 w-2 rounded-full bg-cyan" />
              {isFr ? "Devis gratuit & détaillé sous 24h" : "Free detailed quote within 24h"}
            </span>
            <span>•</span>
            <span>
              {isFr ? "Vous êtes 100 % propriétaire de votre site et de votre code" : "You own 100% of your website and source code"}
            </span>
            <span>•</span>
            <span>
              {isFr ? "Paiement échelonné possible" : "Flexible milestone payments"}
            </span>
          </div>
          <a
            href="#contact"
            className="text-xs font-semibold uppercase tracking-wider text-cyan hover:text-amber transition-colors shrink-0"
          >
            {isFr ? "Une question ? Écrivez-moi →" : "Have a question? Get in touch →"}
          </a>
        </div>
      </div>
    </section>
  );
}

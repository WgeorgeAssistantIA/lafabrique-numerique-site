"use client";

import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Pricing() {
  const { t } = useLanguage();
  const p = t.pricing;

  return (
    <section id="tarifs" className="py-24 border-b border-line circuit-bg">
      <div className="mx-auto max-w-6xl px-6">
        <p className="fig-label mb-3">{p.figLabel}</p>
        <h2 className="font-display uppercase text-4xl mb-3">{p.title}</h2>
        {p.launchNote && (
          <p className="text-amber text-sm mb-9">
            <span className="fig-label text-amber mr-2">{p.launchBadge}</span>
            {p.launchNote}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {p.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 90} className="h-full">
              <div
                className={`card-lift h-full border p-6 flex flex-col ${
                  plan.highlight ? "border-cyan bg-panel" : "border-line"
                }`}
              >
                <h3 className="font-display uppercase text-lg">{plan.name}</h3>
                <p className="mt-2 mb-6">
                  {"originalPrice" in plan && plan.originalPrice && (
                    <span className="block text-muted text-sm line-through">{plan.originalPrice}</span>
                  )}
                  <span className="text-cyan font-display text-2xl">{plan.price}</span>
                </p>
                <ul className="space-y-2 flex-1 text-sm text-muted">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-amber">›</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="fig-label mt-6 border border-line text-center py-3 hover:border-cyan hover:text-cyan transition-colors"
                >
                  {t.cta.quote}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

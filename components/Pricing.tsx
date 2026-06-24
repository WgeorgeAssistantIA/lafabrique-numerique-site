"use client";

import { useLanguage } from "@/lib/i18n";

export default function Pricing() {
  const { t } = useLanguage();
  const p = t.pricing;

  return (
    <section id="tarifs" className="py-24 border-b border-line circuit-bg">
      <div className="mx-auto max-w-6xl px-6">
        <p className="fig-label mb-3">{p.figLabel}</p>
        <h2 className="font-display uppercase text-4xl mb-12">{p.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {p.plans.map((plan) => (
            <div
              key={plan.name}
              className={`border p-6 flex flex-col ${
                plan.highlight ? "border-cyan bg-panel" : "border-line"
              }`}
            >
              <h3 className="font-display uppercase text-lg">{plan.name}</h3>
              <p className="text-cyan font-display text-2xl mt-2 mb-6">{plan.price}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}

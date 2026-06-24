"use client";

import { useLanguage } from "@/lib/i18n";

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <section id="services" className="py-24 border-b border-line">
      <div className="mx-auto max-w-6xl px-6">
        <p className="fig-label mb-3">{s.figLabel}</p>
        <h2 className="font-display uppercase text-4xl mb-12">{s.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
          {s.items.map((item) => (
            <div key={item.ref} className="bg-background p-6 hover:bg-panel transition-colors">
              <span className="fig-label text-amber">{item.ref}</span>
              <h3 className="font-display uppercase text-lg mt-3 mb-2">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

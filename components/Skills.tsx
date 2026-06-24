"use client";

import { useLanguage } from "@/lib/i18n";

export default function Skills() {
  const { t } = useLanguage();
  const s = t.skills;

  return (
    <section id="competences" className="py-24 border-b border-line circuit-bg">
      <div className="mx-auto max-w-6xl px-6">
        <p className="fig-label mb-3">{s.figLabel}</p>
        <h2 className="font-display uppercase text-4xl mb-12">{s.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div>
            <h3 className="fig-label text-cyan mb-4">{s.dev}</h3>
            <ul className="space-y-3">
              {s.devItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <span className="node-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="fig-label text-amber mb-4">{s.design}</h3>
            <ul className="space-y-3">
              {s.designItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <span className="node-dot" style={{ background: "var(--amber)", boxShadow: "0 0 8px var(--amber)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

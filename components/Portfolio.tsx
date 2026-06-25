"use client";

import { useLanguage } from "@/lib/i18n";

export default function Portfolio() {
  const { t } = useLanguage();
  const p = t.portfolio;

  return (
    <section id="realisations" className="py-24 border-b border-line">
      <div className="mx-auto max-w-6xl px-6">
        <p className="fig-label mb-3">{p.figLabel}</p>
        <h2 className="font-display uppercase text-4xl mb-12">{p.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {p.items.map((item) => (
            <article
              key={item.ref}
              className="group relative border border-line p-6 flex flex-col hover:border-cyan transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="fig-label">{item.ref}</span>
                <span className="node-dot opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-display uppercase text-2xl mt-4">{item.title}</h3>
              <p className="fig-label text-amber mt-1">{item.type}</p>
              <p className="text-muted text-sm leading-relaxed mt-4">{item.desc}</p>
              <p className="text-foreground text-sm leading-relaxed mt-3 flex-1 border-l-2 border-amber pl-3">
                {item.result}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {item.tags.map((tag) => (
                  <span key={tag} className="fig-label border border-line px-2 py-1 text-[0.65rem]">
                    {tag}
                  </span>
                ))}
              </div>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fig-label text-cyan mt-5 inline-flex items-center gap-2 hover:gap-3 transition-all"
                >
                  {item.linkLabel} →
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

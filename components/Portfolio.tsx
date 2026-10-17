"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Portfolio() {
  const { t, lang } = useLanguage();
  const p = t.portfolio;
  const isFr = lang === "fr";

  const featuredItems = p.items.slice(0, 4);
  const secondaryItems = p.items.slice(4);

  return (
    <section id="realisations" className="relative py-28 border-b border-white/[0.08] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-0 h-[460px] w-[560px] rounded-full bg-cyan/[0.04] blur-[140px] pointer-events-none"
      />
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="fig-label text-cyan mb-3">{p.figLabel}</p>
            <h2 className="font-display uppercase text-4xl sm:text-5xl">{p.title}</h2>
          </div>
          <p className="text-muted text-sm sm:text-base max-w-xl leading-relaxed">
            {p.intro}
          </p>
        </div>

        {/* 4 Flagship Products — Large 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredItems.map((item, i) => (
            <Reveal key={item.ref} delay={i * 90} className="h-full">
              <article className="card-lift group relative rounded-2xl border border-white/[0.09] glass-panel overflow-hidden flex flex-col h-full hover:border-cyan/50">
                {/* Window Mockup Chrome */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07] bg-background-deep/85">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan/60" />
                  </div>
                  <span className="fig-label text-[0.65rem] text-muted/90 truncate max-w-[220px]">
                    {item.linkLabel || item.title.toLowerCase()}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="fig-label text-[0.6rem] text-cyan px-2 py-0.5 rounded-full border border-cyan/25 bg-cyan/10">
                      {isFr ? "Produit publié" : "Live product"}
                    </span>
                  </div>
                </div>

                {item.image ? (
                  <a
                    href={item.link || "#contact"}
                    target={item.link ? "_blank" : undefined}
                    rel={item.link ? "noopener noreferrer" : undefined}
                    className="relative aspect-[16/10] border-b border-white/[0.07] overflow-hidden bg-panel block"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background-deep/80 to-transparent pointer-events-none" />
                  </a>
                ) : null}

                <div className="p-5 sm:p-7 flex flex-col flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display uppercase text-2xl sm:text-3xl text-foreground group-hover:text-cyan transition-colors">
                      {item.title}
                    </h3>
                    <span className="fig-label text-amber text-[0.65rem] sm:text-[0.68rem]">{item.type}</span>
                  </div>

                  <p className="text-muted text-sm sm:text-base leading-relaxed mt-3.5">
                    {item.desc}
                  </p>

                  <div className="mt-5 flex-1">
                    <div className="rounded-xl bg-amber/[0.06] border border-amber/20 px-4 py-3">
                      <span className="block fig-label text-[0.6rem] text-amber mb-1">
                        {isFr ? "Résultat & valeur ajoutée" : "Key outcome"}
                      </span>
                      <p className="text-foreground/95 text-xs sm:text-sm leading-relaxed">
                        {item.result}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="fig-label rounded-md border border-white/[0.08] bg-background-deep/70 px-2.5 py-1 text-[0.65rem] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {(item.stores && item.stores.length > 0) || (item.press && item.press.length > 0) ? (
                    <div className="flex flex-wrap gap-2 mt-3.5">
                      {item.stores?.map((store) => (
                        <a
                          key={store.label}
                          href={store.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="fig-label rounded-md border border-cyan/35 bg-cyan/[0.08] text-cyan px-2.5 py-1 text-[0.65rem] hover:bg-cyan hover:text-background-deep transition-colors"
                        >
                          {store.label} ↗
                        </a>
                      ))}
                      {item.press?.map((mention) => (
                        <a
                          key={mention.label}
                          href={mention.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="fig-label rounded-md border border-amber/35 bg-amber/[0.08] text-amber px-2.5 py-1 text-[0.65rem] hover:bg-amber hover:text-background-deep transition-colors"
                        >
                          {mention.label} ↗
                        </a>
                      ))}
                    </div>
                  ) : null}

                  {item.link ? (
                    <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-between">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan hover:text-amber transition-colors"
                      >
                        <span>
                          {isFr ? `Découvrir ${item.title}` : `Explore ${item.title}`} ({item.linkLabel})
                        </span>
                        <span className="transition-transform group-hover:translate-x-1">↗</span>
                      </a>
                    </div>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* 3 Secondary Tools & Specialized Apps */}
        {secondaryItems.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/[0.07]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
              <h3 className="font-display uppercase text-2xl text-foreground">
                {isFr
                  ? "Autres applications & utilitaires spécialisés"
                  : "More specialized apps & utilities"}
              </h3>
              <p className="text-xs text-muted">
                {isFr
                  ? "Outils spécialisés conçus et maintenus par l'atelier"
                  : "Specialized tools designed and maintained by the studio"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {secondaryItems.map((item, i) => (
                <Reveal key={item.ref} delay={i * 80} className="h-full">
                  <article className="card-lift group relative rounded-2xl border border-white/[0.08] glass-panel overflow-hidden flex flex-col h-full hover:border-cyan/50">
                    {item.image ? (
                      <div className="relative aspect-video border-b border-white/[0.07] overflow-hidden bg-panel">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background-deep/75 to-transparent pointer-events-none" />
                      </div>
                    ) : null}

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-display uppercase text-xl text-foreground group-hover:text-cyan transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <p className="fig-label text-amber text-[0.62rem] mt-0.5">{item.type}</p>

                      <p className="text-muted text-xs sm:text-sm leading-relaxed mt-3 flex-1">
                        {item.desc}
                      </p>

                      <p className="mt-3 text-foreground/90 text-xs leading-relaxed rounded-lg bg-white/[0.03] border-l-2 border-cyan/60 px-3 py-2">
                        {item.result}
                      </p>

                      {item.stores && item.stores.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {item.stores.map((store) => (
                            <a
                              key={store.label}
                              href={store.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="fig-label rounded-md border border-cyan/35 bg-cyan/[0.07] text-cyan px-2 py-0.5 text-[0.62rem] hover:bg-cyan hover:text-background-deep transition-colors"
                            >
                              {store.label} ↗
                            </a>
                          ))}
                        </div>
                      ) : null}

                      {item.link ? (
                        <div className="mt-4 pt-3 border-t border-white/[0.06]">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan hover:text-amber transition-colors"
                          >
                            <span>{item.linkLabel}</span>
                            <span className="transition-transform group-hover:translate-x-1">↗</span>
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

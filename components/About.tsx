"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function About() {
  const { t, lang } = useLanguage();
  const a = t.about;
  const isFr = lang === "fr";

  return (
    <section id="about" className="relative py-24 border-b border-white/[0.08] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/4 h-[360px] w-[520px] rounded-full bg-amber/[0.04] blur-[130px] pointer-events-none"
      />
      <div className="mx-auto max-w-6xl px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <p className="fig-label text-cyan mb-3">{a.figLabel}</p>
          <h2 className="font-display uppercase text-4xl sm:text-5xl mb-6">{a.title}</h2>
          <p className="text-muted leading-relaxed mb-4 text-base sm:text-lg">{a.p1}</p>
          <p className="text-muted leading-relaxed mb-8">
            {a.p2}
            {isFr && (
              <>
                {" "}
                Basé à{" "}
                <Link
                  href="/site-internet-roanne"
                  className="text-cyan underline decoration-cyan/40 underline-offset-4 hover:text-amber transition-colors"
                >
                  Roanne
                </Link>
                .
              </>
            )}
          </p>

          {/* A face behind the studio: a service business is bought on trust */}
          <div className="mb-8 inline-flex items-center gap-5 rounded-2xl border border-cyan/25 glass-panel pr-7 p-4 shadow-[0_10px_30px_-15px_rgba(95,216,232,0.2)]">
            <Image
              src="/img/william.webp"
              alt="William George"
              width={88}
              height={88}
              className="h-20 w-20 sm:h-22 sm:w-22 rounded-xl border border-cyan/40 object-cover shrink-0"
            />
            <div>
              <span className="fig-label text-[0.6rem] text-amber block mb-1">
                {isFr ? "VOTRE INTERLOCUTEUR UNIQUE" : "YOUR SINGLE POINT OF CONTACT"}
              </span>
              <p className="font-display uppercase text-2xl leading-tight text-foreground">
                William George
              </p>
              <p className="fig-label text-cyan mt-1">
                {isFr
                  ? "Fondateur · Concepteur & développeur"
                  : "Founder · Designer & developer"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {a.why.map((w) => (
              <div
                key={w.ref}
                className="rounded-xl border border-white/[0.08] glass-panel p-5 hover:border-cyan/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="fig-label text-amber">{w.ref}</span>
                  <span className="node-dot opacity-50" />
                </div>
                <h3 className="font-display uppercase text-lg leading-tight text-foreground">
                  {w.title}
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed mt-2">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Studio Emblem & Easter Egg Level 3 Owl (exact 220x220 wrapper preserved) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl border border-white/10 glass-panel p-8 sm:p-12 flex flex-col items-center justify-center overflow-hidden">
            {/* Decorative ambient glow & concentric tech rings (pointer-events-none so the owl eye click is never intercepted) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />
              <div className="absolute h-72 w-72 rounded-full border border-cyan/15 border-dashed" />
              <div className="absolute h-88 w-88 rounded-full border border-white/[0.05]" />
            </div>

            <div className="w-full flex items-center justify-between mb-6 relative z-10 pointer-events-none">
              <span className="fig-label text-[0.62rem] text-cyan">
                {isFr ? "ATELIER · SYSTÈME" : "STUDIO · CORE"}
              </span>
              <span className="fig-label text-[0.62rem] text-muted">
                46.03° N · 4.07° E
              </span>
            </div>

            <div
              className="relative z-10 w-[220px] h-[220px] my-4"
              data-atelier-owl-wrapper="true"
            >
              <Image
                src="/img/logo.png"
                alt="La Fabrik Numérique"
                width={220}
                height={220}
                data-easter-egg="logo"
                data-atelier-owl="true"
                draggable={false}
              />
            </div>

            <div className="w-full pt-6 mt-4 border-t border-white/[0.07] flex items-center justify-between relative z-10 pointer-events-none">
              <span className="fig-label text-[0.62rem] text-amber">
                LA FABRIK NUMÉRIQUE
              </span>
              <span className="inline-flex items-center gap-1.5 fig-label text-[0.62rem] text-foreground/80">
                <span className="node-dot" />
                {isFr ? "ROANNE, FRANCE" : "ROANNE, FRANCE"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

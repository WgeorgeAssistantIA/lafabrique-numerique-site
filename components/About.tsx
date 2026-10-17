"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import CircuitCanvas from "./CircuitCanvas";

export default function About() {
  const { t, lang } = useLanguage();
  const a = t.about;
  const isFr = lang === "fr";

  return (
    <section
      id="about"
      className="relative py-24 border-b border-white/[0.08] overflow-hidden bg-background-deep"
    >
      {/* Full-section circuit background (no z-index on wrapper so the z-20
          secret letter layer renders cleanly above the transparency gradients) */}
      <div className="absolute inset-0">
        <CircuitCanvas lang={lang} variant="atelier" />
      </div>

      {/* Uniform discreet veil across the entire section (left, right, and all around the panel) */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-background-deep/84" />
      <div className="absolute inset-x-0 top-0 z-[1] h-24 pointer-events-none bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-24 pointer-events-none bg-gradient-to-t from-background to-transparent" />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/4 z-[1] h-[360px] w-[520px] rounded-full bg-amber/[0.04] blur-[130px] pointer-events-none"
      />

      <div className="mx-auto max-w-6xl px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-12 lg:gap-y-8 items-stretch pointer-events-none">
        {/* Row 1 Left: Studio story & Founder card */}
        <div className="lg:col-span-7 flex flex-col justify-between pointer-events-auto">
          <div>
            <p className="fig-label text-cyan mb-3">{a.figLabel}</p>
            <h2 className="font-display uppercase text-4xl sm:text-5xl mb-6">{a.title}</h2>
            <p className="text-muted leading-relaxed mb-4 text-base sm:text-lg">{a.p1}</p>
            <p className="text-muted leading-relaxed mb-7">
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
          </div>

          {/* A face behind the studio: a service business is bought on trust */}
          <div className="inline-flex items-center gap-5 rounded-2xl border border-cyan/25 bg-panel/75 backdrop-blur-md pr-7 p-4 shadow-[0_10px_30px_-15px_rgba(95,216,232,0.2)] self-start">
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
        </div>

        {/* Row 1 Right: Dedicated translucent Circuit panel directly above the Owl,
            with the secret letter centered inside its viewport */}
        <div className="lg:col-span-5 flex flex-col pointer-events-none">
          <div className="relative rounded-2xl border border-white/10 bg-background-deep/35 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_16px_40px_-18px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col h-full min-h-[280px] sm:min-h-[320px]">
            <div className="px-5 py-3.5 border-b border-white/[0.08] bg-panel/65 backdrop-blur-md flex items-center justify-between relative z-10">
              <span className="inline-flex items-center gap-2 fig-label text-[0.62rem] text-cyan">
                <span className="node-dot" />
                {isFr ? "CIRCUIT · MATRICE ACTIVE" : "CIRCUIT · ACTIVE MATRIX"}
              </span>
              <span className="fig-label text-[0.6rem] text-muted">
                {isFr ? "SIGNAL INTERACTIF" : "INTERACTIVE SIGNAL"}
              </span>
            </div>

            <div
              data-atelier-letter-zone="true"
              className="relative flex-1 min-h-[220px]"
            />

            <div className="px-5 py-2.5 border-t border-white/[0.06] bg-panel/50 backdrop-blur-md flex items-center justify-between relative z-10">
              <span className="fig-label text-[0.58rem] text-muted">
                {isFr
                  ? "Survolez ou cliquez les nœuds pour propager un signal"
                  : "Hover or click nodes to propagate a signal"}
              </span>
              <span className="fig-label text-[0.58rem] text-amber">SYS · 01</span>
            </div>
          </div>
        </div>

        {/* Row 2 Left: The 4 value bricks */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 pointer-events-auto">
          {a.why.map((w) => (
            <div
              key={w.ref}
              className="rounded-xl border border-white/[0.08] bg-panel/65 backdrop-blur-md p-5 hover:border-cyan/40 transition-colors flex flex-col justify-between"
            >
              <div>
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
            </div>
          ))}
        </div>

        {/* Row 2 Right: Studio Emblem & Easter Egg Level 3 Owl aligned at the height of the 4 bricks */}
        <div className="lg:col-span-5 flex flex-col pointer-events-auto">
          <div className="relative rounded-2xl border border-white/10 bg-panel/60 backdrop-blur-md p-6 sm:p-8 flex flex-col items-center justify-between overflow-hidden h-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-15px_rgba(0,0,0,0.6)]">
            {/* Decorative ambient glow & concentric tech rings (pointer-events-none so the owl eye click is never intercepted) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="h-60 w-60 rounded-full bg-cyan/10 blur-3xl" />
              <div className="absolute h-64 w-64 rounded-full border border-cyan/15 border-dashed" />
              <div className="absolute h-80 w-80 rounded-full border border-white/[0.05]" />
            </div>

            <div className="w-full flex items-center justify-between mb-2 relative z-10 pointer-events-none">
              <span className="fig-label text-[0.62rem] text-cyan">
                {isFr ? "ATELIER · SYSTÈME" : "STUDIO · CORE"}
              </span>
              <span className="fig-label text-[0.62rem] text-muted">
                46.03° N · 4.07° E
              </span>
            </div>

            <div
              className="relative z-10 w-[220px] h-[220px] my-2"
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

            <div className="w-full pt-4 mt-2 border-t border-white/[0.07] flex items-center justify-between relative z-10 pointer-events-none">
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

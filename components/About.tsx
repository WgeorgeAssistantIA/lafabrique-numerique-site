"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="py-24 border-b border-line">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="fig-label mb-3">{a.figLabel}</p>
          <h2 className="font-display uppercase text-4xl mb-6">{a.title}</h2>
          <p className="text-muted leading-relaxed mb-4">{a.p1}</p>
          <p className="text-muted leading-relaxed mb-8">{a.p2}</p>
          <div className="space-y-5 border-t border-line pt-6">
            {a.why.map((w) => (
              <div key={w.ref} className="flex gap-4">
                <span className="fig-label text-amber shrink-0">{w.ref}</span>
                <div>
                  <h3 className="font-display uppercase text-lg leading-tight">{w.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mt-1">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative border border-line p-8 flex items-center justify-center bg-panel">
          <Image src="/img/logo.png" alt="La Fabrik Numérique" width={220} height={220} />
        </div>
      </div>
    </section>
  );
}

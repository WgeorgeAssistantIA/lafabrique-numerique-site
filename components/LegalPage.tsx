"use client";

import Link from "next/link";
import Image from "next/image";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { legalContent, type LegalDoc } from "@/lib/legal";
import LangToggle from "./LangToggle";
import Footer from "./Footer";

type DocKey = "mentions" | "privacy";

export default function LegalPage({ docKey }: { docKey: DocKey }) {
  return (
    <LanguageProvider>
      <LegalContent docKey={docKey} />
    </LanguageProvider>
  );
}

function LegalContent({ docKey }: { docKey: DocKey }) {
  const { lang } = useLanguage();
  const c = legalContent[lang];
  const doc: LegalDoc = c[docKey];

  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/img/logo.png"
              alt="La Fabrik Numérique"
              width={32}
              height={32}
              data-easter-egg="logo"
            />
            <span className="font-display text-sm tracking-widest uppercase">
              La Fabrik Numérique
            </span>
          </Link>
          <LangToggle />
        </div>
      </header>

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-16">
          <Link href="/" className="fig-label text-cyan hover:text-amber transition-colors">
            {c.backHome}
          </Link>
          <h1 className="font-display uppercase text-4xl mt-6">{doc.title}</h1>
          <p className="fig-label text-muted mt-2">{doc.updated}</p>

          <div className="mt-10 space-y-8">
            {doc.sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-display uppercase text-xl text-cyan">{s.h}</h2>
                <div className="mt-3 space-y-3">
                  {s.p.map((para, i) => (
                    <p key={i} className="text-muted leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

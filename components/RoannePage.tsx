import Link from "next/link";
import Image from "next/image";
import { roanneContent, ROANNE_AREAS } from "@/lib/roanne";
import { EDITOR_EMAIL } from "@/lib/legal";

const SITE_URL = "https://www.lafabriknumerique.fr";

// Deliberately not wired into the LanguageProvider: this is a French-only
// local SEO landing page (no /en equivalent), so it stays a plain server
// component — no client JS, no risk of the routed language toggle
// auto-redirecting a browser-en visitor (or Googlebot) away from it.
export default function RoannePage() {
  const r = roanneContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "La Fabrik Numérique",
    url: `${SITE_URL}/site-internet-roanne`,
    logo: `${SITE_URL}/img/logo.png`,
    image: `${SITE_URL}/img/og.png`,
    description: r.metaDesc,
    email: EDITOR_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Roanne",
      postalCode: "42300",
      addressCountry: "FR",
    },
    areaServed: ROANNE_AREAS.map((name) => ({ "@type": "City", name })),
    priceRange: "€€",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: r.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header className="border-b border-white/[0.08] bg-background-deep/85 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center rounded-full p-0.5 bg-gradient-to-br from-cyan/20 to-amber/10 ring-1 ring-white/10">
              <Image
                src="/img/logo.png"
                alt="La Fabrik Numérique"
                width={32}
                height={32}
                data-easter-egg="logo"
                draggable={false}
              />
            </div>
            <span className="font-display text-base tracking-[0.14em] uppercase">
              La Fabrik Numérique
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 circuit-bg">
          <div className="mx-auto max-w-3xl px-6 relative z-10">
            <Link
              href="/"
              className="fig-label text-cyan hover:text-amber transition-colors"
            >
              {r.backHome}
            </Link>
            <p className="fig-label text-cyan mt-8 mb-3">{r.figLabel}</p>
            <h1 className="font-display uppercase text-4xl sm:text-5xl leading-[1.05]">
              {r.title}
            </h1>
            <p className="mt-6 text-muted leading-relaxed max-w-xl text-base sm:text-lg">
              {r.intro}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/#contact" className="btn-shine btn-primary">
                {r.ctaButton}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-white/[0.08]">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-display uppercase text-2xl sm:text-3xl mb-8">
              {r.whyTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {r.why.map((item, i) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/[0.08] glass-panel p-5"
                >
                  <span className="fig-label text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display uppercase text-lg leading-tight mt-2">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-white/[0.08] circuit-bg">
          <div className="mx-auto max-w-3xl px-6 relative z-10">
            <h2 className="font-display uppercase text-2xl sm:text-3xl mb-8">
              {r.servicesTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {r.services.map((item) => (
                <div
                  key={item.title}
                  className="card-lift rounded-xl border border-white/[0.08] glass-panel p-6"
                >
                  <h3 className="font-display uppercase text-xl text-cyan">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mt-3">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-white/[0.08]">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-display uppercase text-2xl sm:text-3xl mb-6">
              {r.areasTitle}
            </h2>
            <p className="text-muted leading-relaxed max-w-xl">{r.areasDesc}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {ROANNE_AREAS.map((area) => (
                <span
                  key={area}
                  className="fig-label rounded-lg border border-white/[0.08] bg-panel/70 px-3.5 py-1.5 text-foreground/90"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-white/[0.08] circuit-bg">
          <div className="mx-auto max-w-3xl px-6 relative z-10">
            <h2 className="font-display uppercase text-2xl sm:text-3xl mb-8">
              {r.faqTitle}
            </h2>
            <div className="space-y-4">
              {r.faq.map((item) => (
                <div
                  key={item.q}
                  className="rounded-xl border border-white/[0.08] glass-panel p-6"
                >
                  <h3 className="font-display uppercase text-lg text-cyan">
                    {item.q}
                  </h3>
                  <p className="text-muted leading-relaxed mt-2 text-sm sm:text-base">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-white/[0.08]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display uppercase text-3xl sm:text-4xl">
              {r.ctaTitle}
            </h2>
            <p className="mt-4 text-muted leading-relaxed max-w-md mx-auto">
              {r.ctaDesc}
            </p>
            <Link
              href="/#contact"
              className="btn-shine btn-primary mt-8"
            >
              {r.ctaButton}
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 fig-label">
          <span>© {new Date().getFullYear()} La Fabrik Numérique</span>
          <nav className="flex items-center gap-6">
            <Link
              href="/mentions-legales"
              className="hover:text-cyan transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/confidentialite"
              className="hover:text-cyan transition-colors"
            >
              Confidentialité
            </Link>
          </nav>
          <span>REF. LFN-2026</span>
        </div>
      </footer>
    </>
  );
}

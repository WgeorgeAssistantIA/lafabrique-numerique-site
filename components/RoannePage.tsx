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
    description: r.metaDesc,
    email: EDITOR_EMAIL,
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
      <header className="border-b border-line">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/img/logo.png" alt="La Fabrik Numérique" width={32} height={32} />
            <span className="font-display text-sm tracking-widest uppercase">
              La Fabrik Numérique
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 circuit-bg">
          <div className="mx-auto max-w-3xl px-6">
            <Link href="/" className="fig-label text-cyan hover:text-amber transition-colors">
              {r.backHome}
            </Link>
            <p className="fig-label mt-8 mb-3">{r.figLabel}</p>
            <h1 className="font-display uppercase text-4xl sm:text-5xl leading-[1.05]">
              {r.title}
            </h1>
            <p className="mt-6 text-muted leading-relaxed max-w-xl">{r.intro}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="fig-label bg-cyan text-background-deep px-6 py-3 hover:bg-amber transition-colors"
              >
                {r.ctaButton}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-line">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-display uppercase text-2xl mb-8">{r.whyTitle}</h2>
            <div className="space-y-6">
              {r.why.map((item, i) => (
                <div key={item.title} className="flex gap-4">
                  <span className="fig-label text-amber shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display uppercase text-lg leading-tight">{item.title}</h3>
                    <p className="text-muted text-sm leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-line circuit-bg">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-display uppercase text-2xl mb-8">{r.servicesTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {r.services.map((item) => (
                <div key={item.title} className="border border-line p-6">
                  <h3 className="font-display uppercase text-lg">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mt-3">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-line">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-display uppercase text-2xl mb-6">{r.areasTitle}</h2>
            <p className="text-muted leading-relaxed max-w-xl">{r.areasDesc}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {ROANNE_AREAS.map((area) => (
                <span key={area} className="fig-label border border-line px-3 py-1.5">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-line circuit-bg">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-display uppercase text-2xl mb-8">{r.faqTitle}</h2>
            <div className="space-y-8">
              {r.faq.map((item) => (
                <div key={item.q}>
                  <h3 className="font-display uppercase text-lg text-cyan">{item.q}</h3>
                  <p className="text-muted leading-relaxed mt-2">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-line">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display uppercase text-3xl">{r.ctaTitle}</h2>
            <p className="mt-4 text-muted leading-relaxed max-w-md mx-auto">{r.ctaDesc}</p>
            <Link
              href="/#contact"
              className="fig-label inline-block mt-8 bg-cyan text-background-deep px-6 py-3 hover:bg-amber transition-colors"
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
            <Link href="/mentions-legales" className="hover:text-cyan transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-cyan transition-colors">
              Confidentialité
            </Link>
          </nav>
          <span>REF. LFN-2026</span>
        </div>
      </footer>
    </>
  );
}

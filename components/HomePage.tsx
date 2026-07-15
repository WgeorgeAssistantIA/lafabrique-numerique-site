import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { LanguageProvider } from "@/lib/i18n";
import { translations, type Lang } from "@/lib/translations";
import { EDITOR_NAME, EDITOR_EMAIL } from "@/lib/legal";

const SITE_URL = "https://www.lafabriknumerique.fr";

export default function HomePage({ lang }: { lang: Lang }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "La Fabrik Numérique",
    url: lang === "en" ? `${SITE_URL}/en` : SITE_URL,
    logo: `${SITE_URL}/img/logo.png`,
    image: `${SITE_URL}/img/og.png`,
    description: translations[lang].metaDesc,
    email: EDITOR_EMAIL,
    founder: { "@type": "Person", name: EDITOR_NAME },
    areaServed: "France",
    priceRange: "€€",
    knowsLanguage: ["fr", "en"],
  };

  return (
    <LanguageProvider initialLang={lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Portfolio />
        </Reveal>
        <Reveal>
          <Pricing />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </LanguageProvider>
  );
}

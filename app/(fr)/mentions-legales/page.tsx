import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

const SITE_URL = "https://www.lafabriknumerique.fr";

export const metadata: Metadata = {
  title: "Mentions légales — La Fabrik Numérique",
  description:
    "Mentions légales, coordonnées de l'éditeur et conditions d'hébergement du site officiel de l'atelier La Fabrik Numérique.",
  alternates: {
    canonical: `${SITE_URL}/mentions-legales`,
  },
  openGraph: {
    title: "Mentions légales — La Fabrik Numérique",
    description:
      "Mentions légales, coordonnées de l'éditeur et conditions d'hébergement du site officiel de l'atelier La Fabrik Numérique.",
    url: `${SITE_URL}/mentions-legales`,
    siteName: "La Fabrik Numérique",
    images: [{ url: `${SITE_URL}/img/og.png`, width: 1640, height: 624, alt: "Mentions légales — La Fabrik Numérique" }],
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  return <LegalPage docKey="mentions" />;
}

import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

const SITE_URL = "https://www.lafabriknumerique.fr";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — La Fabrik",
  description:
    "Conditions générales de vente applicables aux prestations de développement web et logiciel fournies par La Fabrik Numérique.",
  alternates: {
    canonical: `${SITE_URL}/cgv`,
  },
  openGraph: {
    title: "Conditions Générales de Vente — La Fabrik",
    description:
      "Conditions générales de vente applicables aux prestations de développement web et logiciel fournies par La Fabrik Numérique.",
    url: `${SITE_URL}/cgv`,
    siteName: "La Fabrik Numérique",
    images: [{ url: `${SITE_URL}/img/og.png`, width: 1640, height: 624, alt: "CGV — La Fabrik Numérique" }],
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: false, follow: true },
};

export default function Cgv() {
  return <LegalPage docKey="cgv" />;
}

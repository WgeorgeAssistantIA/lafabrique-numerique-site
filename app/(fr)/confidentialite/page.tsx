import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

const SITE_URL = "https://www.lafabriknumerique.fr";

export const metadata: Metadata = {
  title: "Politique de confidentialité — La Fabrik",
  description:
    "Politique de confidentialité et protection des données personnelles appliquée aux utilisateurs des services de La Fabrik Numérique.",
  alternates: {
    canonical: `${SITE_URL}/confidentialite`,
  },
  openGraph: {
    title: "Politique de confidentialité — La Fabrik",
    description:
      "Politique de confidentialité et protection des données personnelles appliquée aux utilisateurs des services de La Fabrik Numérique.",
    url: `${SITE_URL}/confidentialite`,
    siteName: "La Fabrik Numérique",
    images: [{ url: `${SITE_URL}/img/og.png`, width: 1640, height: 624, alt: "Confidentialité — La Fabrik Numérique" }],
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: false, follow: true },
};

export default function Confidentialite() {
  return <LegalPage docKey="privacy" />;
}

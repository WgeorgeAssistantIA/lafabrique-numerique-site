import type { Metadata } from "next";
import AtelierSecretPage from "@/components/AtelierSecretPage";

const SITE_URL = "https://www.lafabriknumerique.fr";

export const metadata: Metadata = {
  title: "Atelier secret — La Fabrik Numérique",
  description:
    "Page secrète de l'atelier La Fabrik Numérique. Félicitations pour avoir découvert l'un des circuits dissimulés du site officiel.",
  alternates: {
    canonical: `${SITE_URL}/atelier-secret`,
  },
  openGraph: {
    title: "Atelier secret — La Fabrik Numérique",
    description:
      "Page secrète de l'atelier La Fabrik Numérique. Félicitations pour avoir découvert l'un des circuits dissimulés du site officiel.",
    url: `${SITE_URL}/atelier-secret`,
    siteName: "La Fabrik Numérique",
    images: [{ url: `${SITE_URL}/img/og.png`, width: 1640, height: 624, alt: "Atelier secret" }],
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function AtelierSecret() {
  return <AtelierSecretPage />;
}

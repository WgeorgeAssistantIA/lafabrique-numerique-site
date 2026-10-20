import type { Metadata } from "next";
import RoiSimulatorPage from "@/components/RoiSimulatorPage";

const SITE_URL = "https://www.lafabriknumerique.fr";

export const metadata: Metadata = {
  title: "Simulateur ROI Logiciel Sur-Mesure vs SaaS — PME",
  description:
    "Calculez en 30 secondes le seuil de rentabilité d'un logiciel métier sur-mesure face à vos abonnements SaaS et ressaisies Excel (gratuit, sans email).",
  alternates: {
    canonical: `${SITE_URL}/simulateur-roi-logiciel-sur-mesure`,
  },
  openGraph: {
    title: "Simulateur ROI Logiciel Sur-Mesure vs SaaS — PME",
    description:
      "Calculez en 30 secondes le seuil de rentabilité d'un logiciel métier sur-mesure face à vos abonnements SaaS et ressaisies Excel (gratuit, sans email).",
    url: `${SITE_URL}/simulateur-roi-logiciel-sur-mesure`,
    siteName: "La Fabrik Numérique",
    images: [
      {
        url: `${SITE_URL}/img/og.png`,
        width: 1640,
        height: 624,
        alt: "Simulateur ROI Logiciel Sur-Mesure vs SaaS — La Fabrik Numérique",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulateur ROI Logiciel Sur-Mesure vs SaaS — PME",
    description:
      "Calculez en 30 secondes le seuil de rentabilité d'un logiciel métier sur-mesure face à vos abonnements SaaS et ressaisies Excel (gratuit, sans email).",
    images: [`${SITE_URL}/img/og.png`],
  },
};

export default function SimulateurRoiPage() {
  return <RoiSimulatorPage />;
}

import type { Metadata } from "next";
import RoannePage from "@/components/RoannePage";
import { roanneContent } from "@/lib/roanne";

const SITE_URL = "https://www.lafabriknumerique.fr";

export const metadata: Metadata = {
  title: roanneContent.metaTitle,
  description: roanneContent.metaDesc,
  alternates: {
    canonical: `${SITE_URL}/site-internet-roanne`,
  },
  openGraph: {
    title: roanneContent.metaTitle,
    description: roanneContent.metaDesc,
    url: `${SITE_URL}/site-internet-roanne`,
    siteName: "La Fabrik Numérique",
    images: [
      {
        url: `${SITE_URL}/img/og.png`,
        width: 1640,
        height: 624,
        alt: "Création de site internet à Roanne — La Fabrik Numérique",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: roanneContent.metaTitle,
    description: roanneContent.metaDesc,
    images: [`${SITE_URL}/img/og.png`],
  },
};

export default function Roanne() {
  return <RoannePage />;
}

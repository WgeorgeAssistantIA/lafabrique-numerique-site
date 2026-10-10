import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { translations } from "@/lib/translations";

const en = translations.en;

const SITE_URL = "https://www.lafabriknumerique.fr";

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDesc,
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: { fr: SITE_URL, en: `${SITE_URL}/en`, "x-default": SITE_URL },
  },
  openGraph: {
    title: en.metaTitle,
    description: en.metaDesc,
    url: `${SITE_URL}/en`,
    siteName: "La Fabrik Numérique",
    images: [
      {
        url: `${SITE_URL}/img/og.png`,
        width: 1640,
        height: 624,
        alt: "La Fabrik Numérique",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: en.metaTitle,
    description: en.metaDesc,
    images: [`${SITE_URL}/img/og.png`],
  },
};

export default function HomeEn() {
  return <HomePage lang="en" />;
}

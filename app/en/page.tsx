import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { translations } from "@/lib/translations";

const en = translations.en;

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDesc,
  alternates: {
    canonical: "/en",
    languages: { fr: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    title: en.metaTitle,
    description: en.metaDesc,
    url: "/en",
    locale: "en_US",
  },
  twitter: {
    title: en.metaTitle,
    description: en.metaDesc,
  },
};

export default function HomeEn() {
  return <HomePage lang="en" />;
}

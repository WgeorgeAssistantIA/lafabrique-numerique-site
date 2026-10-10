import type { Metadata } from "next";
import BlogIndexPage from "@/components/BlogIndexPage";
import { blogContent } from "@/lib/blog";

const b = blogContent.fr;
const SITE_URL = "https://www.lafabriknumerique.fr";

export const metadata: Metadata = {
  title: `${b.indexTitle} — La Fabrik Numérique`,
  description: b.indexDesc,
  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: { fr: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog`, "x-default": `${SITE_URL}/blog` },
  },
  openGraph: {
    title: `${b.indexTitle} — La Fabrik Numérique`,
    description: b.indexDesc,
    url: `${SITE_URL}/blog`,
    siteName: "La Fabrik Numérique",
    images: [
      {
        url: `${SITE_URL}/img/og.png`,
        width: 1640,
        height: 624,
        alt: `${b.indexTitle} — La Fabrik Numérique`,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${b.indexTitle} — La Fabrik Numérique`,
    description: b.indexDesc,
    images: [`${SITE_URL}/img/og.png`],
  },
};

export default function Blog() {
  return <BlogIndexPage lang="fr" />;
}

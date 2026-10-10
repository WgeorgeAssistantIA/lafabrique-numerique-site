import type { Metadata } from "next";
import BlogIndexPage from "@/components/BlogIndexPage";
import { blogContent } from "@/lib/blog";

const b = blogContent.en;
const SITE_URL = "https://www.lafabriknumerique.fr";

export const metadata: Metadata = {
  title: `${b.indexTitle} — La Fabrik Numérique`,
  description: b.indexDesc,
  alternates: {
    canonical: `${SITE_URL}/en/blog`,
    languages: { fr: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog`, "x-default": `${SITE_URL}/blog` },
  },
  openGraph: {
    title: `${b.indexTitle} — La Fabrik Numérique`,
    description: b.indexDesc,
    url: `${SITE_URL}/en/blog`,
    siteName: "La Fabrik Numérique",
    images: [
      {
        url: `${SITE_URL}/img/og.png`,
        width: 1640,
        height: 624,
        alt: `${b.indexTitle} — La Fabrik Numérique`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${b.indexTitle} — La Fabrik Numérique`,
    description: b.indexDesc,
    images: [`${SITE_URL}/img/og.png`],
  },
};

export default function BlogEn() {
  return <BlogIndexPage lang="en" />;
}

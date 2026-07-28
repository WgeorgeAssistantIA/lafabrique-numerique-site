import type { Metadata } from "next";
import BlogIndexPage from "@/components/BlogIndexPage";
import { blogContent } from "@/lib/blog";

const b = blogContent.fr;

export const metadata: Metadata = {
  title: `${b.indexTitle} — La Fabrik Numérique`,
  description: b.indexDesc,
  alternates: {
    canonical: "/blog",
    languages: { fr: "/blog", en: "/en/blog", "x-default": "/blog" },
  },
};

export default function Blog() {
  return <BlogIndexPage lang="fr" />;
}

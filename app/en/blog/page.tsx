import type { Metadata } from "next";
import BlogIndexPage from "@/components/BlogIndexPage";
import { blogContent } from "@/lib/blog";

const b = blogContent.en;

export const metadata: Metadata = {
  title: `${b.indexTitle} — La Fabrik Numérique`,
  description: b.indexDesc,
  alternates: {
    canonical: "/en/blog",
    languages: { fr: "/blog", en: "/en/blog", "x-default": "/blog" },
  },
};

export default function BlogEn() {
  return <BlogIndexPage lang="en" />;
}

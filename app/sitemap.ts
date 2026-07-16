import type { MetadataRoute } from "next";
import { blogContent, getSlugPair } from "@/lib/blog";

const SITE_URL = "https://www.lafabriknumerique.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Union of post ids across both languages — a post syndicated from
  // VoxCut/InOneShot may only exist in one language's array.
  const postIds = new Set([...blogContent.fr.posts, ...blogContent.en.posts].map((p) => p.id));

  const blogEntries: MetadataRoute.Sitemap = Array.from(postIds).flatMap((id) => {
    const frPost = blogContent.fr.posts.find((p) => p.id === id);
    const enPost = blogContent.en.posts.find((p) => p.id === id);
    // Syndicated posts canonicalize to the original article elsewhere —
    // don't list our copy in the sitemap to avoid a mixed signal.
    if (frPost?.canonicalUrl || enPost?.canonicalUrl) return [];

    const pair = getSlugPair(id);
    const post = frPost ?? enPost!;
    const languages: Record<string, string> = {};
    if (pair.fr) languages.fr = `${SITE_URL}/blog/${pair.fr}`;
    if (pair.en) languages.en = `${SITE_URL}/en/blog/${pair.en}`;

    const entries: MetadataRoute.Sitemap = [];
    if (pair.fr) {
      entries.push({
        url: `${SITE_URL}/blog/${pair.fr}`,
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: { languages },
      });
    }
    if (pair.en) {
      entries.push({
        url: `${SITE_URL}/en/blog/${pair.en}`,
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: { languages },
      });
    }
    return entries;
  });

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { fr: SITE_URL, en: `${SITE_URL}/en` },
      },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: { fr: SITE_URL, en: `${SITE_URL}/en` },
      },
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: { fr: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog` },
      },
    },
    {
      url: `${SITE_URL}/en/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: {
        languages: { fr: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog` },
      },
    },
    {
      url: `${SITE_URL}/site-internet-roanne`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...blogEntries,
  ];
}

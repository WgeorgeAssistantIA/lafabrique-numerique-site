import type { MetadataRoute } from "next";
import { blogContent, getSlugPair } from "@/lib/blog";

const SITE_URL = "https://www.lafabriknumerique.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const blogEntries: MetadataRoute.Sitemap = blogContent.fr.posts.flatMap((post) => {
    const pair = getSlugPair(post.id);
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

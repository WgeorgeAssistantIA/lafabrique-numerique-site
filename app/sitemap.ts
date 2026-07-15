import type { MetadataRoute } from "next";

const SITE_URL = "https://www.lafabriknumerique.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
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
  ];
}

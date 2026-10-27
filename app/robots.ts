import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: [
      "https://www.lafabriknumerique.fr/sitemap.xml",
      "https://www.lafabriknumerique.fr/jeux/sitemap.xml",
    ],
  };
}

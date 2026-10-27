import type { NextConfig } from "next";

const escapeGamesOrigin = process.env.ESCAPE_GAMES_ORIGIN?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    if (!escapeGamesOrigin) return [];
    return [
      {
        source: "/jeux",
        destination: "/jeux/index.html",
        permanent: false,
      },
      {
        source: "/jeux/",
        destination: "/jeux/index.html",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    if (!escapeGamesOrigin) return [];
    return [
      {
        source: "/jeux/:path*",
        destination: `${escapeGamesOrigin}/:path*`,
      },
    ];
  },
};

export default nextConfig;

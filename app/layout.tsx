import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const bigShoulders = localFont({
  src: "./fonts/BigShoulders-Bold.ttf",
  variable: "--font-display",
  weight: "700",
});

const dmMono = localFont({
  src: "./fonts/DMMono-Regular.ttf",
  variable: "--font-mono-brand",
  weight: "400",
});

const SITE_URL = "https://www.lafabriknumerique.fr";
const TITLE = "La Fabrik Numérique — Atelier de création web & logiciel";
const DESCRIPTION =
  "La Fabrik Numérique conçoit des sites web, applications et logiciels sur mesure. Circuits & idées.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  verification: {
    google: "Mlw16OWL3An9EMgg9flyBrnyn7MWws0_ns9F4yzA0hw",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "La Fabrik Numérique",
    images: [{ url: "/img/og.png", width: 1640, height: 624, alt: "La Fabrik Numérique" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/img/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${bigShoulders.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollProgress />
        {children}
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}

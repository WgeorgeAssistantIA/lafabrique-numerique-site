import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import EasterEggKonami from "@/components/EasterEggKonami";
import EasterEggConsole from "@/components/EasterEggConsole";
import EasterEggWord from "@/components/EasterEggWord";
import EasterEggMobile from "@/components/EasterEggMobile";
import "../globals.css";

const bigShoulders = localFont({
  src: "../fonts/BigShoulders-Bold.ttf",
  variable: "--font-display",
  weight: "700",
});

const dmMono = localFont({
  src: "../fonts/DMMono-Regular.ttf",
  variable: "--font-mono-brand",
  weight: "400",
});

const SITE_URL = "https://www.lafabriknumerique.fr";
const TITLE = "La Fabrik Numérique — Web & Software Studio";
const DESCRIPTION =
  "Bespoke web and software engineering studio. We build high-performance showcase websites, web applications, and custom SaaS tools. Get a quote in 24h.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      fr: SITE_URL,
      en: `${SITE_URL}/en`,
      "x-default": SITE_URL,
    },
  },
  verification: {
    google: "Mlw16OWL3An9EMgg9flyBrnyn7MWws0_ns9F4yzA0hw",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/en`,
    siteName: "La Fabrik Numérique",
    images: [
      {
        url: `${SITE_URL}/img/og.png`,
        width: 1640,
        height: 624,
        alt: "La Fabrik Numérique",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/img/og.png"],
  },
};

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollProgress />
        {children}
        <BackToTop />
        <EasterEggKonami />
        <EasterEggConsole />
        <EasterEggWord />
        <EasterEggMobile />
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Sans } from "next/font/google";
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

// Body copy: long paragraphs in DM Mono were tiring to read; mono stays for labels (.fig-label)
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-brand",
  display: "swap",
});

const SITE_URL = "https://www.lafabriknumerique.fr";
const TITLE = "La Fabrik Numérique — Atelier de création web & logiciel";
const DESCRIPTION =
  "Atelier de développement web et logiciel sur mesure basé à Roanne. Création de sites vitrines, applications web et SaaS performants. Devis gratuit & détaillé.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
    languages: {
      fr: SITE_URL,
      en: `${SITE_URL}/en`,
      "x-default": SITE_URL,
    },
  },
  verification: {
    google: "Mlw16OWL3An9EMgg9flyBrnyn7MWws0_ns9F4yzA0hw",
    other: {
      "msvalidate.01": "DEA14F3920FE8134867448E702A8CC29",
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "La Fabrik Numérique",
    images: [
      {
        url: `${SITE_URL}/img/og.png`,
        width: 1640,
        height: 624,
        alt: "La Fabrik Numérique",
      },
    ],
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
      className={`${bigShoulders.variable} ${dmMono.variable} ${plexSans.variable} h-full antialiased`}
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
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="zZnPAocIpChlgDJIKieujA"
          async
        />
      </body>
    </html>
  );
}

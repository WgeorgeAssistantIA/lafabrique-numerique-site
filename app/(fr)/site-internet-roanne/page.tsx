import type { Metadata } from "next";
import RoannePage from "@/components/RoannePage";
import { roanneContent } from "@/lib/roanne";

export const metadata: Metadata = {
  title: roanneContent.metaTitle,
  description: roanneContent.metaDesc,
  alternates: {
    canonical: "/site-internet-roanne",
  },
  openGraph: {
    title: roanneContent.metaTitle,
    description: roanneContent.metaDesc,
    url: "/site-internet-roanne",
    locale: "fr_FR",
  },
};

export default function Roanne() {
  return <RoannePage />;
}

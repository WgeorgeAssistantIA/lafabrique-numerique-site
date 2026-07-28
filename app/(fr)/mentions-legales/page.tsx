import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Mentions légales — La Fabrik Numérique",
  robots: { index: false },
};

export default function MentionsLegales() {
  return <LegalPage docKey="mentions" />;
}

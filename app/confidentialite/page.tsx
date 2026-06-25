import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Politique de confidentialité — La Fabrik Numérique",
  robots: { index: false },
};

export default function Confidentialite() {
  return <LegalPage docKey="privacy" />;
}

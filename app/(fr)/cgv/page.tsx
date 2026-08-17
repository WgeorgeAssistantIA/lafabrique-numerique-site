import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Conditions Générales de Vente — La Fabrik Numérique",
  robots: { index: false },
};

export default function Cgv() {
  return <LegalPage docKey="cgv" />;
}

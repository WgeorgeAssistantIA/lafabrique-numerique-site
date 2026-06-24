"use client";

import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 fig-label">
        <span>© {new Date().getFullYear()} La Fabrik Numérique</span>
        <span>{t.footer.ref}</span>
      </div>
    </footer>
  );
}

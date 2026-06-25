"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 fig-label">
        <span>© {new Date().getFullYear()} La Fabrik Numérique</span>
        <nav className="flex items-center gap-6">
          <Link href="/mentions-legales" className="hover:text-cyan transition-colors">
            {t.footer.legal}
          </Link>
          <Link href="/confidentialite" className="hover:text-cyan transition-colors">
            {t.footer.privacy}
          </Link>
        </nav>
        <span>{t.footer.ref}</span>
      </div>
    </footer>
  );
}

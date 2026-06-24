"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import LangToggle from "./LangToggle";

export default function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "#services", label: t.nav.services },
    { href: "#competences", label: t.nav.competences },
    { href: "#realisations", label: t.nav.realisations },
    { href: "#tarifs", label: t.nav.tarifs },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line bg-background-deep/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/img/logo.png" alt="La Fabrik Numérique" width={32} height={32} />
          <span className="font-display text-sm tracking-widest uppercase">
            La Fabrik Numérique
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 fig-label">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-cyan transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href="#contact"
            className="hidden sm:inline fig-label border border-cyan text-cyan px-4 py-2 hover:bg-cyan hover:text-background-deep transition-colors"
          >
            {t.cta.quote}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`block h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-background-deep">
          <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-4 fig-label">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="hover:text-cyan transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="fig-label border border-cyan text-cyan px-4 py-3 text-center hover:bg-cyan hover:text-background-deep transition-colors"
            >
              {t.cta.quote}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

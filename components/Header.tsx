"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import LangToggle from "./LangToggle";

const SECTION_IDS = ["services", "competences", "realisations", "tarifs", "about", "contact"];

export default function Header() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const pathname = usePathname();
  const homePath = lang === "en" ? "/en" : "/";
  // Section anchors only work when already on the homepage — everywhere else
  // (blog, etc.) they need to link back to it first.
  const isHome = pathname === "/" || pathname === "/en";
  const withHome = (anchor: string) => (isHome ? anchor : `${homePath}${anchor}`);

  const navItems = [
    { href: withHome("#services"), label: t.nav.services, id: "services" },
    { href: withHome("#competences"), label: t.nav.competences, id: "competences" },
    { href: withHome("#realisations"), label: t.nav.realisations, id: "realisations" },
    { href: withHome("#tarifs"), label: t.nav.tarifs, id: "tarifs" },
    { href: withHome("#about"), label: t.nav.about, id: "about" },
    { href: lang === "en" ? "/en/blog" : "/blog", label: t.nav.blog, id: null },
    { href: withHome("#contact"), label: t.nav.contact, id: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-line bg-background-deep/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.7)]" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-4">
        <Link href={isHome ? "#top" : homePath} className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/img/logo.png"
            alt="La Fabrik Numérique"
            width={32}
            height={32}
            className="logo-spin"
            data-easter-egg="logo"
          />
          <span className="font-display text-sm tracking-widest uppercase">
            La Fabrik Numérique
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 fig-label nav-label">
          {navItems.map((item) => {
            const isActive = item.id !== null && activeId === item.id;
            const linkClass = `relative py-1 transition-colors ${
              isActive ? "nav-active text-cyan" : "hover:text-cyan"
            }`;
            return item.href.startsWith("#") ? (
              <a key={item.href} href={item.href} className={linkClass}>
                {item.label}
                <span className="nav-active-line" />
              </a>
            ) : (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
                <span className="nav-active-line" />
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle />
          {isHome ? (
            <a
              href="#contact"
              data-egg-anchor="true"
              className="hidden sm:inline fig-label border border-cyan text-cyan px-4 py-2 hover:bg-cyan hover:text-background-deep transition-colors"
            >
              {t.cta.quote}
            </a>
          ) : (
            <Link
              href={withHome("#contact")}
              className="hidden sm:inline fig-label border border-cyan text-cyan px-4 py-2 hover:bg-cyan hover:text-background-deep transition-colors"
            >
              {t.cta.quote}
            </Link>
          )}
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
          <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-4 fig-label nav-label">
            {navItems.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            {isHome ? (
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="fig-label border border-cyan text-cyan px-4 py-3 text-center hover:bg-cyan hover:text-background-deep transition-colors"
              >
                {t.cta.quote}
              </a>
            ) : (
              <Link
                href={withHome("#contact")}
                onClick={() => setOpen(false)}
                className="fig-label border border-cyan text-cyan px-4 py-3 text-center hover:bg-cyan hover:text-background-deep transition-colors"
              >
                {t.cta.quote}
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

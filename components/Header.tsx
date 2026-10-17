"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import LangToggle from "./LangToggle";

const SECTION_IDS = [
  "services",
  "realisations",
  "competences",
  "tarifs",
  "about",
  "contact",
];

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
  const withHome = (anchor: string) =>
    isHome ? anchor : `${homePath}${anchor}`;

  const navItems = [
    { href: withHome("#services"), label: t.nav.services, id: "services" },
    {
      href: withHome("#realisations"),
      label: t.nav.realisations,
      id: "realisations",
    },
    {
      href: withHome("#competences"),
      label: t.nav.competences,
      id: "competences",
    },
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
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-white/[0.08] bg-background-deep/85 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_1px_0_0_rgba(95,216,232,0.12)]"
          : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link
          href={isHome ? "#top" : homePath}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          onClick={() => setOpen(false)}
        >
          <div className="relative flex items-center justify-center rounded-full p-0.5 bg-gradient-to-br from-cyan/20 to-amber/10 ring-1 ring-white/10 group-hover:ring-cyan/40 transition-all shrink-0">
            <Image
              src="/img/logo.png"
              alt="La Fabrik Numérique"
              width={32}
              height={32}
              className="logo-spin"
              data-easter-egg="logo"
              draggable={false}
            />
          </div>
          <span className="font-display text-sm sm:text-base tracking-[0.1em] sm:tracking-[0.12em] uppercase text-foreground group-hover:text-cyan transition-colors whitespace-nowrap">
            La Fabrik Numérique
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 fig-label nav-label">
          {navItems.map((item) => {
            const isActive = item.id !== null && activeId === item.id;
            const linkClass = `relative py-1 transition-colors ${
              isActive
                ? "nav-active text-cyan"
                : "text-muted hover:text-foreground"
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
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-cyan/50 bg-cyan/10 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-cyan shadow-[0_0_20px_-6px_rgba(95,216,232,0.4)] hover:bg-cyan hover:text-background-deep hover:border-cyan transition-all"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
              {t.cta.quote}
            </a>
          ) : (
            <Link
              href={withHome("#contact")}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-cyan/50 bg-cyan/10 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-cyan shadow-[0_0_20px_-6px_rgba(95,216,232,0.4)] hover:bg-cyan hover:text-background-deep hover:border-cyan transition-all"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
              {t.cta.quote}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg border border-white/10 bg-panel/60"
          >
            <span
              className={`block h-px w-5 bg-foreground transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-foreground transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-white/10 bg-background-deep/95 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col gap-4 fig-label nav-label">
            {navItems.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan transition-colors py-1"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan transition-colors py-1"
                >
                  {item.label}
                </Link>
              ),
            )}
            {isHome ? (
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary text-center mt-2"
              >
                {t.cta.quote}
              </a>
            ) : (
              <Link
                href={withHome("#contact")}
                onClick={() => setOpen(false)}
                className="btn-primary text-center mt-2"
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

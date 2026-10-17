"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";

const SERVICE_ICONS: Record<string, ReactNode> = {
  "01": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" strokeLinecap="round" />
    </svg>
  ),
  "02": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  "03": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  "04": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  "05": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  "06": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  "07": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  "08": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

export default function Services() {
  const { t, lang } = useLanguage();
  const s = t.services;
  const isFr = lang === "fr";

  const families = isFr
    ? [
        {
          num: "01",
          tag: "Visibilité & Crédibilité",
          title: "Sites Web & Référencement",
          audience: "Pour artisans, indépendants, TPE & PME",
          desc: "Un site rapide, élégant et pensé pour convertir vos visiteurs en prises de contact. Vous êtes propriétaire à 100 % de votre site, sans abonnement caché.",
          points: [
            "Site vitrine sur mesure & responsive (mobile/tablette)",
            "Refonte complète de site vieillissant ou trop lent",
            "Référencement Google (SEO local) & fiche Google Business",
          ],
          accent: "cyan" as const,
          ctaLabel: "Voir les forfaits sites web",
          ctaHref: "#tarifs",
        },
        {
          num: "02",
          tag: "Produits & Plateformes",
          title: "Applications Web & SaaS",
          audience: "Pour porteurs de projet, startups & PME",
          desc: "Conception et développement d'applications web complètes : espace client, tableau de bord, outil métier accessible sur navigateur ou lancement de MVP.",
          points: [
            "Applications web React / Next.js rapides et évolutives",
            "Authentification, base de données & paiements en ligne",
            "Du prototype fonctionnel (MVP) au produit commercialisé",
          ],
          accent: "amber" as const,
          ctaLabel: "Découvrir les produits publiés",
          ctaHref: "#realisations",
        },
        {
          num: "03",
          tag: "Outils Métier & Gain de Temps",
          title: "Logiciels & Automatisation",
          audience: "Pour entreprises & besoins techniques spécifiques",
          desc: "Quand aucun outil du marché ne correspond à votre façon de travailler : création de logiciels desktop/mobile dédiés et automatisation de vos tâches répétitives.",
          points: [
            "Logiciels Windows / Mac & applications mobiles (iOS / Android)",
            "Automatisation de fichiers, PDF, audio/vidéo & intégration IA",
            "Maintenance, sécurité et évolutions sur le long terme",
          ],
          accent: "cyan" as const,
          ctaLabel: "Parler d'un besoin sur mesure",
          ctaHref: "#contact",
        },
      ]
    : [
        {
          num: "01",
          tag: "Visibility & Credibility",
          title: "Websites & Local SEO",
          audience: "For tradespeople, freelancers & small businesses",
          desc: "A fast, polished website designed to turn visitors into real inquiries. You own 100% of your site with transparent pricing.",
          points: [
            "Custom responsive showcase websites (mobile-first)",
            "Full redesign of outdated or slow websites",
            "Google SEO optimization & local visibility",
          ],
          accent: "cyan" as const,
          ctaLabel: "See website packages",
          ctaHref: "#tarifs",
        },
        {
          num: "02",
          tag: "Digital Products & Platforms",
          title: "Web Apps & SaaS",
          audience: "For founders, startups & growing teams",
          desc: "End-to-end design and development of custom web applications: client portals, dashboards, internal tools, and commercial MVPs.",
          points: [
            "Fast, scalable React / Next.js web applications",
            "Authentication, database architecture & Stripe billing",
            "From functional MVP to shipped commercial product",
          ],
          accent: "amber" as const,
          ctaLabel: "Explore shipped products",
          ctaHref: "#realisations",
        },
        {
          num: "03",
          tag: "Custom Tools & Efficiency",
          title: "Software & Automation",
          audience: "For businesses with specific technical workflows",
          desc: "When off-the-shelf software doesn't fit your workflow: custom desktop/mobile apps and tailored scripts that eliminate repetitive manual work.",
          points: [
            "Desktop software (Windows / Mac) & mobile apps (iOS / Android)",
            "Workflow automation, batch processing & AI integration",
            "Long-term maintenance, security & iterative upgrades",
          ],
          accent: "cyan" as const,
          ctaLabel: "Discuss a custom tool",
          ctaHref: "#contact",
        },
      ];

  return (
    <section id="services" className="relative py-28 border-b border-white/[0.08] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[760px] rounded-full bg-cyan/[0.04] blur-[130px] pointer-events-none"
      />
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="fig-label text-cyan mb-3">{s.figLabel}</p>
            <h2 className="font-display uppercase text-4xl sm:text-5xl">{s.title}</h2>
          </div>
          <p className="text-muted text-sm sm:text-base max-w-md leading-relaxed">
            {isFr
              ? "Un seul interlocuteur technique pour deux types de besoins : développer votre clientèle avec un site web irréprochable, ou construire un produit numérique sur mesure."
              : "A single technical partner for two distinct needs: growing your business with a standout website, or building a custom digital product."}
          </p>
        </div>

        {/* 3 Main Service Families */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {families.map((fam, idx) => {
            const isCyan = fam.accent === "cyan";
            return (
              <Reveal key={fam.num} delay={idx * 90} className="h-full">
                <div
                  className={`card-lift group relative rounded-2xl border p-7 h-full flex flex-col glass-panel ${
                    isCyan
                      ? "border-white/[0.09] hover:border-cyan/50"
                      : "border-amber/25 hover:border-amber/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span
                      className={`fig-label text-[0.65rem] px-3 py-1 rounded-full border ${
                        isCyan
                          ? "border-cyan/30 bg-cyan/10 text-cyan"
                          : "border-amber/30 bg-amber/10 text-amber"
                      }`}
                    >
                      {fam.tag}
                    </span>
                    <span className="font-display text-2xl text-white/20 group-hover:text-white/40 transition-colors">
                      {fam.num}
                    </span>
                  </div>

                  <h3 className="font-display uppercase text-2xl sm:text-3xl text-foreground mb-1.5">
                    {fam.title}
                  </h3>
                  <p className={`text-xs font-medium mb-4 ${isCyan ? "text-cyan/90" : "text-amber/90"}`}>
                    {fam.audience}
                  </p>

                  <p className="text-muted text-sm leading-relaxed mb-6">
                    {fam.desc}
                  </p>

                  <ul className="space-y-2.5 mb-7 flex-1 border-t border-white/[0.07] pt-5">
                    {fam.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                            isCyan ? "bg-cyan" : "bg-amber"
                          }`}
                        />
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={fam.ctaHref}
                    className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isCyan ? "text-cyan hover:text-amber" : "text-amber hover:text-cyan"
                    }`}
                  >
                    <span>{fam.ctaLabel}</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Detailed 8 Capabilities Strip */}
        <div className="pt-10 border-t border-white/[0.07]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-7">
            <p className="fig-label text-muted">
              {isFr ? "Toutes les briques d'intervention de l'atelier" : "All studio capabilities at a glance"}
            </p>
            <p className="text-xs text-muted">
              {isFr ? "Prestations à la carte ou projet clé en main" : "Standalone services or turnkey delivery"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {s.items.map((item, i) => {
              const isCyan = i % 2 === 0;
              return (
                <Reveal key={item.ref} delay={i * 50} className="h-full">
                  <div className="group rounded-xl border border-white/[0.07] bg-panel/60 p-4 h-full flex items-start gap-3.5 hover:border-white/20 transition-colors">
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isCyan
                          ? "border-cyan/25 bg-cyan/10 text-cyan"
                          : "border-amber/25 bg-amber/10 text-amber"
                      }`}
                    >
                      {SERVICE_ICONS[item.ref]}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display uppercase text-base text-foreground group-hover:text-cyan transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-muted text-xs leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

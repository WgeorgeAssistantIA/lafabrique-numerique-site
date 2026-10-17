"use client";

import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {families.map((fam, idx) => {
            const isCyan = fam.accent === "cyan";
            return (
              <Reveal key={fam.num} delay={idx * 70} className="h-full">
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
      </div>
    </section>
  );
}

"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = "https://www.lafabriknumerique.fr";

export default function RoiSimulatorPage() {
  const usersId = useId();
  const saasCostId = useId();
  const hoursLostId = useId();
  const devBudgetId = useId();

  // 4 Curseurs interactifs avec valeurs représentatives d'une PME / TPE
  const [usersCount, setUsersCount] = useState<number>(6);
  const [saasCostPerUser, setSaasCostPerUser] = useState<number>(35);
  const [hoursLostPerWeek, setHoursLostPerWeek] = useState<number>(8);
  const [devBudget, setDevBudget] = useState<number>(6500);

  // Taux horaire chargé moyen en PME
  const HOURLY_RATE = 35; // 35 € / heure chargée
  const WEEKS_PER_YEAR = 47; // 47 semaines ouvrées

  const calculations = useMemo(() => {
    // 1. Coût annuel des licences SaaS remplacées
    const annualSaasCost = usersCount * saasCostPerUser * 12;

    // 2. Coût annuel du temps perdu en ressaisie / copier-coller
    const annualLostTimeCost = hoursLostPerWeek * HOURLY_RATE * WEEKS_PER_YEAR;

    // 3. Coût annuel total supporté actuellement
    const totalAnnualCost = annualSaasCost + annualLostTimeCost;
    const monthlyCost = totalAnnualCost / 12;

    // 4. Délai d'amortissement en mois (Break-even point)
    const paybackMonths =
      monthlyCost > 0 ? Math.round((devBudget / monthlyCost) * 10) / 10 : 0;

    // 5. Gain net cumulé sur 3 ans
    const threeYearsSavings = totalAnnualCost * 3 - devBudget;

    // 6. Gain net cumulé sur 5 ans
    const fiveYearsSavings = totalAnnualCost * 5 - devBudget;

    return {
      annualSaasCost,
      annualLostTimeCost,
      totalAnnualCost,
      monthlyCost,
      paybackMonths,
      threeYearsSavings,
      fiveYearsSavings,
    };
  }, [usersCount, saasCostPerUser, hoursLostPerWeek, devBudget]);

  const faqItems = [
    {
      q: "Pourquoi un logiciel sur-mesure est-il souvent plus rentable qu'un abonnement SaaS ?",
      a: "Un abonnement SaaS facture chaque mois un coût par utilisateur qui augmente avec la taille de votre équipe, sans jamais vous appartenir. À cela s'ajoutent les limites fonctionnelles qui forcent vos collaborateurs à continuer de ressaisir des données dans Excel. Un logiciel sur-mesure est un actif de votre entreprise, payé une seule fois, sans redevance mensuelle par utilisateur.",
    },
    {
      q: "Comment est calculé le coût du temps perdu en ressaisie manuelle ?",
      a: "Nous prenons une base prudente de 35 € de l'heure chargée par collaborateur sur 47 semaines travaillées par an. Si une équipe de 6 personnes perd au total 8 heures par semaine en double saisie ou exports de fichiers, cela représente plus de 13 000 € de masse salariale absorbée chaque année par des tâches sans valeur ajoutée.",
    },
    {
      q: "Combien coûte réellement un logiciel sur-mesure pour une PME ?",
      a: "À La Fabrik Numérique, nos outils métiers et automatisations sur-mesure sont conçus pour aller droit au but sans bureaucratie : la majorité de nos projets se situent entre 3 500 € et 9 000 € clés en main, avec livraison opérationnelle en quelques semaines.",
    },
    {
      q: "Mes données restent-elles confidentielles dans ce simulateur ?",
      a: "Oui, à 100 %. Ce simulateur fonctionne intégralement dans votre navigateur web : aucune adresse email n'est demandée, et aucun chiffre saisi n'est transmis à nos serveurs.",
    },
  ];

  return (
    <>
      {/* Header Studio */}
      <header className="border-b border-white/[0.08] bg-background-deep/85 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center rounded-full p-0.5 bg-gradient-to-br from-cyan/20 to-amber/10 ring-1 ring-white/10">
              <Image
                src="/img/logo.png"
                alt="La Fabrik Numérique"
                width={32}
                height={32}
                draggable={false}
              />
            </div>
            <span className="font-display text-base tracking-[0.14em] uppercase text-foreground">
              La Fabrik Numérique
            </span>
          </Link>
          <Link
            href="/#contact"
            className="fig-label text-cyan hover:text-amber transition-colors text-xs uppercase tracking-wider"
          >
            Demander une étude →
          </Link>
        </div>
      </header>

      <main className="flex-1 circuit-bg py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 relative z-10">
          {/* Breadcrumb / Label */}
          <div className="flex items-center gap-2 fig-label text-cyan mb-4">
            <span>OUTIL ESTIMATION PME</span>
            <span>•</span>
            <span className="text-muted">100% GRATUIT SANS EMAIL</span>
          </div>

          {/* H1 */}
          <h1 className="font-display uppercase text-3xl sm:text-4xl md:text-5xl tracking-wide leading-tight text-foreground">
            Simulateur Rentabilité Logiciel Sur-Mesure vs Abonnements SaaS
          </h1>

          <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed max-w-3xl">
            Calculez en 30 secondes le seuil de rentabilité d&apos;un logiciel métier sur-mesure
            face à vos abonnements SaaS et au temps perdu en ressaisies manuelles Excel.
            Gratuit, immédiat, sans formulaire d&apos;email.
          </p>

          {/* SIMULATEUR GRID */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Colonne gauche : 4 Curseurs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-white/[0.08] glass-panel p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <h2 className="font-display uppercase text-xl text-foreground tracking-wide">
                    Paramètres de votre équipe
                  </h2>
                  <span className="fig-label text-amber text-xs">AJUSTABLE EN DIRECT</span>
                </div>

                {/* Curseur 1 : Utilisateurs */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label htmlFor={usersId} className="text-sm font-medium text-foreground">
                      Nombre d&apos;utilisateurs / collaborateurs
                    </label>
                    <span className="font-display text-xl text-cyan">
                      {usersCount} {usersCount > 1 ? "personnes" : "personne"}
                    </span>
                  </div>
                  <input
                    id={usersId}
                    type="range"
                    min="1"
                    max="60"
                    step="1"
                    value={usersCount}
                    onChange={(e) => setUsersCount(Number(e.target.value))}
                    className="w-full accent-[#5fd8e8] cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-muted/70 mt-1 fig-label">
                    <span>1 pers.</span>
                    <span>30 pers.</span>
                    <span>60 pers.</span>
                  </div>
                </div>

                {/* Curseur 2 : Coût SaaS / utilisateur */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label htmlFor={saasCostId} className="text-sm font-medium text-foreground">
                      Abonnements SaaS actuels par utilisateur
                    </label>
                    <span className="font-display text-xl text-cyan">
                      {saasCostPerUser} € / mois
                    </span>
                  </div>
                  <input
                    id={saasCostId}
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={saasCostPerUser}
                    onChange={(e) => setSaasCostPerUser(Number(e.target.value))}
                    className="w-full accent-[#5fd8e8] cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-muted/70 mt-1 fig-label">
                    <span>10 €/mois</span>
                    <span>75 €/mois</span>
                    <span>150 €/mois</span>
                  </div>
                </div>

                {/* Curseur 3 : Heures perdues en ressaisie */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label htmlFor={hoursLostId} className="text-sm font-medium text-foreground">
                      Temps perdu en ressaisies Excel (équipe totale)
                    </label>
                    <span className="font-display text-xl text-amber">
                      {hoursLostPerWeek} h / semaine
                    </span>
                  </div>
                  <input
                    id={hoursLostId}
                    type="range"
                    min="1"
                    max="35"
                    step="1"
                    value={hoursLostPerWeek}
                    onChange={(e) => setHoursLostPerWeek(Number(e.target.value))}
                    className="w-full accent-[#e8a14f] cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-muted/70 mt-1 fig-label">
                    <span>1 h/sem.</span>
                    <span>15 h/sem.</span>
                    <span>35 h/sem.</span>
                  </div>
                  <p className="text-xs text-muted/80 mt-2">
                    Basé sur un coût horaire moyen chargé de 35 €/h pour les doubles saisies et copier-coller.
                  </p>
                </div>

                {/* Curseur 4 : Budget dev sur-mesure */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label htmlFor={devBudgetId} className="text-sm font-medium text-foreground">
                      Budget indicatif de développement sur-mesure
                    </label>
                    <span className="font-display text-xl text-cyan">
                      {devBudget.toLocaleString()} €
                    </span>
                  </div>
                  <input
                    id={devBudgetId}
                    type="range"
                    min="3000"
                    max="20000"
                    step="500"
                    value={devBudget}
                    onChange={(e) => setDevBudget(Number(e.target.value))}
                    className="w-full accent-[#5fd8e8] cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-muted/70 mt-1 fig-label">
                    <span>3 000 € (outil simple)</span>
                    <span>10 000 €</span>
                    <span>20 000 € (ERP complet)</span>
                  </div>
                </div>
              </div>

              {/* Encadré explicatif méthodologie */}
              <div className="p-5 rounded-xl border border-white/[0.06] bg-panel/40 text-xs text-muted leading-relaxed">
                <span className="text-cyan font-semibold">Méthodologie transparente :</span> Le calcul compare le
                coût récurrent de vos abonnements SaaS cumulé aux heures passées à compenser leurs manques (ressaisie
                manuelle, erreurs de transfert), face à un investissement forfaitaire unique en logiciel sur-mesure.
              </div>
            </div>

            {/* Colonne droite : Résultats & Verdict ROI */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-cyan/40 bg-gradient-to-b from-cyan/[0.08] via-panel to-background-deep p-6 sm:p-8 shadow-[0_0_50px_-20px_rgba(95,216,232,0.25)] space-y-6">
                <div className="border-b border-white/[0.08] pb-4">
                  <span className="fig-label text-cyan text-xs">BILAN FINANCIER ESTIMÉ</span>
                  <div className="mt-2 font-display text-4xl sm:text-5xl text-foreground">
                    {calculations.paybackMonths <= 12 ? (
                      <span className="text-cyan">
                        {calculations.paybackMonths} mois
                      </span>
                    ) : (
                      <span className="text-amber">
                        {calculations.paybackMonths} mois
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-1">
                    Délai d&apos;amortissement complet de votre logiciel sur-mesure (Break-Even).
                  </p>
                </div>

                {/* Métriques détaillées */}
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                    <span className="text-muted">Coût annuel SaaS actuel</span>
                    <span className="font-mono text-foreground font-semibold">
                      {calculations.annualSaasCost.toLocaleString()} € / an
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                    <span className="text-muted">Coût annuel temps perdu</span>
                    <span className="font-mono text-amber font-semibold">
                      {calculations.annualLostTimeCost.toLocaleString()} € / an
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-white/[0.08]">
                    <span className="text-foreground font-medium">Coût caché total actuel</span>
                    <span className="font-mono text-cyan font-bold text-base">
                      {calculations.totalAnnualCost.toLocaleString()} € / an
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs uppercase fig-label text-muted">Gain net sur 3 ans</span>
                      <span className="font-display text-2xl text-cyan">
                        +{calculations.threeYearsSavings.toLocaleString()} €
                      </span>
                    </div>
                    <p className="text-[11px] text-muted/80 mt-0.5">
                      Après déduction intégrale du coût de développement initial.
                    </p>
                  </div>
                </div>

                {/* Bouton CTA */}
                <div className="pt-4">
                  <Link
                    href={`/#contact`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-cyan/85 text-background font-semibold px-6 py-3.5 text-sm transition hover:opacity-95 shadow-lg shadow-cyan/25"
                  >
                    <span>Échanger sur votre projet</span>
                    <span>→</span>
                  </Link>
                  <p className="text-[11px] text-center text-muted/70 mt-2 fig-label">
                    Premier échange gratuit de 30 min sans engagement
                  </p>
                </div>
              </div>

              {/* Engagement Studio */}
              <div className="rounded-xl border border-white/[0.08] glass-panel p-5 space-y-2 text-xs text-muted">
                <div className="font-display uppercase text-sm text-foreground tracking-wide">
                  Pourquoi travailler avec La Fabrik Numérique ?
                </div>
                <p>
                  • Code source fourni sans abonnement captif.
                  <br />
                  • Interface pensée pour vos utilisateurs réels, pas pour des consultants.
                  <br />
                  • Studio indépendant basé à Roanne, interlocuteur unique dédié.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION FAQ */}
          <section className="mt-20 border-t border-white/[0.08] pt-16">
            <h2 className="font-display uppercase text-2xl sm:text-3xl tracking-wide text-foreground mb-8">
              Questions Fréquentes sur la Rentabilité d&apos;un Logiciel Sur-Mesure
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {faqItems.map((item, i) => (
                <div key={i} className="rounded-xl border border-white/[0.08] glass-panel p-6 space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.q}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* RETOUR ACCUEIL */}
          <div className="mt-14 border-t border-white/[0.08] pt-8">
            <Link
              href="/"
              className="fig-label text-cyan hover:text-amber transition-colors text-xs"
            >
              ← Retour à l&apos;accueil La Fabrik Numérique
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

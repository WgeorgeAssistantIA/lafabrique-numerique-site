"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

const fr = {
  metaTitle: "La Fabrik Numérique — Atelier de création web & logiciel",
  metaDesc:
    "La Fabrik Numérique conçoit des sites web, applications et logiciels sur mesure. Circuits & idées.",
  nav: {
    services: "Services",
    competences: "Compétences",
    realisations: "Réalisations",
    tarifs: "Tarifs",
    about: "Atelier",
    contact: "Contact",
  },
  cta: { quote: "Demander un devis" },
  hero: {
    figLabel: "FIG. 01 — ATELIER DE CRÉATION NUMÉRIQUE",
    titleA: "On dessine vos",
    titleHighlight: "circuits",
    titleB: "numériques.",
    desc: "La Fabrik Numérique conçoit et développe sites web, applications et logiciels sur mesure — pensés comme des systèmes précis, robustes et faits pour durer.",
    seeWork: "Voir les réalisations",
    rating: "Atelier indépendant, sur devis",
  },
  services: {
    figLabel: "FIG. 02 — SERVICES",
    title: "Ce que l'on construit",
    items: [
      { ref: "01", title: "Création de sites web", desc: "Sites vitrines, e-commerce et plateformes sur mesure, conçus de zéro." },
      { ref: "02", title: "Applications web", desc: "Outils métier, dashboards et SaaS adaptés à vos process." },
      { ref: "03", title: "Développement logiciel", desc: "Logiciels sur mesure, scripts d'automatisation, intégrations API." },
      { ref: "04", title: "Gestion de projets web", desc: "Cadrage, planning et pilotage de bout en bout de votre projet." },
      { ref: "05", title: "Intégration web", desc: "Intégration HTML/CSS pixel-perfect à partir de vos maquettes." },
      { ref: "06", title: "Responsive design", desc: "Des interfaces fluides sur mobile, tablette et desktop." },
      { ref: "07", title: "Maintenance & évolutions", desc: "Suivi, corrections et nouvelles fonctionnalités dans la durée." },
      { ref: "08", title: "Référencement SEO", desc: "Structure technique et contenu pensés pour être bien indexés." },
    ],
  },
  skills: {
    figLabel: "FIG. 03 — COMPÉTENCES",
    title: "L'atelier maîtrise",
    dev: "Développement",
    design: "Design",
    devItems: ["JavaScript / TypeScript", "React / Next.js", "Node.js", "PHP", "MySQL / PostgreSQL"],
    designItems: ["Figma", "Photoshop", "Illustrator", "Design system", "Direction artistique"],
  },
  portfolio: {
    figLabel: "FIG. 04 — RÉALISATIONS",
    title: "Projets en circuit",
    items: [
      {
        ref: "REF.01",
        title: "VoxCut",
        type: "Logiciel desktop · App Windows",
        desc: "Application qui détecte et supprime automatiquement les silences des podcasts, interviews et vidéos. 100 % local, export XML/EDL vers Premiere Pro & DaVinci Resolve, traitement par lot, fichiers jusqu'à 5 Go.",
        tags: ["React", "Vite", "Traitement audio", "Product Hunt"],
        link: "https://www.producthunt.com/products/voxcut",
        linkLabel: "Voir sur Product Hunt",
      },
      {
        ref: "REF.02",
        title: "PlombIA",
        type: "Assistant IA · PWA",
        desc: "Assistant conversationnel pour artisans : capture de demandes 24/7, génération de devis, prise de rendez-vous multi-agendas, voix IA et tableau de bord CRM. Pensé pour ne plus jamais rater un client.",
        tags: ["Next.js", "Claude API", "Supabase", "Resend"],
        link: "",
        linkLabel: "",
      },
      {
        ref: "REF.03",
        title: "La Fabrik Numérique",
        type: "Site vitrine bilingue",
        desc: "Ce site — direction artistique « Circuit Topographie », bilingue FR/EN avec détection automatique de la langue du visiteur et basculement instantané.",
        tags: ["Next.js", "Tailwind CSS", "i18n"],
        link: "",
        linkLabel: "",
      },
    ],
  },
  pricing: {
    figLabel: "FIG. 05 — TARIFS",
    title: "Investissement",
    plans: [
      { name: "Site standard", price: "à partir de 1 299 €", highlight: false, features: ["Site vitrine 5 pages", "Design sur mesure", "Responsive", "Mise en ligne incluse"] },
      { name: "Application web", price: "sur devis", highlight: true, features: ["Cahier des charges", "Développement sur mesure", "Base de données", "Hébergement & suivi"] },
      { name: "Logiciel métier", price: "sur devis", highlight: false, features: ["Étude des besoins", "Architecture dédiée", "Intégrations API", "Formation à l'usage"] },
      { name: "Accompagnement", price: "500 € / jour", highlight: false, features: ["Développement à la demande", "Maintenance évolutive", "Audit technique", "Support continu"] },
    ],
  },
  about: {
    figLabel: "FIG. 06 — L'ATELIER",
    title: "Circuits & idées",
    p1: "La Fabrik Numérique traite chaque projet comme un circuit à concevoir : des lignes claires, des nœuds de décision pensés avec rigueur, et rien qui ne soit là par hasard.",
    p2: "Indépendant, je travaille en lien direct avec vous, du cahier des charges à la mise en ligne, avec un objectif simple : des outils numériques solides, qui vous servent dans la durée.",
  },
  contact: {
    figLabel: "FIG. 07 — CONTACT",
    title: "Lancer un projet",
    desc: "Décrivez votre projet, je reviens vers vous avec une proposition chiffrée et un premier diagnostic.",
    name: "Nom",
    email: "Email",
    message: "Votre projet",
  },
  footer: { ref: "REF. LFN-2026" },
};

export type Translation = typeof fr;

const en: Translation = {
  metaTitle: "La Fabrik Numérique — Web & software creation studio",
  metaDesc:
    "La Fabrik Numérique designs custom websites, applications and software. Circuits & ideas.",
  nav: {
    services: "Services",
    competences: "Skills",
    realisations: "Work",
    tarifs: "Pricing",
    about: "Studio",
    contact: "Contact",
  },
  cta: { quote: "Get a quote" },
  hero: {
    figLabel: "FIG. 01 — DIGITAL CREATION STUDIO",
    titleA: "We sketch your",
    titleHighlight: "circuits",
    titleB: "digitally.",
    desc: "La Fabrik Numérique designs and builds custom websites, applications and software — engineered like precise, robust systems made to last.",
    seeWork: "See the work",
    rating: "Independent studio, by quote",
  },
  services: {
    figLabel: "FIG. 02 — SERVICES",
    title: "What we build",
    items: [
      { ref: "01", title: "Website creation", desc: "Showcase sites, e-commerce and custom platforms, built from scratch." },
      { ref: "02", title: "Web applications", desc: "Business tools, dashboards and SaaS tailored to your process." },
      { ref: "03", title: "Software development", desc: "Custom software, automation scripts, API integrations." },
      { ref: "04", title: "Web project management", desc: "Scoping, planning and end-to-end delivery of your project." },
      { ref: "05", title: "Web integration", desc: "Pixel-perfect HTML/CSS integration from your designs." },
      { ref: "06", title: "Responsive design", desc: "Fluid interfaces across mobile, tablet and desktop." },
      { ref: "07", title: "Maintenance & evolutions", desc: "Ongoing fixes and new features over time." },
      { ref: "08", title: "SEO", desc: "Technical structure and content built to rank well." },
    ],
  },
  skills: {
    figLabel: "FIG. 03 — SKILLS",
    title: "The studio masters",
    dev: "Development",
    design: "Design",
    devItems: ["JavaScript / TypeScript", "React / Next.js", "Node.js", "PHP", "MySQL / PostgreSQL"],
    designItems: ["Figma", "Photoshop", "Illustrator", "Design system", "Art direction"],
  },
  portfolio: {
    figLabel: "FIG. 04 — WORK",
    title: "Projects in the loop",
    items: [
      {
        ref: "REF.01",
        title: "VoxCut",
        type: "Desktop software · Windows app",
        desc: "App that automatically detects and removes silences from podcasts, interviews and videos. 100% local, XML/EDL export to Premiere Pro & DaVinci Resolve, batch processing, files up to 5 GB.",
        tags: ["React", "Vite", "Audio processing", "Product Hunt"],
        link: "https://www.producthunt.com/products/voxcut",
        linkLabel: "View on Product Hunt",
      },
      {
        ref: "REF.02",
        title: "PlombIA",
        type: "AI assistant · PWA",
        desc: "Conversational assistant for tradespeople: 24/7 request capture, quote generation, multi-calendar booking, AI voice and a CRM dashboard. Built so you never miss a customer again.",
        tags: ["Next.js", "Claude API", "Supabase", "Resend"],
        link: "",
        linkLabel: "",
      },
      {
        ref: "REF.03",
        title: "La Fabrik Numérique",
        type: "Bilingual showcase site",
        desc: "This very site — \"Circuit Topographie\" art direction, bilingual FR/EN with automatic visitor-language detection and instant switching.",
        tags: ["Next.js", "Tailwind CSS", "i18n"],
        link: "",
        linkLabel: "",
      },
    ],
  },
  pricing: {
    figLabel: "FIG. 05 — PRICING",
    title: "Investment",
    plans: [
      { name: "Standard site", price: "from €1,299", highlight: false, features: ["5-page showcase site", "Custom design", "Responsive", "Launch included"] },
      { name: "Web application", price: "by quote", highlight: true, features: ["Requirements scoping", "Custom development", "Database", "Hosting & support"] },
      { name: "Business software", price: "by quote", highlight: false, features: ["Needs assessment", "Dedicated architecture", "API integrations", "Usage training"] },
      { name: "Ongoing support", price: "€500 / day", highlight: false, features: ["On-demand development", "Evolutive maintenance", "Technical audit", "Continuous support"] },
    ],
  },
  about: {
    figLabel: "FIG. 06 — THE STUDIO",
    title: "Circuits & ideas",
    p1: "La Fabrik Numérique treats every project like a circuit to design: clear lines, decision nodes thought through with rigor, nothing left to chance.",
    p2: "Independent, I work directly with you, from the brief to launch, with one goal: solid digital tools that serve you over time.",
  },
  contact: {
    figLabel: "FIG. 07 — CONTACT",
    title: "Start a project",
    desc: "Describe your project, I'll get back to you with a priced proposal and an initial diagnosis.",
    name: "Name",
    email: "Email",
    message: "Your project",
  },
  footer: { ref: "REF. LFN-2026" },
};

export const translations: Record<Lang, Translation> = { fr, en };

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("lfn-lang") as Lang | null;
    if (saved === "fr" || saved === "en") {
      setLangState(saved);
    } else {
      const browserLang = navigator.language?.toLowerCase() ?? "";
      if (!browserLang.startsWith("fr")) setLangState("en");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", translations[lang].metaDesc);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lfn-lang", l);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

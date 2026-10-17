export type Lang = "fr" | "en";

const fr = {
  metaTitle: "La Fabrik Numérique — Atelier de création web & logiciel",
  metaDesc:
    "Atelier de développement web et logiciel sur mesure basé à Roanne. Création de sites vitrines, applications web et SaaS performants. Devis sous 24h.",
  nav: {
    services: "Services",
    competences: "Compétences",
    realisations: "Réalisations",
    tarifs: "Tarifs",
    about: "Atelier",
    blog: "Blog",
    contact: "Contact",
  },
  cta: { quote: "Demander un devis" },
  hero: {
    figLabel: "FIG. 01 — ATELIER DE CRÉATION NUMÉRIQUE",
    titleA: "On dessine vos",
    titleHighlight: "circuits",
    titleB: "numériques.",
    desc: "La Fabrik Numérique conçoit et développe sites web, applications et logiciels sur mesure — pensés comme des systèmes précis, robustes et faits pour durer.",
    tagline: "De l'idée au produit publié, un seul interlocuteur.",
    seeWork: "Voir les réalisations",
    rating:
      "VoxCut, InOneShot & VectorPop — publiés sur le Microsoft Store, Google Play et Snapcraft",
  },
  services: {
    figLabel: "NOS SERVICES & DOMAINES D'INTERVENTION",
    title: "Ce que l'on construit",
    items: [
      {
        ref: "01",
        title: "Création de sites web",
        desc: "Sites vitrines, e-commerce et plateformes sur mesure, conçus de zéro.",
      },
      {
        ref: "02",
        title: "Applications web",
        desc: "Outils métier, dashboards et SaaS adaptés à vos process.",
      },
      {
        ref: "03",
        title: "Développement logiciel",
        desc: "Logiciels sur mesure, scripts d'automatisation, intégrations API.",
      },
      {
        ref: "04",
        title: "Gestion de projets web",
        desc: "Cadrage, planning et pilotage de bout en bout de votre projet.",
      },
      {
        ref: "05",
        title: "Intégration web",
        desc: "Intégration HTML/CSS pixel-perfect à partir de vos maquettes.",
      },
      {
        ref: "06",
        title: "Responsive design",
        desc: "Des interfaces fluides sur mobile, tablette et desktop.",
      },
      {
        ref: "07",
        title: "Maintenance & évolutions",
        desc: "Suivi, corrections et nouvelles fonctionnalités dans la durée.",
      },
      {
        ref: "08",
        title: "Référencement SEO",
        desc: "Structure technique et contenu pensés pour être bien indexés.",
      },
    ],
  },
  skills: {
    figLabel: "SAVOIR-FAIRE & MÉTHODE DE TRAVAIL",
    title: "L'atelier maîtrise",
    dev: "Développement",
    design: "Design",
    devItems: [
      "JavaScript / TypeScript",
      "React / Next.js",
      "Node.js",
      "PHP",
      "MySQL / PostgreSQL",
    ],
    designItems: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Design system",
      "Direction artistique",
    ],
  },
  portfolio: {
    figLabel: "RÉALISATIONS & PRODUITS PUBLIÉS",
    title: "Des projets réels, conçus et mis en ligne",
    intro:
      "Contrairement à une agence classique, La Fabrik Numérique édite aussi ses propres logiciels et plateformes web — publiés sur le Microsoft Store, Google Play et Snapcraft.",
    items: [
      {
        ref: "Logiciel & Mobile",
        title: "VoxCut",
        type: "Montage audio & vidéo automatique · Windows, Android & Linux",
        desc: "Application qui détecte et supprime automatiquement les silences des podcasts, interviews et vidéos. Traitement 100 % local, export XML/EDL vers Premiere Pro & DaVinci Resolve, fichiers jusqu'à 5 Go.",
        result:
          "Publié sur Microsoft Store, Google Play et Snapcraft · Recommandé par TrishTech & Softpedia.",
        tags: ["React", "Traitement audio", "Desktop & Mobile"],
        link: "https://voxcutpro.com",
        linkLabel: "voxcutpro.com",
        stores: [
          {
            label: "Microsoft Store",
            url: "https://apps.microsoft.com/detail/9NP0N8W3DG5C",
          },
          {
            label: "Google Play",
            url: "https://play.google.com/store/apps/details?id=fr.voxcut.voxcut_android",
          },
          { label: "Snapcraft", url: "https://snapcraft.io/voxcut" },
        ],
        press: [
          {
            label: "TrishTech",
            url: "https://www.trishtech.com/2026/09/voxcut-the-local-app-that-cuts-silence-from-audio-fast/",
          },
          {
            label: "Softpedia",
            url: "https://www.softpedia.com/get/Multimedia/Audio-Editors-Recorders/VoxCut.shtml",
          },
        ],
        image: "/img/portfolio-voxcut.webp",
      },
      {
        ref: "Web & SaaS Artisans",
        title: "VotreAssistantIA",
        type: "Plateforme web & Assistant IA · Artisans & TPE",
        desc: "Solution web pensée pour les artisans et indépendants : déploiement d'un assistant IA personnalisé sur WhatsApp et Telegram pour répondre aux clients 24h/24, qualifier les demandes et résumer les échanges.",
        result:
          "Déploiement clé en main en moins de 5 min · Agents IA sur WhatsApp & Telegram · Hébergement souverain en Europe.",
        tags: ["Site & App Web", "Next.js", "Assistant IA"],
        link: "https://votreassistantia.fr",
        linkLabel: "votreassistantia.fr",
        stores: [],
        image: "/img/portfolio-vaia.webp",
      },
      {
        ref: "Automatisation Métier",
        title: "InOneShot",
        type: "Génération automatique de PDF · Windows, Android & Linux",
        desc: "Outil de publipostage PDF : à partir d'un modèle PDF et d'un fichier Excel, placez vos champs (textes, dates, signatures, QR codes) par glisser-déposer et générez des centaines de documents en un clic.",
        result:
          "#1 Produit du jour sur Fazier · Publié sur Microsoft Store, Google Play et Snapcraft.",
        tags: ["Automatisation", "PDF & Excel", "Desktop & Mobile"],
        link: "https://inoneshot.fr",
        linkLabel: "inoneshot.fr",
        stores: [
          {
            label: "Microsoft Store",
            url: "https://apps.microsoft.com/detail/9PPBQSM1MFZ2",
          },
          {
            label: "Google Play",
            url: "https://play.google.com/store/apps/details?id=com.lafabriknumerique.inoneshot_android",
          },
          { label: "Snapcraft", url: "https://snapcraft.io/inoneshot" },
        ],
        image: "/img/portfolio-inoneshot.webp",
      },
      {
        ref: "Outil Graphique",
        title: "VectorPop",
        type: "Vectorisation d'images & logos · Windows, Android & Linux",
        desc: "Convertisseur d'images en vecteur : transforme un logo PNG ou JPEG pixellisé en fichier SVG net et redimensionnable à l'infini, directement en local sans abonnement.",
        result:
          "Publié sur Microsoft Store, Google Play et Snapcraft — licence unique, 100 % local.",
        tags: ["Graphisme", "Vectorisation SVG", "Desktop & Mobile"],
        link: "https://vectorpop.fr",
        linkLabel: "vectorpop.fr",
        stores: [
          {
            label: "Microsoft Store",
            url: "https://apps.microsoft.com/detail/9MT2XVDXX7DG",
          },
          {
            label: "Google Play",
            url: "https://play.google.com/store/apps/details?id=com.lafabriknumerique.vectorpop",
          },
          { label: "Snapcraft", url: "https://snapcraft.io/vectorpop" },
        ],
        image: "/img/portfolio-vectorpop.webp",
      },
      {
        ref: "Diagnostic Système",
        title: "Nyctale",
        type: "Logiciel de diagnostic PC · Windows 10/11",
        desc: "Analyse un ordinateur et explique en langage clair pourquoi il chauffe ou ralentit, avec édition de rapports PDF avant/après pour les techniciens de maintenance.",
        result:
          "Diagnostic 100 % local, version gratuite illimitée et palier Pro pour réparateurs.",
        tags: ["Logiciel Windows", "Diagnostic", "Export PDF"],
        link: "https://nyctale.fr",
        linkLabel: "nyctale.fr",
        stores: [],
        image: "/img/portfolio-nyctale.webp",
      },
      {
        ref: "Application Web IA",
        title: "VidScope",
        type: "Synthèse vidéo & veille structurée · Application Web",
        desc: "Transforme de longues vidéos techniques YouTube en rapports PDF structurés avec points clés et liens officiels, pour faire sa veille en 5 minutes.",
        result:
          "Produit du jour sur Fazier · Application web complète avec génération PDF.",
        tags: ["Application Web", "Next.js", "Synthèse IA"],
        link: "https://www.vidscope.fr",
        linkLabel: "vidscope.fr",
        stores: [],
        image: "/img/portfolio-vidscope.webp",
      },
      {
        ref: "Contrôle Qualité SVG",
        title: "VectoFix",
        type: "Réparation vectorielle pour découpe laser & impression",
        desc: "Outil spécialisé qui détecte et corrige par zone les défauts d'un fichier SVG avant envoi en découpe laser, broderie ou impression grand format.",
        result:
          "Publié sur le Microsoft Store et disponible sur vectorpop.fr/vectofix.",
        tags: ["Industrie & Craft", "SVG", "Logiciel"],
        link: "https://vectorpop.fr/vectofix",
        linkLabel: "vectorpop.fr/vectofix",
        stores: [],
        image: "/img/portfolio-vectofix.webp",
      },
    ],
  },
  pricing: {
    figLabel: "TARIFS & INVESTISSEMENT",
    title: "Des offres claires, sans mauvaise surprise",
    launchBadge: "",
    launchNote: "",
    scopeNote:
      "Chaque projet fait l'objet d'un devis détaillé et gratuit sous 24 h après un premier échange sur votre besoin.",
    plans: [
      {
        name: "Site One-Page / Essentiel",
        price: "à partir de 590\u00A0€",
        originalPrice: "",
        highlight: false,
        scope:
          "Un site professionnel sur une page unique pour présenter votre activité, rassurer vos clients et recevoir des demandes de devis.",
        features: [
          "Présentation claire de vos services et réalisations",
          "Design moderne adapté aux téléphones et ordinateurs",
          "Formulaire de contact direct vers votre boîte mail",
          "Optimisation pour apparaître sur Google",
          "Mise en ligne clé en main incluse",
        ],
      },
      {
        name: "Site vitrine multi-pages",
        price: "à partir de 790\u00A0€",
        originalPrice: "",
        highlight: true,
        scope:
          "Un site complet jusqu'à 5 pages pensé pour positionner durablement votre entreprise sur Google et convertir vos visiteurs.",
        features: [
          "Jusqu'à 5 pages sur mesure (Accueil, Services, Réalisations…)",
          "Référencement naturel (SEO local & métier) approfondi",
          "Design haut de gamme & chargement ultra-rapide",
          "Intégration de vos avis clients, photos et garanties",
          "Mise en ligne, sécurisation HTTPS & indexation Google",
        ],
        note: "Nom de domaine et hébergement à votre nom (env. 15 à 50 € / an).",
      },
      {
        name: "Application web & SaaS",
        price: "à partir de 1\u00A0690\u00A0€",
        originalPrice: "",
        highlight: false,
        scope:
          "Une plateforme web interactive sur mesure avec comptes utilisateurs, base de données ou tableau de bord métier.",
        features: [
          "Cadrage fonctionnel & architecture sur mesure",
          "Espace client sécurisé & gestion des données",
          "Interface métier fluide, paiement en ligne ou IA",
          "Déploiement cloud sécurisé & accompagnement",
        ],
      },
      {
        name: "Logiciel & Automatisation",
        price: "à partir de 2\u00A0690\u00A0€",
        originalPrice: "",
        highlight: false,
        scope:
          "Un logiciel dédié ou un outil d'automatisation pour gagner des heures chaque semaine sur vos tâches répétitives.",
        features: [
          "Logiciel sur mesure (sans abonnement mensuel imposé)",
          "Automatisation de documents (PDF, Excel, emails, API)",
          "Fonctionnement 100 % local ou connecté à vos outils",
          "Formation, documentation & prise en main",
        ],
        note: "Pour un projet sur mesure spécifique, un chiffrage précis est établi après un premier échange.",
      },
    ],
  },
  about: {
    figLabel: "L'ATELIER & LE FONDATEUR",
    title: "La rigueur d'un ingénieur, le soin d'un artisan",
    p1: "La Fabrik Numérique est un studio indépendant basé à Roanne (Loire). J'accompagne aussi bien les artisans, commerçants et PME qui veulent un site internet crédible et rentable, que les porteurs de projets qui souhaitent développer une application web ou un logiciel sur mesure.",
    p2: "Pas de commercial intermédiaire ni de jargon inutile : vous échangez directement avec celui qui conçoit et développe votre projet, du premier croquis jusqu'à la mise en ligne.",
    why: [
      {
        ref: "01",
        title: "Éditeur de vrais produits numériques",
        desc: "Je conçois et commercialise mes propres logiciels (VoxCut, InOneShot, VectorPop…), publiés sur Microsoft Store et Google Play. Votre projet bénéficie de cette même exigence.",
      },
      {
        ref: "02",
        title: "Un seul interlocuteur de A à Z",
        desc: "Du premier échange à la mise en ligne, vous parlez directement à celui qui conçoit et construit votre outil.",
      },
      {
        ref: "03",
        title: "100 % sur-mesure, zéro thème générique",
        desc: "Chaque site et chaque logiciel est pensé spécifiquement pour vos clients, votre image et votre façon de travailler.",
      },
      {
        ref: "04",
        title: "Fiable, rapide et fait pour durer",
        desc: "Une architecture propre et performante qui vous appartient, facile à faire évoluer au fil de votre activité.",
      },
    ],
  },
  contact: {
    figLabel: "DÉMARRER UN PROJET",
    title: "Lancer un projet",
    desc: "Décrivez votre projet, je reviens vers vous avec une proposition chiffrée et un premier diagnostic.",
    name: "Nom",
    email: "Email",
    message: "Votre projet",
    emailAddress: "contact@lafabriknumerique.fr",
    responseTime: "Réponse sous 24 h ouvrées.",
    sending: "Envoi en cours…",
    success: "Message bien reçu — je reviens vers vous sous 24 h ouvrées.",
    error: "L'envoi a échoué. Écrivez-moi directement :",
    consentA: "J'accepte la",
    consentLink: "politique de confidentialité",
    consentB: ".",
  },
  footer: {
    ref: "REF. LFN-2026",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    cgv: "CGV",
  },
};

export type Translation = typeof fr;

const en: Translation = {
  metaTitle: "La Fabrik Numérique — Web & software creation studio",
  metaDesc:
    "Bespoke web and software engineering studio. We build high-performance showcase websites, web applications, and custom SaaS tools. Get a quote in 24h.",
  nav: {
    services: "Services",
    competences: "Skills",
    realisations: "Work",
    tarifs: "Pricing",
    about: "Studio",
    blog: "Blog",
    contact: "Contact",
  },
  cta: { quote: "Get a quote" },
  hero: {
    figLabel: "FIG. 01 — DIGITAL CREATION STUDIO",
    titleA: "We sketch your",
    titleHighlight: "circuits",
    titleB: "digitally.",
    desc: "La Fabrik Numérique designs and builds custom websites, applications and software — engineered like precise, robust systems made to last.",
    tagline: "From idea to published product, one point of contact.",
    seeWork: "See the work",
    rating:
      "VoxCut, InOneShot & VectorPop — published on the Microsoft Store, Google Play and Snapcraft",
  },
  services: {
    figLabel: "SERVICES & EXPERTISE",
    title: "What we build",
    items: [
      {
        ref: "01",
        title: "Website creation",
        desc: "Showcase sites, e-commerce and custom platforms, built from scratch.",
      },
      {
        ref: "02",
        title: "Web applications",
        desc: "Business tools, dashboards and SaaS tailored to your process.",
      },
      {
        ref: "03",
        title: "Software development",
        desc: "Custom software, automation scripts, API integrations.",
      },
      {
        ref: "04",
        title: "Web project management",
        desc: "Scoping, planning and end-to-end delivery of your project.",
      },
      {
        ref: "05",
        title: "Web integration",
        desc: "Pixel-perfect HTML/CSS integration from your designs.",
      },
      {
        ref: "06",
        title: "Responsive design",
        desc: "Fluid interfaces across mobile, tablet and desktop.",
      },
      {
        ref: "07",
        title: "Maintenance & evolutions",
        desc: "Ongoing fixes and new features over time.",
      },
      {
        ref: "08",
        title: "SEO",
        desc: "Technical structure and content built to rank well.",
      },
    ],
  },
  skills: {
    figLabel: "EXPERTISE & PROCESS",
    title: "The studio masters",
    dev: "Development",
    design: "Design",
    devItems: [
      "JavaScript / TypeScript",
      "React / Next.js",
      "Node.js",
      "PHP",
      "MySQL / PostgreSQL",
    ],
    designItems: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Design system",
      "Art direction",
    ],
  },
  portfolio: {
    figLabel: "SHIPPED PRODUCTS & WORK",
    title: "Real products, designed and shipped",
    intro:
      "Unlike a typical agency, La Fabrik Numérique also builds and ships its own software and web platforms — published on the Microsoft Store, Google Play and Snapcraft.",
    items: [
      {
        ref: "Desktop & Mobile",
        title: "VoxCut",
        type: "Automated audio & video silence remover · Windows, Android & Linux",
        desc: "App that automatically detects and removes silences from podcasts, interviews and videos. 100% local processing, XML/EDL export to Premiere Pro & DaVinci Resolve, files up to 5 GB.",
        result:
          "Published on Microsoft Store, Google Play and Snapcraft · Featured on TrishTech & Softpedia.",
        tags: ["React", "Audio processing", "Desktop & Mobile"],
        link: "https://voxcutpro.com",
        linkLabel: "voxcutpro.com",
        stores: [
          {
            label: "Microsoft Store",
            url: "https://apps.microsoft.com/detail/9NP0N8W3DG5C",
          },
          {
            label: "Google Play",
            url: "https://play.google.com/store/apps/details?id=fr.voxcut.voxcut_android",
          },
          { label: "Snapcraft", url: "https://snapcraft.io/voxcut" },
        ],
        press: [
          {
            label: "TrishTech",
            url: "https://www.trishtech.com/2026/09/voxcut-the-local-app-that-cuts-silence-from-audio-fast/",
          },
          {
            label: "Softpedia",
            url: "https://www.softpedia.com/get/Multimedia/Audio-Editors-Recorders/VoxCut.shtml",
          },
        ],
        image: "/img/portfolio-voxcut.webp",
      },
      {
        ref: "Web & SaaS Platform",
        title: "VotreAssistantIA",
        type: "Web platform & AI Assistant · Tradespeople & SMBs",
        desc: "Web solution tailored for tradespeople and freelancers: deploys a custom AI assistant on WhatsApp and Telegram to answer clients 24/7, qualify leads and summarize inquiries.",
        result:
          "Turnkey deployment in under 5 min · Custom AI agents on WhatsApp & Telegram · Hosted in Europe.",
        tags: ["Web & SaaS", "Next.js", "AI Assistant"],
        link: "https://votreassistantia.fr",
        linkLabel: "votreassistantia.fr",
        stores: [],
        image: "/img/portfolio-vaia.webp",
      },
      {
        ref: "Workflow Automation",
        title: "InOneShot",
        type: "Automated PDF mail-merge · Windows, Android & Linux",
        desc: "PDF mail-merge tool: from a PDF template and an Excel file, drag-and-drop fields (text, dates, signatures, QR codes) and generate hundreds of filled documents in one click.",
        result:
          "#1 Product of the Day on Fazier · Published on Microsoft Store, Google Play and Snapcraft.",
        tags: ["Automation", "PDF & Excel", "Desktop & Mobile"],
        link: "https://inoneshot.fr",
        linkLabel: "inoneshot.fr",
        stores: [
          {
            label: "Microsoft Store",
            url: "https://apps.microsoft.com/detail/9PPBQSM1MFZ2",
          },
          {
            label: "Google Play",
            url: "https://play.google.com/store/apps/details?id=com.lafabriknumerique.inoneshot_android",
          },
          { label: "Snapcraft", url: "https://snapcraft.io/inoneshot" },
        ],
        image: "/img/portfolio-inoneshot.webp",
      },
      {
        ref: "Graphics Tool",
        title: "VectorPop",
        type: "Image & logo vectorizer · Windows, Android & Linux",
        desc: "Image-to-vector converter: turns a pixelated PNG or JPEG logo into a crisp, infinitely scalable SVG locally, with no subscription.",
        result:
          "Published on Microsoft Store, Google Play and Snapcraft — one-time license, 100% local.",
        tags: ["Graphics", "SVG Vectorization", "Desktop & Mobile"],
        link: "https://vectorpop.fr",
        linkLabel: "vectorpop.fr",
        stores: [
          {
            label: "Microsoft Store",
            url: "https://apps.microsoft.com/detail/9MT2XVDXX7DG",
          },
          {
            label: "Google Play",
            url: "https://play.google.com/store/apps/details?id=com.lafabriknumerique.vectorpop",
          },
          { label: "Snapcraft", url: "https://snapcraft.io/vectorpop" },
        ],
        image: "/img/portfolio-vectorpop.webp",
      },
      {
        ref: "System Diagnostics",
        title: "Nyctale",
        type: "PC health & diagnostics software · Windows 10/11",
        desc: "Analyzes a PC and explains in plain language why it overheats or slows down, with before/after PDF reports for repair technicians.",
        result:
          "100% local diagnostic, free unlimited edition and Pro tier for technicians.",
        tags: ["Windows App", "Diagnostics", "PDF Export"],
        link: "https://nyctale.fr",
        linkLabel: "nyctale.fr",
        stores: [],
        image: "/img/portfolio-nyctale.webp",
      },
      {
        ref: "AI Web Application",
        title: "VidScope",
        type: "Video synthesis & structured watch reports · Web App",
        desc: "Turns long technical YouTube videos into structured PDF reports with key takeaways and official links, saving hours of watch time.",
        result:
          "Product of the Day on Fazier · Full web app with automated PDF generation.",
        tags: ["Web App", "Next.js", "AI Synthesis"],
        link: "https://www.vidscope.fr",
        linkLabel: "vidscope.fr",
        stores: [],
        image: "/img/portfolio-vidscope.webp",
      },
      {
        ref: "SVG Quality Control",
        title: "VectoFix",
        type: "Vector repair for laser cutting & print",
        desc: "Specialized tool that inspects and fixes SVG defects zone-by-zone before sending files to laser cutters, embroidery machines or large-format printers.",
        result:
          "Published on the Microsoft Store and available at vectorpop.fr/vectofix.",
        tags: ["Craft & Industry", "SVG", "Software"],
        link: "https://vectorpop.fr/vectofix",
        linkLabel: "vectorpop.fr/vectofix",
        stores: [],
        image: "/img/portfolio-vectofix.webp",
      },
    ],
  },
  pricing: {
    figLabel: "PRICING & INVESTMENT",
    title: "Clear packages, no surprises",
    launchBadge: "",
    launchNote: "",
    scopeNote:
      "Every project receives a free, detailed quote within 24 hours after an initial conversation about your goals.",
    plans: [
      {
        name: "One-Page / Essentials",
        price: "from €590",
        originalPrice: "",
        highlight: false,
        scope:
          "A professional single-page website to showcase your services, build trust with clients and receive quote requests.",
        features: [
          "Clear presentation of your services & work",
          "Modern responsive design for mobile & desktop",
          "Direct contact form delivered to your inbox",
          "Search engine friendly structure (Google)",
          "Turnkey deployment & launch included",
        ],
      },
      {
        name: "Multi-page Showcase Site",
        price: "from €790",
        originalPrice: "",
        highlight: true,
        scope:
          "A complete website up to 5 pages engineered to rank strongly on Google and turn visitors into customers.",
        features: [
          "Up to 5 custom pages (Home, Services, Work…)",
          "In-depth local & industry SEO optimization",
          "High-end bespoke design & ultra-fast load times",
          "Customer reviews, gallery & trust badges",
          "Full launch, HTTPS security & Google indexing",
        ],
        note: "Domain name and hosting in your own name (approx. €15–50 / year).",
      },
      {
        name: "Web App & SaaS",
        price: "from €1,690",
        originalPrice: "",
        highlight: false,
        scope:
          "A custom interactive web platform with user accounts, database or business dashboard.",
        features: [
          "Functional scoping & custom architecture",
          "Secure client portal & database management",
          "Tailored business workflow, payments or AI",
          "Secure cloud deployment & onboarding",
        ],
      },
      {
        name: "Software & Automation",
        price: "from €2,690",
        originalPrice: "",
        highlight: false,
        scope:
          "Dedicated desktop software or custom automation tools to save hours every week on repetitive tasks.",
        features: [
          "Custom software (no mandatory monthly fee)",
          "Document & workflow automation (PDF, Excel, APIs)",
          "100% local execution or connected to your stack",
          "Training, documentation & handover",
        ],
        note: "For larger custom needs, a tailored estimate is provided after an initial call.",
      },
    ],
  },
  about: {
    figLabel: "THE STUDIO & FOUNDER",
    title: "Engineering rigor, artisan care",
    p1: "La Fabrik Numérique is an independent studio based in Roanne, France. I help tradespeople, local businesses and SMBs get a website that actually brings in clients, and I partner with founders and companies to build custom web apps and software.",
    p2: "No middlemen and no unnecessary jargon: you work directly with the person who designs and codes your project, from first sketch to launch.",
    why: [
      {
        ref: "01",
        title: "Creator of shipped digital products",
        desc: "I design and ship my own software (VoxCut, InOneShot, VectorPop…), published on the Microsoft Store and Google Play. Your project gets that exact same standard of care.",
      },
      {
        ref: "02",
        title: "One person from A to Z",
        desc: "From initial brief to launch, you talk directly to the person building your tool.",
      },
      {
        ref: "03",
        title: "100% custom, zero generic templates",
        desc: "Every website and software tool is crafted specifically for your clients, your brand and your workflow.",
      },
      {
        ref: "04",
        title: "Fast, reliable & built to last",
        desc: "Clean, high-performance architecture that you own and can evolve as your business grows.",
      },
    ],
  },
  contact: {
    figLabel: "START A PROJECT",
    title: "Start a project",
    desc: "Describe your project, I'll get back to you with a priced proposal and an initial diagnosis.",
    name: "Name",
    email: "Email",
    message: "Your project",
    emailAddress: "contact@lafabriknumerique.fr",
    responseTime: "Reply within 1 business day.",
    sending: "Sending…",
    success: "Message received — I'll get back to you within 1 business day.",
    error: "Sending failed. Email me directly:",
    consentA: "I accept the",
    consentLink: "privacy policy",
    consentB: ".",
  },
  footer: {
    ref: "REF. LFN-2026",
    legal: "Legal notice",
    privacy: "Privacy",
    cgv: "Terms",
  },
};

export const translations: Record<Lang, Translation> = { fr, en };

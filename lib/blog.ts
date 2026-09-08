import type { Lang } from "@/lib/i18n";

export type BlogSection = { h: string; p: string[] };
export type BlogLink = { label: string; url: string };
export type BlogPost = {
  // Stable identifier shared across languages, used to map a post to its
  // translation (fr/en slugs differ, e.g. for SEO-friendly URLs).
  id: string;
  slug: string;
  title: string;
  date: string; // ISO, e.g. "2026-07-15"
  dateLabel: string;
  excerpt: string;
  tags: string[];
  sections: BlogSection[];
  links: BlogLink[];
  // Set for posts syndicated from VoxCut/InOneShot: points to the original
  // article so search engines attribute the content to its source instead
  // of treating this copy as duplicate content.
  canonicalUrl?: string;
};

export type BlogContent = {
  figLabel: string;
  indexTitle: string;
  indexDesc: string;
  backHome: string;
  backBlog: string;
  seeAlso: string;
  readMore: string;
  posts: BlogPost[];
};

const fr: BlogContent = {
  figLabel: "FIG. 08 — JOURNAL DE L'ATELIER",
  indexTitle: "Journal de l'atelier",
  indexDesc:
    "Notes de bord sur les logiciels qu'on construit, les choix techniques et les coulisses des projets.",
  backHome: "← Retour à l'accueil",
  backBlog: "← Retour au journal",
  seeAlso: "Voir aussi",
  readMore: "Lire l'article →",
  posts: [
    {
      id: "why-own-tools",
      slug: "pourquoi-construire-ses-propres-outils",
      title: "Pourquoi on construit ses propres outils : VoxCut & InOneShot",
      date: "2026-07-15",
      dateLabel: "15 juillet 2026",
      excerpt:
        "Quand l'outil qu'on cherche n'existe pas, ou existe mal, on le construit soi-même. VoxCut et InOneShot sont nés de ce réflexe — et ils tournent aujourd'hui sur le Microsoft Store.",
      tags: ["Studio", "VoxCut", "InOneShot"],
      sections: [
        {
          h: "Pourquoi une agence construit-elle ses propres outils ?",
          p: [
            "La Fabrik Numérique ne construit pas que des sites et des logiciels pour ses clients. Une partie du temps de l'atelier sert aussi à résoudre ses propres irritants — les tâches répétitives, les outils qui n'existent pas encore ou qui existent mal.",
            "Deux logiciels sont nés de cette logique : VoxCut et InOneShot. Tous les deux publiés sur le Microsoft Store, tous les deux nés d'un besoin concret plutôt que d'une idée de marché.",
          ],
        },
        {
          h: "Comment VoxCut supprime-t-il les silences automatiquement ?",
          p: [
            "En montant des podcasts et des interviews, la même corvée revenait sans arrêt : repérer les silences dans la timeline et les couper à la main, minute par minute.",
            "VoxCut détecte et supprime automatiquement les silences d'un fichier audio ou vidéo — 100 % en local, sans envoyer les fichiers sur un serveur. Il exporte directement en XML/EDL vers Premiere Pro et DaVinci Resolve, traite les fichiers par lot, et encaisse sans broncher des fichiers jusqu'à 5 Go.",
            "Résultat : un montage qui prenait une heure de découpage manuel se fait maintenant en quelques minutes.",
          ],
        },
        {
          h: "Comment générer des PDF personnalisés sans maîtriser Word ?",
          p: [
            "Autre corvée classique : générer des dizaines de documents personnalisés (attestations, contrats, convocations) à partir d'un modèle PDF et d'un tableur Excel.",
            "InOneShot fonctionne par glisser-déposer : on place les champs — colonnes, dates, signatures, QR codes — directement sur l'aperçu du PDF, puis l'application génère tous les documents remplis d'un seul coup.",
            "Des centaines de PDF personnalisés, en un clic, depuis un simple tableur.",
          ],
        },
        {
          h: "Quel est le lien entre les outils internes et les projets clients ?",
          p: [
            "Construire ses propres outils, c'est la même discipline que construire ceux des clients : comprendre le vrai problème, ne garder que ce qui sert, et livrer quelque chose qui tourne encore dans un an sans dette cachée.",
            "Si vous avez une tâche répétitive dans votre activité qui mériterait le même traitement — un outil sur mesure plutôt qu'un logiciel généraliste mal ajusté — c'est exactement le genre de projet que l'atelier aime prendre.",
          ],
        },
      ],
      links: [
        {
          label: "Découvrir VoxCut → voxcutpro.com",
          url: "https://voxcutpro.com",
        },
        {
          label: "Découvrir InOneShot → inoneshot.fr",
          url: "https://inoneshot.fr",
        },
      ],
    },
    {
      id: "pdf-mail-merge-excel",
      slug: "publipostage-pdf-depuis-excel",
      title:
        "Comment générer des centaines de PDF personnalisés depuis un Excel (sans copier-coller)",
      date: "2026-06-28",
      dateLabel: "28 juin 2026",
      excerpt:
        "Attestations, factures, courriers, diplômes : voici comment produire un PDF par ligne de votre tableur, automatiquement, sans recommencer cent fois.",
      tags: ["InOneShot", "Automatisation", "Tutoriel"],
      canonicalUrl:
        "https://www.inoneshot.fr/blog/publipostage-pdf-depuis-excel",
      sections: [
        {
          h: "Qu'est-ce que le publipostage PDF ?",
          p: [
            "Le publipostage consiste à fusionner un modèle — la mise en page, fixe — avec une source de données : votre Excel, qui varie. Chaque ligne du tableur devient un document : la colonne « Nom » remplit le champ nom, la colonne « Montant » remplit le champ montant, et ainsi de suite, pour toutes les lignes.",
          ],
        },
        {
          h: "Combien coûte vraiment la méthode manuelle ?",
          p: [
            "À la main : ouvrir le modèle, copier-coller chaque valeur depuis Excel, exporter en PDF, puis renommer le fichier — ligne par ligne, en reprenant tout à la moindre faute de frappe. Sur cent documents, c'est facilement une demi-journée perdue, avec un vrai risque d'erreur.",
          ],
        },
        {
          h: "Comment automatiser ce processus avec InOneShot ?",
          p: [
            "InOneShot est une application Windows dédiée au publipostage PDF. Importez un modèle PDF et un fichier Excel, placez vos champs par glisser-déposer — colonnes, date du jour, image de signature, QR code — puis cliquez une fois : l'application génère un PDF par ligne, les nomme automatiquement et livre un ZIP prêt à envoyer. Tout se passe en local, sur l'ordinateur.",
            "Une fois le modèle prêt, refaire le même lot le mois suivant ne prend plus que quelques secondes.",
          ],
        },
      ],
      links: [
        {
          label: "Lire l'article original sur inoneshot.fr →",
          url: "https://www.inoneshot.fr/blog/publipostage-pdf-depuis-excel",
        },
        {
          label: "Découvrir InOneShot → inoneshot.fr",
          url: "https://inoneshot.fr",
        },
      ],
    },
    {
      id: "ai-search-geo-visibility",
      slug: "faire-apparaitre-son-app-dans-les-resultats-des-ia",
      title:
        "Comment faire apparaître son application dans les résultats des IA",
      date: "2026-09-07",
      dateLabel: "7 septembre 2026",
      excerpt:
        "ChatGPT, Perplexity, Google AI Overviews : de plus en plus de recherches se terminent sur une réponse générée par une IA plutôt que sur une liste de liens. Voici ce qui influence réellement la visibilité d'une app dans ces réponses — et ce qui relève du mythe.",
      tags: ["SEO", "GEO", "Studio"],
      sections: [
        {
          h: "Le GEO remplace-t-il le SEO ?",
          p: [
            "Depuis 2025, une part croissante des recherches ne se termine plus sur une page de résultats bleus, mais sur une réponse générée directement par une IA. Google AI Overviews touche déjà près de la moitié des requêtes, ChatGPT compte 900 millions d'utilisateurs hebdomadaires, et Perplexity traite plus de 500 millions de requêtes par mois. Pour un développeur qui vend une application, être bien classé sur Google ne garantit plus d'être cité quand un utilisateur demande à une IA « quel est le meilleur logiciel pour X ? ».",
            "Il faut d'abord corriger une idée reçue : le GEO (Generative Engine Optimization) ne remplace pas le SEO, il en est le prolongement. Google l'affirme explicitement : l'optimisation pour la recherche générative reste du SEO. 92 % des citations dans Google AI Overviews proviennent de pages déjà dans le top 10 des résultats classiques — mais 47 % viennent de pages classées au-delà de la position 5. Bien se classer reste la base ; structurer le contenu pour qu'un passage précis soit extractible et citable devient le complément indispensable.",
          ],
        },
        {
          h: "Le fichier llms.txt améliore-t-il la visibilité sur Google ?",
          p: [
            "Le fichier /llms.txt a fait beaucoup de bruit en 2025. La réalité est plus nuancée : Google a confirmé explicitement que Google Search — y compris ses fonctionnalités génératives — ignore totalement ce fichier. Ce n'est ni une pénalité, ni un bonus, ça ne change rien pour Google.",
            "Ce fichier peut rester pertinent pour d'autres crawlers IA qui n'indexent pas comme Google. La recommandation raisonnable : créer un /llms.txt simple à la racine du site si cela prend cinq minutes, sans jamais le considérer comme un levier de visibilité prioritaire.",
          ],
        },
        {
          h: "Comment structurer son contenu pour être cité par les IA ?",
          p: [
            "C'est le levier le plus rentable. Les IA ne citent pas des pages entières, elles extraient des passages autonomes de 134 à 167 mots en moyenne. Concrètement : ouvrir chaque section par une réponse directe dans les 40 à 60 premiers mots, utiliser des titres formulés comme des questions, créer des blocs de texte qui ont un sens extraits seuls, et ajouter des chiffres précis plutôt que des affirmations vagues.",
            "44 % des citations IA proviennent des 30 % premiers du contenu d'une page — ne jamais enterrer l'information utile après plusieurs paragraphes d'introduction. Détail technique à ne pas négliger : les crawlers IA n'exécutent pas JavaScript, le rendu côté serveur est un prérequis pour être lu.",
          ],
        },
        {
          h: "Le balisage schema.org suffit-il à être cité par les IA ?",
          p: [
            "Le balisage structuré (schema.org) reste un signal de compréhension utile, sans être un levier de citation à lui seul. Mais le signal qui pèse le plus lourd n'est pas technique : une étude Ahrefs sur 75 000 marques a montré que les mentions de marque corrèlent trois fois plus fortement avec la visibilité IA que les backlinks classiques.",
            "Les IA génératives citent massivement Wikipedia, Reddit, YouTube et LinkedIn. Une mention organique dans un thread pertinent, une présence sur des annuaires et comparateurs logiciels, ou une chaîne YouTube modeste pèsent souvent plus que dix backlinks SEO classiques. La fraîcheur du contenu compte aussi : un contenu de moins de trois mois a environ trois fois plus de chances d'être cité qu'un contenu laissé sans mise à jour depuis six mois.",
          ],
        },
        {
          h: "Comment mesurer sa visibilité dans les réponses IA ?",
          p: [
            "Il n'existe pas encore d'équivalent universel de Search Console pour la visibilité dans les réponses IA. Trois approches pragmatiques : tester manuellement les requêtes qu'un client poserait à ChatGPT, Perplexity et Google AI Mode ; utiliser un outil de suivi des mentions de marque sur plusieurs moteurs IA ; et surveiller dans Google Analytics le trafic référent provenant de chatgpt.com, perplexity.ai ou copilot.microsoft.com — le signal le plus fiable qu'une stratégie GEO porte ses fruits.",
            "Seuls 11 % des domaines sont cités à la fois par ChatGPT et par Google AI Overviews pour une même requête : la mesure doit rester par plateforme, pas agrégée. L'investissement le plus rentable pour démarrer reste le plus simple : réécrire les premières lignes de chaque page pour qu'elles répondent directement à la question de l'utilisateur, en moins de soixante mots.",
          ],
        },
      ],
      links: [],
    },
    {
      id: "custom-tool-vs-saas-cost",
      slug: "outil-sur-mesure-ou-saas-cout-reel-sur-3-ans",
      title: "Outil sur mesure ou abonnement SaaS : ce que ça coûte vraiment sur 3 ans",
      date: "2026-09-07",
      dateLabel: "7 septembre 2026",
      excerpt:
        "Un abonnement SaaS paraît toujours moins cher au premier regard qu'un outil développé sur mesure. Sur trois ans, avec la hausse des tarifs et les limites de plan, le calcul s'inverse souvent.",
      tags: ["Studio", "Automatisation"],
      sections: [
        {
          h: "Un abonnement SaaS est-il vraiment moins cher qu'un outil sur mesure ?",
          p: [
            "29 € par mois, c'est le genre de ligne qui rassure sur une page de pricing. Sauf que ce chiffre est presque toujours le tarif d'entrée, pour un usage limité — un nombre de sièges, un volume de documents, un nombre d'automatisations. Dès que l'activité grossit, c'est le palier supérieur qui s'applique, généralement deux à trois fois plus cher.",
            "Sur trois ans, un abonnement à 29 €/mois qui grimpe à 79 €/mois au bout d'un an représente déjà plus de 2 500 € — sans compter les modules additionnels facturés à part, quasiment systématiques passé un certain usage.",
          ],
        },
        {
          h: "Pourquoi un SaaS générique ne couvre-t-il jamais les besoins spécifiques ?",
          p: [
            "Un logiciel générique doit satisfaire des milliers de clients aux besoins différents. Résultat : les fonctionnalités vraiment spécifiques à votre activité — un champ métier particulier, un format d'export imposé par un client, une règle de calcul propre à votre secteur — sont soit absentes, soit reléguées à un plan « Entreprise » vendu sur devis.",
            "Le workaround habituel est de multiplier les outils annexes (un tableur pour combler le manque, un connecteur tiers payant pour faire le lien) — chacun avec son propre abonnement, sa propre courbe d'apprentissage, et un point de rupture supplémentaire si l'un des services change ses conditions.",
          ],
        },
        {
          h: "Combien coûte réellement un outil développé sur mesure ?",
          p: [
            "Un outil développé sur mesure a un coût initial plus visible — c'est un projet, pas une case à cocher. Mais une fois livré, il n'y a plus de facture récurrente qui grimpe avec l'usage, plus de limite de plan à surveiller, et les fonctionnalités correspondent exactement au métier réel, sans compromis sur le vocabulaire ou le flux de travail.",
            "C'est exactement la logique derrière VoxCut et InOneShot : deux outils nés d'un besoin concret de l'atelier, où l'abonnement mensuel d'un logiciel généraliste ne justifiait pas la contrainte qu'il imposait en retour.",
          ],
        },
        {
          h: "Quand un abonnement SaaS reste-t-il le bon choix ?",
          p: [
            "Ce n'est pas un plaidoyer contre tout abonnement. Pour un besoin standard, largement couvert par un outil existant, sans exigence métier particulière, un SaaS reste plus rapide à mettre en place et moins risqué qu'un développement dédié. La bascule vers le sur-mesure devient pertinente à partir du moment où l'entreprise paie pour des fonctionnalités qu'elle n'utilise pas, contourne les limites d'un plan avec des solutions de fortune, ou dépend d'un outil qui ne parle pas vraiment le langage de son métier.",
          ],
        },
        {
          h: "Comment choisir entre SaaS et sur-mesure pour son activité ?",
          p: [
            "Trois questions suffisent en général à orienter la décision : la tâche est-elle vraiment répétitive et chronophage (sinon, l'investissement ne se rentabilise jamais) ? Existe-t-il un outil du marché qui la couvre à 90 % sans bricolage (si oui, le sur-mesure n'apporte rien) ? Et surtout, combien coûte réellement l'abonnement actuel projeté sur trois ans, palier après palier, plutôt que sur le seul prix affiché en page d'accueil.",
          ],
        },
      ],
      links: [
        {
          label: "Découvrir VoxCut → voxcutpro.com",
          url: "https://voxcutpro.com",
        },
        {
          label: "Découvrir InOneShot → inoneshot.fr",
          url: "https://inoneshot.fr",
        },
      ],
    },
    {
      id: "showcase-site-vs-web-app",
      slug: "site-vitrine-ou-application-web-comment-choisir",
      title: "Site vitrine ou application web : comment choisir pour son activité",
      date: "2026-09-07",
      dateLabel: "7 septembre 2026",
      excerpt:
        "« On a besoin d'un site » est rarement la vraie demande. Avant de parler design ou technologie, il faut d'abord clarifier si le besoin est de présenter une activité, ou de faire fonctionner quelque chose.",
      tags: ["Studio", "Tutoriel"],
      sections: [
        {
          h: "Quelle est la différence entre un site vitrine et une application web ?",
          p: [
            "Un site vitrine présente une activité : qui vous êtes, ce que vous proposez, comment vous contacter. Il informe et convainc, mais ne fait rien à la place du visiteur. Une application web, elle, exécute une tâche : réserver un créneau, calculer un devis, gérer un compte client, transformer un fichier. La confusion entre les deux mène souvent à un cahier des charges flou, où un site vitrine se voit greffer des fonctionnalités qui auraient dû être pensées comme une application dès le départ.",
          ],
        },
        {
          h: "Ai-je besoin d'un simple site vitrine ?",
          p: [
            "Si le besoin principal est d'être trouvé sur Google, de présenter une offre, de rassurer un prospect avec des références et un formulaire de contact, un site vitrine bien construit fait le travail. Il est plus rapide à livrer — généralement quelques semaines contre plusieurs mois pour une application sur mesure —, moins coûteux à maintenir, et plus simple à faire évoluer dans le temps — un ajout de page ou un changement de texte ne remet rien en cause.",
            "C'est aussi le bon choix quand l'activité repose sur un contact humain en aval (un appel, un rendez-vous, un devis personnalisé) plutôt que sur une transaction entièrement automatisée en ligne.",
          ],
        },
        {
          h: "Quand faut-il développer une application plutôt qu'un site ?",
          p: [
            "Dès qu'un visiteur doit pouvoir agir sans intervention humaine — créer un compte, suivre une commande, générer un document, accéder à des données personnelles — un site vitrine classique ne suffit plus. Il faut alors une couche applicative : base de données, authentification, logique métier, et souvent une interface pensée pour un usage répété plutôt que pour une première visite. Le budget change d'échelle en conséquence : un site vitrine se chiffre en général en centaines à quelques milliers d'euros, une application sur mesure plutôt en plusieurs milliers, selon la complexité de la logique métier.",
            "Le signal le plus fiable reste celui-ci : si la même tâche revient plusieurs fois par semaine côté client ou côté visiteur, et qu'elle est aujourd'hui gérée à la main (un tableau Excel, des e-mails, un fichier partagé), c'est le signe qu'une application ferait gagner un temps réel — pas seulement une meilleure vitrine.",
          ],
        },
        {
          h: "Peut-on avoir besoin d'un site vitrine et d'une application à la fois ?",
          p: [
            "Beaucoup de projets ont en réalité besoin des deux : un site vitrine public pour informer et convertir, connecté à une application privée pour gérer l'activité derrière. Nyctale, par exemple, associe un site public bilingue et un logiciel de diagnostic qui, lui, exécute une tâche technique complète sur la machine de l'utilisateur. Traiter les deux comme un seul et même bloc technique complique inutilement le projet ; les séparer clairement, avec une passerelle simple entre les deux, garde chaque partie facile à maintenir.",
          ],
        },
        {
          h: "Quelle question se poser avant de lancer son projet ?",
          p: [
            "Avant de parler de technologie ou de design, une seule question tranche l'essentiel : est-ce que le visiteur vient pour être convaincu, ou pour accomplir quelque chose ? La réponse détermine si le projet est un site vitrine, une application, ou les deux — et évite de payer pour la complexité d'une application quand un site suffisait, ou de brider une vraie application derrière les limites d'un site vitrine.",
          ],
        },
      ],
      links: [
        {
          label: "Découvrir Nyctale → nyctale.fr",
          url: "https://nyctale.fr",
        },
      ],
    },
  ],
};

const en: BlogContent = {
  figLabel: "FIG. 08 — STUDIO LOG",
  indexTitle: "Studio log",
  indexDesc:
    "Notes on the software we build, the technical choices behind it, and what happens behind the scenes.",
  backHome: "← Back to home",
  backBlog: "← Back to the log",
  seeAlso: "See also",
  readMore: "Read the article →",
  posts: [
    {
      id: "why-own-tools",
      slug: "why-we-build-our-own-tools",
      title: "Why we build our own tools: VoxCut & InOneShot",
      date: "2026-07-15",
      dateLabel: "July 15, 2026",
      excerpt:
        "When the tool we need doesn't exist, or exists but poorly, we build it ourselves. VoxCut and InOneShot both started that way — and both now run on the Microsoft Store.",
      tags: ["Studio", "VoxCut", "InOneShot"],
      sections: [
        {
          h: "Why does an agency build its own tools?",
          p: [
            "La Fabrik Numérique doesn't only build sites and software for clients. Part of the studio's time also goes into solving its own recurring pains — repetitive tasks, tools that don't exist yet, or exist but poorly.",
            "Two pieces of software came out of that: VoxCut and InOneShot. Both published on the Microsoft Store, both born from a real, concrete need rather than a market idea.",
          ],
        },
        {
          h: "How does VoxCut automatically remove silences?",
          p: [
            "While editing podcasts and interviews, the same chore kept coming back: spotting silences in the timeline and cutting them out by hand, minute after minute.",
            "VoxCut automatically detects and removes silences from an audio or video file — 100% local, files never leave the machine. It exports directly to XML/EDL for Premiere Pro and DaVinci Resolve, processes files in batch, and handles files up to 5 GB without flinching.",
            "The result: an edit that used to take an hour of manual cutting now takes a few minutes.",
          ],
        },
        {
          h: "How do you generate personalized PDFs without a Word masterclass?",
          p: [
            "Another classic chore: generating dozens of personalized documents (certificates, contracts, invitations) from a PDF template and an Excel spreadsheet.",
            "InOneShot works by drag-and-drop: you place fields — columns, dates, signatures, QR codes — directly on the PDF preview, then the app generates every filled document in one go.",
            "Hundreds of personalized PDFs, one click, straight from a spreadsheet.",
          ],
        },
        {
          h: "What's the link between internal tools and client projects?",
          p: [
            "Building your own tools takes the same discipline as building a client's: understand the real problem, keep only what earns its place, and ship something that still runs a year later with no hidden debt.",
            "If you have a repetitive task in your business that deserves the same treatment — a tool built for exactly your workflow instead of a generic app bent out of shape to fit it — that's exactly the kind of project the studio likes to take on.",
          ],
        },
      ],
      links: [
        {
          label: "Discover VoxCut → voxcutpro.com",
          url: "https://voxcutpro.com",
        },
        {
          label: "Discover InOneShot → inoneshot.fr",
          url: "https://inoneshot.fr",
        },
      ],
    },
    {
      id: "remove-podcast-silences",
      slug: "how-to-remove-silences-from-a-podcast",
      title:
        "How to Automatically Remove Silences From a Podcast (Without Manual Editing)",
      date: "2026-06-17",
      dateLabel: "June 17, 2026",
      excerpt:
        "Silences and dead air can eat 10–20% of an episode. Here's how to detect and cut them automatically, and edit your podcast in a fraction of the time.",
      tags: ["VoxCut", "Audio", "Tutorial"],
      canonicalUrl:
        "https://voxcutpro.com/blog/how-to-remove-silences-from-a-podcast",
      sections: [
        {
          h: "Why silences matter more than you think",
          p: [
            "A few seconds of dead air feels harmless while recording. But across a 45-minute episode, those pauses add up — often to 10–20% of the total runtime: longer episodes that feel slower, more file size to host, and a less professional listening experience.",
            "Removing silences makes content punchier and noticeably more polished, without changing a single word.",
          ],
        },
        {
          h: "The slow way vs. the fast way",
          p: [
            "The traditional approach is to open the recording in an editor, scrub through the waveform, find each gap, and delete it by hand — repeated a few hundred times per episode. It's the single biggest reason editing a podcast can take 2–3× longer than the recording itself.",
            "Modern tools instead analyze the audio, detect every silent passage based on a volume threshold, and trim them all in one pass. What used to take an hour now takes a couple of minutes.",
          ],
        },
        {
          h: "How VoxCut does it",
          p: [
            "VoxCut is a Windows app built for exactly this. Drop in a recording and it shows a before/after waveform — blue for voice, grey for silence — so you can see precisely what gets removed before committing. One click, and the dead air is gone.",
            "A few practical tips: leave a small natural pause (150–300 ms) between sentences so speech still sounds human, tune the threshold to your recording, and always keep the original file and trim a copy.",
          ],
        },
      ],
      links: [
        {
          label: "Read the original article on voxcutpro.com →",
          url: "https://voxcutpro.com/blog/how-to-remove-silences-from-a-podcast",
        },
        {
          label: "Discover VoxCut → voxcutpro.com",
          url: "https://voxcutpro.com",
        },
      ],
    },
    {
      id: "pdf-mail-merge-excel",
      slug: "generate-pdfs-from-excel",
      title: "How to Generate Hundreds of Personalized PDFs from an Excel File",
      date: "2026-07-12",
      dateLabel: "July 12, 2026",
      excerpt:
        "Certificates, invoices, letters, diplomas: here's how to turn every row of your spreadsheet into its own PDF — automatically, without copy-pasting a single value.",
      tags: ["InOneShot", "Automation", "Tutorial"],
      canonicalUrl: "https://www.inoneshot.fr/blog/generate-pdfs-from-excel",
      sections: [
        {
          h: "What is PDF mail merge?",
          p: [
            "A mail merge combines a template — the fixed layout — with a data source, your spreadsheet, which varies. Each row becomes one document: the “Name” column fills the name field, the “Amount” column fills the amount field, and so on, repeated automatically for every row.",
          ],
        },
        {
          h: "What does the manual way really cost?",
          p: [
            "Doing it by hand means opening the template, copy-pasting each value from Excel, exporting to PDF, and renaming the file — row after row, starting over at the first typo. Across a hundred documents, that's easily half a day lost, with a real risk of mistakes.",
          ],
        },
        {
          h: "How do you automate this with InOneShot?",
          p: [
            "InOneShot is a Windows app built for PDF mail merge. Import a PDF template and an Excel file, place fields by drag and drop — columns, today's date, a signature image, a QR code — then click once: the app generates one PDF per row, names each file automatically, and delivers a ZIP ready to send. Everything runs locally; the data never leaves the machine.",
            "Once the template is set up, running the same batch next month takes seconds.",
          ],
        },
      ],
      links: [
        {
          label: "Read the original article on inoneshot.fr →",
          url: "https://www.inoneshot.fr/blog/generate-pdfs-from-excel",
        },
        {
          label: "Discover InOneShot → inoneshot.fr",
          url: "https://inoneshot.fr",
        },
      ],
    },
    {
      id: "ai-search-geo-visibility",
      slug: "how-to-get-your-app-featured-in-ai-search-results",
      title: "How to Get Your App Featured in AI Search Results",
      date: "2026-09-07",
      dateLabel: "September 7, 2026",
      excerpt:
        "ChatGPT, Perplexity, Google AI Overviews: more and more searches now end on an AI-generated answer instead of a list of links. Here's what actually drives an app's visibility in those answers — and what's just myth.",
      tags: ["SEO", "GEO", "Studio"],
      sections: [
        {
          h: "Does GEO replace SEO?",
          p: [
            "Since 2025, a growing share of searches no longer end on a page of blue links, but on an answer generated directly by an AI. Google AI Overviews already touches nearly half of all queries, ChatGPT has 900 million weekly users, and Perplexity handles over 500 million queries a month. For a developer selling an app, ranking well on Google no longer guarantees being cited when someone asks an AI 'what's the best software for X?'.",
            "One misconception needs correcting first: GEO (Generative Engine Optimization) doesn't replace SEO, it extends it. Google states this explicitly: optimizing for generative search is still SEO. 92% of citations in Google AI Overviews come from pages already in the top 10 of classic results — but 47% come from pages ranked below position 5. Ranking well remains the foundation; structuring content so a specific passage is extractable and citable is now the essential complement.",
          ],
        },
        {
          h: "Does llms.txt improve visibility on Google?",
          p: [
            "The /llms.txt file made a lot of noise in 2025. The reality is more nuanced: Google has explicitly confirmed that Google Search — including its generative features — completely ignores this file. It's neither a penalty nor a bonus; it changes nothing for Google.",
            "The file can still be relevant for other AI crawlers that don't index the way Google does. The reasonable approach: create a simple /llms.txt at the site root if it takes five minutes, but never treat it as a priority visibility lever.",
          ],
        },
        {
          h: "How do you structure content to be cited by AI?",
          p: [
            "This is the most cost-effective lever. AIs don't cite entire pages, they extract self-contained passages averaging 134 to 167 words. In practice: open every section with a direct answer within the first 40 to 60 words, use question-phrased headings, write blocks that make sense when extracted alone, and include specific numbers instead of vague claims.",
            "44% of AI citations come from the first 30% of a page's content — never bury the useful answer after several paragraphs of introduction. One technical detail not to overlook: AI crawlers don't execute JavaScript, so server-side rendering is a prerequisite to being read at all.",
          ],
        },
        {
          h: "Is schema markup enough to be cited by AI?",
          p: [
            "Structured data (schema.org) remains a useful comprehension signal, though not a citation lever on its own. But the signal that matters most isn't technical: an Ahrefs study of 75,000 brands found that brand mentions correlate three times more strongly with AI visibility than classic backlinks.",
            "Generative AIs heavily cite Wikipedia, Reddit, YouTube, and LinkedIn. An organic mention in a relevant thread, a listing on software directories and comparison sites, or even a modest YouTube channel often outweighs ten classic SEO backlinks. Content freshness matters too: content under three months old is roughly three times more likely to be cited than content left untouched for six months or more.",
          ],
        },
        {
          h: "How do you measure your AI visibility?",
          p: [
            "There's no universal equivalent of Search Console yet for AI-answer visibility. Three practical approaches: manually test the queries a customer would ask ChatGPT, Perplexity, and Google AI Mode; use a brand-mention tracking tool across several AI engines; and watch Google Analytics for referral traffic from chatgpt.com, perplexity.ai, or copilot.microsoft.com — the most reliable signal that a GEO strategy is paying off.",
            "Only 11% of domains are cited by both ChatGPT and Google AI Overviews for the same query, so measurement needs to stay per-platform rather than aggregated. The highest-return starting move remains the simplest one: rewrite the opening lines of every page so they answer the user's question directly, in under sixty words.",
          ],
        },
      ],
      links: [],
    },
    {
      id: "custom-tool-vs-saas-cost",
      slug: "custom-tool-vs-saas-real-cost-over-3-years",
      title: "Custom Tool or SaaS Subscription: What It Really Costs Over 3 Years",
      date: "2026-09-07",
      dateLabel: "September 7, 2026",
      excerpt:
        "A SaaS subscription always looks cheaper at first glance than a custom-built tool. Over three years, with pricing tiers and plan limits factored in, the math often flips.",
      tags: ["Studio", "Automation"],
      sections: [
        {
          h: "Is a SaaS subscription really cheaper than a custom tool?",
          p: [
            "$29 a month is the kind of line that feels reassuring on a pricing page. Except that number is almost always the entry tier, for a limited use case — a number of seats, a document volume, a number of automations. As soon as the business grows, the next tier kicks in, usually two to three times more expensive.",
            "Over three years, a $29/month subscription that climbs to $79/month after year one already adds up to more than $2,500 — before counting the add-on modules billed separately, which are nearly universal past a certain usage level.",
          ],
        },
        {
          h: "Why doesn't generic SaaS ever cover specific needs?",
          p: [
            "Generic software has to satisfy thousands of customers with different needs. As a result, the features that are actually specific to your business — a particular field, an export format a client requires, a calculation rule specific to your industry — are either missing or pushed into an 'Enterprise' plan sold by quote.",
            "The usual workaround is to stack extra tools on top (a spreadsheet to patch the gap, a paid third-party connector to bridge the two) — each with its own subscription, its own learning curve, and one more point of failure if any of those services changes its terms.",
          ],
        },
        {
          h: "What does a custom-built tool really cost?",
          p: [
            "A custom-built tool has a more visible upfront cost — it's a project, not a checkbox. But once delivered, there's no recurring bill that climbs with usage, no plan limit to keep an eye on, and the features match the actual workflow exactly, with no compromise on vocabulary or process.",
            "That's exactly the logic behind VoxCut and InOneShot: two tools born from a real need inside the studio, where a generic app's monthly fee didn't justify the constraint it imposed in return.",
          ],
        },
        {
          h: "When is SaaS still the right call?",
          p: [
            "This isn't an argument against subscriptions in general. For a standard need, well covered by an existing tool, with no particular business-specific requirement, a SaaS remains faster to set up and less risky than a dedicated build. The tipping point toward custom software comes once a business is paying for features it doesn't use, working around a plan's limits with makeshift fixes, or depending on a tool that doesn't really speak its industry's language.",
          ],
        },
        {
          h: "How do you decide between SaaS and custom for your business?",
          p: [
            "Three questions usually settle it: is the task genuinely repetitive and time-consuming (if not, the investment never pays off)? Does an existing tool already cover 90% of it without workarounds (if so, custom software adds little)? And, above all, what does the current subscription really cost projected over three years, tier by tier — not just the number shown on the homepage.",
          ],
        },
      ],
      links: [
        {
          label: "Discover VoxCut → voxcutpro.com",
          url: "https://voxcutpro.com",
        },
        {
          label: "Discover InOneShot → inoneshot.fr",
          url: "https://inoneshot.fr",
        },
      ],
    },
    {
      id: "showcase-site-vs-web-app",
      slug: "showcase-website-or-web-app-how-to-choose",
      title: "Showcase Website or Web App: How to Choose for Your Business",
      date: "2026-09-07",
      dateLabel: "September 7, 2026",
      excerpt:
        "\"We need a website\" is rarely the actual need. Before talking design or technology, it helps to first clarify whether the goal is to present a business, or to make something work.",
      tags: ["Studio", "Tutorial"],
      sections: [
        {
          h: "What's the difference between a showcase website and a web app?",
          p: [
            "A showcase website presents a business: who you are, what you offer, how to reach you. It informs and persuades, but doesn't do anything on the visitor's behalf. A web app, on the other hand, executes a task: booking a slot, calculating a quote, managing a customer account, converting a file. Confusing the two often leads to a vague brief, where a showcase site ends up bolted with features that should have been designed as an app from the start.",
          ],
        },
        {
          h: "Do I just need a simple showcase website?",
          p: [
            "If the main need is to be found on Google, present an offer, and reassure a prospect with references and a contact form, a well-built showcase site does the job. It's faster to ship — typically a few weeks, versus several months for a custom app —, cheaper to maintain, and simpler to evolve over time — adding a page or changing some text doesn't put anything else at risk.",
            "It's also the right call when the business relies on human contact downstream (a call, a meeting, a custom quote) rather than a fully automated online transaction.",
          ],
        },
        {
          h: "When do you actually need a web app instead of a website?",
          p: [
            "As soon as a visitor needs to act without human involvement — creating an account, tracking an order, generating a document, accessing personal data — a classic showcase site stops being enough. At that point you need an application layer: a database, authentication, business logic, and often an interface designed for repeated use rather than a first visit. The budget shifts accordingly: a showcase site usually runs a few hundred to a few thousand euros, while a custom app more often runs into the several-thousand range, depending on how much business logic it needs.",
            "The most reliable signal is this: if the same task comes up several times a week, on the client side or the visitor side, and is currently handled by hand (a spreadsheet, emails, a shared file), that's a sign an app would save real time — not just make for a nicer storefront.",
          ],
        },
        {
          h: "Can you need both a showcase site and an app?",
          p: [
            "Many projects actually need both: a public showcase site to inform and convert, connected to a private app that runs the business behind it. Nyctale, for instance, pairs a bilingual public website with a diagnostic tool that runs a full technical task on the user's machine. Treating both as a single technical block needlessly complicates the project; keeping them clearly separate, with a simple bridge between the two, keeps each part easy to maintain.",
          ],
        },
        {
          h: "What question should you ask before starting your project?",
          p: [
            "Before talking technology or design, one question settles most of it: does the visitor come to be convinced, or to get something done? The answer determines whether the project is a showcase site, an app, or both — and avoids paying for the complexity of an app when a site would do, or squeezing a real app behind the limits of a showcase site.",
          ],
        },
      ],
      links: [
        {
          label: "Discover Nyctale → nyctale.fr",
          url: "https://nyctale.fr",
        },
      ],
    },
  ],
};

export const blogContent: Record<Lang, BlogContent> = { fr, en };

export function getPost(lang: Lang, slug: string): BlogPost | undefined {
  return blogContent[lang].posts.find((p) => p.slug === slug);
}

// FR/EN slugs of the same post (matched by shared id), for hreflang alternates
// and the routed language toggle.
export function getSlugPair(id: string): { fr?: string; en?: string } {
  return {
    fr: blogContent.fr.posts.find((p) => p.id === id)?.slug,
    en: blogContent.en.posts.find((p) => p.id === id)?.slug,
  };
}

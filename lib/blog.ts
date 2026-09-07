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
          h: "Le réflexe de l'atelier",
          p: [
            "La Fabrik Numérique ne construit pas que des sites et des logiciels pour ses clients. Une partie du temps de l'atelier sert aussi à résoudre ses propres irritants — les tâches répétitives, les outils qui n'existent pas encore ou qui existent mal.",
            "Deux logiciels sont nés de cette logique : VoxCut et InOneShot. Tous les deux publiés sur le Microsoft Store, tous les deux nés d'un besoin concret plutôt que d'une idée de marché.",
          ],
        },
        {
          h: "VoxCut — supprimer les silences, sans y passer sa vie",
          p: [
            "En montant des podcasts et des interviews, la même corvée revenait sans arrêt : repérer les silences dans la timeline et les couper à la main, minute par minute.",
            "VoxCut détecte et supprime automatiquement les silences d'un fichier audio ou vidéo — 100 % en local, sans envoyer les fichiers sur un serveur. Il exporte directement en XML/EDL vers Premiere Pro et DaVinci Resolve, traite les fichiers par lot, et encaisse sans broncher des fichiers jusqu'à 5 Go.",
            "Résultat : un montage qui prenait une heure de découpage manuel se fait maintenant en quelques minutes.",
          ],
        },
        {
          h: "InOneShot — un publipostage PDF qui ne demande pas un master en Word",
          p: [
            "Autre corvée classique : générer des dizaines de documents personnalisés (attestations, contrats, convocations) à partir d'un modèle PDF et d'un tableur Excel.",
            "InOneShot fonctionne par glisser-déposer : on place les champs — colonnes, dates, signatures, QR codes — directement sur l'aperçu du PDF, puis l'application génère tous les documents remplis d'un seul coup.",
            "Des centaines de PDF personnalisés, en un clic, depuis un simple tableur.",
          ],
        },
        {
          h: "Le lien avec l'atelier",
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
          h: "Le principe du publipostage PDF",
          p: [
            "Le publipostage consiste à fusionner un modèle — la mise en page, fixe — avec une source de données : votre Excel, qui varie. Chaque ligne du tableur devient un document : la colonne « Nom » remplit le champ nom, la colonne « Montant » remplit le champ montant, et ainsi de suite, pour toutes les lignes.",
          ],
        },
        {
          h: "La méthode manuelle, et ce qu'elle coûte vraiment",
          p: [
            "À la main : ouvrir le modèle, copier-coller chaque valeur depuis Excel, exporter en PDF, puis renommer le fichier — ligne par ligne, en reprenant tout à la moindre faute de frappe. Sur cent documents, c'est facilement une demi-journée perdue, avec un vrai risque d'erreur.",
          ],
        },
        {
          h: "La méthode automatique avec InOneShot",
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
          h: "Le GEO n'est pas une révolution, c'est une extension du SEO",
          p: [
            "Depuis 2025, une part croissante des recherches ne se termine plus sur une page de résultats bleus, mais sur une réponse générée directement par une IA. Google AI Overviews touche déjà près de la moitié des requêtes, ChatGPT compte 900 millions d'utilisateurs hebdomadaires, et Perplexity traite plus de 500 millions de requêtes par mois. Pour un développeur qui vend une application, être bien classé sur Google ne garantit plus d'être cité quand un utilisateur demande à une IA « quel est le meilleur logiciel pour X ? ».",
            "Il faut d'abord corriger une idée reçue : le GEO (Generative Engine Optimization) ne remplace pas le SEO, il en est le prolongement. Google l'affirme explicitement : l'optimisation pour la recherche générative reste du SEO. 92 % des citations dans Google AI Overviews proviennent de pages déjà dans le top 10 des résultats classiques — mais 47 % viennent de pages classées au-delà de la position 5. Bien se classer reste la base ; structurer le contenu pour qu'un passage précis soit extractible et citable devient le complément indispensable.",
          ],
        },
        {
          h: "llms.txt : utile ailleurs, ignoré par Google",
          p: [
            "Le fichier /llms.txt a fait beaucoup de bruit en 2025. La réalité est plus nuancée : Google a confirmé explicitement que Google Search — y compris ses fonctionnalités génératives — ignore totalement ce fichier. Ce n'est ni une pénalité, ni un bonus, ça ne change rien pour Google.",
            "Ce fichier peut rester pertinent pour d'autres crawlers IA qui n'indexent pas comme Google. La recommandation raisonnable : créer un /llms.txt simple à la racine du site si cela prend cinq minutes, sans jamais le considérer comme un levier de visibilité prioritaire.",
          ],
        },
        {
          h: "Structurer le contenu pour être cité par passage",
          p: [
            "C'est le levier le plus rentable. Les IA ne citent pas des pages entières, elles extraient des passages autonomes de 134 à 167 mots en moyenne. Concrètement : ouvrir chaque section par une réponse directe dans les 40 à 60 premiers mots, utiliser des titres formulés comme des questions, créer des blocs de texte qui ont un sens extraits seuls, et ajouter des chiffres précis plutôt que des affirmations vagues.",
            "44 % des citations IA proviennent des 30 % premiers du contenu d'une page — ne jamais enterrer l'information utile après plusieurs paragraphes d'introduction. Détail technique à ne pas négliger : les crawlers IA n'exécutent pas JavaScript, le rendu côté serveur est un prérequis pour être lu.",
          ],
        },
        {
          h: "Schema markup et présence de marque",
          p: [
            "Le balisage structuré (schema.org) reste un signal de compréhension utile, sans être un levier de citation à lui seul. Mais le signal qui pèse le plus lourd n'est pas technique : une étude Ahrefs sur 75 000 marques a montré que les mentions de marque corrèlent trois fois plus fortement avec la visibilité IA que les backlinks classiques.",
            "Les IA génératives citent massivement Wikipedia, Reddit, YouTube et LinkedIn. Une mention organique dans un thread pertinent, une présence sur des annuaires et comparateurs logiciels, ou une chaîne YouTube modeste pèsent souvent plus que dix backlinks SEO classiques. La fraîcheur du contenu compte aussi : un contenu de moins de trois mois a environ trois fois plus de chances d'être cité qu'un contenu laissé sans mise à jour depuis six mois.",
          ],
        },
        {
          h: "Mesurer sa visibilité IA",
          p: [
            "Il n'existe pas encore d'équivalent universel de Search Console pour la visibilité dans les réponses IA. Trois approches pragmatiques : tester manuellement les requêtes qu'un client poserait à ChatGPT, Perplexity et Google AI Mode ; utiliser un outil de suivi des mentions de marque sur plusieurs moteurs IA ; et surveiller dans Google Analytics le trafic référent provenant de chatgpt.com, perplexity.ai ou copilot.microsoft.com — le signal le plus fiable qu'une stratégie GEO porte ses fruits.",
            "Seuls 11 % des domaines sont cités à la fois par ChatGPT et par Google AI Overviews pour une même requête : la mesure doit rester par plateforme, pas agrégée. L'investissement le plus rentable pour démarrer reste le plus simple : réécrire les premières lignes de chaque page pour qu'elles répondent directement à la question de l'utilisateur, en moins de soixante mots.",
          ],
        },
      ],
      links: [],
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
          h: "The studio's default reflex",
          p: [
            "La Fabrik Numérique doesn't only build sites and software for clients. Part of the studio's time also goes into solving its own recurring pains — repetitive tasks, tools that don't exist yet, or exist but poorly.",
            "Two pieces of software came out of that: VoxCut and InOneShot. Both published on the Microsoft Store, both born from a real, concrete need rather than a market idea.",
          ],
        },
        {
          h: "VoxCut — cutting silences without losing your afternoon",
          p: [
            "While editing podcasts and interviews, the same chore kept coming back: spotting silences in the timeline and cutting them out by hand, minute after minute.",
            "VoxCut automatically detects and removes silences from an audio or video file — 100% local, files never leave the machine. It exports directly to XML/EDL for Premiere Pro and DaVinci Resolve, processes files in batch, and handles files up to 5 GB without flinching.",
            "The result: an edit that used to take an hour of manual cutting now takes a few minutes.",
          ],
        },
        {
          h: "InOneShot — PDF mail-merge without a Word masterclass",
          p: [
            "Another classic chore: generating dozens of personalized documents (certificates, contracts, invitations) from a PDF template and an Excel spreadsheet.",
            "InOneShot works by drag-and-drop: you place fields — columns, dates, signatures, QR codes — directly on the PDF preview, then the app generates every filled document in one go.",
            "Hundreds of personalized PDFs, one click, straight from a spreadsheet.",
          ],
        },
        {
          h: "The connection to the studio",
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
          h: "How PDF mail merge works",
          p: [
            "A mail merge combines a template — the fixed layout — with a data source, your spreadsheet, which varies. Each row becomes one document: the “Name” column fills the name field, the “Amount” column fills the amount field, and so on, repeated automatically for every row.",
          ],
        },
        {
          h: "The manual way, and what it really costs",
          p: [
            "Doing it by hand means opening the template, copy-pasting each value from Excel, exporting to PDF, and renaming the file — row after row, starting over at the first typo. Across a hundred documents, that's easily half a day lost, with a real risk of mistakes.",
          ],
        },
        {
          h: "The automatic way with InOneShot",
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
          h: "GEO isn't a revolution, it's an extension of SEO",
          p: [
            "Since 2025, a growing share of searches no longer end on a page of blue links, but on an answer generated directly by an AI. Google AI Overviews already touches nearly half of all queries, ChatGPT has 900 million weekly users, and Perplexity handles over 500 million queries a month. For a developer selling an app, ranking well on Google no longer guarantees being cited when someone asks an AI 'what's the best software for X?'.",
            "One misconception needs correcting first: GEO (Generative Engine Optimization) doesn't replace SEO, it extends it. Google states this explicitly: optimizing for generative search is still SEO. 92% of citations in Google AI Overviews come from pages already in the top 10 of classic results — but 47% come from pages ranked below position 5. Ranking well remains the foundation; structuring content so a specific passage is extractable and citable is now the essential complement.",
          ],
        },
        {
          h: "llms.txt: useful elsewhere, ignored by Google",
          p: [
            "The /llms.txt file made a lot of noise in 2025. The reality is more nuanced: Google has explicitly confirmed that Google Search — including its generative features — completely ignores this file. It's neither a penalty nor a bonus; it changes nothing for Google.",
            "The file can still be relevant for other AI crawlers that don't index the way Google does. The reasonable approach: create a simple /llms.txt at the site root if it takes five minutes, but never treat it as a priority visibility lever.",
          ],
        },
        {
          h: "Structuring content to be cited by passage",
          p: [
            "This is the most cost-effective lever. AIs don't cite entire pages, they extract self-contained passages averaging 134 to 167 words. In practice: open every section with a direct answer within the first 40 to 60 words, use question-phrased headings, write blocks that make sense when extracted alone, and include specific numbers instead of vague claims.",
            "44% of AI citations come from the first 30% of a page's content — never bury the useful answer after several paragraphs of introduction. One technical detail not to overlook: AI crawlers don't execute JavaScript, so server-side rendering is a prerequisite to being read at all.",
          ],
        },
        {
          h: "Schema markup and brand presence",
          p: [
            "Structured data (schema.org) remains a useful comprehension signal, though not a citation lever on its own. But the signal that matters most isn't technical: an Ahrefs study of 75,000 brands found that brand mentions correlate three times more strongly with AI visibility than classic backlinks.",
            "Generative AIs heavily cite Wikipedia, Reddit, YouTube, and LinkedIn. An organic mention in a relevant thread, a listing on software directories and comparison sites, or even a modest YouTube channel often outweighs ten classic SEO backlinks. Content freshness matters too: content under three months old is roughly three times more likely to be cited than content left untouched for six months or more.",
          ],
        },
        {
          h: "Measuring your AI visibility",
          p: [
            "There's no universal equivalent of Search Console yet for AI-answer visibility. Three practical approaches: manually test the queries a customer would ask ChatGPT, Perplexity, and Google AI Mode; use a brand-mention tracking tool across several AI engines; and watch Google Analytics for referral traffic from chatgpt.com, perplexity.ai, or copilot.microsoft.com — the most reliable signal that a GEO strategy is paying off.",
            "Only 11% of domains are cited by both ChatGPT and Google AI Overviews for the same query, so measurement needs to stay per-platform rather than aggregated. The highest-return starting move remains the simplest one: rewrite the opening lines of every page so they answer the user's question directly, in under sixty words.",
          ],
        },
      ],
      links: [],
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

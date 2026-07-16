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
        { label: "Découvrir VoxCut → voxcutpro.com", url: "https://voxcutpro.com" },
        { label: "Découvrir InOneShot → inoneshot.fr", url: "https://inoneshot.fr" },
      ],
    },
    {
      id: "pdf-mail-merge-excel",
      slug: "publipostage-pdf-depuis-excel",
      title: "Comment générer des centaines de PDF personnalisés depuis un Excel (sans copier-coller)",
      date: "2026-06-28",
      dateLabel: "28 juin 2026",
      excerpt:
        "Attestations, factures, courriers, diplômes : voici comment produire un PDF par ligne de votre tableur, automatiquement, sans recommencer cent fois.",
      tags: ["InOneShot", "Automatisation", "Tutoriel"],
      canonicalUrl: "https://www.inoneshot.fr/blog/publipostage-pdf-depuis-excel",
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
        { label: "Lire l'article original sur inoneshot.fr →", url: "https://www.inoneshot.fr/blog/publipostage-pdf-depuis-excel" },
        { label: "Découvrir InOneShot → inoneshot.fr", url: "https://inoneshot.fr" },
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
        { label: "Discover VoxCut → voxcutpro.com", url: "https://voxcutpro.com" },
        { label: "Discover InOneShot → inoneshot.fr", url: "https://inoneshot.fr" },
      ],
    },
    {
      id: "remove-podcast-silences",
      slug: "how-to-remove-silences-from-a-podcast",
      title: "How to Automatically Remove Silences From a Podcast (Without Manual Editing)",
      date: "2026-06-17",
      dateLabel: "June 17, 2026",
      excerpt:
        "Silences and dead air can eat 10–20% of an episode. Here's how to detect and cut them automatically, and edit your podcast in a fraction of the time.",
      tags: ["VoxCut", "Audio", "Tutorial"],
      canonicalUrl: "https://voxcutpro.com/blog/how-to-remove-silences-from-a-podcast",
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
        { label: "Read the original article on voxcutpro.com →", url: "https://voxcutpro.com/blog/how-to-remove-silences-from-a-podcast" },
        { label: "Discover VoxCut → voxcutpro.com", url: "https://voxcutpro.com" },
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
        { label: "Read the original article on inoneshot.fr →", url: "https://www.inoneshot.fr/blog/generate-pdfs-from-excel" },
        { label: "Discover InOneShot → inoneshot.fr", url: "https://inoneshot.fr" },
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

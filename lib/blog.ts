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

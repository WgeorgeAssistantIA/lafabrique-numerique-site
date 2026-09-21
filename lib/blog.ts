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
    {
      id: "business-visible-ai-search",
      slug: "rendre-son-entreprise-visible-dans-les-moteurs-de-recherche-ia",
      title:
        "Comment rendre son entreprise visible dans les moteurs de recherche IA ?",
      date: "2026-09-21",
      dateLabel: "21 septembre 2026",
      excerpt:
        "Un client qui demande à ChatGPT « quelle agence pour créer mon site » ou « quel logiciel pour gérer mes factures » ne voit jamais les dix liens bleus de Google. Voici comment fonctionne réellement la visibilité dans les moteurs de recherche IA, et comment une entreprise ou une PME peut la construire, étape par étape.",
      tags: ["SEO", "GEO", "Entreprise"],
      sections: [
        {
          h: "Introduction",
          p: [
            "De plus en plus de recherches ne se terminent plus sur une page de résultats Google, mais sur une réponse rédigée directement par une intelligence artificielle. ChatGPT, Gemini, Perplexity ou Google AI Overviews reformulent la question de l'utilisateur, sélectionnent quelques sources, et livrent une synthèse — sans que l'internaute ait besoin de cliquer sur un lien. Pour une entreprise, cela change la nature même de la compétition en ligne : il ne suffit plus d'être bien référencé sur Google, il faut aussi être compris, jugé crédible et cité par des moteurs de réponse qui ne fonctionnent pas comme un moteur de recherche classique.",
            "Ce changement porte un nom : le GEO, pour Generative Engine Optimization. Ce n'est pas une discipline qui remplace le SEO traditionnel, mais un prolongement qui s'appuie sur les mêmes fondations — autorité, structure, contenu de qualité — tout en ajoutant des exigences propres à la manière dont une IA lit, résume et cite une page. Cet article détaille pourquoi la visibilité dans les moteurs de recherche IA devient un enjeu concret pour toute entreprise, comment ces moteurs sélectionnent leurs sources, et surtout comment une PME peut construire, mesurer et améliorer sa présence dans ces réponses, sans se limiter à quelques astuces superficielles.",
          ],
        },
        {
          h: "Pourquoi la visibilité dans les IA devient-elle un nouvel enjeu pour les entreprises ?",
          p: [
            "Le volume d'usage à lui seul justifie d'y prêter attention. ChatGPT compte plusieurs centaines de millions d'utilisateurs actifs chaque semaine, Perplexity traite des centaines de millions de requêtes par mois, et Google AI Overviews s'affiche désormais sur une part croissante des recherches classiques, y compris commerciales. Un dirigeant de PME, un acheteur B2B ou un particulier qui pose une question du type « quel logiciel pour automatiser mes factures » ou « quelle agence web dans ma région » obtient aujourd'hui une réponse synthétique, avec au mieux trois ou quatre sources citées — et non plus dix liens à comparer soi-même.",
            "Cette réduction du nombre de sources visibles change la mécanique de la concurrence. Sur Google, une entreprise mal classée en page trois reste techniquement accessible à qui veut creuser. Dans une réponse générative, ne pas faire partie des sources citées équivaut à une invisibilité presque totale sur cette requête précise : l'utilisateur ne voit jamais la liste complète des candidats, seulement la sélection opérée par l'IA.",
            "Ce nouvel enjeu touche particulièrement les entreprises de services et les éditeurs de logiciels, dont les clients formulent de plus en plus leurs recherches sous forme de questions complètes plutôt que de mots-clés isolés — un format qui correspond exactement à la manière dont les moteurs de réponse IA interrogent le web. Ignorer ce canal revient à laisser le champ libre aux concurrents qui, eux, ont déjà structuré leur contenu pour y répondre.",
            "Enfin, la visibilité IA n'est pas un sujet réservé aux grandes marques disposant de budgets marketing importants. Les moteurs génératifs valorisent la précision et la pertinence d'une réponse bien plus que la taille de l'entreprise qui la publie — ce qui ouvre, pour une PME bien organisée, une fenêtre d'opportunité réelle face à des concurrents plus gros mais moins structurés sur ce terrain.",
            "Ce nouvel enjeu s'ajoute au SEO traditionnel, il ne le remplace pas. Une entreprise qui investit depuis des années dans son référencement naturel dispose déjà d'un socle solide de contenu, d'autorité de domaine et de confiance technique — autant de signaux que les moteurs de réponse IA réutilisent en grande partie pour choisir leurs sources. Repartir de zéro n'est donc jamais nécessaire ; le travail consiste plutôt à faire évoluer ce qui existe déjà pour qu'il serve aussi ce nouveau canal, sans sacrifier ce qui fonctionne pour Google.",
            "À l'inverse, une entreprise qui n'a encore rien construit en matière de SEO ou de contenu ne doit pas voir le GEO comme un raccourci pour sauter cette étape. Les deux avancent ensemble : un site sans historique, sans autorité de domaine et sans contenu de fond aura autant de mal à être cité par une IA qu'à être bien classé sur Google, pour les mêmes raisons de fond — le manque de signaux de confiance accumulés dans le temps.",
          ],
        },
        {
          h: "Comment les moteurs IA trouvent-ils et sélectionnent-ils les informations ?",
          p: [
            "Un moteur de réponse IA ne fonctionne pas comme un moteur de recherche classique. Il ne se contente pas de classer des pages par pertinence : il doit d'abord comprendre la question posée, identifier les sources les plus fiables sur le sujet, en extraire les passages utiles, puis reformuler une réponse cohérente en citant ses sources. Chacune de ces étapes repose sur des mécanismes différents de ceux du SEO traditionnel, même si les deux se recoupent largement.",
            "La première étape, la découverte, s'appuie encore beaucoup sur l'indexation classique : la plupart des moteurs IA — y compris ChatGPT lorsqu'il effectue une recherche web — utilisent des index construits à partir du même type de crawl que Google ou Bing. Un site mal indexé, avec des erreurs techniques ou un contenu bloqué au rendu JavaScript, part donc avec un désavantage dès cette étape, puisque les crawlers IA n'exécutent généralement pas le JavaScript et doivent trouver le contenu directement dans le HTML servi.",
            "La deuxième étape, la sélection, privilégie les sources jugées faisant autorité sur un sujet donné : sites déjà bien positionnés sur des requêtes proches, domaines mentionnés fréquemment par d'autres sources indépendantes, contenu récent plutôt que daté. C'est ici que la notion d'autorité et de crédibilité prend tout son sens — un site inconnu, sans mentions extérieures, aura plus de mal à être retenu, même si son contenu est techniquement correct.",
            "Cette logique de sélection explique aussi pourquoi certains moteurs IA citent très souvent des plateformes tierces plutôt que le site officiel d'une entreprise : Wikipedia, Reddit, un annuaire professionnel reconnu ou une chaîne YouTube spécialisée offrent des garanties de neutralité et de recoupement que le site d'une entreprise, par nature partial sur ses propres produits, ne peut pas offrir seul. Une bonne visibilité IA repose donc rarement sur un seul canal : elle se construit sur un ensemble de points de présence cohérents entre eux.",
            "La troisième étape, l'extraction, est la plus spécifique au GEO : l'IA ne récupère pas une page entière, elle en extrait un passage précis — souvent entre 100 et 200 mots — qui répond directement à la question posée. Un contenu écrit en blocs autonomes, avec une réponse claire au début de chaque section, a beaucoup plus de chances d'être extrait proprement qu'un texte narratif où l'information utile est diluée entre plusieurs paragraphes.",
            "Une quatrième étape, moins visible mais tout aussi déterminante, intervient au moment de la génération de la réponse elle-même : l'IA recoupe souvent plusieurs sources entre elles pour vérifier la cohérence d'une information avant de la citer. Un chiffre ou une affirmation qui n'apparaît que sur un seul site, sans confirmation ailleurs, a moins de chances d'être repris qu'une information cohérente avec ce que disent déjà d'autres sources reconnues sur le même sujet — d'où l'importance, encore une fois, des mentions de marque et de la cohérence du discours d'une entreprise à travers le web.",
          ],
        },
        {
          h: "Comment optimiser son site pour le GEO et le SEO ?",
          p: [
            "Optimiser un site pour le GEO commence toujours par les fondations du SEO classique : un site rapide, accessible en HTTPS, sans erreurs d'indexation, avec une architecture claire et un contenu accessible sans JavaScript côté serveur. Rien de ce qui suit ne fonctionne si ces bases techniques ne sont pas en place — le SEO pour les IA n'est pas une alternative au référencement naturel, il en est le prolongement direct.",
            "Sur cette base, trois leviers spécifiques font la différence pour le GEO. D'abord, les données structurées (schema.org) : balisage Organization, Article, FAQ ou Product selon les pages, qui aide les moteurs IA à comprendre sans ambiguïté qui parle, de quoi, et avec quelle autorité. Ce n'est pas un levier de citation à lui seul, mais il réduit le risque de mauvaise interprétation du contenu par une IA.",
            "Ensuite, la structure du contenu lui-même : des titres H2 formulés comme de vraies questions plutôt que des intitulés marketing, des réponses directes dans les cinquante premiers mots de chaque section, et des paragraphes qui ont un sens même sortis de leur contexte. C'est le changement le plus rentable et le plus rapide à mettre en œuvre sur un site déjà existant, puisqu'il ne demande pas de refonte technique, seulement une réécriture ciblée des pages les plus stratégiques.",
            "Enfin, la fraîcheur du contenu : un contenu mis à jour régulièrement, avec une date visible, a statistiquement plus de chances d'être repris qu'un contenu laissé à l'identique depuis plusieurs années. Pour une entreprise, cela justifie de revoir ses pages de service et ses articles de blog les plus stratégiques au moins une fois par an, plutôt que de les publier une fois et de les oublier.",
            "Un dernier point technique mérite d'être vérifié avant tout le reste : le fichier robots.txt et les règles d'accès du site. Certains crawlers IA (GPTBot, PerplexityBot, Google-Extended, entre autres) peuvent être bloqués par erreur lors d'une configuration de sécurité trop large, ce qui exclut le site de leur index sans que personne ne s'en aperçoive. Un simple audit de ces règles d'accès, à refaire à chaque changement d'hébergeur ou de CMS, évite de travailler sur du contenu que ces moteurs ne pourront de toute façon jamais lire.",
          ],
        },
        {
          h: "Quelles stratégies de contenu permettent d'améliorer sa visibilité dans les IA ?",
          p: [
            "La stratégie de contenu la plus efficace pour le référencement dans ChatGPT et les autres moteurs de réponse consiste à traiter chaque page comme la réponse à une question précise, plutôt que comme une vitrine générale. Une page « Nos services » qui liste dix prestations sans détail est rarement citée ; dix pages, chacune répondant à une question métier précise (« combien coûte X », « comment fonctionne Y », « quand faut-il Z »), le sont beaucoup plus souvent.",
            "Les contenus les plus cités partagent une caractéristique commune : ils sont écrits par une entité qui démontre une expertise réelle sur le sujet, avec des exemples concrets, des chiffres vérifiables et des cas pratiques plutôt que des affirmations générales. C'est ce que la démarche E-E-A-T (expérience, expertise, autorité, fiabilité) formalise déjà pour le SEO classique, et que les moteurs IA reprennent presque à l'identique dans leur sélection de sources.",
            "Les mentions de marque en dehors du site jouent également un rôle central dans cette stratégie. Une étude portant sur plusieurs dizaines de milliers de marques a montré que les mentions organiques — citations sur des forums, annuaires sectoriels, articles tiers, vidéos YouTube — corrèlent plus fortement avec la visibilité dans les IA que les backlinks classiques. Pour une PME, cela justifie d'investir du temps dans les annuaires professionnels pertinents, les comparatifs sectoriels et une présence active sur LinkedIn, en plus du travail sur son propre site.",
            "Les avis clients constituent un autre signal souvent négligé. Les moteurs IA traitent les avis publiés sur Google, Trustpilot ou des plateformes sectorielles comme une preuve sociale supplémentaire, presque au même titre qu'une source éditoriale, surtout lorsqu'ils sont nombreux, récents et détaillés. Une entreprise qui encourage systématiquement ses clients satisfaits à laisser un avis construit, sans le savoir, l'un des signaux de crédibilité les plus lus par les IA génératives.",
            "Enfin, une stratégie de contenu durable pour le GEO doit rester centrée sur l'utilité réelle pour le lecteur humain. Écrire uniquement pour plaire à un algorithme produit des textes artificiels, rapidement identifiables et peu utiles — et les moteurs IA, comme Google, pénalisent de plus en plus ce type de contenu. Le bon réflexe reste de répondre à une vraie question, avec une vraie expertise, en s'assurant ensuite que la forme facilite l'extraction par une IA.",
            "Le rythme de publication compte également, mais pas de la façon dont on l'imagine souvent. Il ne s'agit pas de publier un article par semaine à tout prix, mais de constituer progressivement une base de contenu qui couvre l'ensemble des questions qu'un client se pose réellement à chaque étape de sa décision — avant l'achat, pendant la comparaison, après la mise en place. Une entreprise qui possède dix pages solides répondant chacune à une question précise construit une autorité plus durable qu'une entreprise qui publie cinquante articles génériques jamais mis à jour.",
          ],
        },
        {
          h: "Comment mesurer sa visibilité dans ChatGPT, Gemini et les autres moteurs IA ?",
          p: [
            "Contrairement au SEO classique, il n'existe pas encore d'équivalent universel de Google Search Console pour mesurer précisément sa visibilité dans les réponses génératives. Cela ne veut pas dire que la mesure est impossible : trois approches complémentaires donnent une vision fiable, même sans outil dédié.",
            "La première consiste à tester manuellement les questions qu'un client poserait réellement à ChatGPT, Gemini ou Perplexity, et à noter si l'entreprise apparaît parmi les sources citées, sous quelle formulation, et avec quel niveau de détail. Cette méthode manuelle, répétée régulièrement sur une liste fixe de questions, permet de suivre une évolution dans le temps, même de façon approximative.",
            "La deuxième consiste à surveiller, dans Google Analytics ou tout autre outil de mesure d'audience, le trafic référent en provenance de domaines comme chatgpt.com, perplexity.ai ou copilot.microsoft.com. Ce trafic reste souvent faible en volume absolu, mais c'est le signal le plus concret qu'une stratégie GEO produit des résultats mesurables, puisqu'il s'agit d'utilisateurs réels ayant cliqué sur un lien cité dans une réponse IA.",
            "La troisième consiste à s'appuyer sur des outils spécialisés de suivi des mentions de marque à travers plusieurs moteurs IA, qui commencent à émerger sur le marché. Ils restent moins matures que les outils SEO traditionnels, mais permettent d'automatiser une partie du travail de veille et de comparer sa visibilité à celle des concurrents directs, requête par requête.",
            "Il est important de mesurer cette visibilité plateforme par plateforme plutôt que de façon agrégée : une entreprise peut très bien être citée régulièrement par Perplexity et rester invisible sur ChatGPT pour la même question, les deux moteurs ne s'appuyant pas exactement sur les mêmes sources ni les mêmes critères de sélection. Suivre un tableau simple — plateforme, question testée, date, résultat — suffit largement pour une PME qui débute, sans nécessiter d'outil payant dès le départ.",
          ],
        },
        {
          h: "Conclusion",
          p: [
            "La visibilité dans les moteurs de recherche IA n'est pas un chantier séparé du référencement naturel : c'est son extension logique, avec des exigences supplémentaires propres à la manière dont une IA sélectionne, extrait et cite ses sources. Une entreprise qui possède déjà un site bien structuré, un contenu de qualité et une présence extérieure crédible dispose d'une base solide ; il lui reste à adapter la forme de son contenu — questions, réponses directes, données structurées — pour que cette base serve aussi bien un lecteur humain qu'un moteur génératif.",
            "Pour une PME, l'essentiel n'est pas de courir après chaque nouveauté annoncée sur le GEO, mais de construire méthodiquement ce qui compte réellement : être identifiable, compréhensible, crédible et suffisamment documentée sur le web. C'est un travail de fond, qui rejoint directement les compétences déjà mobilisées en SEO, en contenu et en stratégie digitale — et c'est précisément le terrain sur lequel La Fabrik Numérique accompagne les entreprises qui veulent rester visibles, que la recherche se termine sur dix liens bleus ou sur une seule réponse générée par une IA.",
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
    {
      id: "business-visible-ai-search",
      slug: "how-to-make-your-business-visible-in-ai-search-engines",
      title: "How to Make Your Business Visible in AI Search Engines",
      date: "2026-09-21",
      dateLabel: "September 21, 2026",
      excerpt:
        "A customer who asks ChatGPT 'which agency should build my website' or 'what software handles my invoicing' never sees Google's ten blue links. Here's how visibility in AI search engines actually works, and how a business or SMB can build it step by step.",
      tags: ["SEO", "GEO", "Business"],
      sections: [
        {
          h: "Introduction",
          p: [
            "A growing share of searches no longer end on a page of Google results, but on an answer written directly by an artificial intelligence. ChatGPT, Gemini, Perplexity, and Google AI Overviews rephrase the user's question, select a handful of sources, and deliver a synthesized answer — without the user ever needing to click a link. For a business, this changes the very nature of online competition: ranking well on Google is no longer enough; a business now also needs to be understood, judged credible, and cited by response engines that don't work like a classic search engine.",
            "This shift has a name: GEO, or Generative Engine Optimization. It isn't a discipline that replaces traditional SEO, but an extension that builds on the same foundations — authority, structure, quality content — while adding requirements specific to how an AI reads, summarizes, and cites a page. This article breaks down why visibility in AI search engines is becoming a real concern for any business, how these engines select their sources, and above all how an SMB can build, measure, and improve its presence in these answers, beyond a handful of surface-level tricks.",
          ],
        },
        {
          h: "Why is visibility in AI engines becoming a new concern for businesses?",
          p: [
            "Usage volume alone justifies paying attention. ChatGPT counts several hundred million weekly active users, Perplexity handles hundreds of millions of queries a month, and Google AI Overviews now appears on a growing share of classic searches, including commercial ones. A business owner, a B2B buyer, or an individual asking 'what software automates my invoicing' or 'which web agency near me' today gets a synthesized answer, with at best three or four cited sources — not ten links to compare on their own.",
            "This shrinking of visible sources changes the mechanics of competition. On Google, a business ranked poorly on page three is still technically reachable by anyone willing to dig. In a generative answer, not being among the cited sources amounts to near-total invisibility for that specific query: the user never sees the full list of candidates, only the AI's selection.",
            "This new concern particularly affects service businesses and software vendors, whose customers increasingly phrase their searches as full questions rather than isolated keywords — a format that matches exactly how AI response engines query the web. Ignoring this channel means leaving the field open to competitors who have already structured their content to answer it.",
            "Finally, AI visibility isn't a topic reserved for large brands with big marketing budgets. Generative engines value the precision and relevance of an answer far more than the size of the business publishing it — which opens a real window of opportunity for a well-organized SMB against bigger but less structured competitors on this front.",
            "This new concern adds to traditional SEO; it doesn't replace it. A business that has invested in organic search for years already has a solid base of content, domain authority, and technical trust — signals that AI response engines largely reuse when choosing their sources. Starting from scratch is never necessary; the work is instead about evolving what already exists so it also serves this new channel, without sacrificing what already works for Google. Conversely, a business with no SEO or content history shouldn't see GEO as a shortcut past that step: the two move together, and a site with no track record will struggle to be cited by an AI for the same underlying reason it struggles to rank on Google — a lack of trust signals built up over time.",
            "There's also a competitive-intelligence angle worth considering early on. Testing the same set of questions across ChatGPT, Gemini, and Perplexity often reveals which competitors are already being cited, and for which specific questions — information that's harder to gather from classic Google rankings alone, since generative answers make the current 'winners' on a given query far more visible than a page of ten blue links ever did. Reviewing that competitive picture before writing a single new page avoids duplicating content that's already well covered elsewhere and highlights the genuine gaps worth targeting first.",
          ],
        },
        {
          h: "How do AI engines find and select information?",
          p: [
            "An AI response engine doesn't work like a classic search engine. It doesn't just rank pages by relevance: it first has to understand the question asked, identify the most reliable sources on the topic, extract the useful passages, and then generate a coherent answer while citing its sources. Each of these steps relies on mechanics that differ from traditional SEO, even though the two overlap significantly.",
            "The first step, discovery, still relies heavily on classic indexing: most AI engines — including ChatGPT when it performs a web search — use indexes built from the same kind of crawl as Google or Bing. A poorly indexed site, with technical errors or content locked behind JavaScript rendering, starts at a disadvantage right from this step, since AI crawlers generally don't execute JavaScript and need to find content directly in the served HTML.",
            "The second step, selection, favors sources considered authoritative on a given topic: sites already ranking well for related queries, domains mentioned frequently by other independent sources, recent content rather than stale content. This is where authority and credibility matter most — an unknown site with no outside mentions will struggle to be picked, even if its content is technically correct.",
            "This selection logic also explains why some AI engines cite third-party platforms more often than a business's own site: Wikipedia, Reddit, a recognized professional directory, or a specialized YouTube channel offer guarantees of neutrality and cross-verification that a business's own site, inherently biased toward its own products, can't provide alone. Strong AI visibility rarely rests on a single channel — it's built on a set of consistent, cross-referencing points of presence.",
            "The third step, extraction, is the most GEO-specific: the AI doesn't pull an entire page, it extracts a precise passage — often between 100 and 200 words — that directly answers the question asked. Content written in self-contained blocks, with a clear answer at the start of each section, has a much better chance of being extracted cleanly than a narrative text where the useful information is spread across several paragraphs.",
            "A fourth, less visible step matters just as much during the answer-generation stage itself: the AI often cross-checks several sources against each other to confirm an information's consistency before citing it. A number or claim that appears on only one site, with no confirmation elsewhere, has less chance of being picked up than information consistent with what other recognized sources already say on the same topic — another reason brand mentions and message consistency across the web matter so much.",
          ],
        },
        {
          h: "How do you optimize a site for GEO and SEO?",
          p: [
            "Optimizing a site for GEO always starts with the foundations of classic SEO: a fast site, served over HTTPS, free of indexing errors, with a clear architecture and content accessible without client-side JavaScript. None of what follows works if these technical basics aren't in place — SEO for AI engines isn't an alternative to organic search, it's a direct extension of it.",
            "On top of that base, three specific levers make the difference for GEO. First, structured data (schema.org): Organization, Article, FAQ, or Product markup depending on the page, which helps AI engines unambiguously understand who is speaking, about what, and with what authority. It isn't a citation lever on its own, but it reduces the risk of an AI misreading the content.",
            "Second, the structure of the content itself: H2 headings phrased as real questions rather than marketing labels, direct answers within the first fifty words of each section, and paragraphs that make sense even pulled out of context. This is the most cost-effective and fastest change to make on an existing site, since it doesn't require a technical overhaul — just a targeted rewrite of the most strategic pages.",
            "Third, content freshness: content updated regularly, with a visible date, statistically has a better chance of being picked up than content left untouched for years. For a business, that justifies reviewing its most strategic service pages and blog posts at least once a year, rather than publishing once and forgetting about them.",
            "One last technical point is worth checking before anything else: the robots.txt file and the site's access rules. Some AI crawlers (GPTBot, PerplexityBot, Google-Extended, among others) can end up blocked by mistake during an overly broad security configuration, which excludes the site from their index without anyone noticing. A quick audit of these access rules — repeated every time hosting or the CMS changes — avoids spending effort on content these engines will never be able to read in the first place.",
          ],
        },
        {
          h: "What content strategies improve visibility in AI engines?",
          p: [
            "The most effective content strategy for visibility in ChatGPT and other response engines is to treat every page as the answer to a specific question, rather than a general showcase. A 'Our Services' page listing ten offerings with no detail is rarely cited; ten pages, each answering one precise business question ('how much does X cost', 'how does Y work', 'when do you need Z'), are cited far more often.",
            "The most frequently cited content shares a common trait: it's written by an entity that demonstrates real expertise on the topic, with concrete examples, verifiable numbers, and practical cases rather than general claims. This is essentially what the E-E-A-T framework (experience, expertise, authoritativeness, trustworthiness) already formalizes for classic SEO, and which AI engines apply almost identically when selecting sources.",
            "Brand mentions outside the site also play a central role in this strategy. A study covering tens of thousands of brands found that organic mentions — citations on forums, industry directories, third-party articles, YouTube videos — correlate more strongly with AI visibility than classic backlinks. For an SMB, that justifies investing time in relevant professional directories, industry comparison sites, and an active LinkedIn presence, alongside the work done on its own site.",
            "Customer reviews are another often-overlooked signal. AI engines treat reviews published on Google, Trustpilot, or industry-specific platforms as an additional form of social proof, almost on par with an editorial source, especially when they're numerous, recent, and detailed. A business that systematically encourages happy customers to leave a review is, without realizing it, building one of the credibility signals generative AIs read most closely.",
            "Finally, a sustainable content strategy for GEO has to stay focused on real usefulness for the human reader. Writing purely to please an algorithm produces artificial text that's quickly spotted and rarely useful — and AI engines, like Google, increasingly penalize that kind of content. The right instinct remains to answer a real question with real expertise, then make sure the format helps an AI extract it cleanly.",
            "Publishing cadence matters too, but not in the way it's often imagined. It isn't about publishing one article a week at any cost, but about gradually building a body of content that covers every question a customer genuinely has at each stage of their decision — before buying, while comparing, after setting something up. A business with ten solid pages each answering one precise question builds more durable authority than one publishing fifty generic articles that are never updated.",
          ],
        },
        {
          h: "How do you measure your visibility in ChatGPT, Gemini, and other AI engines?",
          p: [
            "Unlike classic SEO, there's no universal equivalent of Google Search Console yet for precisely measuring visibility in generative answers. That doesn't mean measurement is impossible: three complementary approaches give a reliable picture, even without a dedicated tool.",
            "The first is to manually test the questions a customer would actually ask ChatGPT, Gemini, or Perplexity, and note whether the business appears among the cited sources, under what phrasing, and with what level of detail. This manual method, repeated regularly against a fixed list of questions, tracks change over time, even approximately.",
            "The second is to watch, in Google Analytics or any other audience measurement tool, referral traffic coming from domains like chatgpt.com, perplexity.ai, or copilot.microsoft.com. This traffic is often low in absolute volume, but it's the most concrete signal that a GEO strategy is producing measurable results, since it represents real users who clicked a link cited in an AI answer.",
            "The third is to rely on specialized brand-mention tracking tools across several AI engines, which are starting to emerge on the market. They remain less mature than traditional SEO tools, but they help automate part of the monitoring work and compare visibility against direct competitors, query by query.",
            "It's important to measure this visibility platform by platform rather than in aggregate: a business can be cited regularly by Perplexity for a given question while remaining invisible on ChatGPT for that same question, since the two engines don't rely on exactly the same sources or selection criteria. A simple tracking sheet — platform, test question, date, result — is more than enough for an SMB getting started, with no need for a paid tool from day one.",
            "It's worth setting expectations correctly on timing, too. Just as with organic SEO, changes made to a site's content and structure rarely translate into new AI citations within days: indexes and training data refresh on their own schedules, and a newly rewritten page may take weeks to surface in a generative answer. Tracking progress over a quarter, rather than a week, gives a far more honest read on whether a GEO effort is actually working.",
          ],
        },
        {
          h: "Conclusion",
          p: [
            "Visibility in AI search engines isn't a separate project from organic search — it's its logical extension, with added requirements specific to how an AI selects, extracts, and cites its sources. A business that already has a well-structured site, quality content, and a credible outside presence has a solid foundation; what's left is adapting the format of its content — questions, direct answers, structured data — so that foundation serves a human reader and a generative engine equally well.",
            "For an SMB, the priority isn't chasing every new GEO trend announced online, but methodically building what actually matters: being identifiable, understandable, credible, and sufficiently documented across the web. It's foundational work, directly connected to skills already used in SEO, content, and digital strategy — and it's exactly the ground on which La Fabrik Numérique helps businesses stay visible, whether a search ends on ten blue links or a single AI-generated answer.",
            "None of this requires abandoning what already works. The businesses that adapt fastest to this shift are rarely the ones that throw out their existing SEO strategy to chase the latest GEO trend — they're the ones that keep refining the same fundamentals: real expertise, genuinely useful content, and a consistent, credible presence across the web, on and off their own site.",
            "The businesses that get this right treat visibility in AI search engines as one more expression of the same discipline that has always mattered online: being genuinely useful to the person asking the question, and structuring that usefulness so it can be found — by a person, a search engine, or an AI reading on their behalf.",
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

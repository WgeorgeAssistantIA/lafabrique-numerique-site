import type { Lang } from "@/lib/i18n";

export const EDITOR_NAME = "William GEORGE";
export const EDITOR_SIREN = "518 251 897";
export const EDITOR_SIRET = "518 251 897 00048";

export const EDITOR_EMAIL = "lafabriknumerique@outlook.com";
export const LAST_UPDATED = "23 juillet 2026";
export const LAST_UPDATED_EN = "July 23, 2026";

export type LegalSection = { h: string; p: string[] };
export type LegalDoc = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

export type LegalContent = {
  backHome: string;
  mentions: LegalDoc;
  privacy: LegalDoc;
  cgv: LegalDoc;
};

const fr: LegalContent = {
  backHome: "← Retour à l'accueil",
  mentions: {
    title: "Mentions légales",
    updated: `Dernière mise à jour : ${LAST_UPDATED}`,
    sections: [
      {
        h: "Éditeur du site",
        p: [
          `Le présent site est édité par La Fabrik Numérique, entreprise individuelle relevant du régime de la micro-entreprise, exploitée par ${EDITOR_NAME}.`,
          `SIREN : ${EDITOR_SIREN} — SIRET : ${EDITOR_SIRET}. Dispensée d'immatriculation au Registre du commerce et des sociétés (RCS) et au Répertoire des métiers (RM).`,
          "TVA non applicable, article 293 B du Code général des impôts.",
          "Adresse postale communiquée sur demande par courriel.",
          `Courriel : ${EDITOR_EMAIL}`,
        ],
      },
      {
        h: "Directeur de la publication",
        p: [`${EDITOR_NAME}, en qualité d'éditeur.`],
      },
      {
        h: "Hébergeur",
        p: [
          "Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.",
          "Site : vercel.com",
        ],
      },
      {
        h: "Propriété intellectuelle",
        p: [
          "L'ensemble des contenus de ce site (textes, identité visuelle, code, illustrations) est, sauf mention contraire, la propriété exclusive de l'éditeur. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.",
        ],
      },
      {
        h: "Données personnelles",
        p: [
          "Le traitement des données personnelles collectées via ce site est détaillé dans la Politique de confidentialité.",
        ],
      },
    ],
  },
  privacy: {
    title: "Politique de confidentialité",
    updated: `Dernière mise à jour : ${LAST_UPDATED}`,
    sections: [
      {
        h: "Responsable du traitement",
        p: [
          `Le responsable du traitement des données est La Fabrik Numérique (${EDITOR_NAME}). Pour toute question relative à vos données, vous pouvez écrire à ${EDITOR_EMAIL}.`,
        ],
      },
      {
        h: "Données collectées",
        p: [
          "Via le formulaire de contact : votre nom, votre adresse email et le contenu de votre message. Ces informations sont fournies volontairement par vous.",
          "Via le formulaire de la page « Atelier secret » (jeu-concours) : votre prénom, votre nom et votre adresse email, ainsi que votre choix d'autoriser ou non l'affichage de votre prénom et de l'initiale de votre nom dans le tableau public des gagnants. Ces informations sont fournies volontairement par vous et ne sont jamais publiées sans votre consentement explicite (case à cocher dédiée).",
          "À des fins techniques, l'hébergeur peut enregistrer des données de connexion (adresse IP, logs serveur) nécessaires au fonctionnement et à la sécurité du site.",
        ],
      },
      {
        h: "Application InOneShot",
        p: [
          "L'application de bureau InOneShot fonctionne entièrement en local : vos fichiers PDF, vos fichiers Excel et le contenu de vos documents ne sont jamais collectés ni transmis à des tiers.",
          "Seules les données strictement nécessaires à l'activation de la licence Pro sont transmises à notre prestataire Lemon Squeezy : votre clé de licence et le nom de votre ordinateur, afin de valider l'activation par appareil. Aucune autre donnée n'est envoyée, et aucune mesure d'audience n'est effectuée dans l'application.",
        ],
      },
      {
        h: "Finalité et base légale",
        p: [
          "Les données du formulaire de contact sont utilisées uniquement pour répondre à votre demande et, le cas échéant, établir une proposition commerciale.",
          "Les données du formulaire « Atelier secret » sont utilisées pour vous attribuer votre récompense (code de réduction), échanger avec vous à ce sujet, et, si vous l'autorisez explicitement, afficher votre prénom et l'initiale de votre nom sur le tableau public des gagnants.",
          "La base légale est votre consentement et l'exécution de mesures précontractuelles prises à votre demande (article 6 du RGPD).",
        ],
      },
      {
        h: "Destinataires et sous-traitants",
        p: [
          "Vos données ne sont jamais vendues. Elles sont uniquement traitées par l'éditeur et par ses sous-traitants techniques : Vercel Inc. (hébergement et stockage technique via son offre KV, reposant sur l'infrastructure Upstash) et Resend (acheminement des emails).",
        ],
      },
      {
        h: "Transfert hors Union européenne",
        p: [
          "Certains sous-traitants (Vercel, Resend, Upstash) sont établis aux États-Unis. Les transferts éventuels sont encadrés par des garanties appropriées (clauses contractuelles types de la Commission européenne et/ou adhésion au Data Privacy Framework).",
        ],
      },
      {
        h: "Durée de conservation",
        p: [
          "Les données issues du formulaire de contact sont conservées pendant la durée nécessaire au traitement de votre demande, puis archivées au maximum 3 ans à compter du dernier contact, avant suppression.",
          "Les données issues du formulaire « Atelier secret » sont conservées le temps de l'opération de jeu-concours puis au maximum 3 ans, à l'exception du prénom et de l'initiale du nom affichés publiquement avec votre consentement, qui restent visibles tant que vous ne demandez pas leur retrait.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "Ce site n'utilise aucun cookie publicitaire ni de mesure d'audience. Seule votre préférence de langue est mémorisée localement dans votre navigateur (stockage technique exempté de consentement).",
        ],
      },
      {
        h: "Vos droits",
        p: [
          "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité de vos données.",
          `Pour exercer ces droits, écrivez à ${EDITOR_EMAIL}. Une réponse vous sera apportée dans un délai d'un mois.`,
        ],
      },
      {
        h: "Réclamation",
        p: [
          "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission nationale de l'informatique et des libertés (CNIL) : www.cnil.fr.",
        ],
      },
      {
        h: "Évolution de la politique",
        p: [
          "Cette politique peut être mise à jour à tout moment. La date de dernière mise à jour figure en haut de page.",
        ],
      },
    ],
  },
  cgv: {
    title: "Conditions Générales de Vente",
    updated: `Dernière mise à jour : ${LAST_UPDATED}`,
    sections: [
      {
        h: "1. Objet",
        p: [
          `Les présentes conditions générales de vente (« CGV ») régissent les prestations de conception et développement de sites web, applications et logiciels sur mesure proposées par La Fabrik Numérique, entreprise individuelle exploitée par ${EDITOR_NAME} (SIRET ${EDITOR_SIRET}), ci-après « le Prestataire ». Toute commande implique l'acceptation pleine et entière des présentes CGV par le client.`,
        ],
      },
      {
        h: "2. Devis et commande",
        p: [
          "Chaque projet fait l'objet d'un devis écrit et gratuit, établi après échange sur les besoins du client. Le devis précise le périmètre de la prestation, le prix, le délai indicatif de livraison et les modalités de paiement (acompte et solde).",
          "La commande est considérée comme ferme à réception du devis signé (ou de son acceptation écrite) et, le cas échéant, du versement de l'acompte prévu.",
        ],
      },
      {
        h: "3. Prix et paiement",
        p: [
          "Les tarifs affichés sur le site (à partir de) sont indicatifs ; le prix définitif est celui indiqué au devis, en euros. Sauf mention contraire au devis, un acompte est demandé à la commande, le solde étant dû à la livraison.",
          "Tout retard de paiement peut entraîner la suspension des travaux en cours jusqu'à régularisation.",
        ],
      },
      {
        h: "4. Délais et livraison",
        p: [
          "Les délais indiqués au devis sont estimatifs et courent à compter de la réception de l'ensemble des éléments nécessaires au projet (contenus, accès, validations du client). Un retard du client dans la fourniture de ces éléments peut décaler d'autant la livraison.",
        ],
      },
      {
        h: "5. Révisions et modifications",
        p: [
          "Le nombre d'allers-retours de révision inclus est précisé au devis. Toute évolution du périmètre initial (fonctionnalités non prévues, changement de direction artistique après validation) fait l'objet d'un devis complémentaire.",
        ],
      },
      {
        h: "6. Propriété intellectuelle",
        p: [
          "Le code source et les livrables développés sur mesure sont cédés au client à réception du paiement intégral de la prestation, sauf mention contraire au devis. Le Prestataire conserve le droit de faire état du projet réalisé dans son portfolio, sauf demande contraire du client.",
          "Les briques logicielles, gabarits ou outils internes réutilisés d'un projet à l'autre restent la propriété du Prestataire.",
        ],
      },
      {
        h: "7. Garantie et maintenance",
        p: [
          "Le Prestataire corrige sans frais tout dysfonctionnement avéré et imputable à son développement, signalé dans les 30 jours suivant la livraison. Au-delà, ou pour toute évolution demandée, une maintenance ou un accompagnement peut être proposé sur devis (voir l'offre « Accompagnement »).",
        ],
      },
      {
        h: "8. Responsabilité",
        p: [
          "La responsabilité du Prestataire, si elle devait être engagée, est limitée au montant effectivement payé par le client pour la prestation concernée. Le Prestataire ne saurait être tenu responsable d'une indisponibilité imputable à un hébergeur ou prestataire tiers choisi par le client.",
        ],
      },
      {
        h: "9. Résiliation",
        p: [
          "En cas d'annulation du projet par le client après le début des travaux, l'acompte versé reste acquis au Prestataire au titre du travail déjà engagé, sauf accord contraire.",
        ],
      },
      {
        h: "10. Droit applicable",
        p: [
          "Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité ; à défaut, les tribunaux français compétents seront seuls saisis.",
        ],
      },
    ],
  },
};

const en: LegalContent = {
  backHome: "← Back to home",
  mentions: {
    title: "Legal notice",
    updated: `Last updated: ${LAST_UPDATED_EN}`,
    sections: [
      {
        h: "Site publisher",
        p: [
          `This site is published by La Fabrik Numérique, a sole proprietorship under the French micro-entreprise regime, operated by ${EDITOR_NAME}.`,
          `SIREN: ${EDITOR_SIREN} — SIRET: ${EDITOR_SIRET}. Exempt from registration with the Trade and Companies Register (RCS) and the Trades Register (RM).`,
          "VAT not applicable, article 293 B of the French General Tax Code.",
          "Postal address available on request by email.",
          `Email: ${EDITOR_EMAIL}`,
        ],
      },
      {
        h: "Publication director",
        p: [`${EDITOR_NAME}, as publisher.`],
      },
      {
        h: "Hosting",
        p: [
          "The site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States.",
          "Website: vercel.com",
        ],
      },
      {
        h: "Intellectual property",
        p: [
          "All content on this site (text, visual identity, code, illustrations) is, unless otherwise stated, the exclusive property of the publisher. Any reproduction or representation, in whole or in part, without prior written authorization is prohibited.",
        ],
      },
      {
        h: "Personal data",
        p: [
          "The processing of personal data collected through this site is detailed in the Privacy Policy.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy policy",
    updated: `Last updated: ${LAST_UPDATED_EN}`,
    sections: [
      {
        h: "Data controller",
        p: [
          `The data controller is La Fabrik Numérique (${EDITOR_NAME}). For any question about your data, you can write to ${EDITOR_EMAIL}.`,
        ],
      },
      {
        h: "Data collected",
        p: [
          "Through the contact form: your name, email address and the content of your message. This information is provided voluntarily by you.",
          "Through the \"Secret workshop\" page form (prize game): your first name, last name and email address, along with your choice to allow or not the display of your first name and last-name initial on the public finders' board. This information is provided voluntarily by you and is never published without your explicit consent (dedicated checkbox).",
          "For technical purposes, the host may record connection data (IP address, server logs) necessary for the operation and security of the site.",
        ],
      },
      {
        h: "InOneShot application",
        p: [
          "The InOneShot desktop application runs entirely locally: your PDF files, your Excel files and the content of your documents are never collected or transmitted to third parties.",
          "Only the data strictly necessary to activate the Pro license is transmitted to our provider Lemon Squeezy: your license key and your computer name, to validate per-device activation. No other data is sent, and no analytics are performed inside the application.",
        ],
      },
      {
        h: "Purpose and legal basis",
        p: [
          "Contact form data is used solely to respond to your request and, where applicable, to prepare a commercial proposal.",
          "\"Secret workshop\" form data is used to grant you your reward (discount code), to communicate with you about it, and, only if you explicitly authorize it, to display your first name and last-name initial on the public finders' board.",
          "The legal basis is your consent and the performance of pre-contractual measures taken at your request (Article 6 GDPR).",
        ],
      },
      {
        h: "Recipients and processors",
        p: [
          "Your data is never sold. It is processed only by the publisher and its technical processors: Vercel Inc. (hosting and technical storage via its KV offering, backed by Upstash infrastructure) and Resend (email delivery).",
        ],
      },
      {
        h: "Transfer outside the European Union",
        p: [
          "Some processors (Vercel, Resend, Upstash) are based in the United States. Any transfers are governed by appropriate safeguards (European Commission Standard Contractual Clauses and/or Data Privacy Framework certification).",
        ],
      },
      {
        h: "Retention period",
        p: [
          "Contact form data is kept for as long as necessary to handle your request, then archived for a maximum of 3 years from the last contact, before deletion.",
          "\"Secret workshop\" form data is kept for the duration of the prize game, then for a maximum of 3 years, except for the first name and last-name initial displayed publicly with your consent, which remain visible until you request their removal.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "This site uses no advertising or analytics cookies. Only your language preference is stored locally in your browser (technical storage, exempt from consent).",
        ],
      },
      {
        h: "Your rights",
        p: [
          "Under the GDPR, you have the right to access, rectify, erase, object to, restrict and port your data.",
          `To exercise these rights, write to ${EDITOR_EMAIL}. You will receive a response within one month.`,
        ],
      },
      {
        h: "Complaint",
        p: [
          "If you believe your rights are not being respected, you may lodge a complaint with the French Data Protection Authority (CNIL): www.cnil.fr.",
        ],
      },
      {
        h: "Policy changes",
        p: [
          "This policy may be updated at any time. The last update date appears at the top of the page.",
        ],
      },
    ],
  },
  cgv: {
    title: "Terms of Sale",
    updated: `Last updated: ${LAST_UPDATED_EN}`,
    sections: [
      {
        h: "1. Purpose",
        p: [
          `These terms of sale (“Terms”) govern the design and development services for custom websites, applications and software offered by La Fabrik Numérique, a sole proprietorship operated by ${EDITOR_NAME} (SIRET ${EDITOR_SIRET}), referred to below as “the Provider”. Any order implies full acceptance of these Terms by the client.`,
        ],
      },
      {
        h: "2. Quote and order",
        p: [
          "Each project is the subject of a free written quote, drawn up after discussing the client's needs. The quote specifies the scope of the service, the price, an indicative delivery timeline, and the payment terms (deposit and balance).",
          "The order is considered firm upon receipt of the signed quote (or its written acceptance) and, where applicable, payment of the agreed deposit.",
        ],
      },
      {
        h: "3. Price and payment",
        p: [
          "The rates shown on the site (\"starting from\") are indicative; the final price is the one stated in the quote, in euros. Unless stated otherwise in the quote, a deposit is requested on order, with the balance due on delivery.",
          "Any late payment may result in ongoing work being suspended until the account is settled.",
        ],
      },
      {
        h: "4. Timeline and delivery",
        p: [
          "Timelines stated in the quote are estimates and run from receipt of all elements needed for the project (content, access, client approvals). A delay by the client in providing these elements may push back delivery accordingly.",
        ],
      },
      {
        h: "5. Revisions and changes",
        p: [
          "The number of included revision rounds is specified in the quote. Any change to the initial scope (unplanned features, art-direction changes after approval) is subject to an additional quote.",
        ],
      },
      {
        h: "6. Intellectual property",
        p: [
          "Source code and custom-built deliverables are transferred to the client upon full payment for the service, unless stated otherwise in the quote. The Provider retains the right to feature the completed project in its portfolio, unless the client requests otherwise.",
          "Software components, templates or internal tools reused across projects remain the Provider's property.",
        ],
      },
      {
        h: "7. Warranty and maintenance",
        p: [
          "The Provider fixes, free of charge, any proven malfunction attributable to its development work, reported within 30 days of delivery. Beyond that, or for any requested change, maintenance or ongoing support can be offered on a quote basis (see the \"Support\" offer).",
        ],
      },
      {
        h: "8. Liability",
        p: [
          "The Provider's liability, if engaged, is limited to the amount actually paid by the client for the relevant service. The Provider cannot be held liable for downtime attributable to a hosting provider or third-party service chosen by the client.",
        ],
      },
      {
        h: "9. Termination",
        p: [
          "If the client cancels the project after work has begun, the deposit paid remains with the Provider for work already performed, unless otherwise agreed.",
        ],
      },
      {
        h: "10. Governing law",
        p: [
          "These Terms are governed by French law. In the event of a dispute, an amicable solution will be sought first; failing that, the competent French courts shall have exclusive jurisdiction.",
        ],
      },
    ],
  },
};

export const legalContent: Record<Lang, LegalContent> = { fr, en };

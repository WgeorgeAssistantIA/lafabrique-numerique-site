import type { Lang } from "@/lib/i18n";

export const EDITOR_NAME = "William GEORGE";
export const EDITOR_SIREN = "518 251 897";
export const EDITOR_SIRET = "518 251 897 00048";

export const EDITOR_EMAIL = "lafabriknumerique@outlook.com";
export const LAST_UPDATED = "25 juin 2026";
export const LAST_UPDATED_EN = "June 25, 2026";

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
          "À des fins techniques, l'hébergeur peut enregistrer des données de connexion (adresse IP, logs serveur) nécessaires au fonctionnement et à la sécurité du site.",
        ],
      },
      {
        h: "Finalité et base légale",
        p: [
          "Les données du formulaire sont utilisées uniquement pour répondre à votre demande et, le cas échéant, établir une proposition commerciale.",
          "La base légale est votre consentement et l'exécution de mesures précontractuelles prises à votre demande (article 6 du RGPD).",
        ],
      },
      {
        h: "Destinataires et sous-traitants",
        p: [
          "Vos données ne sont jamais vendues. Elles sont uniquement traitées par l'éditeur et par ses sous-traitants techniques : Vercel Inc. (hébergement) et Resend (acheminement des emails du formulaire).",
        ],
      },
      {
        h: "Transfert hors Union européenne",
        p: [
          "Certains sous-traitants (Vercel, Resend) sont établis aux États-Unis. Les transferts éventuels sont encadrés par des garanties appropriées (clauses contractuelles types de la Commission européenne et/ou adhésion au Data Privacy Framework).",
        ],
      },
      {
        h: "Durée de conservation",
        p: [
          "Les données issues du formulaire sont conservées pendant la durée nécessaire au traitement de votre demande, puis archivées au maximum 3 ans à compter du dernier contact, avant suppression.",
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
          "For technical purposes, the host may record connection data (IP address, server logs) necessary for the operation and security of the site.",
        ],
      },
      {
        h: "Purpose and legal basis",
        p: [
          "Form data is used solely to respond to your request and, where applicable, to prepare a commercial proposal.",
          "The legal basis is your consent and the performance of pre-contractual measures taken at your request (Article 6 GDPR).",
        ],
      },
      {
        h: "Recipients and processors",
        p: [
          "Your data is never sold. It is processed only by the publisher and its technical processors: Vercel Inc. (hosting) and Resend (delivery of form emails).",
        ],
      },
      {
        h: "Transfer outside the European Union",
        p: [
          "Some processors (Vercel, Resend) are based in the United States. Any transfers are governed by appropriate safeguards (European Commission Standard Contractual Clauses and/or Data Privacy Framework certification).",
        ],
      },
      {
        h: "Retention period",
        p: [
          "Form data is kept for as long as necessary to handle your request, then archived for a maximum of 3 years from the last contact, before deletion.",
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
};

export const legalContent: Record<Lang, LegalContent> = { fr, en };

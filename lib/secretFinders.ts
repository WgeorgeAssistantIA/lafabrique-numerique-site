// Liste de secours / historique du tableau des trouveurs de l'atelier secret.
//
// Depuis la mise en place du formulaire (app/api/secret-finder), les
// nouvelles entrées sont enregistrées automatiquement dans Vercel KV
// (consentement coché par la personne elle-même dans le formulaire — jamais
// besoin de le demander à la main). Ce fichier ne sert plus que de valeurs
// de repli si KV n'est pas configuré, ou pour des entrées historiques
// ajoutées manuellement avant la mise en place du formulaire.
// Format : prénom + initiale ("Maxime D.").

export const FINDERS: Record<"fr" | "en", string[]> = {
  fr: [
    // "Maxime D.",
  ],
  en: [
    // "Jane S.",
  ],
};

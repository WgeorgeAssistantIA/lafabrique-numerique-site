import { Resend } from "resend";
import { getRedis } from "@/lib/redis";

// Reception du formulaire "recompense trouvee" de l'atelier secret :
// - capture prenom/nom/email (jamais expose publiquement)
// - stocke une entree dans Vercel KV pour le tableau public des trouveurs
//   uniquement si consentPublic === true (RGPD : jamais de nom affiche sans
//   accord explicite)
// - notifie par email via Resend (meme pattern que /api/contact)

const CONTACT_TO = process.env.CONTACT_TO ?? "lafabriknumerique@outlook.com";
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "La Fabrik Numérique <contact@lafabriknumerique.fr>";

const MAX_LEN = { name: 100, email: 320 };

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const track = body.track === "fr" || body.track === "en" ? body.track : null;
  const consentPublic = body.consentPublic === true;
  // Honeypot: real users never fill this hidden field.
  const company = typeof body.company === "string" ? body.company.trim() : "";

  if (company) {
    return Response.json({ ok: true });
  }

  if (!firstName || !lastName || !email || !track) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }
  if (
    firstName.length > MAX_LEN.name ||
    lastName.length > MAX_LEN.name ||
    email.length > MAX_LEN.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const now = Date.now();
  const redis = getRedis();
  if (redis) {
    // Registre complet (prive, jamais expose via l'API publique) : sert de
    // base de contacts + tracabilite RGPD (date, consentement donne ou non).
    await redis.rpush(
      "secretFinders:submissions",
      JSON.stringify({ firstName, lastName, email, track, consentPublic, ts: now })
    );
    if (consentPublic) {
      // Entree publique : uniquement le prenom + initiale du nom, jamais l'email.
      const displayName = `${firstName} ${lastName.charAt(0).toUpperCase()}.`;
      await redis.rpush(`secretFinders:public:${track}`, displayName);
    }
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      replyTo: email,
      subject: `🦉 Nouveau trouveur (${track.toUpperCase()}) — atelier secret`,
      html: `
        <p><strong>Prenom :</strong> ${escapeHtml(firstName)}</p>
        <p><strong>Nom :</strong> ${escapeHtml(lastName)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Piste :</strong> ${track === "fr" ? "HIBOU" : "OWL"}</p>
        <p><strong>Accord affichage public :</strong> ${consentPublic ? "Oui" : "Non"}</p>
      `,
      text: `Prenom : ${firstName}\nNom : ${lastName}\nEmail : ${email}\nPiste : ${track}\nAccord affichage public : ${consentPublic ? "Oui" : "Non"}`,
    });
    if (error) {
      console.error("Resend error (secret-finder):", error.message);
      // Ne bloque pas la reponse : l'enregistrement KV a deja reussi.
    }
  }

  return Response.json({ ok: true });
}

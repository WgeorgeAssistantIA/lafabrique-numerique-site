import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { FINDERS as STATIC_FINDERS } from "@/lib/secretFinders";

// Tableau public des trouveurs : liste des prenoms + initiale par piste,
// lue depuis Vercel KV (rempli par /api/secret-finder quand consentPublic
// est coche). Repli sur la liste statique (lib/secretFinders.ts) si KV
// n'est pas configure, pour ne jamais casser la page.

export const dynamic = "force-dynamic";

export async function GET() {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(STATIC_FINDERS);
  }
  try {
    const [fr, en] = await Promise.all([
      redis.lrange<string>("secretFinders:public:fr", 0, -1),
      redis.lrange<string>("secretFinders:public:en", 0, -1),
    ]);
    return NextResponse.json({
      fr: [...STATIC_FINDERS.fr, ...fr],
      en: [...STATIC_FINDERS.en, ...en],
    });
  } catch {
    return NextResponse.json(STATIC_FINDERS);
  }
}

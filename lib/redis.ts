import { Redis } from "@upstash/redis";

// Client Upstash Redis (Vercel KV) — lit KV_REST_API_URL / KV_REST_API_TOKEN,
// injectees automatiquement par l'integration Vercel Storage > Upstash.
// Retourne null si l'integration n'est pas configuree (env local sans KV,
// ou avant provisionnement) : les routes appelantes doivent degrader
// proprement plutot que planter.
let client: Redis | null = null;

export function getRedis(): Redis | null {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  if (!client) client = Redis.fromEnv();
  return client;
}

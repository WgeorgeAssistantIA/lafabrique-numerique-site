import { NextResponse } from "next/server";
import { isTrack, isValidProof } from "@/lib/secretHunt";
import { isRateLimited, tooManyRequests } from "@/lib/rateLimit";

// Reveals the easter-egg reward code for one track, only to a client that
// proves it solved the hunt (both answers, checked against hashes). The codes
// are never in source (public repo): they come from env vars, so they can be
// rotated without a commit. Live redemption counts come from the Lemon
// Squeezy API when LEMONSQUEEZY_API_KEY is set; otherwise remaining/max are
// null and the page shows static copy.

export const dynamic = "force-dynamic";

const LS_API = "https://api.lemonsqueezy.com/v1";

// Tier order matters: the page offers the first tier with redemptions left.
const TIER_ENV = {
  fr: [
    { env: "SECRET_CODE_FR_100", percent: 100 },
    { env: "SECRET_CODE_FR_50", percent: 50 },
  ],
  en: [
    { env: "SECRET_CODE_EN_100", percent: 100 },
    { env: "SECRET_CODE_EN_50", percent: 50 },
  ],
} as const;

type TierStatus = {
  code: string;
  percent: number;
  remaining: number | null;
  max: number | null;
};

async function lsFetch(path: string, apiKey: string) {
  const res = await fetch(`${LS_API}${path}`, {
    headers: {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Lemon Squeezy ${path} -> ${res.status}`);
  return res.json();
}

async function withCounts(tiers: TierStatus[]): Promise<TierStatus[]> {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) return tiers;
  try {
    const discounts = await lsFetch("/discounts?page[size]=100", apiKey);
    const byCode = new Map<string, { id: string; max: number | null }>();
    for (const d of discounts.data ?? []) {
      const attr = d.attributes ?? {};
      if (typeof attr.code === "string") {
        byCode.set(attr.code.toUpperCase(), {
          id: d.id,
          max: attr.is_limited_redemptions
            ? (attr.max_redemptions ?? null)
            : null,
        });
      }
    }
    return await Promise.all(
      tiers.map(async (tier) => {
        const found = byCode.get(tier.code.toUpperCase());
        if (!found) {
          console.error(`Lemon Squeezy discount not found for a ${tier.percent}% tier`);
          return tier;
        }
        if (found.max === null) return tier;
        const redemptions = await lsFetch(
          `/discount-redemptions?filter[discount_id]=${found.id}&page[size]=1`,
          apiKey,
        );
        const used = redemptions.meta?.page?.total ?? 0;
        return {
          ...tier,
          remaining: Math.max(0, found.max - used),
          max: found.max,
        };
      }),
    );
  } catch (err) {
    // Any API hiccup: no counts rather than an error (logged for diagnosis).
    console.error(
      "Lemon Squeezy counts unavailable:",
      err instanceof Error ? err.message : err,
    );
    return tiers;
  }
}

export async function POST(request: Request) {
  if (await isRateLimited(request, "secret-codes", 20, 600)) {
    return tooManyRequests();
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const track = body.track;
  if (!isTrack(track)) {
    return NextResponse.json({ error: "invalid_track" }, { status: 400 });
  }
  if (!(await isValidProof(track, body))) {
    return NextResponse.json({ error: "invalid_proof" }, { status: 403 });
  }

  const tiers: TierStatus[] = [];
  for (const { env, percent } of TIER_ENV[track]) {
    const code = process.env[env]?.trim();
    if (code) tiers.push({ code, percent, remaining: null, max: null });
  }
  if (tiers.length === 0) {
    console.error(`No reward code configured for track ${track}`);
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  return NextResponse.json({ tiers: await withCounts(tiers) });
}

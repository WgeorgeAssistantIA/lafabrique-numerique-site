import { NextResponse } from "next/server";

// Live redemption counts for the easter-egg reward codes, read from the
// Lemon Squeezy API. The hidden page uses this to show real scarcity
// ("3/5 left") and to fall back from the 100% tier to the 50% tier once the
// first is sold out. Requires LEMONSQUEEZY_API_KEY in the environment; when
// absent the endpoint degrades gracefully and the page shows static copy.

export const dynamic = "force-dynamic";

const LS_API = "https://api.lemonsqueezy.com/v1";

// Tier order matters: the page offers the first tier with redemptions left.
const TRACKS = {
  fr: [
    { code: "ROUAGE100", percent: 100 },
    { code: "ROUAGE50", percent: 50 },
  ],
  en: [
    { code: "OWL100", percent: 100 },
    { code: "OWL50", percent: 50 },
  ],
} as const;

type TierStatus = { code: string; percent: number; remaining: number | null };

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

export async function GET() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ fallback: true });
  }

  try {
    const discounts = await lsFetch("/discounts?page[size]=100", apiKey);
    const byCode = new Map<string, { id: string; max: number | null }>();
    for (const d of discounts.data ?? []) {
      const attr = d.attributes ?? {};
      if (typeof attr.code === "string") {
        byCode.set(attr.code.toUpperCase(), {
          id: d.id,
          max: attr.is_limited_redemptions ? (attr.max_redemptions ?? null) : null,
        });
      }
    }

    const resolveTier = async (tier: { code: string; percent: number }): Promise<TierStatus> => {
      const found = byCode.get(tier.code);
      if (!found) return { ...tier, remaining: null };
      if (found.max === null) return { ...tier, remaining: null };
      const redemptions = await lsFetch(
        `/discount-redemptions?filter[discount_id]=${found.id}&page[size]=1`,
        apiKey
      );
      const used = redemptions.meta?.page?.total ?? 0;
      return { ...tier, remaining: Math.max(0, found.max - used) };
    };

    const [fr, en] = await Promise.all([
      Promise.all(TRACKS.fr.map(resolveTier)),
      Promise.all(TRACKS.en.map(resolveTier)),
    ]);

    return NextResponse.json({ fallback: false, fr, en });
  } catch {
    // Any API hiccup: degrade to static copy rather than erroring the page.
    return NextResponse.json({ fallback: true });
  }
}

import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

// Keep-alive appele par le cron Vercel (vercel.json) : une ecriture + une
// lecture legeres sur la base Upstash pour qu'elle ne soit pas archivee
// pour inactivite (offre gratuite). Si CRON_SECRET est defini, Vercel
// l'envoie en Bearer et on le verifie.

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ ok: false, error: "kv_not_configured" });
  }
  try {
    const now = Date.now();
    await redis.set("keepalive:last", now);
    const back = await redis.get<number>("keepalive:last");
    return NextResponse.json({ ok: back === now, at: now });
  } catch {
    return NextResponse.json({ ok: false, error: "kv_error" }, { status: 500 });
  }
}

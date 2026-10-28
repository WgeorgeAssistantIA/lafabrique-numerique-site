import { getRedis } from "@/lib/redis";

// Fixed-window rate limit per client IP, stored in Upstash. Fails open when
// KV is not configured (local dev) or unreachable: the routes keep their own
// validation, this only caps abuse (Resend quota, finder board spam, brute
// force of the reward endpoint).

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function isRateLimited(
  request: Request,
  name: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  const key = `rl:${name}:${clientIp(request)}`;
  try {
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, windowSeconds);
    return count > limit;
  } catch {
    return false;
  }
}

export function tooManyRequests() {
  return Response.json({ error: "rate_limited" }, { status: 429 });
}

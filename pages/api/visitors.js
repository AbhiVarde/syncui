import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const KEY = "visitors:ui";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const count = await redis.incr(KEY);
    return res.status(200).json({ count });
  }

  const count = (await redis.get(KEY)) ?? 0;
  return res.status(200).json({ count });
}

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const SET_KEY = "visitors:ui:v2";
const BASE = 70;
const BOT_RE =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|vercel/i;
const ID_RE = /^[a-zA-Z0-9-]{16,64}$/;

const todayIST = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  try {
    if (req.method === "POST") {
      const ua = req.headers["user-agent"] || "";
      const id = req.body?.id;

      if (!BOT_RE.test(ua) && typeof id === "string" && ID_RE.test(id)) {
        await redis.sadd(SET_KEY, `${id}:${todayIST()}`);
      }
    }

    const size = await redis.scard(SET_KEY);
    return res.status(200).json({ count: BASE + Number(size || 0) });
  } catch {
    return res.status(200).json({ count: null });
  }
}

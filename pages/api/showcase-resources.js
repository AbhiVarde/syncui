import path from "path";
import fs from "fs";

const OWNER = "AbhiVarde";
const REPO = "syncui";
const DISCUSSION_NUMBER = 4;
const CACHE_TTL = process.env.NODE_ENV === "development" ? 0 : 30 * 60 * 1000;
const FETCH_TIMEOUT = 8000;

let cache = null;
let cacheTs = 0;

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    return (u.hostname.replace(/^www\./, "") + u.pathname)
      .replace(/\/+$/, "")
      .toLowerCase();
  } catch {
    return url.toLowerCase().replace(/\/+$/, "");
  }
}

function getSponsored() {
  try {
    const file = path.join(process.cwd(), "data", "sponsored.json");
    return JSON.parse(fs.readFileSync(file, "utf8")).map(normalizeUrl);
  } catch {
    return [];
  }
}

function extractUrls(text) {
  const matches = text?.match(/https?:\/\/[^\s)\]"'<>,]+/g) ?? [];
  return [...new Set(matches)]
    .map((u) => u.replace(/[.,;!?)]+$/, ""))
    .filter(
      (u) =>
        !u.includes("avatars.githubusercontent") &&
        !u.includes("user-images.githubusercontent") &&
        !u.includes("github.com/user-attachments"),
    );
}

function parseDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function parseOgFromHtml(html, baseUrl) {
  const get = (prop) =>
    html.match(
      new RegExp(
        `<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`,
        "i",
      ),
    )?.[1] ??
    html.match(
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`,
        "i",
      ),
    )?.[1] ??
    null;

  const rawTitle =
    get("og:title") ??
    html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ??
    null;

  const rawImage = get("og:image") ?? get("twitter:image");

  let image = null;
  if (rawImage) {
    try {
      image = new URL(decodeEntities(rawImage), baseUrl).href;
    } catch {
      image = null;
    }
  }

  return {
    title: rawTitle ? decodeEntities(rawTitle).trim() : null,
    image,
  };
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchOgData(url) {
  try {
    const ghMatch = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/?#\s]+)/);
    if (ghMatch) {
      const owner = ghMatch[1];
      const repo = ghMatch[2].replace(/\.git$/, "");
      const headers = { Accept: "application/vnd.github+json" };
      if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
      }
      const r = await fetchWithTimeout(
        `https://api.github.com/repos/${owner}/${repo}`,
        { headers },
      );
      if (r.ok) {
        const d = await r.json();
        return {
          title: d.full_name,
          image: `https://opengraph.githubassets.com/1/${owner}/${repo}`,
        };
      }
    }

    const r = await fetchWithTimeout(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept: "text/html",
      },
    });

    if (!r.ok) return { title: null, image: null };

    const html = await r.text();
    return parseOgFromHtml(html, r.url || url);
  } catch {
    return { title: null, image: null };
  }
}

async function fetchDiscussionUrls() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");

  const query = `{
    repository(owner: "${OWNER}", name: "${REPO}") {
      discussion(number: ${DISCUSSION_NUMBER}) {
        comments(first: 100) {
          nodes {
            body
            createdAt
            author { login }
            replies(first: 50) {
              nodes {
                body
                createdAt
                author { login }
              }
            }
          }
        }
      }
    }
  }`;

  const r = await fetchWithTimeout("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!r.ok) throw new Error(`GitHub GraphQL responded with ${r.status}`);

  const json = await r.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);

  const nodes = json?.data?.repository?.discussion?.comments?.nodes ?? [];
  const seen = new Map();

  for (const node of nodes) {
    const entries = [node, ...(node.replies?.nodes ?? [])];
    for (const entry of entries) {
      const [url] = extractUrls(entry.body);
      if (!url) continue;
      const key = normalizeUrl(url);
      if (seen.has(key)) continue;
      seen.set(key, {
        url,
        createdAt: entry.createdAt,
        author: entry.author?.login ?? "unknown",
      });
    }
  }

  return [...seen.values()];
}

export default async function handler(req, res) {
  const forceRefresh = req.query.clear === "1";

  if (forceRefresh) {
    cache = null;
    cacheTs = 0;
  }

  if (cache && Date.now() - cacheTs < CACHE_TTL) {
    res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=1800");
    return res.status(200).json(cache);
  }

  try {
    const sponsored = getSponsored();
    const entries = await fetchDiscussionUrls();

    const results = await Promise.all(
      entries.map(async (e) => {
        const { title, image } = await fetchOgData(e.url);
        const domain = parseDomain(e.url);
        return {
          url: e.url,
          name: title ?? domain,
          domain,
          image,
          sponsored: sponsored.includes(normalizeUrl(e.url)),
          author: e.author,
          createdAt: e.createdAt,
        };
      }),
    );

    const sorted = results.sort((a, b) => {
      if (a.sponsored !== b.sponsored) {
        return Number(b.sponsored) - Number(a.sponsored);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    cache = sorted;
    cacheTs = Date.now();

    res.setHeader(
      "Cache-Control",
      forceRefresh ? "no-store" : "public, max-age=1800, s-maxage=1800",
    );
    return res.status(200).json(sorted);
  } catch (err) {
    console.error("[showcase-resources]", err.message);
    if (cache) return res.status(200).json(cache);
    return res.status(500).json({ error: "Failed to load showcase resources" });
  }
}

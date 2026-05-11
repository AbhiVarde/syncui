import path from "path";
import fs from "fs";

const OWNER = "AbhiVarde";
const REPO = "syncui";
const DISCUSSION_NUMBER = 4;

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
  return [...new Set(text.match(/https?:\/\/[^\s)\]"'<>,]+/g) ?? [])]
    .map((u) => u.replace(/[.,;!?)]+$/, ""))
    .filter(
      (u) =>
        !u.includes("avatars.githubusercontent") &&
        !u.includes("user-images.githubusercontent"),
    );
}

function parseDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function parseOgFromHtml(html) {
  const get = (prop) =>
    html.match(
      new RegExp(
        `<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`,
        "i",
      ),
    )?.[1] ??
    html.match(
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${prop}["']`,
        "i",
      ),
    )?.[1] ??
    null;

  const title =
    get("og:title") ??
    html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ??
    null;

  const image = get("og:image") ?? null;

  return { title, image };
}

async function fetchOgData(url) {
  try {
    const ghMatch = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/?#\s]+)/);
    if (ghMatch) {
      const [, owner, repo] = ghMatch;
      const r = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      });
      if (r.ok) {
        const d = await r.json();
        return {
          title: d.full_name,
          image: `https://opengraph.githubassets.com/1/${owner}/${repo}`,
        };
      }
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const r = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept: "text/html",
      },
    });
    clearTimeout(timer);

    if (!r.ok) return { title: null, image: null };

    const html = await r.text();
    return parseOgFromHtml(html);
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
            body createdAt
            author { login }
            replies(first: 50) {
              nodes { body createdAt author { login } }
            }
          }
        }
      }
    }
  }`;

  const r = await fetch("https://api.github.com/graphql", {
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
    const all = [node, ...(node.replies?.nodes ?? [])];
    for (const entry of all) {
      for (const url of extractUrls(entry.body)) {
        if (!seen.has(url)) {
          seen.set(url, {
            url,
            createdAt: entry.createdAt,
            author: entry.author?.login ?? "unknown",
          });
        }
      }
    }
  }

  return [...seen.values()];
}

let _cache = null;
let _cacheTs = 0;
const CACHE_TTL = process.env.NODE_ENV === "development" ? 0 : 30 * 60 * 1000;

export default async function handler(req, res) {
  if (req.query.clear === "1") {
    _cache = null;
    _cacheTs = 0;
  }

  if (_cache && Date.now() - _cacheTs < CACHE_TTL) {
    res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=1800");
    return res.status(200).json(_cache);
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
          image: image ?? null,
          sponsored: sponsored.includes(normalizeUrl(e.url)),
          author: e.author,
          createdAt: e.createdAt,
        };
      }),
    );

    const sorted = results.sort((a, b) => {
      if (a.sponsored !== b.sponsored)
        return Number(b.sponsored) - Number(a.sponsored);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    _cache = sorted;
    _cacheTs = Date.now();

    res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=1800");
    return res.status(200).json(sorted);
  } catch (err) {
    console.error("[showcase-resources]", err.message);
    if (_cache) return res.status(200).json(_cache);
    return res.status(500).json({ error: "Failed to load showcase resources" });
  }
}

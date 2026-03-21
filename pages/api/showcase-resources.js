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
    const list = JSON.parse(fs.readFileSync(file, "utf8"));
    return list.map(normalizeUrl);
  } catch {
    return [];
  }
}

function extractUrls(text) {
  const matches = text.match(/https?:\/\/[^\s)\]"'<>,]+/g) ?? [];
  return [...new Set(matches)].filter(
    (u) =>
      !u.startsWith("https://github.com") &&
      !u.includes("avatars.githubusercontent") &&
      !u.includes("user-images.githubusercontent"),
  );
}

function cleanUrl(raw) {
  return raw.replace(/[.,;!?)]+$/, "");
}

function parseDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

async function fetchOgData(url) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SyncUI/1.0; +https://syncui.design)",
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    const html = await res.text();

    const ogTitle =
      html.match(
        /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i,
      )?.[1] ||
      html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i,
      )?.[1] ||
      html.match(/<title[^>]*>([^<]{1,80})<\/title>/i)?.[1] ||
      null;

    const ogImage =
      html.match(
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      )?.[1] ||
      html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      )?.[1] ||
      null;

    return {
      title: ogTitle
        ? ogTitle
            .trim()
            .replace(/\s+/g, " ")
            .replace(/\s*[|\-–—]\s*.+$/, "")
        : null,
      image: ogImage ?? null,
    };
  } catch {
    return { title: null, image: null };
  }
}

async function fetchDiscussionEntries() {
  const query = `{
    repository(owner: "${OWNER}", name: "${REPO}") {
      discussion(number: ${DISCUSSION_NUMBER}) {
        comments(first: 100) {
          nodes {
            body
            createdAt
            author { login }
            replies(first: 50) {
              nodes { body createdAt author { login } }
            }
          }
        }
      }
    }
  }`;

  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);

  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);

  const comments = json?.data?.repository?.discussion?.comments?.nodes ?? [];
  const entries = [];

  for (const c of comments) {
    entries.push({
      body: c.body,
      createdAt: c.createdAt,
      author: c.author?.login ?? "unknown",
    });
    for (const r of c.replies?.nodes ?? []) {
      entries.push({
        body: r.body,
        createdAt: r.createdAt,
        author: r.author?.login ?? "unknown",
      });
    }
  }

  const seen = new Map();
  for (const e of entries) {
    for (const raw of extractUrls(e.body)) {
      const url = cleanUrl(raw);
      if (!seen.has(url))
        seen.set(url, { url, createdAt: e.createdAt, author: e.author });
    }
  }

  return [...seen.values()];
}

let _cache = null;
let _cacheTs = 0;
const CACHE_TTL = process.env.NODE_ENV === "development" ? 0 : 30 * 60 * 1000;

export default async function handler(req, res) {
  if (_cache && Date.now() - _cacheTs < CACHE_TTL) {
    res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=1800");
    return res.status(200).json(_cache);
  }

  try {
    const sponsored = getSponsored();
    const entries = await fetchDiscussionEntries();

    const BATCH = 5;
    const enriched = [];

    for (let i = 0; i < entries.length; i += BATCH) {
      const batch = entries.slice(i, i + BATCH);
      const results = await Promise.all(
        batch.map(async (e) => {
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
      enriched.push(...results);
    }

    const sorted = enriched.sort((a, b) => {
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
    if (_cache) {
      res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=1800");
      return res.status(200).json(_cache);
    }
    return res.status(500).json({ error: "Failed to load showcase resources" });
  }
}

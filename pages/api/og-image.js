export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: "Missing url" });

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SyncUI/1.0)" },
    });

    const html = await response.text();
    const match =
      html.match(
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      ) ||
      html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      );

    const image = match?.[1] ?? null;

    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    return res.status(200).json({ image });
  } catch {
    return res.status(200).json({ image: null });
  }
}

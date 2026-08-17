export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;

  const headers = {
    Accept: "application/vnd.github.v3+json",
    ...(token && { Authorization: `token ${token}` }),
  };

  try {
    const [repo, stargazers] = await Promise.all([
      fetch("https://api.github.com/repos/AbhiVarde/syncui", { headers }),
      fetch(
        "https://api.github.com/repos/AbhiVarde/syncui/stargazers?per_page=100",
        { headers },
      ),
    ]);

    if (!repo.ok) throw new Error(`GitHub responded with ${repo.status}`);
    if (!stargazers.ok)
      throw new Error(`GitHub responded with ${stargazers.status}`);

    const repoData = await repo.json();
    const stargazersData = await stargazers.json();

    // GitHub returns an object (not an array) on rate-limit/auth errors
    const safeStargazers = Array.isArray(stargazersData) ? stargazersData : [];

    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");
    return res.status(200).json({
      stars: repoData.stargazers_count,
      stargazers: safeStargazers,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

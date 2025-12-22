import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: "Slug parameter is required" });
  }

  const docsDirectory = path.join(process.cwd(), "content/docs");
  const componentsDirectory = path.join(docsDirectory, "components");

  let fullPath;

  // Handle different slug patterns
  if (slug.startsWith("components/")) {
    const componentSlug = slug.replace("components/", "");
    fullPath = path.join(componentsDirectory, `${componentSlug}.mdx`);
  } else if (slug === "" || slug === "index") {
    fullPath = path.join(docsDirectory, "index.mdx");
  } else {
    fullPath = path.join(docsDirectory, `${slug}.mdx`);
  }

  // Security check: ensure the path is within the docs directory
  const normalizedPath = path.normalize(fullPath);
  if (!normalizedPath.startsWith(docsDirectory)) {
    return res.status(403).json({ error: "Access denied" });
  }

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: "MDX file not found" });
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Set headers for proper display
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");

    return res.status(200).send(fileContents);
  } catch (error) {
    console.error("Error reading MDX file:", error);
    return res.status(500).json({ error: "Error reading file" });
  }
}

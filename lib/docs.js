import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

const docsDirectory = path.join(process.cwd(), "content/docs");
const componentsDirectory = path.join(docsDirectory, "components");
const blocksDirectory = path.join(docsDirectory, "blocks");
const chartsDirectory = path.join(docsDirectory, "charts");
const installationDirectory = path.join(docsDirectory, "installation");

let slugsCache = null;
let slugsCacheKey = null;
const docCache = new Map();

const dirMtimeKey = (dir) => {
  if (!fs.existsSync(dir)) return "missing";
  const files = fs.readdirSync(dir).sort();
  return files
    .map((f) => {
      const stat = fs.statSync(path.join(dir, f));
      return `${f}:${stat.mtimeMs}`;
    })
    .join("|");
};

export async function getAllDocsSlugs() {
  const cacheKey = [
    dirMtimeKey(docsDirectory),
    dirMtimeKey(installationDirectory),
    dirMtimeKey(componentsDirectory),
    dirMtimeKey(blocksDirectory),
    dirMtimeKey(chartsDirectory),
  ].join("::");

  if (slugsCache && slugsCacheKey === cacheKey) {
    return slugsCache;
  }

  const slugs = [];

  if (fs.existsSync(installationDirectory)) {
    slugs.push({
      slug: "installation",
      title: "Installation",
      url: "/docs/installation",
      category: "Getting Started",
    });

    slugs.push({
      slug: "llms",
      title: "llms.txt",
      url: "/llms.txt",
      category: "Getting Started",
      external: true,
    });

    slugs.push({
      slug: "design",
      title: "design.md",
      url: "/design.md",
      category: "Getting Started",
      external: true,
    });

    slugs.push({
      slug: "registry",
      title: "registry.json",
      url: "/r/index.json",
      category: "Getting Started",
      external: true,
    });

    const installationFiles = fs.readdirSync(installationDirectory);
    installationFiles
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const fullPath = path.join(installationDirectory, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        slugs.push({
          slug: `installation/${slug}`,
          title: data.title || slug,
          url: `/docs/installation/${slug}`,
          category: "Installation",
        });
      });
  }

  const rootFiles = fs.readdirSync(docsDirectory);
  rootFiles
    .filter((file) => file.endsWith(".mdx") && file !== "installation.mdx")
    .forEach((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(docsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      slugs.push({
        slug: slug,
        title: data.title || slug,
        url: `/docs/${slug}`,
        category: "Getting Started",
      });
    });

  if (fs.existsSync(componentsDirectory)) {
    const componentFiles = fs.readdirSync(componentsDirectory);
    componentFiles
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const fullPath = path.join(componentsDirectory, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        slugs.push({
          slug: `components/${slug}`,
          title: data.title || slug,
          url: `/docs/components/${slug}`,
          category: "Components",
        });
      });
  }

  if (fs.existsSync(blocksDirectory)) {
    const blockFiles = fs.readdirSync(blocksDirectory);
    blockFiles
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const fullPath = path.join(blocksDirectory, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        slugs.push({
          slug: `blocks/${slug}`,
          title: data.title || slug,
          url: `/docs/blocks/${slug}`,
          category: "Blocks",
        });
      });
  }

  if (fs.existsSync(chartsDirectory)) {
    const chartFiles = fs.readdirSync(chartsDirectory);
    chartFiles
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const fullPath = path.join(chartsDirectory, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        slugs.push({
          slug: `charts/${slug}`,
          title: data.title || slug,
          url: `/docs/charts/${slug}`,
          category: "Charts",
        });
      });
  }

  slugsCache = slugs;
  slugsCacheKey = cacheKey;
  return slugs;
}

function resolveFullPath(slug) {
  if (slug.startsWith("components/")) {
    return path.join(
      componentsDirectory,
      `${slug.replace("components/", "")}.mdx`,
    );
  }
  if (slug.startsWith("blocks/")) {
    return path.join(blocksDirectory, `${slug.replace("blocks/", "")}.mdx`);
  }
  if (slug.startsWith("charts/")) {
    return path.join(chartsDirectory, `${slug.replace("charts/", "")}.mdx`);
  }
  if (slug.startsWith("installation/")) {
    return path.join(
      installationDirectory,
      `${slug.replace("installation/", "")}.mdx`,
    );
  }
  return path.join(docsDirectory, `${slug}.mdx`);
}

export async function getDocBySlug(slug) {
  const fullPath = resolveFullPath(slug);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const { mtimeMs } = fs.statSync(fullPath);
  const cached = docCache.get(slug);
  if (cached && cached.mtimeMs === mtimeMs) {
    return cached.result;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const { code, frontmatter } = await bundleMDX({
    source: content,
    cwd: path.dirname(fullPath),
  });

  const toc = extractTOC(content);

  const result = {
    code,
    frontmatter: {
      ...frontmatter,
      ...data,
    },
    toc,
  };

  docCache.set(slug, { mtimeMs, result });
  return result;
}

function extractTOC(content) {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    toc.push({
      level: match[1].length,
      text: match[2],
      id: match[2].toLowerCase().replace(/[^\w]+/g, "-"),
    });
  }

  return toc;
}

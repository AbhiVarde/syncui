import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

const docsDirectory = path.join(process.cwd(), "content/docs");
const componentsDirectory = path.join(docsDirectory, "components");
const blocksDirectory = path.join(docsDirectory, "blocks");
const installationDirectory = path.join(docsDirectory, "installation");

export async function getAllDocsSlugs() {
  const slugs = [];

  if (fs.existsSync(installationDirectory)) {
    slugs.push({
      slug: "installation",
      title: "Installation",
      url: "/docs/installation",
      category: "Getting Started",
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

  return slugs;
}

export async function getDocBySlug(slug) {
  let fullPath;

  if (slug.startsWith("components/")) {
    fullPath = path.join(
      componentsDirectory,
      `${slug.replace("components/", "")}.mdx`
    );
  } else if (slug.startsWith("blocks/")) {
    fullPath = path.join(blocksDirectory, `${slug.replace("blocks/", "")}.mdx`);
  } else if (slug.startsWith("installation/")) {
    fullPath = path.join(
      installationDirectory,
      `${slug.replace("installation/", "")}.mdx`
    );
  } else {
    fullPath = path.join(docsDirectory, `${slug}.mdx`);
  }

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const { code, frontmatter } = await bundleMDX({
    source: content,
    cwd: path.dirname(fullPath),
  });

  const toc = extractTOC(content);

  return {
    code,
    frontmatter: {
      ...frontmatter,
      ...data,
    },
    toc,
  };
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

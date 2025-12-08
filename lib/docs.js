import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

const docsDirectory = path.join(process.cwd(), "content/docs");
const componentsDirectory = path.join(docsDirectory, "components");

export async function getAllDocsSlugs() {
  const slugs = [];

  // Get root level docs (Getting Started pages)
  const rootFiles = fs.readdirSync(docsDirectory);
  rootFiles
    .filter((file) => file.endsWith(".mdx"))
    .forEach((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(docsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      slugs.push({
        slug: slug === "index" ? "" : slug,
        title: data.title || slug,
        url: `/docs/${slug === "index" ? "" : slug}`,
        category: "Getting Started",
      });
    });

  // Get components docs
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

  return slugs;
}

export async function getDocBySlug(slug) {
  let fullPath;

  if (slug.startsWith("components/")) {
    const componentSlug = slug.replace("components/", "");
    fullPath = path.join(componentsDirectory, `${componentSlug}.mdx`);
  } else {
    const fileName = slug === "" ? "index.mdx" : `${slug}.mdx`;
    fullPath = path.join(docsDirectory, fileName);
  }

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  try {
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
  } catch (error) {
    console.error("Error in bundleMDX:", error);
    return null;
  }
}

function extractTOC(content) {
  if (typeof content !== "string") {
    console.error("extractTOC received non-string content:", content);
    return [];
  }

  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc = [];
  let match;

  try {
    while ((match = headingRegex.exec(content)) !== null) {
      toc.push({
        level: match[1].length,
        text: match[2],
        id: match[2].toLowerCase().replace(/[^\w]+/g, "-"),
      });
    }
  } catch (error) {
    console.error("Error in extractTOC:", error);
  }

  return toc;
}

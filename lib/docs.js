import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

const docsDirectory = path.join(process.cwd(), "content/docs");

export async function getAllDocsSlugs() {
  const files = fs.readdirSync(docsDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(docsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      const url = slug === "setup" ? "/" : `/docs/${slug}`;

      return {
        slug: slug === "setup" ? "" : slug,
        title: data.title || slug,
        url,
      };
    });
}

export async function getDocBySlug(slug) {
  const fileName = slug === "" ? "setup.mdx" : `${slug}.mdx`;
  const fullPath = path.join(docsDirectory, fileName);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  try {
    const { code, frontmatter } = await bundleMDX({
      source: content,
      cwd: docsDirectory,
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

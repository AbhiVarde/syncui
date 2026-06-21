#!/usr/bin/env node
/**
 * Parses content/docs/components/*.mdx and content/docs/blocks/*.mdx
 * to build registry/variants.json — clean, standalone, single-variant
 * files (no switch statement, no unused code).
 *
 * Also determines the real DEFAULT variant for each category by reading
 * the source file's function signature (e.g. `variant = "modern"`),
 * falling back to the first documented variant if that default doesn't
 * actually exist as a real variant (this happens in a couple of places
 * in syncui's source, e.g. Hero.jsx defaults to "dark" which isn't a
 * real case in its switch statement).
 *
 * This is what powers:
 *   syncui add accordion            -> the real default variant
 *   syncui add accordion/brutalist  -> a specific variant
 *
 * Usage: node scripts/build-variants.js <path-to-syncui-repo>
 */
const fs = require("fs");
const path = require("path");

const repoPath = process.argv[2];
if (!repoPath) {
  console.error("Usage: node scripts/build-variants.js <path-to-syncui-repo>");
  process.exit(1);
}

function unescapeNestedTemplateLiteral(code) {
  return code.replace(/\\`/g, "`").replace(/\\\$\{/g, "${");
}

function parseMdxFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
  const sectionRegex = /#{3,4}\s+(.+)\n([\s\S]*?)(?=\n#{3,4}\s+|$)/g;
  let match;
  const variants = {};

  while ((match = sectionRegex.exec(raw)) !== null) {
    const heading = match[1].trim();
    const body = match[2];

    const variantMatch = body.match(/variant=["']([\w-]+)["']/);
    const codeMatch = body.match(/code=\{(?:String\.raw)?`([\s\S]*?)`\}\s*\/>/);
    if (!variantMatch || !codeMatch) continue;

    variants[variantMatch[1]] = {
      label: heading,
      code: unescapeNestedTemplateLiteral(codeMatch[1].trim()),
    };
  }
  return variants;
}

function scanDocsDir(dir) {
  const result = {};
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".mdx")) continue;
    const slug = path.basename(file, ".mdx");
    const variants = parseMdxFile(path.join(dir, file));
    if (Object.keys(variants).length) result[slug] = variants;
  }
  return result;
}

function findCodedDefault(sourceCode) {
  const m = sourceCode.match(/\(\{\s*variant\s*=\s*["']([^"']+)["']/);
  return m ? m[1] : null;
}

const componentsRegistry = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "registry", "components.json"),
    "utf8",
  ),
);
const blocksRegistry = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "registry", "blocks.json"),
    "utf8",
  ),
);
const sourceRegistry = { ...componentsRegistry, ...blocksRegistry };

const componentDocs = scanDocsDir(
  path.join(repoPath, "content/docs/components"),
);
const blockDocs = scanDocsDir(path.join(repoPath, "content/docs/blocks"));
const allDocs = { ...componentDocs, ...blockDocs };

const output = {};
for (const [category, variants] of Object.entries(allDocs)) {
  const variantNames = Object.keys(variants);
  const codedDefault = sourceRegistry[category]
    ? findCodedDefault(sourceRegistry[category].code)
    : null;
  const defaultVariant =
    codedDefault && variants[codedDefault] ? codedDefault : variantNames[0];

  output[category] = {
    default: defaultVariant,
    variants,
  };
}

const outPath = path.join(__dirname, "..", "registry", "variants.json");
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));

let total = 0;
for (const [cat, entry] of Object.entries(output)) {
  total += Object.keys(entry.variants).length;
  console.log(
    `  ${cat}: default="${entry.default}" | all: ${Object.keys(entry.variants).join(", ")}`,
  );
}
console.log(
  `\nWrote ${outPath} — ${Object.keys(output).length} categories, ${total} variants total`,
);

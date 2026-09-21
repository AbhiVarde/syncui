import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SITE = "https://ui.abhivarde.in";
const LOCAL_DIR = path.join(process.cwd(), "public", "r");
const OUT_FILE = path.join(process.cwd(), "public", "llms-full.txt");
const KINDS = ["components", "blocks", "charts"];

async function load(file) {
  const local = path.join(LOCAL_DIR, file);
  if (existsSync(local)) {
    return JSON.parse(await readFile(local, "utf8"));
  }
  const res = await fetch(`${SITE}/r/${file}`);
  if (!res.ok) {
    throw new Error(`could not load ${file}: ${res.status}`);
  }
  return res.json();
}

function clean(text) {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function readVariants(group, entry, file) {
  const raw = entry.variants ?? entry.items;
  if (!raw) {
    throw new Error(
      `no variants found in ${file}. keys found: ${Object.keys(entry).join(", ")}`,
    );
  }
  const list = Array.isArray(raw)
    ? raw
    : Object.entries(raw).map(([key, value]) =>
        typeof value === "object" && value !== null
          ? { slug: key, ...value }
          : { slug: key },
      );
  return list.map((item) => {
    const obj = typeof item === "string" ? { slug: item } : item;
    const slug = obj.slug ?? obj.name ?? obj.id;
    if (!slug) {
      throw new Error(`variant without a name in ${file}`);
    }
    const id = String(slug).includes("/")
      ? String(slug)
      : `${entry.name ?? group}/${slug}`;
    return { id, description: clean(obj.description) };
  });
}

const index = await load("index.json");

const lines = [
  "# Sync UI full variant list",
  "",
  "Install any entry with: npx @abhivarde/syncui@latest add name/variant",
  `Registry entry: ${SITE}/r/{name}.json`,
  "",
];

let total = 0;

for (const kind of KINDS) {
  const groups = index[kind];
  if (!Array.isArray(groups) || groups.length === 0) {
    throw new Error(`index.json has no ${kind}`);
  }
  lines.push(`## ${kind}`, "");
  for (const group of groups) {
    const file = `${group}.json`;
    const entry = await load(file);
    const variants = readVariants(group, entry, file);
    lines.push(`### ${group}`);
    for (const variant of variants) {
      lines.push(
        variant.description
          ? `- ${variant.id}: ${variant.description}`
          : `- ${variant.id}`,
      );
      total += 1;
    }
    lines.push("");
  }
}

await writeFile(OUT_FILE, lines.join("\n"), "utf8");
console.log(`wrote ${total} variants to public/llms-full.txt`);

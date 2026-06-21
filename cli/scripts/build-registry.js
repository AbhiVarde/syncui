#!/usr/bin/env node
/**
 * Scans syncui's REAL source files (not docs) and builds one registry
 * entry per file — exactly matching shadcn's "one category = one file"
 * model. Works for components AND blocks with the same logic.
 *
 * To support a NEW component/block in the future: just drop a new .jsx
 * file in the matching folder in the syncui repo and re-run this script.
 * Nothing else needs to change.
 *
 * Usage: node scripts/build-registry.js <path-to-syncui-repo>
 */
const fs = require("fs");
const path = require("path");

const repoPath = process.argv[2];
if (!repoPath) {
  console.error("Usage: node scripts/build-registry.js <path-to-syncui-repo>");
  process.exit(1);
}

const SKIP_DEPS = new Set(["react", "react-dom", "next"]);

function rootPackageName(importPath) {
  if (importPath.startsWith(".") || importPath.startsWith("@/")) return null;
  if (importPath.startsWith("@")) {
    const parts = importPath.split("/");
    return parts.slice(0, 2).join("/");
  }
  return importPath.split("/")[0];
}

function extractDependencies(code) {
  const deps = new Set();
  const importRegex = /from\s+["']([^"']+)["']/g;
  let m;
  while ((m = importRegex.exec(code)) !== null) {
    const pkg = rootPackageName(m[1]);
    if (pkg && !SKIP_DEPS.has(pkg)) deps.add(pkg);
  }
  return [...deps].sort();
}

function buildEntries(dir, type, { nested } = {}) {
  const entries = {};

  if (nested) {
    for (const folder of fs.readdirSync(dir)) {
      const folderPath = path.join(dir, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;
      const file = fs.readdirSync(folderPath).find((f) => f.endsWith(".jsx"));
      if (!file) continue;
      const code = fs.readFileSync(path.join(folderPath, file), "utf8");
      const key = folder.toLowerCase();
      entries[key] = {
        type,
        name: key,
        fileName: file,
        dependencies: extractDependencies(code),
        code: code.trim(),
      };
    }
  } else {
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".jsx")) continue;
      const code = fs.readFileSync(path.join(dir, file), "utf8");
      const key = path.basename(file, ".jsx").toLowerCase();
      entries[key] = {
        type,
        name: key,
        fileName: file,
        dependencies: extractDependencies(code),
        code: code.trim(),
      };
    }
  }

  return entries;
}

const components = buildEntries(
  path.join(repoPath, "components/ui/components"),
  "component",
);
const blocks = buildEntries(
  path.join(repoPath, "components/ui/blocks"),
  "block",
  { nested: true },
);

const outDir = path.join(__dirname, "..", "registry");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "components.json"),
  JSON.stringify(components, null, 2),
);
fs.writeFileSync(
  path.join(outDir, "blocks.json"),
  JSON.stringify(blocks, null, 2),
);

console.log(
  `Components (${Object.keys(components).length}): ${Object.keys(components).join(", ")}`,
);
console.log(
  `Blocks (${Object.keys(blocks).length}): ${Object.keys(blocks).join(", ")}`,
);

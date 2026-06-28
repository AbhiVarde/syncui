const fs = require("fs");
const path = require("path");

const REGISTRY_URL = "https://syncui.design/r";

async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function resolveKey(input, keys) {
  if (keys.includes(input)) return input;
  if (keys.includes(input + "s")) return input + "s";
  if (keys.includes(input + "es")) return input + "es";
  if (input.endsWith("s") && keys.includes(input.slice(0, -1)))
    return input.slice(0, -1);
  return null;
}

function getDefaultBase() {
  const hasSrc = fs.existsSync(path.join(process.cwd(), "src"));
  return hasSrc ? path.join(process.cwd(), "src") : process.cwd();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function add(rawName, options) {
  if (typeof fetch === "undefined") {
    console.error("✗ fetch is not available. Please upgrade to Node.js 18+.");
    process.exit(1);
  }

  const [rawCategory, rawVariant] = rawName.toLowerCase().split("/");

  process.stdout.write("  Fetching registry...\r");

  const index = await fetchJSON(`${REGISTRY_URL}/index.json`);
  if (!index) {
    console.error(
      "✗ Could not reach the syncui registry. Check your connection.",
    );
    process.exit(1);
  }

  const allNames = [...(index.components || []), ...(index.blocks || [])];
  const category = resolveKey(rawCategory, allNames);

  if (!category) {
    console.error(`✗ No component or block called "${rawCategory}".`);
    console.error(`  Available: ${allNames.sort().join(", ")}`);
    process.exit(1);
  }

  const entry = await fetchJSON(`${REGISTRY_URL}/${category}.json`);
  if (!entry) {
    console.error(`✗ Failed to fetch "${category}" from registry.`);
    process.exit(1);
  }

  const variantName = rawVariant || entry.default;
  const variants = entry.variants || {};

  if (!variants[variantName]) {
    console.error(`✗ No variant "${variantName}" for "${category}".`);
    console.error(`  Available variants: ${Object.keys(variants).join(", ")}`);
    process.exit(1);
  }

  const variant = variants[variantName];
  const isBlock = entry.type === "block";

  const outDir =
    options.path ||
    path.join(
      getDefaultBase(),
      "components",
      "syncui",
      isBlock ? "blocks" : "components",
    );
  fs.mkdirSync(outDir, { recursive: true });

  const baseName = capitalize(category.replace(/s$/, ""));
  const fileName = rawVariant
    ? `${baseName}${capitalize(rawVariant)}.jsx`
    : `${baseName}.jsx`;
  const outFile = path.join(outDir, fileName);

  if (fs.existsSync(outFile) && !options.overwrite) {
    console.error(
      `✗ ${outFile} already exists. Use --overwrite to replace it.`,
    );
    process.exit(1);
  }

  fs.writeFileSync(outFile, variant.code + "\n");

  const label = rawVariant
    ? `${category}/${rawVariant}`
    : `${category} (default: ${variantName})`;

  process.stdout.write("                      \r");
  console.log(`✓ Added ${label} → ${path.relative(process.cwd(), outFile)}`);

  if (entry.dependencies && entry.dependencies.length) {
    console.log("");
    console.log("Install dependencies if you haven't already:");
    console.log(`  npm install ${entry.dependencies.join(" ")}`);
  }
}

module.exports = { add };

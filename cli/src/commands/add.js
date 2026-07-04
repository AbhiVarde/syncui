const fs = require("fs");
const path = require("path");
const { runInstall } = require("../utils/install");
const { detectExistingAlias } = require("../utils/aliases");

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

function loadConfig() {
  const configPath = path.join(process.cwd(), "components.json");
  if (!fs.existsSync(configPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch {
    return null;
  }
}

function resolveAliasPath(aliasString, tsx) {
  if (!aliasString) return null;

  const resolved = detectExistingAlias(tsx);
  if (!resolved) return null;

  const rest = aliasString.replace(`${resolved.prefix}/`, "");
  return path.join(process.cwd(), resolved.target, rest);
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
  const config = loadConfig();

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
    (config &&
      resolveAliasPath(
        isBlock ? config.aliases?.blocks : config.aliases?.components,
        config.tsx,
      )) ||
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

  const result = runInstall(entry.dependencies, {
    skipInstall: options.skipInstall,
  });

  console.log("");
  if (result.alreadySatisfied) {
    console.log("✓ All dependencies already installed");
  } else if (result.skipped) {
    console.log("Skipped install (--skip-install). Install manually:");
    console.log(`  ${result.cmd}`);
  } else if (result.success) {
    console.log("✓ Dependencies installed");
  } else if (result.cmd) {
    console.error("✗ Auto-install failed. Run this manually:");
    console.error(`  ${result.cmd}`);
  }
}

module.exports = { add };

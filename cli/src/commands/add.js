const fs = require("fs");
const path = require("path");

function loadRegistry() {
  const dir = path.join(__dirname, "..", "..", "registry");
  const components = JSON.parse(
    fs.readFileSync(path.join(dir, "components.json"), "utf8"),
  );
  const blocks = JSON.parse(
    fs.readFileSync(path.join(dir, "blocks.json"), "utf8"),
  );
  return { ...components, ...blocks };
}

function loadVariants() {
  const file = path.join(__dirname, "..", "..", "registry", "variants.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function resolveKey(input, registry) {
  if (registry[input]) return input;
  if (registry[input + "s"]) return input + "s";
  if (registry[input + "es"]) return input + "es";
  if (input.endsWith("s") && registry[input.slice(0, -1)])
    return input.slice(0, -1);
  return null;
}

function getDefaultBase() {
  const hasSrc = fs.existsSync(path.join(process.cwd(), "src"));
  return hasSrc ? path.join(process.cwd(), "src") : process.cwd();
}

function add(rawName, options) {
  const registry = loadRegistry();
  const variantsData = loadVariants();

  const [rawCategory, rawVariant] = rawName.toLowerCase().split("/");
  const category = resolveKey(rawCategory, registry);

  if (!category || !variantsData[category]) {
    console.error(`✗ No component or block called "${rawCategory}".`);
    console.error(`  Available: ${Object.keys(registry).sort().join(", ")}`);
    process.exit(1);
  }

  const entry = registry[category];
  const categoryVariants = variantsData[category];

  const variantName = rawVariant || categoryVariants.default;
  const variant = categoryVariants.variants[variantName];

  if (!variant) {
    console.error(`✗ No variant "${variantName}" for "${category}".`);
    console.error(
      `  Available variants: ${Object.keys(categoryVariants.variants).join(", ")}`,
    );
    process.exit(1);
  }

  const outDir =
    options.path ||
    path.join(
      getDefaultBase(),
      "components",
      "syncui",
      entry.type === "block" ? "blocks" : "components",
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
  console.log(`✓ Added ${label} -> ${path.relative(process.cwd(), outFile)}`);

  if (entry.dependencies.length) {
    console.log("");
    console.log("Install dependencies if you haven't already:");
    console.log(`  npm install ${entry.dependencies.join(" ")}`);
  }
}

module.exports = { add, loadRegistry, loadVariants };

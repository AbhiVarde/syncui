const fs = require("fs");
const path = require("path");

const REGISTRY_DIR = path.join(__dirname, "..", "registry");
const OUT_DIR = path.join(__dirname, "..", "dist", "r");

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function main() {
  const components = readJSON(path.join(REGISTRY_DIR, "components.json"));
  const blocks = readJSON(path.join(REGISTRY_DIR, "blocks.json"));
  const variants = readJSON(path.join(REGISTRY_DIR, "variants.json"));

  const all = { ...components, ...blocks };

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const index = {
    version: "1.0.0",
    components: Object.keys(components).sort(),
    blocks: Object.keys(blocks).sort(),
  };

  fs.writeFileSync(
    path.join(OUT_DIR, "index.json"),
    JSON.stringify(index, null, 2),
  );
  console.log("✓ Built index.json");

  let built = 0;
  let skipped = 0;

  for (const [name, entry] of Object.entries(all)) {
    const variantData = variants[name];

    if (!variantData) {
      console.warn(`⚠ No variant data found for "${name}" — skipping`);
      skipped++;
      continue;
    }

    const output = {
      name: entry.name,
      type: entry.type,
      fileName: entry.fileName,
      dependencies: entry.dependencies || [],
      default: variantData.default,
      variants: variantData.variants,
    };

    fs.writeFileSync(
      path.join(OUT_DIR, `${name}.json`),
      JSON.stringify(output, null, 2),
    );

    const variantCount = Object.keys(variantData.variants || {}).length;
    console.log(
      `✓ Built ${name}.json  (${variantCount} variant${variantCount !== 1 ? "s" : ""})`,
    );
    built++;
  }

  console.log("");
  console.log(
    `Built ${built} entries${skipped ? `, ${skipped} skipped` : ""} → ${path.relative(process.cwd(), OUT_DIR)}`,
  );
  console.log("");
  console.log("Next: copy dist/r/ into your website's public/r/ and deploy.");
}

main();

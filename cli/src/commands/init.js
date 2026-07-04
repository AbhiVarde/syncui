const fs = require("fs");
const path = require("path");
const { runInstall } = require("../utils/install");
const { ensureAlias } = require("../utils/aliases");

const BASE_DEPS = [
  "@mui/material",
  "@emotion/react",
  "@emotion/styled",
  "motion",
];

function detectFramework() {
  const cwd = process.cwd();
  const hasFile = (f) => fs.existsSync(path.join(cwd, f));

  if (
    hasFile("next.config.mjs") ||
    hasFile("next.config.js") ||
    hasFile("next.config.ts")
  ) {
    const hasAppDir = hasFile("app") || hasFile(path.join("src", "app"));
    return hasAppDir ? "next-app" : "next-pages";
  }
  if (hasFile("vite.config.js") || hasFile("vite.config.ts")) return "vite";
  if (hasFile("react-router.config.js") || hasFile("react-router.config.ts"))
    return "react-router";
  return "unknown";
}

function detectTypeScript() {
  return fs.existsSync(path.join(process.cwd(), "tsconfig.json"));
}

function writeConfig(framework, tsx, alias) {
  const config = {
    $schema: "https://syncui.design/schema.json",
    style: "default",
    framework,
    tsx,
    aliases: {
      components: `${alias.prefix}/components/syncui/components`,
      blocks: `${alias.prefix}/components/syncui/blocks`,
    },
  };

  const configPath = path.join(process.cwd(), "components.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
  return configPath;
}

function frameworkLabel(framework) {
  const labels = {
    "next-app": "Next.js (App Router)",
    "next-pages": "Next.js (Pages Router)",
    vite: "Vite",
    "react-router": "React Router v7",
    unknown: "Unknown (manual setup required)",
  };
  return labels[framework] || framework;
}

function setupDocsUrl(framework) {
  const slugs = {
    "next-app": "nextjs",
    "next-pages": "nextjs",
    vite: "vite",
    "react-router": "react-router",
    unknown: "manual",
  };
  return `https://syncui.design/docs/installation/${slugs[framework] || "manual"}`;
}

async function init(options) {
  console.log("Setting up Sync UI...\n");

  const framework = detectFramework();
  const tsx = detectTypeScript();

  console.log(`✓ Detected framework: ${frameworkLabel(framework)}`);
  console.log(`✓ TypeScript: ${tsx ? "yes" : "no"}`);

  const existingConfig = path.join(process.cwd(), "components.json");
  if (fs.existsSync(existingConfig) && !options.overwrite) {
    console.error(
      "\n✗ components.json already exists. Use --overwrite to replace it.",
    );
    process.exit(1);
  }

  const alias = ensureAlias(tsx);
  if (alias.created) {
    console.log(
      `✓ Added "${alias.prefix}/*" import alias to ${path.basename(alias.configPath)}`,
    );
  } else {
    console.log(
      `✓ Using existing "${alias.prefix}/*" alias from ${path.basename(alias.configPath)}`,
    );
  }

  const configPath = writeConfig(framework, tsx, alias);
  console.log(`✓ Created ${path.relative(process.cwd(), configPath)}`);

  const result = runInstall(BASE_DEPS, { skipInstall: options.skipInstall });

  console.log("");
  if (result.alreadySatisfied) {
    console.log("✓ Base dependencies already installed");
  } else if (result.skipped) {
    console.log("Skipped install (--skip-install). Install manually:");
    console.log(`  ${result.cmd}`);
  } else if (result.success) {
    console.log("✓ Base dependencies installed");
  } else if (result.cmd) {
    console.error("✗ Auto-install failed. Run this manually:");
    console.error(`  ${result.cmd}`);
  }

  console.log("");
  console.log("Next step: wrap your app in ThemeProvider.");
  console.log(`  → ${setupDocsUrl(framework)}`);
  console.log("");
  console.log("Then add your first component:");
  console.log("  npx @abhivarde/syncui@latest add accordion");
}

module.exports = { init };

#!/usr/bin/env node
const { Command } = require("commander");
const { add } = require("../src/commands/add");
const packageJson = require("../package.json");

const REGISTRY_URL = "https://syncui.design/r";

const program = new Command();

program
  .name("syncui")
  .description("Add Sync UI components and blocks to your project")
  .version(packageJson.version);

program
  .command("add <name>")
  .description("Add a component or block, e.g. `syncui add accordion`")
  .option("-p, --path <dir>", "output directory")
  .option("-o, --overwrite", "overwrite if file exists", false)
  .action((name, options) =>
    add(name, options).catch((e) => {
      console.error(e.message);
      process.exit(1);
    }),
  );

program
  .command("list")
  .description("List everything available")
  .action(async () => {
    const res = await fetch(`${REGISTRY_URL}/index.json`).catch(() => null);
    if (!res || !res.ok) {
      console.error(
        "✗ Could not reach the syncui registry. Check your connection.",
      );
      process.exit(1);
    }
    const index = await res.json();
    console.log("Components:");
    (index.components || []).forEach((k) => console.log(`  - ${k}`));
    console.log("\nBlocks:");
    (index.blocks || []).forEach((k) => console.log(`  - ${k}`));
  });

program.parse();

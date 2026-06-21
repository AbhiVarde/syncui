#!/usr/bin/env node
const { Command } = require("commander");
const { add, loadRegistry } = require("../src/commands/add");
const packageJson = require("../package.json");

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
  .action((name, options) => add(name, options));

program
  .command("list")
  .description("List everything available")
  .action(() => {
    const registry = loadRegistry();
    const components = Object.entries(registry).filter(
      ([, v]) => v.type === "component",
    );
    const blocks = Object.entries(registry).filter(
      ([, v]) => v.type === "block",
    );
    console.log("Components:");
    components.forEach(([k]) => console.log(`  - ${k}`));
    console.log("\nBlocks:");
    blocks.forEach(([k]) => console.log(`  - ${k}`));
  });

program.parse();

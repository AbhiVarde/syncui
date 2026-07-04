const fs = require("fs");
const path = require("path");

function configFileFor(tsx) {
  return tsx ? "tsconfig.json" : "jsconfig.json";
}

function readConfig(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function detectExistingAlias(tsx) {
  const configPath = path.join(process.cwd(), configFileFor(tsx));
  const config = readConfig(configPath);

  const paths = config?.compilerOptions?.paths;
  if (!paths) return null;

  for (const [alias, targets] of Object.entries(paths)) {
    if (alias.endsWith("/*") && targets?.length) {
      return {
        prefix: alias.replace("/*", ""),
        target: targets[0].replace("/*", ""),
        configPath,
      };
    }
  }

  return null;
}

function ensureAlias(tsx) {
  const existing = detectExistingAlias(tsx);
  if (existing) return { ...existing, created: false };

  const configPath = path.join(process.cwd(), configFileFor(tsx));
  const config = readConfig(configPath) || {};

  config.compilerOptions = config.compilerOptions || {};
  config.compilerOptions.baseUrl = config.compilerOptions.baseUrl || ".";
  config.compilerOptions.paths = {
    ...(config.compilerOptions.paths || {}),
    "@/*": ["./src/*"],
  };

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");

  return { prefix: "@", target: "./src", configPath, created: true };
}

module.exports = { detectExistingAlias, ensureAlias };

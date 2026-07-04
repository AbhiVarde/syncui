const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function detectPackageManager() {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(cwd, "package-lock.json"))) return "npm";
  return "npm";
}

function installCommandFor(pm, deps) {
  const list = deps.join(" ");
  switch (pm) {
    case "yarn":
      return `yarn add ${list}`;
    case "pnpm":
      return `pnpm add ${list}`;
    case "bun":
      return `bun add ${list}`;
    default:
      return `npm install ${list}`;
  }
}

function getMissingDependencies(deps) {
  if (!deps || !deps.length) return [];

  const pkgPath = path.join(process.cwd(), "package.json");
  if (!fs.existsSync(pkgPath)) return deps;

  let pkg;
  try {
    pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  } catch {
    return deps;
  }

  const installed = {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {}),
  };

  return deps.filter((dep) => !installed[dep]);
}

function runInstall(deps, options = {}) {
  const missing = getMissingDependencies(deps);

  if (!missing.length) {
    return { installed: [], skipped: false, alreadySatisfied: true };
  }

  const pm = detectPackageManager();
  const cmd = installCommandFor(pm, missing);

  if (options.skipInstall) {
    return { installed: missing, skipped: true, cmd, pm };
  }

  console.log("");
  console.log(`Installing dependencies with ${pm}...`);
  console.log(`  ${cmd}`);

  try {
    execSync(cmd, { stdio: "inherit" });
    return { installed: missing, skipped: false, success: true, cmd, pm };
  } catch {
    return { installed: missing, skipped: false, success: false, cmd, pm };
  }
}

module.exports = {
  detectPackageManager,
  installCommandFor,
  getMissingDependencies,
  runInstall,
};

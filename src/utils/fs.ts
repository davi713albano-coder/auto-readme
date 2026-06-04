import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

// Quick and dirty JSON loader. Swallow any error because
// most of the time the file just doesn't exist on disk.
export function readJson<T = unknown>(path: string): T | null {
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as T;
  } catch {
    return null;
  }
}

// Same deal: read a text file, return null if it's missing.
export function readText(path: string): string | null {
  try {
    return readFileSync(path, "utf-8");
  } catch {
    return null;
  }
}

export function fileExists(path: string): boolean {
  return existsSync(path);
}

// Try to figure out the main language by looking for the usual suspects.
// Order matters: more specific files first, generic later.
export function getLanguage(root: string): string {
  if (fileExists(join(root, "tsconfig.json"))) return "typescript";
  if (fileExists(join(root, "requirements.txt")) || fileExists(join(root, "setup.py"))) return "python";
  if (fileExists(join(root, "Cargo.toml"))) return "rust";
  if (fileExists(join(root, "go.mod"))) return "go";
  if (fileExists(join(root, "pom.xml"))) return "java";
  if (fileExists(join(root, "Gemfile"))) return "ruby";
  // pure JS or JS + other framework that doesn't have a specific file above
  if (fileExists(join(root, "package.json"))) return "javascript";
  return "shell";
}

// Name is usually in package.json or Cargo.toml.
// If neither exists, just grab the folder name.
export function getProjectName(root: string): string {
  const pkg = readJson<{ name?: string }>(join(root, "package.json"));
  if (pkg?.name) return pkg.name;

  const cargo = readText(join(root, "Cargo.toml"));
  if (cargo) {
    const match = cargo.match(/^name\s*=\s*"([^"]+)"/m);
    if (match) return match[1];
  }

  const parts = root.split(/[\\\/]/);
  return parts[parts.length - 1] || "project";
}

export function getDescription(root: string): string | null {
  const pkg = readJson<{ description?: string }>(join(root, "package.json"));
  if (pkg?.description) return pkg.description;

  const cargo = readText(join(root, "Cargo.toml"));
  if (cargo) {
    const match = cargo.match(/^description\s*=\s*"([^"]+)"/m);
    if (match) return match[1];
  }

  return null;
}

export function getLicense(root: string): string | null {
  const pkg = readJson<{ license?: string }>(join(root, "package.json"));
  if (pkg?.license) return pkg.license;

  // If there's a LICENSE file floating around, peek inside.
  const licenseFiles = ["LICENSE", "LICENSE.txt", "LICENSE.md"];
  for (const f of licenseFiles) {
    if (fileExists(join(root, f))) {
      const content = readText(join(root, f)) || "";
      if (content.includes("MIT")) return "MIT";
      if (content.includes("Apache")) return "Apache-2.0";
      if (content.includes("GPL")) return "GPL-3.0";
      return "Custom";
    }
  }
  return null;
}

// Things that should never show up in the tree.
const IGNORED = new Set([
  "node_modules", ".git", "dist", "build", "target",
  ".vscode", ".idea", "__pycache__", ".pytest_cache",
  ".mypy_cache", ".egg-info", ".env", ".DS_Store",
]);

function isIgnored(name: string): boolean {
  return (
    IGNORED.has(name) ||
    name.startsWith(".") ||
    name.endsWith(".log") ||
    name.endsWith(".lock")
  );
}

// Private recursor that builds the actual tree lines.
function _buildTree(dir: string, prefix: string): string[] {
  let items: string[];
  try {
    items = readdirSync(dir).filter((i) => !isIgnored(i));
  } catch {
    return [];
  }

  // dirs first, then alphabetically
  items.sort((a, b) => {
    const aDir = statSync(join(dir, a)).isDirectory();
    const bDir = statSync(join(dir, b)).isDirectory();
    if (aDir && !bDir) return -1;
    if (!aDir && bDir) return 1;
    return a.localeCompare(b);
  });

  const lines: string[] = [];
  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const fullPath = join(dir, item);
    const isDir = statSync(fullPath).isDirectory();

    lines.push(`${prefix}${connector}${item}${isDir ? "/" : ""}`);

    if (isDir) {
      // Extend the prefix so children look indented under this item.
      const nextPrefix = prefix + (isLast ? "    " : "│   ");
      lines.push(..._buildTree(fullPath, nextPrefix));
    }
  });

  return lines;
}

export function getTree(root: string): string[] {
  return _buildTree(root, "");
}

export function getEnvVars(root: string): string[] {
  const content = readText(join(root, ".env.example"));
  if (!content) return [];
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

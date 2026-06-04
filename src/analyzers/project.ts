import { join } from "path";
import {
  getLanguage,
  getProjectName,
  getDescription,
  getLicense,
  getTree,
  getEnvVars,
  readJson,
  fileExists,
} from "../utils/fs.js";

// Collected data about a project, so the generator doesn't
// need to touch the disk again.
export interface ProjectInfo {
  name: string;
  description: string;
  language: string;
  license: string | null;
  hasEnvExample: boolean;
  envVars: string[];
  installSteps: { label: string; command: string }[];
  runScripts: { name: string; description: string }[];
  tree: string[];
  repoUrl: string | null;
}

function guessInstallSteps(root: string, lang: string): ProjectInfo["installSteps"] {
  const steps: ProjectInfo["installSteps"] = [];

  if (lang === "typescript" || lang === "javascript") {
    // If there's a package.json, there are probably deps to install
    if (fileExists(join(root, "package-lock.json")) || fileExists(join(root, "package.json"))) {
      steps.push({ label: "Install dependencies", command: "npm install" });
    }
  } else if (lang === "python") {
    if (fileExists(join(root, "requirements.txt"))) {
      steps.push({ label: "Install Python dependencies", command: "pip install -r requirements.txt" });
    } else if (fileExists(join(root, "setup.py"))) {
      steps.push({ label: "Install package in editable mode", command: "pip install -e ." });
    }
  } else if (lang === "rust") {
    steps.push({ label: "Build the project", command: "cargo build" });
  } else if (lang === "go") {
    steps.push({ label: "Download modules", command: "go mod download" });
  } else if (lang === "java") {
    steps.push({ label: "Compile", command: "mvn compile" });
  } else if (lang === "ruby") {
    steps.push({ label: "Install gems", command: "bundle install" });
  }

  return steps;
}

function guessRunScripts(root: string, lang: string): ProjectInfo["runScripts"] {
  const scripts: ProjectInfo["runScripts"] = [];

  if (lang === "typescript" || lang === "javascript") {
    const pkg = readJson<{ scripts?: Record<string, string> }>(join(root, "package.json"));
    if (pkg?.scripts) {
      return Object.entries(pkg.scripts).map(([name, cmd]) => ({
        name,
        // `cmd` is the shell command, which is enough for a README
        description: cmd,
      }));
    }
  } else if (lang === "rust") {
    scripts.push({ name: "run", description: "cargo run" });
    scripts.push({ name: "test", description: "cargo test" });
  } else if (lang === "python") {
    const mainFiles = ["main.py", "app.py", "manage.py", "run.py"];
    for (const f of mainFiles) {
      if (fileExists(join(root, f))) {
        scripts.push({ name: "run", description: `python ${f}` });
        break;
      }
    }
  } else if (lang === "go") {
    scripts.push({ name: "run", description: "go run ." });
    scripts.push({ name: "test", description: "go test ./..." });
  }

  return scripts;
}

export function analyzeProject(root: string): ProjectInfo {
  const lang = getLanguage(root);

  return {
    name: getProjectName(root),
    description: getDescription(root) ?? "",
    language: lang,
    license: getLicense(root),
    hasEnvExample: fileExists(join(root, ".env.example")),
    envVars: getEnvVars(root),
    installSteps: guessInstallSteps(root, lang),
    runScripts: guessRunScripts(root, lang),
    tree: getTree(root),
    // TODO: try to read `git remote` or package.json repository field
    repoUrl: null,
  };
}

<div align="center">

# auto-readme

**Stop writing READMEs from scratch. Run one command and get a professional README.md generated from your repo.**

[![npm version](https://img.shields.io/npm/v/auto-readme?color=cb3837&label=npm&logo=npm)](https://www.npmjs.com/package/auto-readme)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](#license)
[![node](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## Why

Every project needs a title, badges, installation steps, usage section, and license info. Copy-pasting the same structure gets old fast. `auto-readme` scans your project and generates a complete README so you can focus on writing code, not boilerplate.

---

## Feature Highlights

- **Zero config** -- run `npx auto-readme` in any project directory and get a README instantly
- **Multi-language support** -- generate READMEs in English (`en`) or Portuguese (`pt`)
- **Minimal or full style** -- `--style minimal` for short READMEs, `--style full` for detailed docs with project trees
- **Smart language detection** -- automatically identifies TypeScript, JavaScript, Python, Rust, Go, Java, and Ruby projects
- **Auto-discovered install steps** -- detects `npm install`, `pip install`, `cargo build`, `go mod download`, and more
- **Environment variable extraction** -- reads `.env.example` and documents the required variables
- **Overwrite protection** -- prompts before overwriting an existing README (respects `y/n` and `s/sim`)
- **Preview mode** -- dump the generated README to your terminal without writing to disk
- **Custom output file** -- generate `CONTRIBUTING.md`, `GUIDE.md`, or any filename you want
- **Shield badges** -- adds language and license badges automatically via shields.io

---

## Quick Start

### No Install Required

```bash
npx auto-readme
```

### Global Install

```bash
npm install -g auto-readme
auto-readme
```

---

## Usage

```bash
# Generate a README for the current directory
npx auto-readme

# Generate for a different project
npx auto-readme /path/to/project

# Short README in Portuguese
npx auto-readme --lang pt --style minimal

# Generate as CONTRIBUTING.md instead
npx auto-readme --output CONTRIBUTING.md

# Preview in terminal without writing a file
npx auto-readme --preview
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--lang <en\|pt>` | Output language | `en` |
| `--style <minimal\|full>` | README style (`full` includes project tree) | `full` |
| `--output <name>` | Output file name | `README.md` |
| `--preview` | Print to terminal instead of writing to disk | `false` |
| `[path]` | Project directory to scan | `.` (current directory) |

---

## How It Works

1. **Language detection** -- checks for `tsconfig.json`, `package.json`, `requirements.txt`, `Cargo.toml`, `go.mod`, `pom.xml`, `Gemfile` in that order
2. **Project metadata** -- reads name and description from `package.json` or `Cargo.toml`; falls back to the folder name
3. **Install steps** -- infers the right install command based on the detected language and lockfiles
4. **Run scripts** -- extracts npm scripts from `package.json`, or maps standard run commands for Rust, Python, Go
5. **Environment variables** -- parses `.env.example` if present and lists the required variables
6. **Project tree** -- builds a directory tree (full style only), skipping `node_modules`, `.git`, `dist`, `build`, and other noise
7. **License detection** -- reads the `license` field from `package.json` or scans the LICENSE file for MIT, Apache, or GPL keywords
8. **README generation** -- assembles all collected data into a clean Markdown file with badges and structured sections

---

## Supported Languages

| Language | Trigger File | Detected Install | Detected Run |
|----------|-------------|-------------------|-------------|
| TypeScript | `tsconfig.json` | `npm install` | npm scripts |
| JavaScript | `package.json` | `npm install` | npm scripts |
| Python | `requirements.txt` / `setup.py` | `pip install -r requirements.txt` / `pip install -e .` | `python main.py` |
| Rust | `Cargo.toml` | `cargo build` | `cargo run` |
| Go | `go.mod` | `go mod download` | `go run .` |
| Java | `pom.xml` | `mvn compile` | -- |
| Ruby | `Gemfile` | `bundle install` | -- |

---

## Roadmap

- [ ] Monorepo support
- [ ] Framework detection (React, Next.js, FastAPI, etc.)
- [ ] Auto-generated shields.io badges for dependencies and CI status
- [ ] Interactive mode with prompts

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## License

[MIT](LICENSE)

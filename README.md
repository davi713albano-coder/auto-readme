# auto-readme

Tired of writing READMEs from scratch? Same.

![demo](./demo.gif)

`auto-readme` is a CLI that analyzes any repository and generates a decent `README.md` automatically. Just run `npx auto-readme` and you're done.

## Why?

I got bored of copy-pasting the same README structure over and over. Every project needs a title, badges, installation steps, usage, etc. So I built this tiny tool to automate the boring part and let me focus on coding.

## Install

```bash
npm install -g auto-readme
```

Or use directly with npx:

```bash
npx auto-readme
```

## Usage

Generate a README for the current directory:

```bash
npx auto-readme
```

Generate for another project:

```bash
npx auto-readme /path/to/project
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--lang <en\|pt>` | Output language | `en` |
| `--style <minimal\|full>` | README style | `full` |
| `--output <name>` | Output file name | `README.md` |
| `--preview` | Show preview in terminal | `false` |

## Examples

```bash
# Short README in Portuguese
npx auto-readme --lang pt --style minimal

# Generate as CONTRIBUTING.md
npx auto-readme --output CONTRIBUTING.md

# Preview before writing
npx auto-readme --preview
```

## Roadmap

- [ ] Suporte a monorepos
- [ ] Detectar frameworks (React, Next, FastAPI, etc)
- [ ] Gerar badges do shields.io automaticamente
- [ ] Modo interativo com perguntas

## Contributing

PRs are welcome, just don't break stuff 😄

## License

MIT © auto-readme

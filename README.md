<div align="center">

# 📝 auto-readme

**CLI que analisa repositórios e gera README.md profissional automaticamente**

Tired of writing READMEs from scratch? Same.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/davi713albano-coder/auto-readme?style=for-the-badge&color=gold)](https://github.com/davi713albano-coder/auto-readme/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/davi713albano-coder/auto-readme?style=for-the-badge&color=blueviolet)](https://github.com/davi713albano-coder/auto-readme/network)
[![GitHub Issues](https://img.shields.io/github/issues/davi713albano-coder/auto-readme?style=for-the-badge&color=red)](https://github.com/davi713albano-coder/auto-readme/issues)
[![Last Commit](https://img.shields.io/github/last-commit/davi713albano-coder/auto-readme?style=for-the-badge&color=green)](https://github.com/davi713albano-coder/auto-readme/commits/main)
[![Repo Size](https://img.shields.io/github/repo-size/davi713albano-coder/auto-readme?style=for-the-badge&color=orange)](https://github.com/davi713albano-coder/auto-readme)

---

</div>

## 📑 Índice

- [🤔 Por quê?](#-por-quê)
- [✨ Features](#-features)
- [📸 Demo](#-demo)
- [🚀 Quick Start](#-quick-start)
- [📦 Instalação](#-instalação)
- [📖 Uso](#-uso)
- [⚙️ Opções](#️-opções)
- [🛠️ Tech Stack](#️-tech-stack)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

---

## 🤔 Por quê?

I got bored of copy-pasting the same README structure over and over. Every project needs a title, badges, installation steps, usage, etc. So I built this tiny tool to automate the boring part and let me focus on coding.

---

## ✨ Features

- 🔍 **Análise automática** — Detecta linguagem, framework e dependências do projeto
- 📝 **Geração profissional** — Cria READMEs com badges, instruções de instalação e mais
- 🌍 **Suporte multilíngue** — Gera em inglês ou português
- 🎨 **Estilos diferentes** — Modo minimal ou full
- 👀 **Preview** — Visualize antes de salvar
- ⚡ **Rápido** — Gera em segundos

---

## 📸 Demo

![demo](./demo.gif)

---

## 🚀 Quick Start

```bash
# Gere um README para o diretório atual
npx auto-readme

# Gere para outro projeto
npx auto-readme /path/to/project

# Preview antes de salvar
npx auto-readme --preview
```

---

## 📦 Instalação

### 📋 Pré-requisitos

| Requisito | Versão | Badge |
|-----------|--------|-------|
| Node.js | ≥ 18.0 | [![Node.js](https://img.shields.io/badge/node-≥18.0-blue)](https://nodejs.org) |
| npm | ≥ 8.0 | [![npm](https://img.shields.io/badge/npm-≥8.0-brightgreen)](https://npmjs.com) |
| Git | ≥ 2.34 | [![Git](https://img.shields.io/badge/git-≥2.34-orange)](https://git-scm.com) |

### 🛠️ Instalação Global

```bash
# Instale globalmente
npm install -g auto-readme

# Ou use diretamente com npx
npx auto-readme
```

---

## 📖 Uso

### Gere um README para o diretório atual

```bash
npx auto-readme
```

### Gere para outro projeto

```bash
npx auto-readme /path/to/project
```

### Gere com estilo minimal em português

```bash
npx auto-readme --lang pt --style minimal
```

### Gere como CONTRIBUTING.md

```bash
npx auto-readme --output CONTRIBUTING.md
```

### Preview antes de salvar

```bash
npx auto-readme --preview
```

---

## ⚙️ Opções

| Flag | Descrição | Default |
|------|-----------|---------|
| `--lang <en\|pt>` | Idioma do README | `en` |
| `--style <minimal\|full>` | Estilo do README | `full` |
| `--output <name>` | Nome do arquivo de saída | `README.md` |
| `--preview` | Mostra preview no terminal | `false` |

---

## 🗂️ Estrutura do Projeto

```
📦 auto-readme
├── 📂 src/
│   ├── 📄 index.ts              # CLI principal
│   ├── 📂 analyzers/            # Analisadores de projeto
│   │   └── 📄 project.ts
│   └── 📂 generators/           # Geradores de README
│       └── 📄 readme.ts
├── 📂 dist/                     # Código compilado
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 README.md
└── 📄 LICENSE
```

---

## 🛠️ Tech Stack

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Commander](https://img.shields.io/badge/Commander-12.1+-red?style=flat-square)](https://github.com/tj/commander.js)
[![Chalk](https://img.shields.io/badge/Chalk-5.3+-green?style=flat-square)](https://github.com/chalk/chalk)

---

## 🗺️ Roadmap

- [x] ✅ Análise automática de projetos
- [x] ✅ Geração de README em inglês
- [x] ✅ Geração de README em português
- [x] ✅ Modo minimal e full
- [x] ✅ Preview no terminal
- [ ] 🚧 Suporte a monorepos
- [ ] 🚧 Detectar frameworks (React, Next, FastAPI, etc)
- [ ] 🚧 Gerar badges do shields.io automaticamente
- [ ] 🚧 Modo interativo com perguntas
- [ ] 🚧 Suporte a mais idiomas

---

## 🤝 Contribuição

PRs are welcome, just don't break stuff 😄

### 📌 Passo a passo

1. **Fork** este repositório
2. **Clone** seu fork: `git clone https://github.com/seu-usuario/auto-readme.git`
3. **Crie** uma branch: `git checkout -b feat/minha-feature`
4. **Commit** suas mudanças: `git commit -m 'feat: adiciona nova feature'`
5. **Push** para a branch: `git push origin minha-feature`
6. Abra um **Pull Request**

---

## 📄 Licença

MIT © auto-readme — veja [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**davi713albano-coder**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/davi713albano-coder)

---

<div align="center">

⭐ **Se este projeto te ajudou, considere dar uma star!** ⭐

<p align="center">
  <sub>Feito com ❤️ e TypeScript. Mantido por <a href='https://github.com/davi713albano-coder'>@davi713albano-coder</a></sub>
</p>

</div>

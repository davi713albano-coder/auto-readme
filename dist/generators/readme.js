// Translation strings. Kept inline because the list is tiny
// and pulling in i18n would be overkill.
const copy = {
    en: {
        install: "Installation",
        usage: "Usage",
        env: "Environment Variables",
        envDesc: "Create a `.env` file based on `.env.example`:",
        tree: "Project Structure",
        license: "License",
        contrib: "Contributing",
        contribText: "Found a bug? Wanna add something? PRs are welcome. Or just open an issue. Or don't. No pressure.",
        noScripts: "No specific run scripts detected. Check the project files for how to start it.",
    },
    pt: {
        install: "Instalação",
        usage: "Uso",
        env: "Variáveis de Ambiente",
        envDesc: "Crie um arquivo `.env` baseado no `.env.example`:",
        tree: "Estrutura do Projeto",
        license: "Licença",
        contrib: "Contribuindo",
        contribText: "Achou um bug? Quer adicionar algo? PRs são bem-vindos. Ou abre uma issue. Ou não. Sem pressão. 😄",
        noScripts: "Nenhum script de execução detectado. Dê uma olhada nos arquivos do projeto pra saber como rodar.",
    },
};
function badge(label, value, color) {
    return `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(value)}-${color})`;
}
function getBadgeColor(language) {
    const map = {
        typescript: "3178C6",
        javascript: "F7DF1E",
        python: "3776AB",
        rust: "000000",
        go: "00ADD8",
        java: "007396",
        ruby: "CC342D",
        shell: "89E051",
    };
    return map[language] || "555555";
}
function getLanguageLabel(language) {
    const map = {
        typescript: "TypeScript",
        javascript: "JavaScript",
        python: "Python",
        rust: "Rust",
        go: "Go",
        java: "Java",
        ruby: "Ruby",
        shell: "Shell",
    };
    return map[language] || language;
}
export function generateReadme(info, options) {
    const i = options.lang === "pt" ? copy.pt : copy.en;
    const parts = [];
    // Title + badges at the top
    parts.push(`# ${info.name}`);
    parts.push("");
    parts.push(`${badge("Language", getLanguageLabel(info.language), getBadgeColor(info.language))} ` +
        (info.license ? `${badge("License", info.license, "brightgreen")}` : ""));
    parts.push("");
    // Description
    if (info.description) {
        parts.push(info.description);
        parts.push("");
    }
    // Installation
    parts.push(`## ${i.install}`);
    parts.push("");
    if (info.installSteps.length > 0) {
        for (const step of info.installSteps) {
            parts.push(`\`\`\`bash`);
            parts.push(step.command);
            parts.push(`\`\`\``);
            parts.push("");
        }
    }
    else {
        parts.push("No installation steps detected.");
        parts.push("");
    }
    // Usage
    parts.push(`## ${i.usage}`);
    parts.push("");
    if (info.runScripts.length > 0) {
        for (const script of info.runScripts) {
            parts.push(`- **${script.name}**: \`${script.description}\``);
        }
        parts.push("");
    }
    else {
        parts.push(i.noScripts);
        parts.push("");
    }
    // Tree (only in "full" mode)
    if (options.style === "full" && info.tree.length > 0) {
        parts.push(`## ${i.tree}`);
        parts.push("");
        parts.push("```");
        // The tree already looks like a tree, so no need for the project name here.
        for (const line of info.tree) {
            parts.push(line);
        }
        parts.push("```");
        parts.push("");
    }
    // Environment variables
    if (info.hasEnvExample && info.envVars.length > 0) {
        parts.push(`## ${i.env}`);
        parts.push("");
        parts.push(i.envDesc);
        parts.push("");
        parts.push("```");
        for (const env of info.envVars) {
            parts.push(env);
        }
        parts.push("```");
        parts.push("");
    }
    // License section
    if (info.license) {
        parts.push(`## ${i.license}`);
        parts.push("");
        parts.push(`This project is licensed under the **${info.license}** License.`);
        parts.push("");
    }
    // Contributing
    parts.push(`## ${i.contrib}`);
    parts.push("");
    parts.push(i.contribText);
    parts.push("");
    return parts.join("\n");
}

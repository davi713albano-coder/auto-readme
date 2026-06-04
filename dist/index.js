#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { resolve, join } from "path";
import { writeFileSync, existsSync } from "fs";
import { analyzeProject } from "./analyzers/project.js";
import { generateReadme } from "./generators/readme.js";
const program = new Command();
program
    .name("auto-readme")
    .description("Scans a repo and spits out a decent README. That's it.")
    .version("1.0.0")
    .option("-l, --lang <language>", "README language: 'en' or 'pt'", "en")
    .option("-s, --style <style>", "README style: 'minimal' or 'full'", "full")
    .option("-o, --output <name>", "output file name", "README.md")
    .option("-p, --preview", "dump the README to the terminal instead of writing to disk", false)
    .argument("[path]", "project path", ".")
    .action(async (projectPath, options) => {
    const root = resolve(projectPath);
    if (!existsSync(root)) {
        console.error(chalk.red(`I can't find "${root}". Did you type it right?`));
        process.exit(1);
    }
    const lang = options.lang;
    const style = options.style;
    const outputFile = join(root, options.output);
    // Preview mode: just log it to the terminal and bail.
    if (options.preview) {
        console.log(chalk.cyan("--- README preview ---\n"));
    }
    // Ask before overwriting an existing README
    if (existsSync(outputFile) && !options.preview) {
        const readline = (await import("readline")).default;
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const question = (q) => new Promise((resolve) => rl.question(q, resolve));
        const promptText = lang === "pt"
            ? chalk.yellow("Já existe um README.md. Quer sobrescrever? (s/n): ")
            : chalk.yellow("README.md already exists. Overwrite? (y/n): ");
        const answer = await question(promptText);
        rl.close();
        const accepted = ["y", "yes"];
        const aceito = ["s", "sim"];
        if (!accepted.includes(answer.toLowerCase()) && !aceito.includes(answer.toLowerCase())) {
            console.log(chalk.gray("Cancelled. No changes were made."));
            process.exit(0);
        }
    }
    try {
        if (!options.preview) {
            console.log(chalk.blue(`Scanning: ${root}`));
        }
        const info = analyzeProject(root);
        const readme = generateReadme(info, { lang, style });
        if (options.preview) {
            console.log(readme);
            console.log(chalk.gray("\n--- end of preview ---"));
            process.exit(0);
        }
        writeFileSync(outputFile, readme);
        console.log(chalk.green(`Done. README written to ${outputFile}`));
    }
    catch (err) {
        // TODO: distinguish between "not a project" and actual file-system errors
        console.error(chalk.red("Something went wrong while generating the README:"), err);
        process.exit(1);
    }
});
program.parse();

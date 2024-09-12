#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import figlet from "figlet";


program.version("1.0.0").description("My Node CLI");

console.log(
  chalk.yellow(figlet.textSync("My Node CLI", { horizontalLayout: "full" }))
);

program.action(() => {
  inquirer.prompt([
    {
      type: "list",
      name: "choice",
      choices: ["Option 1", "Option 2", "Option 3"],
    }
  ])
    .then((result) => {
      const spinner = ora(`Doing ${result.choice}...`).start();
      setTimeout(() => {
        spinner.succeed(chalk.green("Done!"));
      }, 3000);
    })
})

program.parse(process.argv);
#!/usr/bin/env node
import { program } from "commander";
import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import { getTitle } from "../src/commands.js";


program.version("1.0.0").description("My CLI Scraper");

program.action(() => {
  inquirer.prompt([
    {
      type: "input",
      name: "url",
      message: "Which website you want to scrape ?"
    }
  ])
    .then(async (answser) => {
      const url = answser.url;
      const spinner = ora(`Scraping ${url}...`).start();
      const title = await getTitle(url)
      spinner.succeed(chalk.green(`Title! ${title}`));
    });
});

program.parse(process.argv);
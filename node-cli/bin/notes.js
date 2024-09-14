#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import { createNote, filterNote, findAllNotes, getNote, removeAllNotes, removeNote } from "../src/notes.js";

program.version("1.0.0").description("CLI Note taker");

program
  .option("-n, --note <type>", 'Add new note')
  .option("-t, --tags <type>", 'Add tags')
  .action(async (options) => {
    const noteInput = options.note;
    const tagInput = options.tags;
    const tags = tagInput.split(",");
    const note = {
      id: Date.now(),
      content: noteInput,
      tags: tags
    }
    await createNote(note);
  });

program
  .command("search")
  .alias("s")
  .option('-i, --id <type>', 'Search by id')
  .action(async (options) => {
    const id = options.id;
    const note = await getNote(id);
    if (note) {
      console.log(chalk.green("Note found!"));
    } else {
      console.log(chalk.red("Not found!"))
    }
  })


program
  .command("remove")
  .alias("r")
  .option('-i, --id <type>', 'Remove by id')
  .action(async (options) => {
    const id = options.id;
    const response = await removeNote(id);
    if (response) {
      console.log(chalk.green("Note removed!"));
    } else {
      console.log(chalk.red("Not found!"))
    }
  });

program
  .command("all")
  .alias("a")
  .action(async () => {
    const response = await findAllNotes();
    console.log(response);
  });

program
  .command("clean")
  .alias("c")
  .action(async () => {
    const response = await removeAllNotes();
    if (response.length <= 0) {
      console.log(chalk.green("Cleaned"));
    } else {
      console.log(chalk.red("Something went wrong!"))
    }
  });

program
  .command("filter")
  .alias("f")
  .option('-t, --title <type>', 'Remove by id')
  .action(async (options) => {
    const response = await filterNote(options.title);
    if (response.length === 1) {
      console.log(chalk.green("Note found!"));
    } else {
      console.log(chalk.red("Not found!"))
    }
  });


program.parse(process.argv);
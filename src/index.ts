#!/usr/bin/env node

import { promisify } from "util";
import chalk from "chalk";
import childprocess from "child_process";
import { clear } from "console";
import { prompt } from "enquirer";
import { buildCommitMessage } from "./utils";
import { getCommitSteps } from "./steps";
import { TAnswers } from "./types";

const exec = promisify(childprocess.exec);

async function main() {
  clear();
  const { stdout } = await exec("git diff --name-only --cached", {
    cwd: process.cwd(),
  });
  const hasFilesStaged = stdout.trim() !== "";

  if (!hasFilesStaged) {
    console.log(chalk.red("No files staged for commit. Aborting commit."));
    const { stdout } = await exec("git status", {
      cwd: process.cwd(),
    });
    console.error(`\n${stdout}`);
    return;
  }

  try {
    const answers = await prompt<TAnswers>(getCommitSteps());

    if (answers && answers.confirmCommit) {
      const result = buildCommitMessage(answers);

      try {
        await exec(`git commit -m "${result}"`, {
          cwd: process.cwd(),
        });
      } catch ({ stdout }) {
        console.error(chalk.red(stdout));
      }
    } else {
      console.log(chalk.red("\nCommit has been canceled."));
    }
  } catch (err) {
    console.error(err);
  }
}

main();

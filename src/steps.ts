import chalk from "chalk";
import { getCommitTypesMapped, buildCommitMessage } from "./utils";

export function getCommitSteps() {
  return [
    {
      type: "select",
      name: "type",
      message: "Select the type of change that you're committing",
      choices: getCommitTypesMapped(),
    },
    {
      type: "input",
      name: "scope",
      message: "What is the scope of this change (e.g. component or file name)",
      result: (value: string): string => (value ? `(${value.trim()})` : ""),
    },
    {
      type: "input",
      name: "description",
      message: "Write a short, imperative tense description of the change\n",
      validate: (value: string): boolean => !!value && !!value.trim(),
      result: (value: string): string =>
        (value.charAt(0).toLowerCase() + value.slice(1)).trim(),
    },
    {
      type: "input",
      name: "body",
      message:
        'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      result: (value: string): string =>
        value ? `\n\n${value.trim().split("|").join("\n")}` : "",
    },
    {
      type: "input",
      name: "footer",
      message:
        "List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n",
      result: (value: string): string => (value ? `\n\n${value.trim()}` : ""),
    },
    {
      type: "confirm",
      name: "confirmCommit",
      initial: true,
      message(): string {
        // @ts-ignore
        const { answers } = this.state;
        const commitMsg = `\n\n${buildCommitMessage(answers)}\n\n`;
        const question =
          "Are you sure you want to proceed with the commit above?";
        return chalk.yellow(commitMsg) + question;
      },
    },
  ];
}

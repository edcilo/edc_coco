import config from "./config.json";
import { TAnswers, TConfig } from "./types";

const MAX_LINE_LENGTH = config.git.max_line_length;

const buildCommitMessage = (answers: TAnswers) => {
  const { type, scope, description, body, footer } = answers;
  const commitMsg = `${type}${scope}: ${description}`;

  let result = commitMsg.slice(0, MAX_LINE_LENGTH);
  result += `${body}${footer}`;

  return result;
};

const getCommitTypesMapped = () => {
  const types: Record<string, TConfig> = config.types;
  return Object.keys(types).map((value) => {
    return {
      name: value,
      message: types[value].description,
    };
  });
};

export { buildCommitMessage, getCommitTypesMapped };

import { buildCommitMessage, getCommitTypesMapped } from "./../src/utils";
import { describe, expect, it } from "@jest/globals";

describe("getCommitTypesMapped function", () => {
  it("should return an array of commit types", () => {
    const result = getCommitTypesMapped();
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("message");
  });
});

describe("buildCommitMessage function", () => {
  it("should return a commit message", () => {
    const answers = {
      type: "feat",
      scope: "(test)",
      description: "lorem ipsum",
      body: "\n\ndolor sit amet \nconsectetur idiapiscing",
      footer: "\n\n#1, #2",
      confirmCommit: true,
    };
    const result = buildCommitMessage(answers);
    expect(typeof result).toBe("string");
    expect(result).toBe(
      "feat(test): lorem ipsum\n\ndolor sit amet \nconsectetur idiapiscing\n\n#1, #2"
    );
  });
});

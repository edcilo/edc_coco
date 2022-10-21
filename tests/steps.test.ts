import { getCommitSteps } from "./../src/steps";
import { describe, expect, it } from "@jest/globals";

describe("getCommitSteps function", () => {
  it("should return an array of commit steps", () => {
    const result = getCommitSteps();
    expect(result).toBeInstanceOf(Array);
  });
});

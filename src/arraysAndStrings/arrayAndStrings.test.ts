import * as algos from "./algorithms";

describe("Array and string problems", () => {
  it("Checks if string has all unique characters", () => {
    expect(algos.stringHasUnique("44")).toBeFalsy();
    expect(algos.stringHasUnique("117")).toBeFalsy();
    expect(algos.stringHasUnique("132")).toBeTruthy();
  });
  it("Checks if string is permuatation of itself", () => {
    expect(algos.isPermutation("ab", "eidbaooo")).toBeTruthy();
    expect(algos.isPermutation("ab", "eidboaoo")).toBeFalsy();
    expect(algos.isPermutation("abc", "bbbca")).toBeTruthy();
  });
  it("Replaces spaces in string with $", () => {
    expect(algos.urlify("Mr John Smith")).toEqual("Mr$John$Smith");
  });
  it("Checks if palindrome", () => {
    expect(algos.palindromeCheck("taco cat")).toBeTruthy();
  });
  it("Checks if one edit away", () => {
    expect(algos.oneAway("pale", "ple")).toBeTruthy();
    expect(algos.oneAway("pales", "pale")).toBeTruthy();
    expect(algos.oneAway("pale", "bale")).toBeTruthy();
    expect(algos.oneAway("pale", "bake")).toBeFalsy();
  });
  it("Compresses a string", () => {
    expect(algos.compress("aabcccccaaa")).toEqual("a2b1c5a3");
    expect(algos.compress("abcd")).toEqual("abcd");
  });
<<<<<<< HEAD
=======
  it("Merges a sorted array", () => {
    // https://leetcode.com/problems/merge-sorted-array/?envType=study-plan-v2&envId=top-interview-150

    expect(algos.mergeSorted([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)).toEqual([
      1, 2, 2, 3, 5, 6,
    ]);
    expect(algos.mergeSorted([1], 1, [], 0)).toEqual([1]);
    expect(algos.mergeSorted([0], 0, [1], 1)).toEqual([1]);
  });
>>>>>>> 3f10e8b60a0eb562eca2fe093620f14d01992431
});

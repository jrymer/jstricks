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
});

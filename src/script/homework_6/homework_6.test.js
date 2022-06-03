import { diff, isWord, pow } from "./homework_6.js";

describe("homework 6, function 1 test", () => {
  it("is function exists", () => {
    expect(diff).toBeDefined();
  });

  it("param 5 and 4", () => {
    expect(diff(51, 45)).toEqual(6);
  });

  it("param 4 and 5", () => {
    expect(diff(4, 5)).toEqual(1);
  });

  it("param 9 and 9", () => {
    expect(diff(9, 9)).toEqual(0);
  });

  it("w/o params", () => {
    expect(diff()).toEqual(0);
  });
});

describe("homework 6, function 2 test", () => {
  it("is function exists", () => {
    expect(isWord).toBeDefined();
  });

  it("param '123 1234", () => {
    expect(isWord("123 1234")).toEqual(false);
  });

  it("param 123", () => {
    expect(isWord("123")).toEqual(true);
  });

  it("w/o params", () => {
    expect(isWord()).toEqual(true);
  });
});

describe("homework 6, function 3 test", () => {
  it("is function exists", () => {
    expect(pow).toBeDefined();
  });

  it("param 3 and 3", () => {
    expect(pow(3, 3)).toEqual(27);
  });

  it("param 4 and 2", () => {
    expect(pow(4, 2)).toEqual(16);
  });

  it("w/o params", () => {
    expect(pow()).toEqual(1);
  });
});

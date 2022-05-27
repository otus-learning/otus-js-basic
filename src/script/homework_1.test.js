import { hw1_f1, hw1_f2, hw1_f3 } from "./homework_1.js";

describe("homework 1, function 1 test", () => {
  it("is function exists", () => {
    expect(hw1_f1).toBeDefined();
  });

  it("param 5 and 4", () => {
    expect(hw1_f1(5, 4)).toEqual([20, 9]);
  });
  it("param 9 and 9", () => {
    expect(hw1_f1(9, 9)).toEqual([81, 18]);
  });
  it("param null and null", () => {
    expect(hw1_f1(null, null)).toEqual([0, 0]);
  });
  it("param undefined and undefined", () => {
    expect(hw1_f1(undefined, undefined)).toEqual([0, 0]);
  });
  it("param empty string and empty string", () => {
    expect(hw1_f1("", "")).toEqual([0, 0]);
  });
});

describe("homework 1, function 2 test", () => {
  it("is function exists", () => {
    expect(hw1_f2).toBeDefined();
  });

  it("param '123' and '1234", () => {
    expect(hw1_f2("123", "1234")).toEqual([7]);
  });

  it("param null and null", () => {
    expect(hw1_f2(null, null)).toEqual([0]);
  });

  it("param undefined and undefined", () => {
    expect(hw1_f2(undefined, undefined)).toEqual([0]);
  });

  it("param empty string and empty string", () => {
    expect(hw1_f2("", "")).toEqual([0]);
  });
});

describe("homework 1, function 3 test", () => {
  it("is function exists", () => {
    expect(hw1_f3).toBeDefined();
  });

  it("param '123'", () => {
    expect(hw1_f3("123")).toEqual([6]);
  });

  it("param '1234'", () => {
    expect(hw1_f3("1234")).toEqual([6]);
  });

  it("param null", () => {
    expect(hw1_f3(null)).toEqual([0]);
  });

  it("param undefined", () => {
    expect(hw1_f3(undefined)).toEqual([0]);
  });

  it("param empty string and empty string", () => {
    expect(hw1_f3("")).toEqual([0]);
  });
});

import { hw9_f1, hw9_f2, hw9_f3 } from "./homework_9.js";

describe("homework 9, function 1 test", () => {
  it("is function exists", () => {
    expect(hw9_f1).toBeDefined();
  });

  it("param 4, 5, 3", () => {
    expect(hw9_f1(4, 5, 3).join("").split(" ")).not.toContain("not");
  });

  it("param 3, 4, 5", () => {
    expect(hw9_f1(3, 4, 5).join("").split(" ")).not.toContain("not");
  });

  it("param 5, 4, 3", () => {
    expect(hw9_f1(5, 4, 3).join("").split(" ")).not.toContain("not");
  });

  it("param 6, 5, 3", () => {
    expect(hw9_f1(6, 5, 3).join("").split(" ")).toContain("not");
  });

  it("param 6, 4, 5", () => {
    expect(hw9_f1(6, 4, 5).join("").split(" ")).toContain("not");
  });

  it("param 6, 4, 3", () => {
    expect(hw9_f1(6, 4, 3).join("").split(" ")).toContain("not");
  });

  it("param -4, 5, 3", () => {
    expect(hw9_f1(-4, 5, 3).join("").split(" ")).toContain("Error");
  });

  it("param 3, -4, 5", () => {
    expect(hw9_f1(3, -4, 5).join("").split(" ")).toContain("Error");
  });

  it("param 3, 4, -5", () => {
    expect(hw9_f1(3, 4, -5).join("").split(" ")).toContain("Error");
  });
});

describe("homework 8, function 2 test", () => {
  it("is function exists", () => {
    expect(hw9_f2).toBeDefined();
  });

  it("param 3", () => {
    expect(hw9_f2(3)).toEqual([Math.PI * 3 * 2, Math.PI * Math.pow(3 * 2, 2)]);
  });

  it("param 5", () => {
    expect(hw9_f2(5)).toEqual([Math.PI * 5 * 2, Math.PI * Math.pow(5 * 2, 2)]);
  });
});

describe("homework 8, function 3 test", () => {
  it("is function exists", () => {
    expect(hw9_f3).toBeDefined();
  });

  it("param 4, -1, -5", () => {
    expect(hw9_f3(4, -1, -5)).toEqual([1.25, -1]);
  });

  it("param 5, -6, -32", () => {
    expect(hw9_f3(5, -6, -32)).toEqual([3.2, -2]);
  });

  it("param 8, 0, 5", () => {
    expect(hw9_f3(8, 0, 5).join("").split(" ")).toContain("no");
  });

  it("param -4, 28, -49", () => {
    expect(hw9_f3(-4, 28, -49)).toEqual([3.5]);
  });
});

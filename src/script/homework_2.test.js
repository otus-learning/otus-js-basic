import { hw2_f1, hw2_f2, hw2_f3 } from "./homework_2.js";

describe("homework 2, function 1 test", () => {
  it("is function exists", () => {
    expect(hw2_f1).toBeDefined();
  });

  it("param 5 and 4", () => {
    expect(hw2_f1(5, 4)).toEqual([5]);
  });

  it("param 7 and 8", () => {
    expect(hw2_f1(7, 8)).toEqual([8]);
  });

  it("param null and null", () => {
    expect(hw2_f1(null, null)).toEqual([0]);
  });
  it("param undefined and undefined", () => {
    expect(hw2_f1(undefined, undefined)).toEqual([0]);
  });
  it("param empty string and empty string", () => {
    expect(hw2_f1("", "")).toEqual([0]);
  });
});

describe("homework 2, function 2 test", () => {
  it("is function exists", () => {
    expect(hw2_f2).toBeDefined();
  });

  it("prompted 1", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "1");
    expect(hw2_f2()).toEqual(["Jan"]);
  });

  it("prompted 6", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "6");
    expect(hw2_f2()).toEqual(["Jun"]);
  });

  it("prompted 12", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "12");
    expect(hw2_f2()).toEqual(["Dec"]);
  });

  it("prompted 13", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "13");
    expect(hw2_f2()).toEqual(["Dec"]);
  });

  it("prompted 0", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "0");
    expect(hw2_f2()).toEqual(["Jan"]);
  });

  it("prompted null", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "null");
    expect(hw2_f2()).toEqual(["Jan"]);
  });

  it("prompted undefined", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "undefined");
    expect(hw2_f2()).toEqual(["Jan"]);
  });

  it("prompted empty string", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "");
    expect(hw2_f2()).toEqual(["Jan"]);
  });
});

describe("homework 2, function 3 test", () => {
  it("is function exists", () => {
    expect(hw2_f3).toBeDefined();
  });

  it("param 16 36", () => {
    expect(hw2_f3(16, 36)).toEqual(["fitted"]);
  });

  it("param 36 16", () => {
    expect(hw2_f3(36, 16)).toEqual(["not fitted"]);
  });
});

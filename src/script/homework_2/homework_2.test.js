import { hw2_f1, hw2_f2, hw2_f3 } from "./homework_2.js";

describe("homework 2, function 1 test", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("is function exists", () => {
    expect(hw2_f1).toBeDefined();
  });

  it("param 5 and 4", () => {
    hw2_f1(5, 4);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(5);
  });

  it("param 7 and 8", () => {
    hw2_f1(7, 8);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(8);
  });

  it("w/o params", () => {
    hw2_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(0);
  });
});

describe("homework 2, function 2 test", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("is function exists", () => {
    expect(hw2_f2).toBeDefined();
  });

  it("prompted 1", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "1");
    hw2_f2();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("Jan");
  });

  it("prompted 6", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "6");
    hw2_f2();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("Jun");
  });

  it("prompted 12", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "12");
    hw2_f2();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("Dec");
  });

  it("prompted 13", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "13");
    hw2_f2();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("Dec");
  });

  it("prompted 0", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "0");
    hw2_f2();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("Jan");
  });
});

describe("homework 2, function 3 test", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("is function exists", () => {
    expect(hw2_f3).toBeDefined();
  });

  it("param 16 36", () => {
    hw2_f3(16, 36);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("fitted");
  });

  it("param 36 16", () => {
    hw2_f3(36, 16);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("not fitted");
  });

  it("w/o params", () => {
    hw2_f3();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("fitted");
  });
});

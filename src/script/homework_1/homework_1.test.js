import { hw1_f1, hw1_f2, hw1_f3 } from "./homework_1.js";

describe("homework 1, function 1 test", () => {
  console.log = jest.fn();

  it("is function exists", () => {
    expect(hw1_f1).toBeDefined();
  });

  it("param 5 and 4", () => {
    hw1_f1(5, 4);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(20, 9);
  });

  it("param 9 and 9", () => {
    hw1_f1(9, 9);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(81, 18);
  });

  it("w/o params", () => {
    hw1_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(0, 0);
  });
});

describe("homework 1, function 2 test", () => {
  console.log = jest.fn();

  it("is function exists", () => {
    expect(hw1_f2).toBeDefined();
  });

  it("param '123' and '1234", () => {
    hw1_f2("123", "1234");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(7);
  });

  it("param empty string and empty string", () => {
    hw1_f2("", "");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(0);
  });

  it("w/o params", () => {
    hw1_f2();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(0);
  });
});

describe("homework 1, function 3 test", () => {
  console.log = jest.fn();

  it("is function exists", () => {
    expect(hw1_f3).toBeDefined();
  });

  it("param '123'", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "123";
    });
    hw1_f3("123");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(6);
  });

  it("param '123'", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "456";
    });
    hw1_f3("456");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(15);
  });
});

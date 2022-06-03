import { hw3_f1, hw3_f2, hw3_f3 } from "./homework_3.js";

describe("homework 3, function 1 test", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("is function exists", () => {
    expect(hw3_f1).toBeDefined();
  });

  it("check sum", () => {
    let sum = 0;
    for (let i = 100; i >= 50; i--) {
      sum += i;
    }
    hw3_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(sum);
  });
});

describe("homework 3, function 2 test", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });
  it("is function exists", () => {
    expect(hw3_f2).toBeDefined();
  });

  it("checking seven multiple table", () => {
    let check = [];
    for (let i = 1; i < 10; i++) {
      check.push(i * 7);
    }
    hw3_f2();
    for (let i = 0; i < check.length; i++) {
      expect(console.log).toHaveBeenNthCalledWith(
        i + 1,
        `7 x ${i + 1} = ${check[i]}`
      );
    }
    expect(console.log).toHaveBeenCalledTimes(9);
  });
});

describe("homework 3, function 3 test", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });
  it("prompted 3", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "3");
    hw3_f3();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(2);
  });

  it("prompted 9", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "9");
    hw3_f3();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(5);
  });

  it("prompted 0", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "0");
    hw3_f3();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(0);
  });
});

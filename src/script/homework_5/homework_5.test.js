import { hw5_f1, hw5_f2, hw5_f3 } from "./homework_5.js";

console.log = jest.fn();

describe("homework 5, function 1 test", () => {
  it("is function exists", () => {
    expect(hw5_f1).toBeDefined();
  });

  it("check array elements summary", () => {
    hw5_f1([1, 2, 3]);
    expect(console.log).toBeCalledWith(6);
  });

  it("check w/0 parameters)", () => {
    hw5_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(0);
  });
});

describe("homework 3, function 2 test", () => {
  it("is function exists", () => {
    expect(hw5_f2).toBeDefined();
  });

  it("check new array generation", () => {
    expect(hw5_f2([1, 2, 3])).toEqual([2, 4, 6]);
  });

  it("check new array generation w/o params", () => {
    expect(hw5_f2()).toEqual([0]);
  });
});

describe("homework 3, function 3 test", () => {
  console.log = jest.fn();

  it("is function exists", () => {
    expect(hw5_f3).toBeDefined();
  });

  it("check array elements summary", () => {
    hw5_f3([1, 2, 3]);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(3, 1);
  });

  it("w/o params", () => {
    hw5_f3();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(1, 0);
  });
});

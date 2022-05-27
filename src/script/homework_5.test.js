import { hw5_f1, hw5_f2, hw5_f3 } from "./homework_5.js";

describe("homework 5, function 1 test", () => {
  it("is function exists", () => {
    expect(hw5_f1).toBeDefined();
  });

  it("check array elements summary", () => {
    expect(hw5_f1([1, 2, 3])[0]).toEqual(6);
  });

  it("check wrong array paramater (null)", () => {
    expect(hw5_f1([null, null, null])[0]).toEqual(0);
  });

  it("check wrong array paramater (undefined)", () => {
    expect(hw5_f1([undefined, undefined, undefined])[0]).toEqual(0);
  });

  it("check wrong array paramater (empty strings)", () => {
    expect(hw5_f1(["", "", ""])[0]).toEqual(0);
  });

  it("check wrong array paramater (NaN)", () => {
    expect(hw5_f1([NaN, NaN, NaN])[0]).toEqual(0);
  });
});

describe("homework 3, function 2 test", () => {
  it("is function exists", () => {
    expect(hw5_f2).toBeDefined();
  });

  it("check new array generation", () => {
    expect(hw5_f2([1, 2, 3])).toEqual([2, 4, 6]);
  });

  it("check wrong array paramater (null)", () => {
    expect(hw5_f2([null, null, null])).toEqual([0, 0, 0]);
  });

  it("check wrong array paramater (undefined)", () => {
    expect(hw5_f2([undefined, undefined, undefined])).toEqual([0, 0, 0]);
  });

  it("check wrong array paramater (empty strings)", () => {
    expect(hw5_f2(["", "", ""])).toEqual([0, 0, 0]);
  });

  it("check wrong array paramater (NaN)", () => {
    expect(hw5_f2([NaN, NaN, NaN])).toEqual([0, 0, 0]);
  });
});

describe("homework 3, function 3 test", () => {
  it("is function exists", () => {
    expect(hw5_f3).toBeDefined();
  });

  it("check array elements summary", () => {
    expect(hw5_f3([1, 2, 3])).toEqual([3, 1]);
  });

  it("check wrong array (null)", () => {
    expect(hw5_f3([null, null, null])).toEqual([0, 0]);
  });

  it("check wrong array (undefined)", () => {
    expect(hw5_f3([undefined, undefined])).toEqual([0, 0]);
  });

  it("check wrong array (empty strings)", () => {
    expect(hw5_f3(["", ""])).toEqual([0, 0]);
  });

  it("check wrong array (NaN)", () => {
    expect(hw5_f3([NaN, NaN])).toEqual([0, 0]);
  });
});

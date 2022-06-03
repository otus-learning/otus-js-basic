import { hw9_f1, hw9_f2, hw9_f3 } from "./homework_9.js";

describe("homework 9, function 1 test", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("is function exists", () => {
    expect(hw9_f1).toBeDefined();
  });

  it("param 4, 5, 3", () => {
    hw9_f1(4, 5, 3);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("right triangle");
  });

  it("param 3, 4, 5", () => {
    hw9_f1(3, 4, 5);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("right triangle");
  });

  it("param 5, 4, 3", () => {
    hw9_f1(5, 4, 3);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("right triangle");
  });

  it("param 6, 5, 3", () => {
    hw9_f1(6, 5, 3);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("not right tirangle");
  });

  it("param 6, 4, 5", () => {
    hw9_f1(6, 4, 5);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("not right tirangle");
  });

  it("param 6, 4, 3", () => {
    hw9_f1(6, 4, 3);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("not right tirangle");
  });

  it("w/o params", () => {
    hw9_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("not right tirangle");
  });
});

describe("homework 8, function 2 test", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("is function exists", () => {
    expect(hw9_f2).toBeDefined();
  });

  it("param 3", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return 3;
    });
    hw9_f2();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(
      Math.PI * 3 * 2,
      Math.PI * Math.pow(3 * 2, 2)
    );
  });

  it("param 5", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return 5;
    });
    hw9_f2();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(
      Math.PI * 5 * 2,
      Math.PI * Math.pow(5 * 2, 2)
    );
  });
});

describe("homework 8, function 3 test", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  let promptIdx;
  beforeEach(() => {
    promptIdx = 0;
  });
  it("is function exists", () => {
    expect(hw9_f3).toBeDefined();
  });

  it("param 4, -1, -5", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return [4, -1, -5][promptIdx++];
    });
    hw9_f3();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(1.25, -1);
  });

  it("param 5, -6, -32", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return [5, -6, -32][promptIdx++];
    });
    hw9_f3();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(3.2, -2);
  });

  it("param 8, 0, 5", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return [8, 0, 5][promptIdx++];
    });
    hw9_f3();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("no solution");
  });

  it("param -4, 28, -49", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return [-4, 28, -49][promptIdx++];
    });
    hw9_f3();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(3.5);
  });
});

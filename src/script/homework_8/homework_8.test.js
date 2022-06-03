import { hw8_f1, hw8_f2, hw8_f3 } from "./homework_8.js";

describe("homework 8, function 1 test", () => {
  console.log = jest.fn();

  it("is function exists", () => {
    expect(hw8_f1).toBeDefined();
  });

  it("param 26.05.2022", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "26.05.2022";
    });
    hw8_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("Thursday");
  });
  it("param 24.05.2022", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "24.05.2022";
    });
    hw8_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("Tuesday");
  });
});

describe("homework 8, function 2 test", () => {
  console.log = jest.fn();
  it("is function exists", () => {
    expect(hw8_f2).toBeDefined();
  });

  it("is correct working", () => {
    let m1 = 0;
    let m2 = 1;

    while (m1 !== m2) {
      m1 = new Date().getMinutes() + new Date().getHours() * 60;
      hw8_f2();
      m2 = new Date().getMinutes() + new Date().getHours() * 60;
      if (m1 === m2) {
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toBeCalledWith(m1);
        break;
      }
    }
  });
});

describe("homework 8, function 3 test", () => {
  console.log = jest.fn();

  it("is function exists", () => {
    expect(hw8_f3).toBeDefined();
  });

  it("param 21.01.2000 and 23.01.2000", () => {
    hw8_f3("21.01.2000", "23.01.2000");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("second is yonger");
  });

  it("param 23.01.2000 and 21.01.2000", () => {
    hw8_f3("23.01.2000", "21.01.2000");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("first is yonger");
  });

  it("param 21.01.2000 and 21.01.2000", () => {
    hw8_f3("21.01.2000", "21.01.2000");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("both is same age");
  });

  it("w/o params", () => {
    hw8_f3();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("second is yonger");
  });
});

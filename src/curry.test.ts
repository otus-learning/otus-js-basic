import { curry } from "./curry";

describe("curry function testing", () => {
  it("tests that function is defined and it is a function", () => {
    expect(curry).toBeDefined();
    expect(curry).toBeInstanceOf(Function);
  });

  it("tests that curry function get params and do it all right", () => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    const func = (
      a: number,
      b: number,
      c: number,
      d: number,
      e: number
    ): number => {
      return a + b + c + d + e;
    };
    const curriedFunc = curry(func);
    console.log(curriedFunc(1, 2, 3, 4, 5)); // 15
    expect(console.log).toHaveBeenCalledWith(15);
    console.log(curriedFunc(2, 3, 4)(5, 6)); // 20
    expect(console.log).toHaveBeenCalledWith(20);
    console.log(curriedFunc(3, 4)(5, 6)(7)); // 25
    expect(console.log).toHaveBeenCalledWith(25);
    console.log(curriedFunc(4, 5)(6)(7, 8)); // 30
    expect(console.log).toHaveBeenCalledWith(30);
    console.log(curriedFunc(5)(6)(7)(8)(9)); // 35
    expect(console.log).toHaveBeenCalledWith(35);
  });

  it("tests that function get another params and do it all right", () => {
    jest.spyOn(console, "log");
    const func = (a: string, b: string): string => {
      return a + b;
    };
    const curriedFunc = curry(func);
    console.log(curriedFunc("a", "b"));
    expect(console.log).toHaveBeenCalledWith("ab");
    console.log(curriedFunc("e")("d"));
    expect(console.log).toHaveBeenCalledWith("ed");
  });
});

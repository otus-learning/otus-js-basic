import { spiral } from "./spiral";

describe("spiral function testing", () => {
  it("tests that function is defined and it is a function", () => {
    expect(spiral).toBeDefined();
    expect(spiral).toBeInstanceOf(Function);
  });

  it("tests that curry function get params and do it all right", () => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    let result = spiral([
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
    ]); // [0, 1, 2, 3, 4, 9, 14, 19, 18, 17, 16, 15, 10, 5, 6, 7, 8, 13, 12, 11]
    console.log(result);
    expect(console.log).toHaveBeenCalledWith([
      0, 1, 2, 3, 4, 9, 14, 19, 18, 17, 16, 15, 10, 5, 6, 7, 8, 13, 12, 11,
    ]);

    result = spiral([
      [0, 1, 2, 3, 4, 100],
      [5, 6, 7, 8, 9, 100],
      [10, 11, 12, 13, 14, 100],
      [15, 16, 17, 18, 19, 100],
      [20, 21, 22, 23, 24, 100],
    ]);
    console.log(result);
    expect(console.log).toHaveBeenCalledWith([
      0, 1, 2, 3, 4, 100, 100, 100, 100, 100, 24, 23, 22, 21, 20, 15, 10, 5, 6,
      7, 8, 9, 14, 19, 18, 17, 16, 11, 12, 13,
    ]);
  });

  it("tests that function get another params and do it all right", () => {
    jest.spyOn(console, "log");

    let result = spiral([
      [0, 1],
      [5, 6],
    ]);
    console.log(result);
    expect(console.log).toHaveBeenCalledWith([0, 1, 6, 5]);

    result = spiral([[0, 1]]);
    console.log(result);
    expect(console.log).toHaveBeenCalledWith([0, 1]);
  });
});

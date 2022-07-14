import { Parallel } from "./parallel";

describe("parallel worker class testing", () => {
  it("tests that class is defined and it has a constructor", () => {
    expect(Parallel).toBeDefined();
    expect(Parallel).toBeInstanceOf(Function);
  });

  it("tests that parallel object do all right", async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});

    const runner = new Parallel(2);
    console.log(
      await runner.jobs(
        () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
        () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
        () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
        () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
        () => new Promise((resolve) => setTimeout(resolve, 30, 5))
      )
    ); // [1, 3, 2, 5, 4];
    expect(console.log).toHaveBeenCalledWith([1, 3, 2, 5, 4]);
  });

  it("tests that parallel object do all right with another params", async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});

    const runner = new Parallel(3);
    console.log(
      await runner.jobs(
        () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
        () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
        () => new Promise((resolve) => setTimeout(resolve, 70, 3)),
        () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
        () => new Promise((resolve) => setTimeout(resolve, 60, 5)),
        () => new Promise((resolve) => setTimeout(resolve, 20, 6))
      )
    );
    expect(console.log).toHaveBeenCalledWith([1, 2, 3, 6, 4, 5]);
  });
});

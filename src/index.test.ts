import readline from "readline";
type ReadlineInterface = ReturnType<typeof import("readline").createInterface>;

jest.spyOn(readline, "createInterface").mockImplementation(() => {
  return {
    close: () => {},
    question: (q: string, cb: () => void) => {
      cb();
    },
  } as unknown as ReadlineInterface;
});

jest.spyOn(process, "exit").mockImplementation((num: number | undefined) => {
  throw new Error(String(num));
});

jest.createMockFromModule<typeof import("child_process")>("child_process");
jest.createMockFromModule<typeof import("gh-pages")>("gh-pages");

import { main } from "./main";

let errorMsg = "";

describe("test publish CLI", () => {
  it("tests that all needed help is visible without parameters", async () => {
    console.log = jest.fn();
    try {
      await main([]);
    } catch (e) {
      errorMsg = (e as Error).message;
    }
    expect(errorMsg).toEqual("0");
    expect(console.log).toHaveBeenCalledTimes(8);
    expect(console.log).toHaveBeenLastCalledWith(
      "--build, -b <script for build>\tName of NPM script for choosen project that builds it\n"
    );
  });

  it("tests that that --ask parameter do all right", async () => {
    console.log = jest.fn();
    try {
      await main(["", "", "--ask"]);
    } catch (e) {
      errorMsg = (e as Error).message;
    }
    expect(errorMsg).toEqual("1");
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenLastCalledWith(
      "Error: unexisting project directory was choosen"
    );
  });

  it("tests that wrong parameter was detected", async () => {
    console.log = jest.fn();
    try {
      await main(["", "", "--dir", "--ask"]);
    } catch (e) {
      errorMsg = (e as Error).message;
    }
    expect(errorMsg).toEqual("1");
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenLastCalledWith("Error --dir parameter!");

    try {
      await main(["", "", "-p", "--ask"]);
    } catch (e) {
      errorMsg = (e as Error).message;
    }
    expect(errorMsg).toEqual("1");
    expect(console.log).toHaveBeenCalledTimes(4);
    expect(console.log).toHaveBeenLastCalledWith("Error --project parameter!");

    try {
      await main(["", "", "--build", "--ask"]);
    } catch (e) {
      errorMsg = (e as Error).message;
    }
    expect(errorMsg).toEqual("1");
    expect(console.log).toHaveBeenCalledTimes(6);
    expect(console.log).toHaveBeenLastCalledWith("Error --build parameter!");

    try {
      await main(["", "", "--repo", "--ask"]);
    } catch (e) {
      errorMsg = (e as Error).message;
    }
    expect(errorMsg).toEqual("1");
    expect(console.log).toHaveBeenCalledTimes(8);
    expect(console.log).toHaveBeenLastCalledWith("Error --repo parameter!");

    try {
      await main(["", "", "--branch", "--ask"]);
    } catch (e) {
      errorMsg = (e as Error).message;
    }
    expect(errorMsg).toEqual("1");
    expect(console.log).toHaveBeenCalledTimes(10);
    expect(console.log).toHaveBeenLastCalledWith("Error --branch parameter!");
  });

  it("tests that application try to publish project and it is end with error", async () => {
    let err: Error = new Error("");
    console.log = jest.fn();
    try {
      await main([
        "",
        "",
        "--prj",
        "/",
        "--dir",
        "dist",
        "--repo",
        "https://test.git",
      ]);
    } catch (e) {
      err = e as Error;
    }
    expect(err).toEqual(false);
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenLastCalledWith(
      "Error while project pubishing is occured"
    );
  });

  it("tests that application try to build project all right", async () => {
    let err: Error = new Error("");
    console.log = jest.fn();
    try {
      await main([
        "",
        "",
        "--prj",
        "/",
        "--dir",
        "dist",
        "--repo",
        "https://test.git",
        "--build",
      ]);
    } catch (e) {
      err = e as Error;
    }
    expect(err).toEqual(false);
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenLastCalledWith(
      "Error while project pubishing is occured"
    );
  });
});

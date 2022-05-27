import { hw10_f1 } from "./homework_10.js";

describe("homework 10, function 1 test", () => {
  it("is function exists", () => {
    expect(hw10_f1).toBeDefined();
  });

  it("param 22.10.10", () => {
    expect(hw10_f1("22.10.10")).toEqual(["date"]);
  });

  it("param 22.10.1910", () => {
    expect(hw10_f1("22.10.1910")).toEqual(["date"]);
  });

  it("param aaa99@bbb-9.cc", () => {
    expect(hw10_f1("aaa99@bbb-9.cc")).toEqual(["mail"]);
  });

  it("param aaa99.bbb-.cc", () => {
    expect(hw10_f1("aaa99.bbb-9.cc").join("").split(" ")).toContain("not");
  });

  it("param 22.10.123", () => {
    expect(hw10_f1("22.10.123").join("").split(" ")).toContain("not");
  });

  it("param aaa_2@bbb.cc", () => {
    expect(hw10_f1("aaa_2@bbb.cc")).toEqual(["mail"]);
  });

  it("param aaa_2@bbb.cc", () => {
    expect(hw10_f1("aaa_@bbb.cc").join("").split(" ")).toContain("not");
  });

  it("param +69009998877", () => {
    expect(hw10_f1("+69009998877").join("").split(" ")).toContain("not");
  });

  it("param +79009998877", () => {
    expect(hw10_f1("+79009998877")).toEqual(["phone number"]);
  });

  it("param 89009998877", () => {
    expect(hw10_f1("89009998877")).toEqual(["phone number"]);
  });

  it("param 88009998877", () => {
    expect(hw10_f1("88009998877")).toEqual(["phone number"]);
  });

  it("param 78009998877", () => {
    expect(hw10_f1("78009998877").join("").split(" ")).toContain("not");
  });

  it("param 87009998877", () => {
    expect(hw10_f1("87009998877").join("").split(" ")).toContain("not");
  });
});

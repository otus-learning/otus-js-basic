import { hw4_f1, hw4_f2, hw4_f3, user, admin } from "./homework_4.js";

describe("homework 4, function 1 test", () => {
  jest.spyOn(window, "prompt").mockImplementation(() => "23");

  it("is function exists", () => {
    expect(hw4_f1).toBeDefined();
  });

  hw4_f1();

  it("is user object exists", () => {
    expect(user).toBeDefined();
  });

  it("check user object", () => {
    expect(typeof user).toEqual("object");
  });

  it("check user name exists", () => {
    expect(user.name).toBeDefined();
  });

  it("check user name value", () => {
    expect(user.name).toEqual("John");
  });

  it("check user age exists", () => {
    expect(user.age).toBeDefined();
  });

  it("check user age value", () => {
    expect(user.age).toEqual("23");
  });

  it("check user age modified", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "21");
    hw4_f1();
    expect(user.age).toEqual("21");
  });
});

describe("homework 3, function 2 test", () => {
  it("is function exists", () => {
    expect(hw4_f2).toBeDefined();
  });

  it("is admin object exists", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => "23");
    hw4_f1();
    hw4_f2();
    expect(admin).toBeDefined();
  });

  it("check admin object", () => {
    expect(typeof admin).toEqual("object");
  });

  it("check admin name exists", () => {
    expect(admin.name).toBeDefined();
  });

  it("check that admin name is equal to user name", () => {
    expect(admin.name).toEqual(user.name);
  });

  it("check admin age exists", () => {
    expect(admin.age).toBeDefined();
  });

  it("check admin age value", () => {
    expect(admin.age).toEqual(user.age);
  });

  it("check admin role exists", () => {
    expect(admin.role).toBeDefined();
  });

  it("check admin role value", () => {
    expect(admin.role).toEqual("admin");
  });
});

describe("homework 3, function 3 test", () => {
  hw4_f2();

  it("is function exists", () => {
    expect(hw4_f3).toBeDefined();
  });

  hw4_f3();

  it("check variable age exists", () => {
    expect(window.age).toBeDefined();
  });

  it("check variable age value", () => {
    expect(window.age).toEqual(admin.age);
  });

  it("check variable name exists", () => {
    expect(window.name).toBeDefined();
  });

  it("check variable name value", () => {
    expect(window.name).toEqual(admin.name);
  });

  it("check variable role exists", () => {
    expect(window.role).toBeDefined();
  });

  it("check variable role value", () => {
    expect(window.role).toEqual(admin.role);
  });
});

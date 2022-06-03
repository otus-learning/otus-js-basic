import { hw10_f1 } from "./homework_10.js";

describe("homework 10, function 1 test", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("is function exists", () => {
    expect(hw10_f1).toBeDefined();
  });

  it("param 22.10.10", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "22.10.10";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("date");
  });

  it("param 22.10.1910", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "22.10.1910";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("date");
  });

  it("param aaa99@bbb-9.cc", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "aaa99@bbb-9.cc";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("mail");
  });

  it("param aaa99.bbb-.cc", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "aaa99.bbb-9.cc";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(
      "not correct date or phone number or mail"
    );
  });

  it("param 22.10.123", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "22.10.123";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(
      "not correct date or phone number or mail"
    );
  });

  it("param aaa_2@bbb.cc", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "aaa_2@bbb.cc";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("mail");
  });

  it("param aaa_2@bbb.cc", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "aaa_@bbb.cc";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(
      "not correct date or phone number or mail"
    );
  });

  it("param +69009998877", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "+69009998877";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(
      "not correct date or phone number or mail"
    );
  });

  it("param +79009998877", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "+79009998877";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("phone number");
  });

  it("param 89009998877", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "89009998877";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("phone number");
  });

  it("param 88009998877", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "88009998877";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith("phone number");
  });

  it("param 78009998877", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "78009998877";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(
      "not correct date or phone number or mail"
    );
  });

  it("param 87009998877", () => {
    jest.spyOn(window, "prompt").mockImplementation(() => {
      return "87009998877";
    });
    hw10_f1();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toBeCalledWith(
      "not correct date or phone number or mail"
    );
  });
});

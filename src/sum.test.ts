import { sum } from "./sum";

describe("sum function testing", () => {
  it("tests that function is defined and it is a function", () => {
    expect(sum).toBeDefined();
    expect(sum).toBeInstanceOf(Function);
  });

  it("tests that sum function get params and do it all right", () => {
    jest.spyOn(console, "log").mockImplementation(() => {});

    console.log(sum().toString()); // "0";
    expect(console.log).toHaveBeenCalledWith("0");
    console.log(sum().valueOf()); // 0;
    expect(console.log).toHaveBeenCalledWith(0);
    const s = sum();
    console.log(s(1).toString()); // 1
    expect(console.log).toHaveBeenCalledWith("1");
    console.log(s(1)(2).toString()); //3
    expect(console.log).toHaveBeenCalledWith("3");
    console.log(s(3)(4)(5).toString()); // 12
    expect(console.log).toHaveBeenCalledWith("12");
    const s3 = sum(3);
    console.log(s3(5).toString()); // 8
    expect(console.log).toHaveBeenCalledWith("8");
    console.log(s3(6).toString()); // 9
    expect(console.log).toHaveBeenCalledWith("9");
  });

  it("tests that sum function get another params and do it all right", () => {
    jest.spyOn(console, "log").mockImplementation(() => {});

    const s9 = sum(9);
    console.log(s9().toString()); // "9"
    expect(console.log).toHaveBeenCalledWith("9");
    console.log(s9().valueOf()); // 9
    expect(console.log).toHaveBeenCalledWith(9);
    console.log(s9(-1).toString()); //"8"
    expect(console.log).toHaveBeenCalledWith("8");
    console.log(s9(-1).valueOf()); //8
    expect(console.log).toHaveBeenCalledWith(8);
    console.log(s9(-1)().toString()); //"8"
    expect(console.log).toHaveBeenCalledWith("8");
    console.log(s9("-1")().toString()); //"8"
    expect(console.log).toHaveBeenCalledWith("8");
    console.log(s9("-1").valueOf()); //8
    expect(console.log).toHaveBeenCalledWith(8);
  });
});

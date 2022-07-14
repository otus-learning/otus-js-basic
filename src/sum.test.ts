import { sum } from "./sum";

describe("sum function testing", () => {
  it("tests that function is defined and it is a function", () => {
    expect(sum).toBeDefined();
    expect(sum).toBeInstanceOf(Function);
  });

  it("tests that sum function get params and do it all right", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    alert(sum().toString()); // "0";
    expect(window.alert).toHaveBeenCalledWith("0");
    alert(sum().valueOf()); // 0;
    expect(window.alert).toHaveBeenCalledWith(0);
    const s = sum();
    alert(s(1).toString()); // 1
    expect(window.alert).toHaveBeenCalledWith("1");
    alert(s(1)(2).toString()); //3
    expect(window.alert).toHaveBeenCalledWith("3");
    alert(s(3)(4)(5).toString()); // 12
    expect(window.alert).toHaveBeenCalledWith("12");
    const s3 = sum(3);
    alert(s3(5).toString()); // 8
    expect(window.alert).toHaveBeenCalledWith("8");
    alert(s3(6).toString()); // 9
    expect(window.alert).toHaveBeenCalledWith("9");
  });

  it("tests that sum function get another params and do it all right", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    const s9 = sum(9);
    alert(s9().toString()); // "9"
    expect(alert).toHaveBeenCalledWith("9");
    alert(s9().valueOf()); // 9
    expect(alert).toHaveBeenCalledWith(9);
    alert(s9(-1).toString()); //"8"
    expect(alert).toHaveBeenCalledWith("8");
    alert(s9(-1).valueOf()); //8
    expect(alert).toHaveBeenCalledWith(8);
    alert(s9(-1)().toString()); //"8"
    expect(alert).toHaveBeenCalledWith("8");
    alert(s9("-1")().toString()); //"8"
    expect(alert).toHaveBeenCalledWith("8");
    alert(s9("-1").valueOf()); //8
    expect(alert).toHaveBeenCalledWith(8);
  });
});

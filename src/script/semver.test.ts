import { semverSort } from "./semver";

describe("semver function testing", () => {
  it("tests that function is defined and it is a function", () => {
    expect(semverSort).toBeDefined();
    expect(semverSort).toBeInstanceOf(Function);
  });

  it("tests that curry function get params and do it all right", () => {

    jest.spyOn(console, "log").mockImplementation(() => {});

    console.log(
      semverSort([
        "1.0.5",
        "2.5.0",
        "0.12.0",
        "1",
        "1.23.45",
        "1.4.50",
        "1.2.3.4.5.6.7",
      ])
    ); // [ "0.12.0", "1", "1.0.5", "1.2.3.4.5.6.7", "1.4.50", "1.23.45", "2.5.0" ];
    expect(console.log).toHaveBeenCalledWith([
      "0.12.0",
      "1",
      "1.0.5",
      "1.2.3.4.5.6.7",
      "1.4.50",
      "1.23.45",
      "2.5.0",
    ]);
  });

  it("tests that function get another params and do it all right", () => {
    jest.spyOn(console, "log");

    console.log(semverSort(["0.0.1", "0.0.1", "1.0.1", "1", "0.1.5"]));
    expect(console.log).toHaveBeenCalledWith([
      "0.0.1",
      "0.0.1",
      "0.1.5",
      "1",
      "1.0.1",
    ]);
  });
});

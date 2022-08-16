import { Component } from "./Component";

describe("test that Component is a class", () => {
  it("tests that constructor is a function", () => {
    expect(Component).toBeDefined();
    expect(Component).toBeInstanceOf(Function);
  });

  it("tests that instance of Component is created all right", () => {
    expect(
      new Component(document.getElementById("#null") as HTMLElement, null, {})
    ).toBeInstanceOf(Component);
  });

  it("tests that instance of Component with unexisted HTML element do render with null result", () => {
    expect(
      new Component(
        document.getElementById("#null") as HTMLElement,
        null,
        {}
      ).render()
    ).toEqual(null);
  });

  it("tests that instance of Component with onMount hook calls it for the first render", () => {
    document.body.innerHTML = "<div>test</div>";
    const hook = jest.fn();
    const component = new Component(
      document.querySelector("div") as HTMLElement,
      hook
    );
    expect(hook).toHaveBeenCalledTimes(0);
    component.render();
    expect(hook).toHaveBeenCalledTimes(1);
    component.render();
    expect(hook).toHaveBeenCalledTimes(1);
    expect(hook).toBeCalledWith(document.querySelector("div"));
  });
});

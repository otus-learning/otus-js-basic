import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { HLev } from "./hLev";

describe("HLev testing", () => {
  test("should be a Component", () => {
    expect(HLev).toBeInstanceOf(Function);
  });

  test("should render h1", () => {
    render(<HLev level={1} text={"test1"} color={"red"} key={""} />);
    expect(document.body.innerHTML.match("test1</h1>")).not.toEqual(null);
  });

  test("should render h2", () => {
    render(<HLev level={2} text={"test2"} color={"red"} key={""} />);
    expect(document.body.innerHTML.match("test2</h2>")).not.toEqual(null);
  });

  test("should render h5", () => {
    render(<HLev level={5} text={"test3"} color={"red"} key={""} />);
    expect(document.body.innerHTML.match("test3</h5>")).not.toEqual(null);
  });
});

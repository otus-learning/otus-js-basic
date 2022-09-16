import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import { Input } from "./input";

describe("Input testing", () => {
  test("should be a Component", () => {
    expect(Input).toBeInstanceOf(Function);
  });

  test("should render Input", async () => {
    const listener = jest.fn();
    render(<Input type={"5"} onchg={listener} />);
    expect(screen.queryByDisplayValue("5")).toBeInTheDocument();
    expect(listener).not.toBeCalled();
    await fireEvent.change(
      screen.queryByDisplayValue("5") as HTMLInputElement,
      { target: { value: "3" } }
    );
    expect(listener).toBeCalled();
  });
});

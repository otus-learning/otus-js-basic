import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import { Btn } from "./btn";

describe("Btn testing", () => {
  test("should be a Component", () => {
    expect(Btn).toBeInstanceOf(Function);
  });

  test("should render Btn", async () => {
    const listener = jest.fn();
    render(<Btn name={"test"} onclck={listener} />);
    expect(
      screen.queryByRole("button") as HTMLButtonElement
    ).toBeInTheDocument();
    expect(listener).not.toBeCalled();
    await fireEvent.click(screen.queryByRole("button") as HTMLButtonElement);
    expect(listener).toBeCalled();
  });
});

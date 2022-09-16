import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { Lbl } from "./lbl";

describe("Lbl testing", () => {
  test("should be a Component", () => {
    expect(Lbl).toBeInstanceOf(Function);
  });

  test("should render Lbl", () => {
    render(<Lbl text={"test"} key={""} />);
    expect(screen.queryByText("test")).toBeInTheDocument();
  });
});

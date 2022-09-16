import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { P } from "./p";

describe("P testing", () => {
  test("should be a Component", () => {
    expect(P).toBeInstanceOf(Function);
  });

  test("should render P", () => {
    render(<P text={"test"} color={"red"} key={""} />);
    expect(screen.queryByText("test")).toBeInTheDocument();
  });
});

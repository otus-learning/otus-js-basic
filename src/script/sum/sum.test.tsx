import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { Summary } from "./sum";

describe("Summary testing", () => {
  test("should be a Component", () => {
    expect(Summary).toBeInstanceOf(Function);
  });

  test("should render Summary", () => {
    render(<Summary hdr={"test1"} text={"test2"} color={"red"} key={""} />);
    expect(screen.queryByText("test1")).toBeInTheDocument();
    expect(screen.queryByText("test2")).toBeInTheDocument();
  });
});

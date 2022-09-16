import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { Img } from "./img";

describe("Img testing", () => {
  test("should be a Component", () => {
    expect(Img).toBeInstanceOf(Function);
  });

  test("should render img", () => {
    render(<Img src={"#"} text={"test"} key={""} />);
    expect(screen.queryByAltText("test")).toBeInTheDocument();
  });
});

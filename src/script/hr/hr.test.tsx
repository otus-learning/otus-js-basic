import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { Hr } from "./hr";

describe("Hr testing", () => {
  beforeEach(() => render(<Hr before="0" after="0" key="" />));

  test("should be a Component", () => {
    expect(Hr).toBeInstanceOf(Function);
  });

  test("should render all right", () => {
    expect(document.body.innerHTML.match("<hr>")).not.toEqual(null);
  });
});

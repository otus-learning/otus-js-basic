import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import { App } from "./app";

describe("App testing", () => {
  test("should be a Component", () => {
    expect(App).toBeInstanceOf(Function);
  });

  test("should render App", async () => {
    const promptResult = ["2", "test", "Red"];
    let promptIdx = 0;
    global.prompt = () => {
      const idx = promptIdx++;
      return promptResult[idx] as string;
    };

    render(<App />);
    await fireEvent.click(screen.queryByRole("button") as HTMLButtonElement);
    expect(screen.queryByRole("heading")).toBeInTheDocument();

    promptIdx = 0;
    promptResult[1] = "2";
    await fireEvent.change(screen.queryByRole("textbox") as HTMLInputElement, {
      target: { value: "3" },
    });
    await fireEvent.click(screen.queryByRole("button") as HTMLButtonElement);
    expect(screen.queryByRole("separator")).toBeInTheDocument();

    promptIdx = 0;
    promptResult[1] = "test";
    await fireEvent.change(screen.queryByRole("textbox") as HTMLInputElement, {
      target: { value: "8" },
    });
    await fireEvent.click(screen.queryByRole("button") as HTMLButtonElement);
    expect(screen.queryByText("Error") as HTMLLabelElement).toBeInTheDocument();

    promptIdx = 0;
    await fireEvent.change(screen.queryByRole("textbox") as HTMLInputElement, {
      target: { value: "4" },
    });
    await fireEvent.click(screen.queryByRole("button") as HTMLButtonElement);
    expect(
      screen.queryByAltText("test") as HTMLImageElement
    ).toBeInTheDocument();

    promptIdx = 0;
    promptResult[1] = "test1";
    await fireEvent.change(screen.queryByRole("textbox") as HTMLInputElement, {
      target: { value: "2" },
    });
    await fireEvent.click(screen.queryByRole("button") as HTMLButtonElement);
    expect(screen.queryByText("2") as HTMLElement).toBeInTheDocument();
    expect(screen.queryByText("test1") as HTMLImageElement).toBeInTheDocument();

    promptIdx = 0;
    promptResult[0] = "test2";
    await fireEvent.change(screen.queryByRole("textbox") as HTMLInputElement, {
      target: { value: "1" },
    });
    await fireEvent.click(screen.queryByRole("button") as HTMLButtonElement);
    expect(screen.queryByText("test2") as HTMLElement).toBeInTheDocument();
  });
});

jest.mock("./logic");
import { sendMessageThunk } from "./logic";

import { documentBody } from "./jestData";
import { sendEvent, keyPressInputEvent, imgEvent } from "./events";
import { sendMessage } from "./messagesAPI";

beforeAll(() => {
  document.body.innerHTML = documentBody;
});

describe("test sendEvent", () => {
  it("tests that sendEvent is a function and exists", () => {
    expect(sendEvent).toBeDefined();
    expect(sendEvent).toBeInstanceOf(Function);
  });

  it("tests that sendEvent do all right", () => {
    (document.getElementById("#send-input") as HTMLDivElement).innerHTML =
      "123";
    sendEvent();
    expect(sendMessageThunk).toHaveBeenCalledTimes(1);
    expect(sendMessageThunk).toHaveBeenLastCalledWith(
      expect.anything(),
      sendMessage
    );
    expect(
      (document.getElementById("#send-input") as HTMLDivElement).innerHTML
    ).toEqual("");

    sendEvent();
    expect(sendMessageThunk).toHaveBeenCalledTimes(1);
    expect(
      (document.getElementById("#send-input") as HTMLDivElement).innerHTML
    ).toEqual("");
  });

  it("tests that imgEvent do all right", () => {
    (document.getElementById("#send-input") as HTMLDivElement).innerHTML =
      "<br>";
    (document.querySelector("img") as HTMLImageElement).addEventListener(
      "click",
      imgEvent
    );
    (document.querySelector("img") as HTMLImageElement).dispatchEvent(
      new Event("click")
    );
    const div = document.createElement("div");
    div.innerHTML = "&#127866";
    expect(
      (document.getElementById("#send-input") as HTMLDivElement).innerHTML
    ).toEqual(div.innerHTML);
  });

  it("tests that keyPressInputEvent do all right", () => {
    (document.getElementById("#send-input") as HTMLDivElement).innerHTML =
      "!<br>";
    (document.getElementById("#send-input") as HTMLDivElement).addEventListener(
      "keypress",
      keyPressInputEvent
    );
    (document.getElementById("#send-input") as HTMLDivElement).dispatchEvent(
      new KeyboardEvent("keypress", { keyCode: 13 })
    );
    expect(
      (document.getElementById("#send-input") as HTMLDivElement).innerHTML
    ).toEqual("");
  });
});

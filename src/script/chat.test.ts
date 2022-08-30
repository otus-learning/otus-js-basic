//jest.mock('./messagesAPI');
//import { observeWithEventSource } from "./messagesAPI";

import { startChat } from "./chat";
import { documentBody } from "./jestData";

jest.mock("./events");
import {
  sendEvent,
  keyPressInputEvent,
  imgEvent,
  startObserver,
} from "./events";

beforeAll(() => {
  document.body.innerHTML = documentBody;
});

describe("test chat", () => {
  it("tests that all elements has needed listeners", () => {
    startChat();
    expect(
      (document.getElementById("#name-input") as HTMLInputElement).value.match(
        /.* .*/
      )
    ).not.toEqual(null);
    (document.getElementById("#send-input") as HTMLDivElement).dispatchEvent(
      new KeyboardEvent("keypress", { keyCode: 13 })
    );
    expect(keyPressInputEvent).toHaveBeenCalledTimes(1);
    (document.querySelector("img") as HTMLImageElement).dispatchEvent(
      new Event("click")
    );
    expect(imgEvent).toHaveBeenCalledTimes(1);
    (
      document.getElementById("#button-send") as HTMLButtonElement
    ).dispatchEvent(new Event("click"));
    expect(sendEvent).toHaveBeenCalledTimes(1);
    expect(startObserver).toHaveBeenCalledTimes(1);
  });
});

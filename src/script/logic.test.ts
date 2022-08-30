import { store, sendMessageThunk, actionCreator } from "./logic";
import { documentBody } from "./jestData";
import { actions, ChatAction } from "./types";

beforeAll(() => {
  document.body.innerHTML = documentBody;
});

describe("test chat logic", () => {
  it("tests that store is a Redux Store instance by duck checking", () => {
    expect(store.subscribe).toBeInstanceOf(Function);
    expect(store.getState).toBeInstanceOf(Function);
    expect(store.dispatch).toBeInstanceOf(Function);
  });

  it("test that sendMessage thunk is exists", () => {
    expect(sendMessageThunk).toBeDefined();
  });

  it("test that incoming message is visible", () => {
    store.dispatch(
      actionCreator(actions.incoming, {
        name: "testName",
        date: new Date().toString(),
        message: "test test",
      })
    );
    expect(document.querySelectorAll(".message-container").length).toEqual(1);
    expect(
      document.querySelectorAll(".message-container__message").length
    ).toEqual(2);
    expect(
      (
        document.getElementById("#message-window") as HTMLDivElement
      ).innerHTML.match(/.*testName:.*test test.*/)
    ).not.toEqual(null);
  });

  it("test that smiles are visible and sandclock is invisible", () => {
    const div = document.createElement("div");
    div.innerHTML = "&#127866";
    store.dispatch(
      actionCreator(actions.incoming, {
        one: {
          name: "me",
          date: new Date().toString(),
          message: div.innerHTML,
        },
        two: {
          name: "test",
          date: new Date().toString(),
          message: div.innerHTML,
        },
      })
    );
    expect(document.querySelectorAll(".message-container").length).toEqual(3);
    expect(
      document.querySelectorAll(".message-container__message").length
    ).toEqual(8);
    expect(
      document.querySelectorAll(".message-container__message--our").length
    ).toEqual(1);
    expect(
      document.querySelectorAll(".message-container__smile").length
    ).toEqual(2);
    expect(
      document.querySelectorAll(".main-container__clock-img--hidden").length
    ).toEqual(1);
  });

  it("test that sendMessageThunk do all right", async () => {
    const acts: ChatAction[] = [];
    const sendMessage = jest.fn();
    const dispatch = (action: ChatAction) => {
      acts.push(action);
    };
    await sendMessageThunk(
      {
        name: "testName",
        date: new Date().toString(),
        message: "test test test",
      },
      sendMessage
    )(dispatch);
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(acts.length).toEqual(2);
    expect(acts[0].type).toEqual(actions.sending);
    expect(acts[1].type).toEqual(actions.outbound);
  });

  it("test that sandclock sometimes is visible", () => {
    const div = document.createElement("div");
    div.innerHTML = "&#127866";
    store.dispatch(
      actionCreator(actions.sending, {
        name: "test",
        date: new Date().toString(),
        message: div.innerHTML,
      })
    );
    expect(
      document.querySelectorAll(".main-container__clock-img--showed").length
    ).toEqual(1);
  });
});

import { Actions } from "./reduxTypes";
import {
  store,
  actionCreator,
  setAboutVisibleAction,
  setSearchVisibleAction,
  setExistingRecordBtnsUnvisibleAction,
  setExistingRecordBtnsVisibleAction,
  setRecordVisibleAction,
} from "./redux";
import { jestBodyInnerHTML } from "../jestTypes";

beforeAll(() => {
  document.body.innerHTML = jestBodyInnerHTML;
});

describe("it tests redux uses", () => {
  it("tests that preset actions is action-type by duck checking", () => {
    expect(setAboutVisibleAction.type).toEqual(Actions.setPageElements);
    expect(setAboutVisibleAction.payload).toBeInstanceOf(Object);

    expect(setSearchVisibleAction.type).toEqual(Actions.setPageElements);
    expect(setSearchVisibleAction.payload).toBeInstanceOf(Object);

    expect(setExistingRecordBtnsUnvisibleAction.type).toEqual(
      Actions.setPageElements
    );
    expect(setExistingRecordBtnsUnvisibleAction.payload).toBeInstanceOf(Object);

    expect(setExistingRecordBtnsVisibleAction.type).toEqual(
      Actions.setPageElements
    );
    expect(setExistingRecordBtnsVisibleAction.payload).toBeInstanceOf(Object);

    expect(setRecordVisibleAction.type).toEqual(Actions.setPageElements);
    expect(setRecordVisibleAction.payload).toBeInstanceOf(Object);
  });

  it("tests that subscriber do all right", () => {
    store.dispatch(setAboutVisibleAction);
    expect(
      (document.getElementById("#about") as HTMLElement).className
    ).toEqual("about-container");

    store.dispatch(setSearchVisibleAction);
    expect(
      (document.getElementById("#search") as HTMLElement).className
    ).toEqual("search-container");

    store.dispatch(setRecordVisibleAction);
    expect(
      (document.getElementById("#record") as HTMLElement).className
    ).toEqual("record-container");

    store.dispatch(setRecordVisibleAction);
    expect(
      (document.getElementById("#record") as HTMLElement).className
    ).toEqual("record-container");

    store.dispatch(setExistingRecordBtnsUnvisibleAction);
    expect(
      (document.getElementById("#delBtn") as HTMLElement).className.split("--")
        .length
    ).toEqual(2);

    store.dispatch(setExistingRecordBtnsVisibleAction);
    expect(
      (document.getElementById("#delBtn") as HTMLElement).className.split("--")
        .length
    ).toEqual(1);
  });

  it("tests that anchors is adding right", () => {
    expect(document.querySelector("a")).toEqual(null);

    store.dispatch(
      actionCreator(Actions.setPageElements, {
        isAddingAnchors: true,
        anchor: document.createElement("a"),
      })
    );

    expect(document.querySelector("a")).not.toEqual(null);
  });

  it("tests that elements text is adding right", () => {
    expect(
      (document.getElementById("#toDoText") as HTMLTextAreaElement).value
    ).toEqual("");
    expect((document.getElementById("#tag") as HTMLInputElement).value).toEqual(
      ""
    );
    expect(
      (document.getElementById("#datepicker1") as HTMLInputElement).value
    ).toEqual("");
    expect(
      (document.getElementById("#cbxClosed") as HTMLInputElement).checked
    ).toEqual(false);

    store.dispatch(
      actionCreator(Actions.setPageElements, {
        toDoTextValue: "test",
        tagTextValue: "#test",
        datePicker1TextValue: "test.test",
        cbxClosedChecked: true,
        isAddingAnchors: false,
      })
    );

    expect(
      (document.getElementById("#toDoText") as HTMLTextAreaElement).value
    ).toEqual("test");
    expect((document.getElementById("#tag") as HTMLInputElement).value).toEqual(
      "#test"
    );
    expect(
      (document.getElementById("#datepicker1") as HTMLInputElement).value
    ).toEqual("test.test");
    expect(
      (document.getElementById("#cbxClosed") as HTMLInputElement).checked
    ).toEqual(true);
  });
});

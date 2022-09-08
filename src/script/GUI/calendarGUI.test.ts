jest.mock("../redux/redux");
import { store } from "../redux/redux";

import { CalendarClasses } from "../calendar/Calendar";
import { Router } from "../router/router";

import { calendarGUI } from "./calendarGUI";
import {
  jestBodyInnerHTML,
  fakeRouter,
  Pickaday,
  MSearch,
  _go,
  _on,
  fakeCalendar,
  _create,
  _read,
  _update,
} from "../jestTypes";

const spyAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

beforeAll(() => {
  global.document.body.innerHTML = jestBodyInnerHTML;
});

describe("tests that GUI is right functioning", () => {
  it("tests that function is exists", () => {
    expect(calendarGUI).toBeDefined();
    expect(calendarGUI).toBeInstanceOf(Function);
  });

  it("tests that calendarGUI do all the thinds pretty good", async () => {
    window.history.pushState({}, "Test", "/otus-learning/");
    calendarGUI(
      Pickaday,
      MSearch,
      fakeCalendar as unknown as CalendarClasses.Calendar,
      fakeRouter as unknown as Router
    );
    expect(_on.count).toEqual(4);
    expect(_on.params["0"][0]).toEqual("/otus-learning/list");
    expect(_on.params["1"][0]).toEqual("/otus-learning/about");
    expect(_on.params["2"][0]).toEqual("/otus-learning/new");
    expect(_on.params["3"][0]).toEqual(
      new RegExp("^/otus-learning/[0-9]+_local$")
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });
    expect(_go.count).toEqual(1);
    expect(_go.params["0"][0]).toEqual("/otus-learning/list");

    (document.getElementById("#toDoText") as HTMLInputElement).innerHTML = "";
    (document.getElementById("#saveBtn") as HTMLButtonElement).dispatchEvent(
      new MouseEvent("click")
    );
    expect(spyAlert).toHaveBeenLastCalledWith(
      "Empty tasks are not allowed! Please reenter 'ToDo' field."
    );

    (document.getElementById("#toDoText") as HTMLInputElement).innerHTML =
      "test";
    (document.getElementById("#saveBtn") as HTMLButtonElement).dispatchEvent(
      new MouseEvent("click")
    );
    expect(spyAlert).toHaveBeenLastCalledWith(
      "Saved! Now you can to edit this record."
    );

    expect(store.dispatch).not.toBeCalled();
    _on.params["3"][4]();
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });
    expect(store.dispatch).toHaveBeenCalledTimes(3);

    _on.params["2"][4]();
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });
    expect(store.dispatch).toHaveBeenCalledTimes(6);

    (document.getElementById("#delBtn") as HTMLButtonElement).dispatchEvent(
      new MouseEvent("click")
    );
    expect(_go.count).toEqual(2);
    expect(_go.params["1"][0]).toEqual("/otus-learning/list");

    (document.getElementById("#aboutBtn") as HTMLButtonElement).dispatchEvent(
      new MouseEvent("click")
    );
    expect(_go.count).toEqual(3);
    expect(_go.params["2"][0]).toEqual("/otus-learning/about");

    (document.getElementById("#listBtn") as HTMLButtonElement).dispatchEvent(
      new MouseEvent("click")
    );
    expect(_go.count).toEqual(4);
    expect(_go.params["3"][0]).toEqual("/otus-learning/list");

    (document.getElementById("#newBtn") as HTMLButtonElement).dispatchEvent(
      new MouseEvent("click")
    );
    expect(_go.count).toEqual(5);
    expect(_go.params["4"][0]).toEqual("/otus-learning/new");

    (
      document.getElementById("#cbxSearchClosed") as HTMLButtonElement
    ).dispatchEvent(new MouseEvent("click"));
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });
    expect(store.dispatch).toHaveBeenCalledTimes(7);

    (document.getElementById("#search-field") as HTMLInputElement).value =
      "test";
    (
      document.getElementById("#cbxSearchClosed") as HTMLButtonElement
    ).dispatchEvent(new MouseEvent("click"));
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });
    expect(store.dispatch).toHaveBeenCalledTimes(9);

    window.history.pushState({}, "Test", "/otus-learning/0_local");

    expect(_update.count).toEqual(0);
    (document.getElementById("#delBtn") as HTMLButtonElement).dispatchEvent(
      new MouseEvent("click")
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });
    expect(_update.count).toEqual(1);
    expect(_update.params["0"][1]._status).toEqual("deleted");
    expect(spyAlert).toHaveBeenLastCalledWith("Deleted!");

    expect(_create.count).toEqual(0);
    window.history.pushState({}, "Test", "/otus-learning/new");
    (document.getElementById("#saveBtn") as HTMLButtonElement).dispatchEvent(
      new MouseEvent("click")
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });
    expect(_create.count).toEqual(1);
    expect(_create.params["0"][0]).toEqual("test");
    expect(spyAlert).toHaveBeenLastCalledWith(
      "Saved! Now you can to edit this record."
    );

    expect(store.dispatch).toHaveBeenCalledTimes(9);
    _on.params["3"][4]();
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });
    expect(store.dispatch).toHaveBeenCalledTimes(12);

    expect(_go.count).toEqual(7);
    window.history.pushState({}, "Test", "/otus-learning/1_local");
    _on.params["3"][4]();
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });
    expect(store.dispatch).toHaveBeenCalledTimes(14);
    expect(_go.count).toEqual(8);
    expect(_go.params["7"][0]).toEqual("/otus-learning/new");

    (document.getElementById("#saveBtn") as HTMLButtonElement).dispatchEvent(
      new MouseEvent("click")
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });
    expect(_go.count).toEqual(9);
    expect(_go.params["8"][0]).toEqual("/otus-learning/new");

    expect(_update.count).toEqual(1);
    window.history.pushState({}, "Test", "/otus-learning/0_local");
    (document.getElementById("#saveBtn") as HTMLButtonElement).dispatchEvent(
      new MouseEvent("click")
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });
    expect(_update.count).toEqual(2);
    expect(_update.params["1"][1]._toDo).toEqual("test");
    expect(_update.params["1"][1]._status).toEqual("new");
  });
});

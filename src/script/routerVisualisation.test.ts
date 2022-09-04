import {
  getRandomColor,
  renderCreator,
  hooksCreator,
  startVisualisation,
} from "./routerVisualisation";

describe("test router visualisation routins", () => {
  it("tests that getRandomColor() really generate random color strings", () => {
    const color1 = getRandomColor();
    let color2 = getRandomColor();
    for (let i = 0; i < 10; i++) {
      color1 === color2 && (color2 = getRandomColor());
    }
    expect(color1).not.toEqual(color2);
  });

  it("tests that renderCreator() really create render functions", () => {
    expect(renderCreator("123")).toBeInstanceOf(Function);
  });

  it("tests that hooksCreator() randomly create sync and async functions", async () => {
    document.body.innerHTML = "<div id='logs'></div>";
    let funcs = false;
    let promises = false;
    for (let i = 0; i < 10; i++) {
      const who: any = hooksCreator("456")();
      if (who instanceof Promise) {
        await who;
        promises = true;
      } else {
        funcs = true;
      }
    }

    expect(funcs).toEqual(true);
    expect(promises).toEqual(true);
  });

  it("tests that UI elements do all the things realy right", async () => {
    document.body.innerHTML =
      "<a href='/otus-learning/link1'>Link 1</a><div id='logs'></div>";
    startVisualisation(1);

    (document.querySelector("a") as HTMLAnchorElement).dispatchEvent(
      new MouseEvent("click")
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });

    (document.querySelector("a") as HTMLAnchorElement).dispatchEvent(
      new MouseEvent("click")
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });

    history.back();
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });

    expect(document.body.innerHTML.match("onBeforeEnter()")).not.toEqual(null);
    expect(document.body.innerHTML.match("onEnter()")).not.toEqual(null);
    expect(document.body.innerHTML.match("onLeave()")).not.toEqual(null);
    expect(document.body.innerHTML.match("Rendering")).not.toEqual(null);
    expect(document.body.innerHTML.match("FORWARD")).not.toEqual(null);
    expect(document.body.innerHTML.match("BACK")).not.toEqual(null);

    document.body.onload && document.body.onload(new Event("load"));
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 10);
    });

    expect(document.body.innerHTML.match("reloaded page")).not.toEqual(null);
  });
});

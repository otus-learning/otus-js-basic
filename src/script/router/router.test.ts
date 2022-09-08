import { Router } from "./router";
import { jestRouterOut } from "./router.test.data";

beforeEach(() => {
  document.body.innerHTML = "";
});

describe("test Router class", () => {
  it("tests Router constructor", () => {
    expect(Router).toBeDefined();
    expect(new Router()).toBeInstanceOf(Router);
  });

  it("tests .on() and .go() Render class methods (async/sync hooks) and push back and forward browser navigation", async () => {
    const hook = (...params: any[]) => {
      document.body.innerHTML += ` | ${params[0] ? "forward " : "back "}${
        params[1]
      }`;
    };
    const asyncHook = (...params: any[]) => {
      return new Promise((resolve) => {
        setTimeout(
          () =>
            resolve(
              (document.body.innerHTML += ` | ${
                params[0] ? "async forward " : "async back "
              }${params[1]}`)
            ),
          10
        );
      });
    };

    const router = new Router();
    router.on("/", hook, hook, hook, hook);
    router.on(new RegExp("^/link$"), asyncHook, hook, hook, hook);
    router.on(() => "/link/link", hook, hook, hook, hook);
    router.go(
      "/",
      ["onBeforeEnter(/)"],
      ["onEnter(/)"],
      ["onLeave(/)"],
      ["Render(/)"]
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 50);
    });
    router.go(
      "/link",
      ["onBeforeEnter(/link)"],
      ["onEnter(/link)"],
      ["onLeave(/link)"],
      ["Render(/link)"]
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 50);
    });
    router.go(
      "/link/link",
      ["onBeforeEnter(/link/link)"],
      ["onEnter(/link/link)"],
      ["onLeave(/link/link)"],
      ["Render(/link/link)"]
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 50);
    });
    router.go(
      "/",
      ["onBeforeEnter(/)"],
      ["onEnter(/)"],
      ["onLeave(/)"],
      ["Render(/)"]
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 50);
    });
    history.back();
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 50);
    });
    history.forward();
    await new Promise((resolve) => {
      setTimeout(() => resolve("test"), 50);
    });
    const jestRouterOutLocal = jestRouterOut.split("\n").join("");
    expect(document.body.innerHTML).toEqual(jestRouterOutLocal);
  });
});

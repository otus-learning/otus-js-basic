import { Router } from "./router";

//randomly async or sync hooks will be created
export const getRandomColor = () => {
  const rndR = ((Math.random() * 7 + 6) | 0).toString(16);
  const rndG = ((Math.random() * 7 + 6) | 0).toString(16);
  const rndB = ((Math.random() * 7 + 6) | 0).toString(16);
  return `#${rndR}${rndG}${rndB}`;
};

export const renderCreator = (pClass: string) => {
  return (...params: any[]) => {
    const logDiv = document.getElementById("logs") as HTMLDivElement;
    const p = document.createElement("p");
    p.innerHTML = `Rendering page ${location.href.replace(
      location.origin,
      ""
    )} from the link "${params[1]}"`;
    p.classList.add(pClass);
    p.style["background-color" as unknown as number] = params[2];
    logDiv.appendChild(p);
  };
};

//randomly async or sync hooks will be created
export const hooksCreator = (outText: string, syncAsync = 0.5) => {
  return Math.random() < syncAsync
    ? (...params: any[]) => {
        const logDiv = document.getElementById("logs") as HTMLDivElement;
        const p = document.createElement("p");
        if (outText === "onBeforeEnter()") {
          p.innerHTML = params[0]
            ? `let's call ${outText} and go FORWARD to the page ${params[1]}`
            : `let's call ${outText} and go BACK to the page ${params[1]}`;
        } else {
          p.innerHTML =
            outText === "onEnter()"
              ? `let's call ${outText} and please work with the page ${params[1]}`
              : `let's call ${outText} and say goodbue to the page ${params[1]}`;
        }
        p.classList.add("log-container__text");
        p.style["background-color" as unknown as number] = params[2];
        logDiv.appendChild(p);
      }
    : (...params: any[]) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const logDiv = document.getElementById("logs") as HTMLDivElement;
            const p = document.createElement("p");
            if (outText === "onBeforeEnter()") {
              p.innerHTML = params[0]
                ? `let's call ASYNC ${outText} and go FORWARD to the page ${params[1]}`
                : `let's call ASYNC ${outText} and go BACK to the page ${params[1]}`;
            } else {
              p.innerHTML =
                outText === "onEnter()"
                  ? `let's call ASYNC ${outText} and please work with the page ${params[1]}`
                  : `let's call ASYNC ${outText} and say goodbue to the page ${params[1]}`;
            }
            p.classList.add("log-container__text");
            p.style["background-color" as unknown as number] = params[2];
            logDiv.appendChild(p);
            resolve("async operation end");
          }, 100);
        });
      };
};

export const startVisualisation = (syncAsync: number) => {
  const router = new Router();

  const allA = document.querySelectorAll("a");
  allA &&
    allA.forEach((a: HTMLAnchorElement) => {
      a.addEventListener("click", (e: MouseEvent) => {
        const nextPath = (e.target as HTMLAnchorElement).href.replace(
          location.origin,
          ""
        );
        const bgColor = getRandomColor();
        router.go(
          nextPath,
          [nextPath, bgColor],
          [nextPath, bgColor],
          [nextPath, bgColor],
          [(e.target as HTMLAnchorElement).innerHTML, bgColor]
        );
        e.preventDefault();
      });
    });

  router.on(
    new RegExp("^/otus-learning/[a-zA-z]+[0-9]+$"),
    hooksCreator("onBeforeEnter()", syncAsync),
    hooksCreator("onEnter()", syncAsync),
    hooksCreator("onLeave()", syncAsync),
    renderCreator("log-container__text")
  );
  router.on(
    () => "/otus-learning/_link_",
    hooksCreator("onBeforeEnter()", syncAsync),
    hooksCreator("onEnter()", syncAsync),
    hooksCreator("onLeave()", syncAsync),
    renderCreator("log-container__text--dotted")
  );
  router.on(
    "/otus-learning/",
    hooksCreator("onBeforeEnter()", syncAsync),
    hooksCreator("onEnter()", syncAsync),
    hooksCreator("onLeave()", syncAsync),
    renderCreator("log-container__text--bordered")
  );

  document.body.onload = () => {
    const bgColor = getRandomColor();
    const nextPath = location.href.replace(location.origin, "");
    router.go(
      nextPath,
      [nextPath, bgColor],
      [nextPath, bgColor],
      [nextPath, bgColor],
      ["reloaded page", bgColor]
    );
  };
};

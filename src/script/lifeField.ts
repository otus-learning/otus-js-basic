import { Life } from "./life";

export const lifes: Life[] = new Array<Life>(0);

export function createLifeField(
  container: HTMLDivElement,
  x: number,
  y: number,
  oldLife?: number[][]
): void {
  container.classList.add("main-container");

  const cellClicked = function (e: MouseEvent) {
    const cell = e.currentTarget as HTMLDivElement;
    const x = Number(cell.getAttribute("locationX"));
    const y = Number(cell.getAttribute("locationY"));

    lifes[lifeIdx].curCells[x][y] ^= 0x1;
    if (lifes[lifeIdx].curCells[x][y]) {
      cell.classList.remove("life-container__cell--dead");
      cell.classList.add("life-container__cell--alive");
    } else {
      cell.classList.remove("life-container__cell--alive");
      cell.classList.add("life-container__cell--dead");
    }
  };

  const life = new Life(x, y, oldLife);
  const lifeIdx: number = lifes.length;
  lifes.push(life);

  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("main-container__life-container");
  div.classList.add("life-container");
  div.style["width"] = container.style["width"] = y * 11 - 1 + 8 + "px";
  div.style["height"] = x * 11 - 1 + 8 + "px";

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const cell: HTMLDivElement = document.createElement("div");
      cell.classList.add("life-container__cell");
      cell.classList.add("life-container__cell--dead");
      cell.addEventListener("click", cellClicked);
      cell.setAttribute("locationX", String(i));
      cell.setAttribute("locationY", String(j));

      div.appendChild(cell);
    }
  }

  oldLife &&
    life.setGUIForLifeTable(
      div,
      life.curCells,
      "life-container__cell--alive",
      "life-container__cell--dead"
    );

  const btnStep: HTMLButtonElement = document.createElement("button");
  btnStep.innerHTML = ">";
  btnStep.className = "life-container__button";

  btnStep.addEventListener("click", () => {
    const showFlag = (
      document.getElementById("cbxShowNext") as HTMLInputElement
    ).checked;

    if (showFlag) {
      life.setGUIForLifeTable(
        div,
        life.curCells,
        "life-container__cell--alive-show",
        "life-container__cell--dead-show",
        life.curCells,
        true
      );
    }
    life.reorder(life.oldCells, life.curCells);
    life.setGUIForLifeTable(
      div,
      life.curCells,
      "life-container__cell--alive",
      "life-container__cell--dead"
    );

    if (showFlag) {
      life.copyCells(life.curCells, life.tmpCells);
      life.reorder(life.oldCells, life.tmpCells);
      life.setGUIForLifeTable(
        div,
        life.tmpCells,
        "life-container__cell--alive-show",
        "life-container__cell--dead-show",
        life.curCells
      );
    }
  });

  btnStep.addEventListener("mouseover", () => {
    const showFlag = (
      document.getElementById("cbxShowNext") as HTMLInputElement
    ).checked;

    if (showFlag) {
      life.copyCells(life.curCells, life.tmpCells);
      life.reorder(life.oldCells, life.tmpCells);
      life.setGUIForLifeTable(
        div,
        life.tmpCells,
        "life-container__cell--alive-show",
        "life-container__cell--dead-show",
        life.curCells
      );
    }
  });

  btnStep.addEventListener("mouseout", () => {
    const showFlag = (
      document.getElementById("cbxShowNext") as HTMLInputElement
    ).checked;

    if (showFlag) {
      life.setGUIForLifeTable(
        div,
        life.curCells,
        "life-container__cell--alive-show",
        "life-container__cell--dead-show",
        life.curCells,
        true
      );
    }
  });

  const btnRun: HTMLButtonElement = document.createElement("button");
  btnRun.innerText = ">>";
  btnRun.className = "life-container__button";
  btnRun.id = "btnRun";

  let tmr: number;

  btnRun.addEventListener("click", (e) => {
    if (
      (document.getElementById("btnRun") as HTMLButtonElement).innerText ===
      ">>"
    ) {
      const speed = Number(
        (document.getElementById("rSpeed") as HTMLInputElement).value
      );

      life.setGUIForLifeTable(
        div,
        life.curCells,
        "life-container__cell--alive-show",
        "life-container__cell--dead-show",
        life.curCells,
        true
      );

      tmr = window.setInterval((): void => {
        life.reorder(life.oldCells, life.curCells);
        life.setGUIForLifeTable(
          div,
          life.curCells,
          "life-container__cell--alive",
          "life-container__cell--dead"
        );

        //autostop
        for (let i = 0; i < life.sizeX; i++) {
          for (let j = 0; j < life.sizeY; j++) {
            if (life.curCells[i][j]) {
              return;
            }
          }
        }

        clearInterval(tmr);
        (document.getElementById("btnRun") as HTMLButtonElement).innerText =
          ">>";
      }, 1100 - speed * 200);

      (e.currentTarget as HTMLButtonElement).innerText = "||";
    } else {
      clearInterval(tmr);

      (e.currentTarget as HTMLButtonElement).innerText = ">>";
    }
  });

  container.appendChild(div);
  container.appendChild(btnStep);
  container.appendChild(btnRun);
}

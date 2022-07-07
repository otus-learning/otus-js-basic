/*global NodeListOf*/

import * as lifeField from "./lifeField";

describe("screen field GUI tests", (): void => {
  beforeEach((): void => {
    lifeField.lifes.pop();
    document.body.innerHTML = "";
  });

  it("tests that function is defined and it is a function", (): void => {
    expect(lifeField.createLifeField).toBeDefined();
    expect(lifeField.createLifeField).toBeInstanceOf(Function);
  });

  it("tests that function is creating all needed elements with need classes and creating life object", (): void => {
    lifeField.createLifeField(document.body as HTMLDivElement, 2, 2);

    expect(document.body.className).toMatch("main-container");
    expect(document.querySelectorAll(".life-container").length).toEqual(1);
    const lifeContainer = document.querySelector(
      ".life-container"
    ) as HTMLDivElement;
    expect(
      lifeContainer.querySelectorAll(".life-container__cell").length
    ).toEqual(4);
    expect(
      lifeContainer.querySelectorAll(".life-container__cell--dead").length
    ).toEqual(4);
    expect(document.querySelectorAll("button").length).toEqual(2);
    expect(document.getElementById("btnRun")).not.toBeNull();
    expect(lifeField.lifes[0]).toBeDefined();
  });

  it("tests that cell clicking change life state and attributes are right", (): void => {
    lifeField.createLifeField(document.body as HTMLDivElement, 2, 2);

    const life = lifeField.lifes[0];
    expect(life.curCells).toEqual([
      [0, 0],
      [0, 0],
    ]);

    let cells: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      ".life-container__cell--dead"
    );
    expect(cells.length).toEqual(4);
    expect((cells[3] as HTMLDivElement).getAttribute("locationX")).toEqual("1");
    expect((cells[3] as HTMLDivElement).getAttribute("locationY")).toEqual("1");

    cells[0].dispatchEvent(new MouseEvent("click", {}));
    cells = document.querySelectorAll(".life-container__cell--dead");
    expect(cells.length).toEqual(3);
    expect(life.curCells).toEqual([
      [1, 0],
      [0, 0],
    ]);

    cells = document.querySelectorAll(".life-container__cell");
    expect(cells[0].className).toEqual(
      "life-container__cell life-container__cell--alive"
    );

    cells[0].dispatchEvent(new MouseEvent("click", {}));
    expect(cells[0].className).toEqual(
      "life-container__cell life-container__cell--dead"
    );
    expect(life.curCells).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });

  it("tests that step button work properly", (): void => {
    const cbx = document.createElement("input");
    cbx.type = "checkbox";
    cbx.id = "cbxShowNext";
    cbx.checked = true;
    document.body.appendChild(cbx);

    lifeField.createLifeField(document.body as HTMLDivElement, 2, 2);

    const life = lifeField.lifes[0];
    life.curCells[0][0] = 0x01;

    const btnStep = document.querySelector("button") as HTMLButtonElement;
    btnStep.dispatchEvent(new MouseEvent("click", {}));

    let cells: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      ".life-container__cell"
    );
    expect(cells[0].className).toEqual(
      "life-container__cell life-container__cell--dead"
    );
    expect(life.curCells).toEqual([
      [0, 0],
      [0, 0],
    ]);

    life.curCells[0][0] = 0x01;
    life.curCells[1][0] = 0x01;
    life.curCells[0][1] = 0x01;

    btnStep.dispatchEvent(new MouseEvent("click", {}));

    cells = document.querySelectorAll(".life-container__cell");
    expect(cells[3].className).toEqual(
      "life-container__cell life-container__cell--alive"
    );
    expect(life.curCells).toEqual([
      [1, 1],
      [1, 1],
    ]);

    life.curCells[0][0] = 0x00;

    btnStep.dispatchEvent(new MouseEvent("mouseover", {}));

    cells = document.querySelectorAll(".life-container__cell");
    expect(cells[0].className).toEqual(
      "life-container__cell life-container__cell--alive life-container__cell--alive-show"
    );
    expect(life.curCells).toEqual([
      [0, 1],
      [1, 1],
    ]);

    btnStep.dispatchEvent(new MouseEvent("mouseout", {}));

    cells = document.querySelectorAll(".life-container__cell");
    expect(cells[0].className).toEqual(
      "life-container__cell life-container__cell--alive"
    );
    expect(life.curCells).toEqual([
      [0, 1],
      [1, 1],
    ]);
  });

  it("tests that run button work properly", (): void => {
    const cbx = document.createElement("input");
    cbx.type = "checkbox";
    cbx.id = "cbxShowNext";
    cbx.checked = true;
    document.body.appendChild(cbx);

    const range = document.createElement("input");
    range.type = "range";
    range.id = "rSpeed";
    range.value = "5";
    document.body.appendChild(range);

    jest.useFakeTimers();
    jest.spyOn(window, "setInterval");
    jest.spyOn(window, "clearInterval");

    lifeField.createLifeField(document.body as HTMLDivElement, 2, 2, [
      [1, 0],
      [0, 0],
      [1, 1],
    ]);

    const life = lifeField.lifes[0];
    expect(life.curCells).toEqual([
      [1, 0],
      [0, 0],
    ]);

    const btnRun = document.getElementById("btnRun") as HTMLButtonElement;
    expect(btnRun.innerText).toEqual(">>");

    btnRun.dispatchEvent(new MouseEvent("click", {}));
    expect(btnRun.innerText).toEqual("||");

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      1100 - 5 * 200
    );

    jest.advanceTimersByTime(200);
    expect(life.curCells).toEqual([
      [0, 0],
      [0, 0],
    ]);

    expect(clearInterval).toHaveBeenCalledTimes(1);

    life.curCells[0][0] = 0x01;
    life.curCells[1][0] = 0x01;
    life.curCells[0][1] = 0x01;

    btnRun.dispatchEvent(new MouseEvent("click", {}));
    jest.advanceTimersByTime(200);
    expect(life.curCells).toEqual([
      [1, 1],
      [1, 1],
    ]);

    btnRun.dispatchEvent(new MouseEvent("click", {}));

    expect(btnRun.innerText).toEqual(">>");
    expect(clearInterval).toHaveBeenCalledTimes(2);
  });
});

import { Life } from "./life";

describe("Life class tests", (): void => {
  it("tests that class is exists and constructor is a function", (): void => {
    expect(Life).toBeDefined();
    expect(Life).toBeInstanceOf(Function);
  });

  it("tests that constructors call creating all data fields", (): void => {
    const life: Life = new Life(2, 2);
    expect(life.curCells).toEqual([
      [0, 0],
      [0, 0],
    ]);
    expect(life.tmpCells).toEqual([
      [0, 0],
      [0, 0],
    ]);
    expect(life.oldCells).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(life.sizeX).toEqual(2);
    expect(life.sizeY).toEqual(2);
  });

  it("tests that constructors call with initial state do all right", (): void => {
    let initialState: number[][] = [
      [1, 1],
      [1, 1],
    ];
    let life: Life = new Life(3, 3, initialState);
    expect(life.curCells).toEqual([
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ]);

    initialState = [
      [0, 1],
      [1, 0],
      [1, 1],
    ];
    life = new Life(2, 2, initialState);
    expect(life.curCells).toEqual([
      [0, 1],
      [1, 0],
    ]);
  });

  it("tests that copy method is working", (): void => {
    const life: Life = new Life(2, 2);
    const testedArray: number[][] = [
      [0, 0],
      [0, 0],
    ];
    expect(life.curCells).toEqual(testedArray);
    life.curCells[0][0] ^= 0x01;
    life.copyCells(life.curCells, testedArray);
    expect(life.curCells).toEqual(testedArray);
  });

  it("tests that reorder method is working", (): void => {
    let life: Life = new Life(2, 2, [
      [1, 1],
      [1, 0],
    ]);
    life.reorder(life.oldCells, life.curCells);
    expect(life.curCells).toEqual([
      [1, 1],
      [1, 1],
    ]);

    life = new Life(2, 2, [
      [1, 0],
      [1, 0],
    ]);
    life.reorder(life.oldCells, life.curCells);
    expect(life.curCells).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });
});

describe("Life logic and field visualisation tests", () => {
  beforeEach((): void => {
    document.body.innerHTML = "";
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const div = document.createElement("div");
        div.className = "life-container__cell";
        div.setAttribute("locationX", String(i));
        div.setAttribute("locationY", String(j));
        document.body.appendChild(div);
      }
    }
  });

  it("tests that life cells correctly set classes", (): void => {
    const life: Life = new Life(2, 2, [
      [1, 1],
      [1, 0],
    ]);
    life.setGUIForLifeTable(
      document.body as HTMLDivElement,
      life.curCells,
      "alive",
      "dead"
    );
    expect(document.querySelectorAll(".alive").length).toEqual(3);
    expect(document.querySelectorAll(".dead").length).toEqual(1);
    expect(document.querySelectorAll(".alive")[0].className).toMatch("alive");
    expect(document.querySelectorAll(".dead")[0].className).toMatch("dead");
  });

  it("tests that life cells correctly set next step visualisation", (): void => {
    const life: Life = new Life(2, 2, [
      [1, 0],
      [1, 0],
    ]);
    life.setGUIForLifeTable(
      document.body as HTMLDivElement,
      life.curCells,
      "alive",
      "dead"
    );
    life.setGUIForLifeTable(
      document.body as HTMLDivElement,
      life.curCells,
      "alive-show",
      "dead-show",
      [
        [0, 0],
        [1, 1],
      ]
    );
    const cells = document.querySelectorAll("div");
    expect(cells[0].className).toEqual("life-container__cell alive alive-show");
    expect(cells[1].className).toMatch("life-container__cell dead");
    expect(cells[2].className).toMatch("life-container__cell alive");
    expect(cells[3].className).toMatch("life-container__cell dead dead-show");
  });

  it("tests that life cells correctly clear visualisation classes", (): void => {
    const life: Life = new Life(2, 2, [
      [1, 0],
      [1, 0],
    ]);
    life.setGUIForLifeTable(
      document.body as HTMLDivElement,
      life.curCells,
      "alive",
      "dead"
    );
    life.setGUIForLifeTable(
      document.body as HTMLDivElement,
      life.curCells,
      "alive-show",
      "dead-show",
      [
        [0, 0],
        [1, 1],
      ]
    );
    life.setGUIForLifeTable(
      document.body as HTMLDivElement,
      life.curCells,
      "alive-show",
      "dead-show",
      [
        [0, 0],
        [1, 1],
      ],
      true
    );
    const cells = document.querySelectorAll("div");
    expect(cells[0].className).toEqual("life-container__cell alive");
    expect(cells[1].className).toMatch("life-container__cell dead");
    expect(cells[2].className).toMatch("life-container__cell alive");
    expect(cells[3].className).toMatch("life-container__cell dead");
  });
});

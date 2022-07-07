/*global NodeListOf*/

export class Life {
  public oldCells: number[][] = [[]];
  public tmpCells: number[][] = [[]];
  public curCells: number[][] = [[]];
  public sizeX = 0;
  public sizeY = 0;
  constructor(x: number, y: number, startCells?: number[][]) {
    for (let i = 0; i < x + 2; i++) {
      if (i < x) {
        this.curCells[i] = new Array<number>(y);
        this.tmpCells[i] = new Array<number>(y);
      }
      this.oldCells[i] = new Array<number>(y + 2);
      for (let j = 0; j < y + 2; j++) {
        if (i < x && j < y) {
          try {
            this.curCells[i][j] = startCells ? startCells[i][j] | 0 : 0;
          } catch (e) {
            this.curCells[i][j] = 0;
          }
          this.tmpCells[i][j] = 0;
        }
        this.oldCells[i][j] = 0;
      }
    }
    this.sizeX = x;
    this.sizeY = y;
  }

  copyCells(curCells: number[][], tmpCells: number[][]) {
    const sizeX: number = curCells.length;
    const sizeY: number = curCells[0].length;
    for (let i = 0; i < sizeX; i++) {
      for (let j = 0; j < sizeY; j++) {
        tmpCells[i][j] = curCells[i][j];
      }
    }
  }

  reorder(oldCells: number[][], curCells: number[][]) {
    const sizeX: number = curCells.length;
    const sizeY: number = curCells[0].length;
    for (let i = 1; i < sizeX + 1; i++) {
      for (let j = 1; j < sizeY + 1; j++) {
        oldCells[i][j] = curCells[i - 1][j - 1];
      }
    }

    for (let i = 1; i < sizeX + 1; i++) {
      for (let j = 1; j < sizeY + 1; j++) {
        let neightbours: number =
          oldCells[i - 1][j - 1] + oldCells[i - 1][j] + oldCells[i - 1][j + 1];
        neightbours += oldCells[i][j - 1] + oldCells[i][j + 1];
        neightbours +=
          oldCells[i + 1][j - 1] + oldCells[i + 1][j] + oldCells[i + 1][j + 1];
        //for alive cell
        if (oldCells[i][j]) {
          (neightbours < 2 || neightbours > 3) &&
            (curCells[i - 1][j - 1] ^= 0x01);
        }
        //for dead cell
        else {
          neightbours === 3 && (curCells[i - 1][j - 1] ^= 0x01);
        }
      }
    }
  }

  setGUIForLifeTable(
    container: HTMLDivElement,
    curCells: number[][],
    classAlive: string,
    classDead: string,
    oldState?: number[][],
    clear?: boolean
  ) {
    const cells: NodeListOf<HTMLDivElement> = container.querySelectorAll(
      ".life-container__cell"
    );
    for (let i = 0; i < cells.length; i++) {
      const x = Number(cells[i].getAttribute("locationX"));
      const y = Number(cells[i].getAttribute("locationY"));
      if (oldState) {
        if (clear) {
          cells[i].classList.remove(classDead);
          cells[i].classList.remove(classAlive);
        } else {
          if (oldState[x][y] ^ curCells[x][y]) {
            if (curCells[x][y]) {
              cells[i].classList.remove(classDead);
              cells[i].classList.add(classAlive);
            } else {
              cells[i].classList.remove(classAlive);
              cells[i].classList.add(classDead);
            }
          }
        }
      } else {
        if (curCells[x][y]) {
          cells[i].classList.remove(classDead);
          cells[i].classList.add(classAlive);
        } else {
          cells[i].classList.remove(classAlive);
          cells[i].classList.add(classDead);
        }
      }
    }
  }
}

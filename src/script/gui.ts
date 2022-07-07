import * as lifeField from "./lifeField";

export function createUI(): void {
  const div: HTMLDivElement = document.createElement("div");
  let lbl: HTMLLabelElement = document.createElement("label");
  lbl.innerText = "Vertical field size:";

  const edtX: HTMLInputElement = document.createElement("input");
  edtX.type = "text";
  edtX.id = "edtX";

  div.appendChild(lbl);
  div.appendChild(edtX);

  lbl = document.createElement("label");
  lbl.innerText = "Horizontal field size:";

  const edtY: HTMLInputElement = document.createElement("input");
  edtY.type = "text";
  edtY.id = "edtY";

  div.appendChild(lbl);
  div.appendChild(edtY);

  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "Create Life";
  btn.addEventListener("click", (e: MouseEvent) => {
    const x: number = +(document.getElementById("edtX") as HTMLInputElement)
      .value;
    const y: number = +(document.getElementById("edtY") as HTMLInputElement)
      .value;

    if (!x || !y) {
      alert("Error: one or both table size values are incorrect!");
      return;
    }

    if ((e.currentTarget as HTMLButtonElement).innerText === "Create Life") {
      const div: HTMLDivElement = document.createElement("div");
      div.id = "mainLifeContainer";

      lifeField.createLifeField(div, x, y);

      document.body.appendChild(div);

      (e.currentTarget as HTMLButtonElement).innerText = "Resize Life";
    } else {
      let div: HTMLDivElement = document.getElementById(
        "mainLifeContainer"
      ) as HTMLDivElement;
      document.body.removeChild(div);

      const oldLifeCells: number[][] =
        lifeField.lifes[lifeField.lifes.length - 1].curCells;
      lifeField.lifes.pop();

      div = document.createElement("div");
      div.id = "mainLifeContainer";

      lifeField.createLifeField(div, x, y, oldLifeCells);

      document.body.appendChild(div);
    }
  });

  lbl = document.createElement("label");
  lbl.innerHTML = "Show next step field changes:";

  const cbx: HTMLInputElement = document.createElement("input");
  cbx.type = "checkbox";
  cbx.id = "cbxShowNext";

  div.appendChild(lbl);
  div.appendChild(cbx);

  lbl = document.createElement("label");
  lbl.innerHTML = "Select animation speed:";
  div.appendChild(lbl);

  const range: HTMLInputElement = document.createElement("input");
  range.type = "range";
  range.min = "1";
  range.max = "5";
  range.value = "3";
  range.id = "rSpeed";
  div.appendChild(range);

  (document.querySelector("section") as HTMLElement).appendChild(div);
  (document.querySelector("section") as HTMLElement).appendChild(btn);
}

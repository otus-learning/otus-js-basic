/*global NodeListOf*/

import { createUI } from "./gui";
import * as lifeField from "./lifeField";

describe("test user interface for life game logic and field control", () => {
  it("tests that function is defined and it is a function", () => {
    expect(createUI).toBeDefined();
    expect(createUI).toBeInstanceOf(Function);
  });

  it("tests that function creating all of need page elements", () => {
    document.body.innerHTML = "<section></section>";

    createUI();
    expect(document.querySelectorAll("button").length).toEqual(1);
    expect(document.querySelectorAll("div").length).toEqual(1);
    expect(document.querySelectorAll("label").length).toEqual(4);

    const inputs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll("input");
    expect(inputs.length).toEqual(4);
    expect(inputs[0].type).toEqual("text");
    expect(inputs[1].type).toEqual("text");
    expect(inputs[2].type).toEqual("checkbox");
    expect(inputs[3].type).toEqual("range");
  });

  it("tests that button click creating new life field", () => {
    document.body.innerHTML = "<section></section>";

    createUI();

    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(lifeField, "createLifeField").mockImplementation(() => {});

    const btnCreate = document.querySelector("button") as HTMLButtonElement;
    expect(btnCreate.innerText).toEqual("Create Life");

    btnCreate.dispatchEvent(new MouseEvent("click", {}));

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenLastCalledWith(
      "Error: one or both table size values are incorrect!"
    );

    const inputs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll("input");
    inputs[0].value = inputs[1].value = "2";

    btnCreate.dispatchEvent(new MouseEvent("click", {}));
    expect(btnCreate.innerText).toEqual("Resize Life");

    expect(lifeField.createLifeField).toHaveBeenCalledTimes(1);
    expect(lifeField.createLifeField).toHaveBeenLastCalledWith(
      expect.any(HTMLDivElement),
      2,
      2
    );
    expect(document.getElementById("mainLifeContainer")).not.toBeNull();

    Object.defineProperty(lifeField, "lifes", {
      value: [
        {
          curCells: [
            [1, 0],
            [0, 1],
          ],
        },
      ],
    });

    btnCreate.dispatchEvent(new MouseEvent("click", {}));
    inputs[0].value = inputs[1].value = "3";

    expect(lifeField.createLifeField).toHaveBeenCalledTimes(2);
    expect(lifeField.createLifeField).toHaveBeenLastCalledWith(
      expect.any(HTMLDivElement),
      2,
      2,
      [
        [1, 0],
        [0, 1],
      ]
    );
  });
});

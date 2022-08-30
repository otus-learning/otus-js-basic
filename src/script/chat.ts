import { generateName } from "./nameGenerator";

import {
  sendEvent,
  keyPressInputEvent,
  imgEvent,
  startObserver,
} from "./events";

export const startChat = () => {
  (
    document.getElementById("#button-send") as HTMLButtonElement
  ).addEventListener("click", sendEvent);
  (
    document.getElementById("#send-input") as HTMLButtonElement
  ).addEventListener("keypress", keyPressInputEvent);

  Array.from(
    (
      document.getElementById("#smiles-area") as HTMLDivElement
    ).querySelectorAll("img")
  ).forEach((img) => {
    img.addEventListener("click", imgEvent);
  });

  (document.getElementById("#name-input") as HTMLInputElement).value =
    generateName();

  startObserver();
};

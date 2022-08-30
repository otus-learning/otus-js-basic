import { store, sendMessageThunk, actionCreator } from "./logic";
import { actions, ChatAction } from "./types";
import { sendMessage, observeWithEventSource } from "./messagesAPI";

export const sendEvent = () => {
  const msg = (document.getElementById("#send-input") as HTMLDivElement)
    .innerHTML;
  if (msg.trim().length === 0) {
    return;
  }
  const name = (document.getElementById("#name-input") as HTMLInputElement)
    .value;
  const d = new Date();
  const sendingMsg = {
    date: `${d.toLocaleDateString()}:${d.getHours()}.${d.getMinutes()}.${d.getSeconds()}`,
    message: msg,
    name: name,
  };
  store.dispatch(
    sendMessageThunk(sendingMsg, sendMessage) as unknown as ChatAction
  );
  (document.getElementById("#send-input") as HTMLDivElement).innerHTML = "";
};

export const keyPressInputEvent = (e: KeyboardEvent) => {
  const sendInput = document.getElementById("#send-input") as HTMLDivElement;
  sendInput.innerHTML === "<br>" && (sendInput.innerHTML = "");
  e.keyCode === 13 && sendEvent();
};

export const imgEvent = (e: Event) => {
  const img = e.target as HTMLImageElement;
  const sendInput = document.getElementById("#send-input") as HTMLDivElement;
  sendInput.innerHTML = sendInput.innerHTML.split("<br>").join("");
  sendInput.innerHTML += `&#${img.alt}`;
};

export const startObserver = () => {
  observeWithEventSource((msg: object) => {
    store.dispatch(actionCreator(actions.incoming, msg));
  });
};

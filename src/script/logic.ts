import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { ChatAction, ChatState, actions } from "./types";

const CHAT_LENGTH = 100;

const reducer = (state: ChatState | undefined, action: ChatAction) => {
  const waitClockImg = document.getElementById(
    "#sand-clock"
  ) as HTMLImageElement;
  if (state) {
    switch (action.type) {
      case actions.sending: {
        waitClockImg.classList.remove("main-container__clock-img--hidden");
        waitClockImg.classList.add("main-container__clock-img--showed");
        break;
      }
      case actions.incoming: {
        if ((action.payload as Record<string, any>)["date"]) {
          state.messages.length > CHAT_LENGTH && state.messages.shift();
          state.messages.push({ ...(action.payload as Record<string, any>) });
        } else {
          for (const key in action.payload) {
            state.messages.length > CHAT_LENGTH && state.messages.shift();
            state.messages.push({
              ...(action.payload as Record<string, any>)[key],
            });
          }
        }
        waitClockImg.classList.remove("main-container__clock-img--showed");
        waitClockImg.classList.add("main-container__clock-img--hidden");
        break;
      }
    }
    return state;
  }
  return { messages: [] };
};

export const actionCreator = (action: string, payload: any) => {
  return { type: action, payload: payload };
};

export const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => {
  const messageContainer = document.getElementById(
    "#message-window"
  ) as HTMLDivElement;
  messageContainer.innerHTML = "";

  const name = (document.getElementById("#name-input") as HTMLInputElement)
    .value;
  const imgs = (
    document.getElementById("#smiles-area") as HTMLDivElement
  ).querySelectorAll("img");

  store.getState().messages.forEach((msg, index) => {
    if (!msg.message) {
      return;
    }

    const div = document.createElement("div");

    Array.from(imgs).forEach((img, index) => {
      div.innerHTML = `&#${img.alt}`;
      msg.message = (msg.message as string)
        .split(div.innerHTML)
        .join(`\u0000${index}\u0000`);
    });

    div.innerHTML = "";
    div.classList.add("message-window__message-container");
    div.classList.add("message-container");
    const d = new Date(msg.date as Date);
    const dateStr = `${d.toLocaleDateString()}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    const p = document.createElement("p");
    p.classList.add("message-container__message");
    if (name === `${msg.nickname || msg.name}`) {
      p.classList.add("message-container__message--our");
      p.innerHTML = `${dateStr}  <  `;
    } else {
      p.innerHTML = `${dateStr}  >  ${msg.nickname || msg.name}: `;
    }
    div.appendChild(p);

    (msg.message as string).split("\u0000").forEach((el, index) => {
      if ((el as string).match(/^[0-9]+$/)) {
        const img = document.createElement("img");
        img.src = imgs[Number(el)].src;
        img.classList.add("message-container__smile");
        div.appendChild(img);
      } else {
        const p = document.createElement("p");
        p.classList.add("message-container__message");
        p.innerHTML = `${el}`;
        div.appendChild(p);
      }
    });
    messageContainer.appendChild(div);
  });
});

export const sendMessageThunk = (
  msg: object,
  sendMessage: (data: object) => void
) => {
  return async (dispatch: (action: any) => void) => {
    dispatch(actionCreator(actions.sending, msg));
    await sendMessage(msg);
    dispatch(actionCreator(actions.outbound, msg));
  };
};

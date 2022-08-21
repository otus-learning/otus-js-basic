import { AbstractAction, AbstractStore } from "./AbstractStore";
import { Store, combineReducers, actionCreate, applyMiddleware } from "./Store";

enum actions {
  CHANGE_MODEL = "changeModel",
  CHANGE_VENDOR = "changeVendor",
}

(() => {
  const reducer = combineReducers({
    model: (inputState, action) => {
      switch (action.type) {
        case actions.CHANGE_MODEL: {
          if (inputState) {
            inputState.model = action.payload;
          } else {
            inputState = { model: action.payload };
          }
          break;
        }
      }
      return inputState || {};
    },
    vendor: (inputState, action) => {
      switch (action.type) {
        case actions.CHANGE_VENDOR: {
          if (inputState) {
            inputState.vendor = action.payload;
          } else {
            inputState = { vendor: action.payload };
          }
          break;
        }
      }
      return inputState || {};
    },
  });

  const callbackModel = () => {
    (
      document.getElementById("#modelView") as HTMLLabelElement
    ).innerText = `Model: ${store.getState().model}`;
  };

  const callbackVendor = () => {
    (
      document.getElementById("#vendorView") as HTMLLabelElement
    ).innerText = `Vendor: ${store.getState().vendor}`;
  };

  const middlewareLogActions = (store: AbstractStore) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (next: (action: AbstractAction) => any) => {
      return (action: AbstractAction) => {
        const rslt = next(action);
        (
          document.getElementById("#logs") as HTMLInputElement
        ).value += `Action = {type = ${action.type}, payload = ${action.payload}}\n`;
        return rslt;
      };
    };
  };

  const middlewareLogStates = (store: AbstractStore) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (next: (action: AbstractAction) => any) => {
      return (action: AbstractAction) => {
        const rslt = next(action);
        (
          document.getElementById("#logs") as HTMLInputElement
        ).value += `Store.state = {model : ${
          store.getState().model
        }, vendor : ${store.getState().vendor}}\n\n`;
        return rslt;
      };
    };
  };

  const store = new Store(
    reducer,
    { model: "Atom", vendor: "Intel" },
    applyMiddleware(middlewareLogStates, middlewareLogActions)
  );
  store.subscribe(callbackModel);
  store.subscribe(callbackVendor);

  const modelEl = document.getElementById("#modelInput") as HTMLInputElement;
  modelEl.addEventListener("keypress", (e: KeyboardEvent) => {
    const el = e.target as HTMLInputElement;
    const code = e.code;
    if (code === "Enter") {
      const action = actionCreate(actions.CHANGE_MODEL, el.value);
      store.dispatch(action);
    }
  });

  const vendorEl = document.getElementById("#vendorInput") as HTMLInputElement;
  vendorEl.addEventListener("keypress", (e: KeyboardEvent) => {
    const el = e.target as HTMLInputElement;
    const code = e.code;
    if (code === "Enter") {
      const action = actionCreate(actions.CHANGE_VENDOR, el.value);
      store.dispatch(action);
    }
  });
})();

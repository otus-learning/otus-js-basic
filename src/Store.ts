import {
  AbstractStore,
  AbstractState,
  AbstractReducer,
  AbstractAction,
  AbstractCallback,
  AbstractMiddleware,
  AbstractDispatch,
} from "./AbstractStore";

export class Store implements AbstractStore {
  private _state: AbstractState;
  private _reducer: AbstractReducer;
  private _callbacks: AbstractCallback[];
  private _middlewares: AbstractMiddleware[];

  constructor(
    reducer: AbstractReducer,
    initialState?: Partial<AbstractState>,
    createDispatch?: (store: AbstractStore) => AbstractDispatch
  ) {
    this._state = initialState ? { ...initialState } : {};
    this._reducer = reducer;
    this._callbacks = [];
    this._middlewares = [];
    createDispatch && (this.dispatch = createDispatch(this));
  }

  getState() {
    return this._state;
  }

  dispatch(action: AbstractAction) {
    this._state = this._reducer(this._state, action);
    this._callbacks.forEach((func) => {
      func();
    });
  }

  subscribe(cb: AbstractCallback) {
    this._callbacks.push(cb);
    return () => {
      this._callbacks = this._callbacks.filter((func) => {
        return func !== cb;
      });
    };
  }

  replaceReducer(newReducer: AbstractReducer) {
    this._reducer = newReducer;
  }
}

export function combineReducers(reducers: {
  [index: string]: AbstractReducer;
}): AbstractReducer {
  //return single combined reducer
  return (
    inputState: AbstractState | undefined = {},
    action: AbstractAction
  ) => {
    const state: AbstractState = { ...inputState };
    for (const key in reducers) {
      const reducer = reducers[key];
      state[key] = reducer(state[key] && state, action)[key];
    }
    return state;
  };
}

export function actionCreate(
  actionType: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionPayload?: any
): AbstractAction {
  return { type: actionType, payload: actionPayload };
}

export function applyMiddleware(...middlewares: AbstractMiddleware[]) {
  middlewares.reverse();
  return (store: AbstractStore) => {
    let dispatch = store.dispatch.bind(store);
    middlewares.forEach((middleware) => {
      dispatch = middleware(store)(dispatch);
    });
    return dispatch;
  };
}

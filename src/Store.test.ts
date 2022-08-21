import {
  AbstractReducer,
  AbstractState,
  AbstractAction,
  AbstractStore,
  AbstractDispatch,
} from "./AbstractStore";
import { Store, combineReducers, actionCreate, applyMiddleware } from "./Store";

let state: AbstractState;
let reducer: AbstractReducer;

beforeEach(() => {
  state = { name: "test", age: 1 };
  reducer = (state: AbstractState | undefined, action: AbstractAction) => {
    switch (action.type) {
      case "change":
        state && (state.name = "test1");
    }
    return state || {};
  };
});

describe("test that Store is a right redux class", () => {
  it("tests that Store constructor is exists and do create instances all right", () => {
    expect(Store).toBeDefined();
    expect(new Store(reducer)).toBeInstanceOf(Store);
  });

  it("tests that Store instance return it's state by getState() method", () => {
    const store = new Store(reducer, state);
    expect(store.getState()).toEqual(state);
  });

  it("tests that action change store's state and action creator do all right, and the dispatcher pass events to view", () => {
    const store = new Store(reducer, state);
    const cb = jest.fn();
    const removeCb = store.subscribe(cb);
    expect(store.getState().name).toEqual("test");
    const action = actionCreate("change");
    expect(cb).not.toBeCalled();
    store.dispatch(action);
    expect(store.getState().name).toEqual("test1");
    expect(cb).toBeCalled();
    removeCb();
    store.dispatch(action);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("tests that reduce combiner do all right", () => {
    const reducer = combineReducers({
      name: (state: AbstractState | undefined, action: AbstractAction) => {
        switch (action.type) {
          case "changeName":
            state && (state.name = action.payload);
        }
        return state || {};
      },
      age: (state: AbstractState | undefined, action: AbstractAction) => {
        switch (action.type) {
          case "changeAge":
            state && (state.age = action.payload);
        }
        return state || {};
      },
    });

    const store = new Store(reducer, state);

    expect(store.getState().name).toEqual("test");
    expect(store.getState().age).toEqual(1);
    let action = actionCreate("changeName", "test1");
    store.dispatch(action);
    expect(store.getState().name).toEqual("test1");
    action = actionCreate("changeAge", 2);
    expect(store.getState().age).toEqual(1);
  });

  it("tests that middleware functions are called right", () => {
    let flag = false;

    const mw =
      (store: AbstractStore) =>
      (next: AbstractDispatch) =>
      (action: AbstractAction) => {
        next(action);
        flag = true;
      };

    const store = new Store(reducer, state, applyMiddleware(mw));

    expect(store.getState().name).toEqual("test");
    const action = actionCreate("change", "test1");
    expect(flag).toEqual(false);
    store.dispatch(action);
    expect(store.getState().name).toEqual("test1");
    expect(flag).toEqual(true);
  });

  it("tests that store.replaceReducer() does replace current reducer by new reduce function", () => {
    const store = new Store(reducer, state);
    expect(store.getState().name).toEqual("test");
    const action = actionCreate("change");
    store.dispatch(action);
    expect(store.getState().name).toEqual("test1");
    expect(store.getState().age).toEqual(1);
    store.replaceReducer(
      (state: AbstractState | undefined, action: AbstractAction) => {
        switch (action.type) {
          case "change":
            state && (state.age = 2);
        }
        return state || {};
      }
    );
    store.dispatch(action);
    expect(store.getState().name).toEqual("test1");
    expect(store.getState().age).toEqual(2);
  });
});

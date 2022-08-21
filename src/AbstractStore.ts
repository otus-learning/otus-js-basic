export type AbstractAction = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

export type AbstractState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbstractDispatch = (action: AbstractAction) => any;

export type AbstractReducer = (
  inputState: AbstractState | undefined,
  action: AbstractAction
) => AbstractState;

export type AbstractCallback = () => void;

export interface AbstractStore {
  getState(): AbstractState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch(action: AbstractAction): any;
  subscribe(cb: AbstractCallback): () => void;
  replaceReducer(newReducer: AbstractReducer): void;
}
export type AbstractMiddleware = (
  store: AbstractStore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => (next: (action: AbstractAction) => any) => (action: AbstractAction) => any;

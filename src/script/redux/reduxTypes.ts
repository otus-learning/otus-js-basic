export type PageState = Record<string, any>;
export type PageAction = {
  type: string;
  payload?: any;
};

export enum Actions {
  setPageElements = "SET_PAGE_ELEMENTS",
}

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { PageAction, PageState, Actions } from "./reduxTypes";

const initialState = {
  searchSectionClassName: "search-container search-container--unvisible",
  recordSectionClassName: "record-container record-container--unvisible",
  aboutSectionClassName: "about-container about-container--unvisible",

  toDoTextValue: "",
  tagTextValue: "",
  datePicker1TextValue: "",
  cbxClosedChecked: false,

  delBtnClassName: "btns-container__del-btn btns-container__del-btn--unvisible",
  cbxClosedClassName:
    "btns-container__cbx-closed btns-container__cbx-closed--unvisible",
  lblClosedClassName:
    "btns-container__lbl-closed btns-container__lbl-closed--unvisible",

  searchRsltInnerHTML: "",

  isAddingAnchors: false,
  anchor: HTMLAnchorElement,
  /*
	datePicker2TextValue : "",
,searchFieldTextValue : "", 
	cbxSearchClosedChecked : false,
*/
};

const reducer = (
  state: PageState | undefined = initialState,
  action: PageAction
) => {
  let newState = { ...state };
  switch (action.type) {
    case Actions.setPageElements: {
      action.payload && (newState = { ...state, ...action.payload });
      break;
    }
    default: {
      break;
    }
  }
  return newState;
};

export const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
  const state = store.getState();

  if (state.isAddingAnchors) {
    (document.getElementById("#searchRslt") as HTMLDivElement).appendChild(
      state.anchor
    );
  } else {
    (document.getElementById("#toDoText") as HTMLTextAreaElement).value =
      state.toDoTextValue;
    (document.getElementById("#tag") as HTMLInputElement).value =
      state.tagTextValue;
    (document.getElementById("#datepicker1") as HTMLInputElement).value =
      state.datePicker1TextValue;
    (document.getElementById("#cbxClosed") as HTMLInputElement).checked =
      state.cbxClosedChecked;

    (document.getElementById("#delBtn") as HTMLButtonElement).className =
      state.delBtnClassName;
    (document.getElementById("#cbxClosed") as HTMLButtonElement).className =
      state.cbxClosedClassName;
    (document.getElementById("#lblClosed") as HTMLButtonElement).className =
      state.lblClosedClassName;

    (document.getElementById("#search") as HTMLElement).className =
      state.searchSectionClassName;
    (document.getElementById("#about") as HTMLElement).className =
      state.aboutSectionClassName;
    (document.getElementById("#record") as HTMLElement).className =
      state.recordSectionClassName;

    (document.getElementById("#searchRslt") as HTMLDivElement).innerHTML =
      state.searchRsltInnerHTML;
    /*
	(document.getElementById("#datepicker2") as HTMLInputElement).value = state.datePicker2TextValue;
	(document.getElementById("#search-field") as HTMLInputElement).value = state.searchFieldTextValue;

	(document.getElementById("#cbxSearchClosed") as HTMLInputElement).value = state.cbxSearchClosedChecked;
*/
  }
});

export const actionCreator = (action: string, payload?: any) => {
  return payload ? { type: action, payload: payload } : { type: action };
};

export const setAboutVisibleAction = actionCreator(Actions.setPageElements, {
  searchSectionClassName: "search-container search-container--unvisible",
  recordSectionClassName: "record-container record-container--unvisible",
  aboutSectionClassName: "about-container",
  isAddingAnchors: false,
});

export const setSearchVisibleAction = actionCreator(Actions.setPageElements, {
  searchSectionClassName: "search-container",
  recordSectionClassName: "record-container record-container--unvisible",
  aboutSectionClassName: "about-container about-container--unvisible",
  isAddingAnchors: false,
});

export const setRecordVisibleAction = actionCreator(Actions.setPageElements, {
  searchSectionClassName: "search-container search-container--unvisible",
  recordSectionClassName: "record-container",
  aboutSectionClassName: "about-container about-container--unvisible",
  isAddingAnchors: false,
});

export const setExistingRecordBtnsUnvisibleAction = actionCreator(
  Actions.setPageElements,
  {
    delBtnClassName:
      "btns-container__del-btn btns-container__del-btn--unvisible",
    cbxClosedClassName:
      "btns-container__cbx-closed btns-container__cbx-closed--unvisible",
    lblClosedClassName:
      "btns-container__lbl-closed btns-container__lbl-closed--unvisible",
    isAddingAnchors: false,
  }
);

export const setExistingRecordBtnsVisibleAction = actionCreator(
  Actions.setPageElements,
  {
    delBtnClassName: "btns-container__del-btn",
    cbxClosedClassName: "btns-container__cbx-closed",
    lblClosedClassName: "btns-container__lbl-closed",
    isAddingAnchors: false,
  }
);

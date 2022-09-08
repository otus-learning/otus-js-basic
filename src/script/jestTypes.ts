import { Pikaday, MiniSearch } from "./cdn/cdn";

export const Pickaday: typeof Pikaday = class {};

export const MSearch: typeof MiniSearch = class {
  constructor() {}

  addAll(param: any[]) {}

  search(s: string, opt?: Record<string, any>) {
    return [{ score: 1 }];
  }
};

export const jestBodyInnerHTML = `
		<button id="#newBtn"></button>
		<button id="#listBtn"></button>
		<button id="#aboutBtn"></button>
		<section id="#record">
			<input type="text" id="#datepicker1">
			<textarea id="#toDoText"></textarea>
			<input type="text" id="#tag">
			<label id="#lblClosed"></label>
			<input id="#cbxClosed" type="checkbox"> 
			<button id="#saveBtn"></button>
			<button id="#delBtn"></button>
			</div>
		</section>
		<section id="#search">
			<input type="text" id="#search-field">
			<input type="text" id="#datepicker2">
			<input type="checkbox" id="#cbxSearchClosed">
			<input type="text" id="#search-field">
			<div id="#searchRslt"></div>
		</section>
		<section id ="#about"></section>`;

type FakeMethod = {
  params: Record<string, any[]>;
  count: number;
};

export const _go: FakeMethod = {
  params: {},
  count: 0,
};

export const _on: FakeMethod = {
  params: {},
  count: 0,
};

export const fakeRouter = {
  go(...params: any[]) {
    _go.params[String(_go.count)] = params;
    _go.count++;
  },

  on(...params: any[]) {
    _on.params[String(_on.count)] = params;
    _on.count++;
  },
};

export const _create: FakeMethod = {
  params: {},
  count: 0,
};

export const _read: FakeMethod = {
  params: {},
  count: 0,
};

export const _update: FakeMethod = {
  params: {},
  count: 0,
};

export const fakeCalendar = {
  create(...params: any[]) {
    _create.params[String(_create.count)] = params;
    _create.count++;
    return new Promise((resolve) => {
      resolve({
        _id: "0_local",
        _toDo: "test",
        _tag: "#test",
        _date: "test.test.test",
        _status: "new",
      });
    });
  },

  read(...params: any[]) {
    _read.params[String(_read.count)] = params;
    _read.count++;
    return new Promise((resolve) => {
      params[0] === "1_local"
        ? resolve([
            {
              _id: "1_local",
              _toDo: "test",
              _tag: "#test",
              _date: "test.test.test",
              _status: "deleted",
            },
          ])
        : resolve([
            {
              _id: "0_local",
              _toDo: "test",
              _tag: "#test",
              _date: "test.test.test",
              _status: "new",
            },
          ]);
    });
  },

  update(...params: any[]) {
    _update.params[String(_update.count)] = params;
    _update.count++;
    return new Promise((resolve) => {
      resolve({
        _id: "0_local",
        _toDo: "test",
        _tag: "#test",
        _date: "test.test.test",
        _status: "closed",
      });
    });
  },
};

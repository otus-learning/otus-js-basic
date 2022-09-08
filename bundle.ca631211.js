// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/scss/reset.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/scss/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/script/cdn/cdn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pikaday = exports.MiniSearch = void 0;
let Pikaday = window.Pikaday;
exports.Pikaday = Pikaday;
let MiniSearch = window.MiniSearch;
exports.MiniSearch = MiniSearch;
},{}],"src/script/calendar/Calendar.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarClasses = void 0;
var CalendarClasses;

(function (CalendarClasses) {
  let Statuses;

  (function (Statuses) {
    Statuses["NEW"] = "new";
    Statuses["DELETED"] = "deleted";
    Statuses["PENDING"] = "pending";
    Statuses["CLOSED"] = "closed";
  })(Statuses = CalendarClasses.Statuses || (CalendarClasses.Statuses = {}));

  let Tags;

  (function (Tags) {
    Tags["IMPORTANT"] = "#important";
    Tags["VERY_IMPORTANT"] = "#very important";
    Tags["NOT_IMPORTANT"] = "#not important";
  })(Tags = CalendarClasses.Tags || (CalendarClasses.Tags = {}));

  let Dbs;

  (function (Dbs) {
    Dbs[Dbs["LOCALSTORAGE"] = 0] = "LOCALSTORAGE"; //another db
  })(Dbs = CalendarClasses.Dbs || (CalendarClasses.Dbs = {}));

  class Record {
    constructor(record) {
      var _a;
      /*private*/


      this._id = "";
      /*private*/

      this._date = "";
      /*private*/

      this._toDo = "";
      /*private*/

      this._tag = "";
      /*private*/

      this._status = "";
      (_a = record._status) !== null && _a !== void 0 ? _a : record._status = CalendarClasses.Statuses.NEW;

      for (const key in record) {
        this[key] = record[key];
      }
    }

    isNeeded(property) {
      for (const key in this) {
        if (this[key] === property) {
          return true;
        }
      }

      return false;
    }

    change(record) {
      for (const key in record) {
        this[key] = record[key];
      }

      return this;
    }

    get id() {
      return this._id;
    }

    get date() {
      return this._date;
    }

    set date(newDate) {
      if (typeof newDate === "string") {
        this._date = newDate;
      }
    }

    get toDo() {
      return this._toDo;
    }

    set toDo(newToDo) {
      if (typeof newToDo === "string") {
        this._toDo = newToDo;
      }
    }

    get tag() {
      return this._tag;
    }

    set tag(newTag) {
      if (typeof newTag === "string") {
        this._tag = newTag;
      }
    }

    get status() {
      return this._status;
    }

    set status(newStatus) {
      if (typeof newStatus === "string") {
        this._status = newStatus;
      }
    }

  }

  CalendarClasses.Record = Record;

  class SortCondition {
    constructor(record) {
      this._date = this._toDo = this._tag = this._status = null;

      for (const key in record) {
        this[key] = record[key];
      }
    }

    isEqual(record) {
      return record.date === this._date || record.toDo === this._toDo || record.tag === this._tag || record.status === this._status;
    }

    isNotEqual(record) {
      return record.date !== this._date && record.toDo !== this._toDo && record.tag !== this._tag && record.status !== this._status;
    }

  }

  CalendarClasses.SortCondition = SortCondition;

  class Calendar {
    constructor(name, db) {
      this._name = name;
      this._maxId = Number(window.localStorage.getItem("maxId_".concat(this._name)));

      if (isNaN(this._maxId)) {
        this._maxId = 0;
        window.localStorage.setItem("maxId_".concat(this._name), "0");
      }

      this._localRecords = {};
      this._isAsync = Boolean(db);
    }

    _readOne(id) {
      return __awaiter(this, void 0, void 0, function* () {
        let record = null;

        if (this._isAsync) {//await async operation
        } else {
          if (this._localRecords[id]) {
            record = this._localRecords[id];
          } else {
            const str = window.localStorage.getItem(id);

            if (str) {
              record = new Record(JSON.parse(str));
              this._localRecords[id] = record;
            }
          }
        }

        return record;
      });
    }

    _writeOne(record) {
      return __awaiter(this, void 0, void 0, function* () {
        if (this._isAsync) {//await async operation
        } else {
          const id = record.id;

          if (!window.localStorage.getItem(id)) {
            window.localStorage.setItem("maxId_".concat(this._name), String(this._maxId));
          }

          this._localRecords[id] = record;
          window.localStorage.setItem(id, JSON.stringify(record));
        }

        return record;
      });
    }

    create(toDo, tag, date) {
      return __awaiter(this, void 0, void 0, function* () {
        const day = date ? date : new Date().toLocaleDateString();
        tag !== null && tag !== void 0 ? tag : tag = ""; //this._maxId++;

        return yield this._writeOne(new Record({
          _date: day,
          _toDo: toDo,
          _tag: tag,
          _id: "".concat(this._maxId++, "_").concat(this._name)
        }));
      });
    }

    read(property) {
      return __awaiter(this, void 0, void 0, function* () {
        const rslt = [];
        const maxId = this._maxId;

        for (let i = 0; i < maxId; i++) {
          const record = yield this._readOne("".concat(i, "_").concat(this._name));
          record && record.isNeeded(property) && rslt.push(record);
        }

        return rslt.length ? rslt : null;
      });
    }

    update(id, newRecord) {
      return __awaiter(this, void 0, void 0, function* () {
        const record = yield this._readOne(String(id));
        return record ? yield this._writeOne(record.change(newRecord)) : null;
      });
    }

    delete(id) {
      return __awaiter(this, void 0, void 0, function* () {
        const record = yield this._readOne(String(id));
        return record ? yield this._writeOne(record.change({
          _status: CalendarClasses.Statuses.DELETED
        })) : null;
      });
    }

    static filter(records, cfgObjEq, cfgObjNEq) {
      return records.filter(el => {
        return cfgObjEq.isEqual(el) && cfgObjNEq.isNotEqual(el);
      });
    }

    clear() {
      return __awaiter(this, void 0, void 0, function* () {
        if (this._isAsync) {//await async operation
        } else {
          for (let i = 0; i < this._maxId; i++) {
            window.localStorage.removeItem("".concat(i, "_").concat(this._name));
          }

          window.localStorage.removeItem("maxId_".concat(this._name));
        }

        this._maxId = 0;
        this._localRecords = {};
        return true;
      });
    }

  }

  CalendarClasses.Calendar = Calendar;
})(CalendarClasses = exports.CalendarClasses || (exports.CalendarClasses = {}));
},{}],"node_modules/@babel/runtime/helpers/esm/defineProperty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _defineProperty;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
},{}],"node_modules/@babel/runtime/helpers/esm/objectSpread2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _objectSpread2;

var _defineProperty = _interopRequireDefault(require("./defineProperty.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      (0, _defineProperty.default)(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}
},{"./defineProperty.js":"node_modules/@babel/runtime/helpers/esm/defineProperty.js"}],"node_modules/redux/es/redux.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__DO_NOT_USE__ActionTypes = void 0;
exports.applyMiddleware = applyMiddleware;
exports.bindActionCreators = bindActionCreators;
exports.combineReducers = combineReducers;
exports.compose = compose;
exports.createStore = createStore;
exports.legacy_createStore = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
} // Inlined version of the `symbol-observable` polyfill


var $$observable = function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();
/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */


var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

exports.__DO_NOT_USE__ActionTypes = ActionTypes;

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
} // Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of


function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }

  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);

  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other


  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}

function kindOf(val) {
  var typeOfVal = typeof val;

  if ("development" !== 'production') {
    typeOfVal = miniKindOf(val);
  }

  return typeOfVal;
}
/**
 * @deprecated
 *
 * **We recommend using the `configureStore` method
 * of the `@reduxjs/toolkit` package**, which replaces `createStore`.
 *
 * Redux Toolkit is our recommended approach for writing Redux logic today,
 * including store setup, reducers, data fetching, and more.
 *
 * **For more details, please read this Redux docs page:**
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * `configureStore` from Redux Toolkit is an improved version of `createStore` that
 * simplifies setup and helps avoid common bugs.
 *
 * You should not be using the `redux` core package by itself today, except for learning purposes.
 * The `createStore` method from the core `redux` package will not be removed, but we encourage
 * all users to migrate to using Redux Toolkit for all Redux code.
 *
 * If you want to use `createStore` without this visual deprecation warning, use
 * the `legacy_createStore` import instead:
 *
 * `import { legacy_createStore as createStore} from 'redux'`
 *
 */


function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error("development" === "production" ? formatProdErrorMessage(0) : 'It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error("development" === "production" ? formatProdErrorMessage(1) : "Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error("development" === "production" ? formatProdErrorMessage(2) : "Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer) + "'");
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error("development" === "production" ? formatProdErrorMessage(3) : 'You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error("development" === "production" ? formatProdErrorMessage(4) : "Expected the listener to be a function. Instead, received: '" + kindOf(listener) + "'");
    }

    if (isDispatching) {
      throw new Error("development" === "production" ? formatProdErrorMessage(5) : 'You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error("development" === "production" ? formatProdErrorMessage(6) : 'You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error("development" === "production" ? formatProdErrorMessage(7) : "Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    }

    if (typeof action.type === 'undefined') {
      throw new Error("development" === "production" ? formatProdErrorMessage(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }

    if (isDispatching) {
      throw new Error("development" === "production" ? formatProdErrorMessage(9) : 'Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error("development" === "production" ? formatProdErrorMessage(10) : "Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error("development" === "production" ? formatProdErrorMessage(11) : "Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
/**
 * Creates a Redux store that holds the state tree.
 *
 * **We recommend using `configureStore` from the
 * `@reduxjs/toolkit` package**, which replaces `createStore`:
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */


var legacy_createStore = createStore;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */

exports.legacy_createStore = legacy_createStore;

function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("development" === "production" ? formatProdErrorMessage(12) : "The slice reducer for key \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("development" === "production" ? formatProdErrorMessage(13) : "The slice reducer for key \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle '" + ActionTypes.INIT + "' or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if ("development" !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        throw new Error("development" === "production" ? formatProdErrorMessage(14) : "When called with an action of type " + (actionType ? "\"" + String(actionType) + "\"" : '(unknown type)') + ", the slice reducer for key \"" + _key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.");
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("development" === "production" ? formatProdErrorMessage(16) : "bindActionCreators expected an object or a function, but instead received: '" + kindOf(actionCreators) + "'. " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */


function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */


function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error("development" === "production" ? formatProdErrorMessage(15) : 'Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */


function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}
},{"@babel/runtime/helpers/esm/objectSpread2":"node_modules/@babel/runtime/helpers/esm/objectSpread2.js"}],"node_modules/redux-thunk/es/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/** A function that accepts a potential "extra argument" value to be injected later,
 * and returns an instance of the thunk middleware that uses that value
 */
function createThunkMiddleware(extraArgument) {
  // Standard Redux middleware definition pattern:
  // See: https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware
  var middleware = function middleware(_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        // The thunk middleware looks for any functions that were passed to `store.dispatch`.
        // If this "action" is really a function, call it and return the result.
        if (typeof action === 'function') {
          // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
          return action(dispatch, getState, extraArgument);
        } // Otherwise, pass the action down the middleware chain as usual


        return next(action);
      };
    };
  };

  return middleware;
}

var thunk = createThunkMiddleware(); // Attach the factory function so users can create a customized version
// with whatever "extra arg" they want to inject into their thunks

thunk.withExtraArgument = createThunkMiddleware;
var _default = thunk;
exports.default = _default;
},{}],"src/script/redux/reduxTypes.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Actions = void 0;
var Actions;

(function (Actions) {
  Actions["setPageElements"] = "SET_PAGE_ELEMENTS";
})(Actions = exports.Actions || (exports.Actions = {}));
},{}],"src/script/redux/redux.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setExistingRecordBtnsVisibleAction = exports.setExistingRecordBtnsUnvisibleAction = exports.setRecordVisibleAction = exports.setSearchVisibleAction = exports.setAboutVisibleAction = exports.actionCreator = exports.store = void 0;

const redux_1 = require("redux");

const redux_thunk_1 = __importDefault(require("redux-thunk"));

const reduxTypes_1 = require("./reduxTypes");

const initialState = {
  searchSectionClassName: "search-container search-container--unvisible",
  recordSectionClassName: "record-container record-container--unvisible",
  aboutSectionClassName: "about-container about-container--unvisible",
  toDoTextValue: "",
  tagTextValue: "",
  datePicker1TextValue: "",
  cbxClosedChecked: false,
  delBtnClassName: "btns-container__del-btn btns-container__del-btn--unvisible",
  cbxClosedClassName: "btns-container__cbx-closed btns-container__cbx-closed--unvisible",
  lblClosedClassName: "btns-container__lbl-closed btns-container__lbl-closed--unvisible",
  searchRsltInnerHTML: "",
  isAddingAnchors: false,
  anchor: HTMLAnchorElement
  /*
    datePicker2TextValue : "",
  ,searchFieldTextValue : "",
    cbxSearchClosedChecked : false,
  */

};

const reducer = function reducer() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  let newState = Object.assign({}, state);

  switch (action.type) {
    case reduxTypes_1.Actions.setPageElements:
      {
        action.payload && (newState = Object.assign(Object.assign({}, state), action.payload));
        break;
      }

    default:
      {
        break;
      }
  }

  return newState;
};

exports.store = (0, redux_1.createStore)(reducer, (0, redux_1.applyMiddleware)(redux_thunk_1.default));
exports.store.subscribe(() => {
  const state = exports.store.getState();

  if (state.isAddingAnchors) {
    document.getElementById("#searchRslt").appendChild(state.anchor);
  } else {
    document.getElementById("#toDoText").value = state.toDoTextValue;
    document.getElementById("#tag").value = state.tagTextValue;
    document.getElementById("#datepicker1").value = state.datePicker1TextValue;
    document.getElementById("#cbxClosed").checked = state.cbxClosedChecked;
    document.getElementById("#delBtn").className = state.delBtnClassName;
    document.getElementById("#cbxClosed").className = state.cbxClosedClassName;
    document.getElementById("#lblClosed").className = state.lblClosedClassName;
    document.getElementById("#search").className = state.searchSectionClassName;
    document.getElementById("#about").className = state.aboutSectionClassName;
    document.getElementById("#record").className = state.recordSectionClassName;
    document.getElementById("#searchRslt").innerHTML = state.searchRsltInnerHTML;
    /*
    (document.getElementById("#datepicker2") as HTMLInputElement).value = state.datePicker2TextValue;
    (document.getElementById("#search-field") as HTMLInputElement).value = state.searchFieldTextValue;
         (document.getElementById("#cbxSearchClosed") as HTMLInputElement).value = state.cbxSearchClosedChecked;
    */
  }
});

const actionCreator = (action, payload) => {
  return payload ? {
    type: action,
    payload: payload
  } : {
    type: action
  };
};

exports.actionCreator = actionCreator;
exports.setAboutVisibleAction = (0, exports.actionCreator)(reduxTypes_1.Actions.setPageElements, {
  searchSectionClassName: "search-container search-container--unvisible",
  recordSectionClassName: "record-container record-container--unvisible",
  aboutSectionClassName: "about-container",
  isAddingAnchors: false
});
exports.setSearchVisibleAction = (0, exports.actionCreator)(reduxTypes_1.Actions.setPageElements, {
  searchSectionClassName: "search-container",
  recordSectionClassName: "record-container record-container--unvisible",
  aboutSectionClassName: "about-container about-container--unvisible",
  isAddingAnchors: false
});
exports.setRecordVisibleAction = (0, exports.actionCreator)(reduxTypes_1.Actions.setPageElements, {
  searchSectionClassName: "search-container search-container--unvisible",
  recordSectionClassName: "record-container",
  aboutSectionClassName: "about-container about-container--unvisible",
  isAddingAnchors: false
});
exports.setExistingRecordBtnsUnvisibleAction = (0, exports.actionCreator)(reduxTypes_1.Actions.setPageElements, {
  delBtnClassName: "btns-container__del-btn btns-container__del-btn--unvisible",
  cbxClosedClassName: "btns-container__cbx-closed btns-container__cbx-closed--unvisible",
  lblClosedClassName: "btns-container__lbl-closed btns-container__lbl-closed--unvisible",
  isAddingAnchors: false
});
exports.setExistingRecordBtnsVisibleAction = (0, exports.actionCreator)(reduxTypes_1.Actions.setPageElements, {
  delBtnClassName: "btns-container__del-btn",
  cbxClosedClassName: "btns-container__cbx-closed",
  lblClosedClassName: "btns-container__lbl-closed",
  isAddingAnchors: false
});
},{"redux":"node_modules/redux/es/redux.js","redux-thunk":"node_modules/redux-thunk/es/index.js","./reduxTypes":"src/script/redux/reduxTypes.ts"}],"src/script/GUI/calendarGUI.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calendarGUI = void 0;

const Calendar_1 = require("../calendar/Calendar");

const redux_1 = require("../redux/redux");

const reduxTypes_1 = require("../redux/reduxTypes");

const calendarGUI = (Pickaday, MSearch, calendar, router) => {
  const fuzzySearchByDateAndText = () => __awaiter(void 0, void 0, void 0, function* () {
    redux_1.store.dispatch((0, redux_1.actionCreator)(reduxTypes_1.Actions.setPageElements, {
      searchRsltInnerHTML: "",
      isAddingAnchors: false
    }));
    let records = yield calendar.read(Calendar_1.CalendarClasses.Statuses.NEW);

    if (document.getElementById("#cbxSearchClosed").checked) {
      const closed = yield calendar.read(Calendar_1.CalendarClasses.Statuses.CLOSED);

      if (closed && records) {
        records = [...records, ...closed];
      } else {
        closed && !records && (records = closed);
      }
    }

    if (!records) {
      return;
    } else {
      const date = document.getElementById("#datepicker2").value;
      const toDo = document.getElementById("#search-field").value;

      if (!date && !toDo) {
        return;
      }

      let searched;
      const filteredByDate = searched = date ? Calendar_1.CalendarClasses.Calendar.filter(records, new Calendar_1.CalendarClasses.SortCondition({
        _date: date
      }), new Calendar_1.CalendarClasses.SortCondition({})) : records;

      if (toDo) {
        const miniSearch = new MSearch({
          fields: ["_toDo", "_tag"]
        });
        miniSearch.addAll(filteredByDate);
        searched = miniSearch.search(toDo, {
          prefix: true
        }).sort((a, b) => {
          return b.score - a.score;
        });
      }

      const resultDiv = document.createElement("div");
      searched.forEach(r => __awaiter(void 0, void 0, void 0, function* () {
        const records = yield calendar.read(r.id);

        if (records) {
          const record = records[0];
          const a = document.createElement("a");
          let toDo = record._toDo;
          toDo.length > 30 && (toDo = "".concat(toDo.substring(0, 30), "..."));
          a.innerHTML = "".concat(record._date, " | ").concat(record._tag, " | [").concat(toDo, "]").concat(record._status === Calendar_1.CalendarClasses.Statuses.CLOSED ? " | CLOSED" : "");
          a.href = "#";
          a.classList.add("search-results-container__record");
          a.setAttribute("id", "/".concat(r.id));
          a.addEventListener("click", e => {
            const target = e.target;
            const id = target.getAttribute("id");
            id && router.go(id, [], [], [], []);
            e.preventDefault();
          });
          redux_1.store.dispatch((0, redux_1.actionCreator)(reduxTypes_1.Actions.setPageElements, {
            isAddingAnchors: true,
            anchor: a
          }));
        }
      }));
    }
  });

  const picker1 = new Pickaday({
    field: document.getElementById("#datepicker1")
  });
  const picker2 = new Pickaday({
    field: document.getElementById("#datepicker2"),
    onClose: date => __awaiter(void 0, void 0, void 0, function* () {
      yield fuzzySearchByDateAndText();
    })
  });
  router.on("/list", () => {}, () => {}, () => {}, () => {
    redux_1.store.dispatch(redux_1.setSearchVisibleAction);
  });
  router.on("/about", () => {}, () => {}, () => {}, () => {
    redux_1.store.dispatch(redux_1.setAboutVisibleAction);
  });
  router.on("/new", () => {}, () => {}, () => {}, () => {
    redux_1.store.dispatch((0, redux_1.actionCreator)(reduxTypes_1.Actions.setPageElements, {
      toDoTextValue: "Very important new doing",
      tagTextValue: "#important",
      datePicker1TextValue: "".concat(new Date().toString().split(new Date().getFullYear().toString()).shift()).concat(new Date().getFullYear())
    }));
    redux_1.store.dispatch(redux_1.setExistingRecordBtnsUnvisibleAction);
    redux_1.store.dispatch(redux_1.setRecordVisibleAction);
  });
  router.on(new RegExp("^/[0-9]+_local$"), () => {}, () => {}, () => {}, () => __awaiter(void 0, void 0, void 0, function* () {
    redux_1.store.dispatch(redux_1.setExistingRecordBtnsVisibleAction);
    redux_1.store.dispatch(redux_1.setRecordVisibleAction);
    const id = location.href.replace(location.origin, "").substring(1);
    const records = yield calendar.read(id);

    if (!records) {
      router.go("/new", [], [], [], []);
      return;
    } else {
      const record = records[0];

      if (record._status === Calendar_1.CalendarClasses.Statuses.DELETED) {
        router.go("/new", [], [], [], []);
        return;
      }

      redux_1.store.dispatch((0, redux_1.actionCreator)(reduxTypes_1.Actions.setPageElements, {
        toDoTextValue: record._toDo,
        tagTextValue: record._tag,
        datePicker1TextValue: record._date,
        cbxClosedChecked: record._status === Calendar_1.CalendarClasses.Statuses.CLOSED ? true : false,
        isAddingAnchors: false
      }));
    }
  }));
  document.getElementById("#listBtn").addEventListener("click", () => {
    router.go("/list", [], [], [], []);
  });
  document.getElementById("#aboutBtn").addEventListener("click", () => {
    router.go("/about", [], [], [], []);
  });
  document.getElementById("#newBtn").addEventListener("click", () => {
    router.go("/new", [], [], [], []);
  });
  document.getElementById("#saveBtn").addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const toDo = document.getElementById("#toDoText").value;
    const date = document.getElementById("#datepicker1").value;
    const tag = document.getElementById("#tag").value;

    if (!toDo) {
      window.alert("Empty tasks are not allowed! Please reenter \"ToDo\" field.");
      return;
    }

    const id = location.href.replace(location.origin, "").substring(1);

    if (id.match(/^[0-9]+_local$/)) {
      const id = location.href.replace(location.origin, "").substring(1);
      const records = yield calendar.read(id);

      if (!records) {
        router.go("/new", [], [], [], []);
        return;
      } else {
        const record = records[0];

        if (record._status === Calendar_1.CalendarClasses.Statuses.DELETED) {
          router.go("/new", [], [], [], []);
          return;
        }

        const status = document.getElementById("#cbxClosed").checked ? Calendar_1.CalendarClasses.Statuses.CLOSED : Calendar_1.CalendarClasses.Statuses.NEW;
        yield calendar.update(record.id, {
          _toDo: toDo.trim(),
          _tag: tag.trim(),
          _date: date.trim(),
          _status: status
        });
      }
    } else {
      if (id.match(/^new$/)) {
        const record = yield date ? calendar.create(toDo.trim(), tag.trim(), date.trim()) : calendar.create(toDo.trim(), tag.trim());
        const newId = "/".concat(record.id);
        router.go(newId, [], [], [], []);
      }
    }

    window.alert("Saved! Now you can to edit this record.");
  }));
  document.getElementById("#delBtn").addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = location.href.replace(location.origin, "").substring(1);

    if (id.match(/^[0-9]+_local$/)) {
      const id = location.href.replace(location.origin, "").substring(1);
      const records = yield calendar.read(id);

      if (!records) {
        router.go("/list", [], [], [], []);
        return;
      } else {
        const record = records[0];

        if (record._status === Calendar_1.CalendarClasses.Statuses.DELETED) {
          router.go("/list", [], [], [], []);
          return;
        }

        yield calendar.update(record.id, {
          _status: Calendar_1.CalendarClasses.Statuses.DELETED
        });
      }

      alert("Deleted!");
    }

    router.go("/list", [], [], [], []);
  }));
  document.getElementById("#search-field").addEventListener("keyup", e => __awaiter(void 0, void 0, void 0, function* () {
    yield fuzzySearchByDateAndText();
  }));
  document.getElementById("#cbxSearchClosed").addEventListener("click", e => __awaiter(void 0, void 0, void 0, function* () {
    yield fuzzySearchByDateAndText();
  }));

  document.body.onload = () => {
    let link = location.href.replace(location.origin, "");
    link === "/" && (link = "/list");
    router.go(link, [], [], [], []);
  };
};

exports.calendarGUI = calendarGUI;
},{"../calendar/Calendar":"src/script/calendar/Calendar.ts","../redux/redux":"src/script/redux/redux.ts","../redux/reduxTypes":"src/script/redux/reduxTypes.ts"}],"src/script/router/router.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

class Router {
  constructor() {
    this._listeners = [];
    this._currentID = String(+new Date());
    this._states = {};
    this._states[this._currentID] = {
      url: "",
      onBeforeEnterArgs: null,
      onEnterArgs: null,
      onLeaveArgs: null
    };
    this._forward = true;
    window.addEventListener("popstate", e => __awaiter(this, void 0, void 0, function* () {
      let listeners = this._findNeedURLs(this._states[this._currentID].url);

      if (e.isTrusted) {
        if (!(this._states[this._currentID] && this._states[e.state.id])) {
          return;
        }

        this._forward = Number(this._currentID) < Number(e.state.id);

        for (let i = 0; i < listeners.length; i++) {
          yield listeners[i].onLeave(this._forward, ...this._states[this._currentID].onLeaveArgs);
        }

        this._currentID = e.state.id;
        listeners = this._findNeedURLs(this._states[this._currentID].url);

        for (let i = 0; i < listeners.length; i++) {
          yield listeners[i].onBeforeEnter(this._forward, ...this._states[this._currentID].onBeforeEnterArgs);
        }

        window.dispatchEvent(new Event("popstate"));
      } else {
        for (let i = 0; i < listeners.length; i++) {
          yield listeners[i].render(this._forward, ...this._states[this._currentID].renderArgs);
        }

        listeners = this._findNeedURLs(this._states[this._currentID].url);

        for (let i = 0; i < listeners.length; i++) {
          yield listeners[i].onEnter(this._forward, ...this._states[this._currentID].onEnterArgs);
        }
      }
    }));
  }

  _findNeedURLs(url) {
    return this._listeners.filter(el => {
      const innerURL = el.url;

      if (innerURL instanceof RegExp) {
        return url.match(innerURL) ? true : false;
      }

      const stringURL = innerURL instanceof Function ? innerURL() : innerURL;
      return stringURL === url ? true : false;
    });
  }

  go(url, onBeforeEnterArgs, onEnterArgs, onLeaveArgs, renderArgs) {
    return __awaiter(this, void 0, void 0, function* () {
      this._forward = true;

      let listeners = this._findNeedURLs(this._states[this._currentID].url);

      for (let i = 0; i < listeners.length; i++) {
        yield listeners[i].onLeave(true, ...this._states[this._currentID].onLeaveArgs);
      }

      const id = String(+new Date());
      this._states[id] = {
        url: url,
        onBeforeEnterArgs: onBeforeEnterArgs,
        onEnterArgs: onEnterArgs,
        onLeaveArgs: onLeaveArgs,
        renderArgs: renderArgs
      };
      listeners = this._findNeedURLs(url);

      for (let i = 0; i < listeners.length; i++) {
        yield listeners[i].onBeforeEnter(true, ...onBeforeEnterArgs);
      }

      this._currentID = id;
      history.pushState({
        id: id
      }, url, url);
      window.dispatchEvent(new Event("popstate"));
    });
  }

  on(url, onBeforeEnter, onEnter, onLeave, render) {
    this._listeners.push({
      url: url,
      onBeforeEnter: onBeforeEnter,
      onEnter: onEnter,
      onLeave: onLeave,
      render: render
    });
  }

}

exports.Router = Router;
},{}],"src/script/bundle.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../scss/reset.scss");

require("../scss/style.scss");

const cdn = __importStar(require("./cdn/cdn"));

const calendarGUI_1 = require("./GUI/calendarGUI");

const Calendar_1 = require("./calendar/Calendar");

const router_1 = require("./router/router");

(0, calendarGUI_1.calendarGUI)(cdn.Pikaday, cdn.MiniSearch, new Calendar_1.CalendarClasses.Calendar("local"), new router_1.Router());
},{"../scss/reset.scss":"src/scss/reset.scss","../scss/style.scss":"src/scss/style.scss","./cdn/cdn":"src/script/cdn/cdn.js","./GUI/calendarGUI":"src/script/GUI/calendarGUI.ts","./calendar/Calendar":"src/script/calendar/Calendar.ts","./router/router":"src/script/router/router.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35517" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/script/bundle.ts"], null)
//# sourceMappingURL=/bundle.ca631211.js.map
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
})({"src/Calendar.ts":[function(require,module,exports) {
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
},{}],"src/bundle.ts":[function(require,module,exports) {
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

const Calendar_1 = require("./Calendar");

(() => __awaiter(void 0, void 0, void 0, function* () {
  const calendar = new Calendar_1.CalendarClasses.Calendar("first");
  const calendar_ = new Calendar_1.CalendarClasses.Calendar("Second");
  yield calendar.clear();
  yield calendar_.clear();
  console.log("Tasks for first calendar:");
  console.log(yield calendar.create("Задача номер один", Calendar_1.CalendarClasses.Tags.IMPORTANT));
  console.log(yield calendar.create("Задача номер два", Calendar_1.CalendarClasses.Tags.IMPORTANT));
  console.log(yield calendar.create("Задача номер три", Calendar_1.CalendarClasses.Tags.NOT_IMPORTANT, "2022.12.31"));
  console.log("Tasks for second calendar:");
  console.log(yield calendar_.create("Задача второго календаря", Calendar_1.CalendarClasses.Tags.NOT_IMPORTANT));
  let records = yield calendar.read(Calendar_1.CalendarClasses.Tags.IMPORTANT);
  console.log("All records selected by certain tag at the first calendar: ", records);

  if (records) {
    const filteredRecords = Calendar_1.CalendarClasses.Calendar.filter(records, new Calendar_1.CalendarClasses.SortCondition({
      _toDo: "Задача номер один"
    }), new Calendar_1.CalendarClasses.SortCondition({}));
    console.log("All filtered records: ", filteredRecords);
    filteredRecords[0] && calendar.update(filteredRecords[0].id, {
      _toDo: "Очень важная задача №1",
      _status: Calendar_1.CalendarClasses.Statuses.PENDING
    });
  }

  const updatedRecords = yield calendar.read(Calendar_1.CalendarClasses.Tags.IMPORTANT);
  console.log("Records with one, whos field has been updated at the first calendar: ", updatedRecords);
  yield calendar.clear();
  console.log("Now the first calendar is clear");
  records = yield calendar_.read(Calendar_1.CalendarClasses.Tags.NOT_IMPORTANT);
  console.log("All records selected by certain tag at the second calendar: ", records);
}))();
},{"./Calendar":"src/Calendar.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44577" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/bundle.ts"], null)
//# sourceMappingURL=/bundle.e554b175.js.map
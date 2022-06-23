/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "script/" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".css";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "otus-learning:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		var createStylesheet = (chunkId, fullhref, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// object to store loaded CSS chunks
/******/ 		var installedCssChunks = {
/******/ 			179: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.miniCss = (chunkId, promises) => {
/******/ 			var cssChunks = {"74":1};
/******/ 			if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 			else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 				promises.push(installedCssChunks[chunkId] = loadStylesheet(chunkId).then(() => {
/******/ 					installedCssChunks[chunkId] = 0;
/******/ 				}, (e) => {
/******/ 					delete installedCssChunks[chunkId];
/******/ 					throw e;
/******/ 				}));
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no hmr
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			179: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkotus_learning"] = self["webpackChunkotus_learning"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/script/prjConst.js
const MAIN_CONTAINER_ID = "mainContainerId";
const NOW_DIV_ID = "nowId";
const BTN_ID = "btnId";
const EDIT_ID = "edtId";
const CBX_ID = "cbxId";
const IFRAME_ID = "iframeId";
const HISTORY_DIV_ID = "historyId";
const IMG_ID = "imgId";
const TEMP_P_ID = "tempId";
const DESCRIPTION_P_ID = "descId";
const HUMIDITY_P_ID = "humId";
const WIND_P_ID = "windId";
const FORECAST_ID = "forecastId";
const MY_LOCATION_LON = "myLocationLon";
const MY_LOCATION_LAT = "myLocationLat";
const CITY_LIST = "cityList";
const LS_CAPACITY = 10;
const GEOCODER_URL_START = "https://nominatim.openstreetmap.org/search/";
const GEOCODER_URL_END = "?format=json&addressdetails=1&limit=1&polygon_svg=1";
const MAP_URL_START = "https://www.openstreetmap.org/export/embed.html?bbox=";
const MAP_URL_END = "&amp;layer=mapnik";
const WEATHER_API_KEY = "542ffd081e67f4512b705f89d2a611b2";
const WEATHER_URL_START = "https://api.openweathermap.org/data/2.5/forecast?lang=ru&units=metric&"; //const WEATHER_URL_START = "http://api.openweathermap.org/data/2.5/weather?lang=ru&units=metric&"

const WEATHER_URL_END = "&cnt=24&appid=" + WEATHER_API_KEY; //const WEATHER_URL_END = "&appid=" + WEATHER_API_KEY;

const IP_WHOIS_URL = "https://ipwho.is";
const WEATHER_FETCH_ERR = "Ошибка получения данных";
;// CONCATENATED MODULE: ./src/script/fetches.js
 //request to geocoder

async function getCoordinates(city) {
  let response = await (
    /*window.*/
    fetch(`${GEOCODER_URL_START}${city}${GEOCODER_URL_END}`)
  );
  return await response.json();
} //request to ip whois

async function getLocation() {
  let response = await (
    /*window.*/
    fetch(IP_WHOIS_URL)
  );
  return await response.json();
}
;// CONCATENATED MODULE: ./src/script/events.js



let aClick = e => {
  document.getElementById(EDIT_ID).value = e.target.innerText;
  document.getElementById(BTN_ID).click();
};
let btnClick = () => {
  let city = document.getElementById(EDIT_ID).value;
  document.getElementById(EDIT_ID).value = "";
  getCoordinates(city).then(cityInfo => {
    let lat = cityInfo[0].lat;
    let lon = cityInfo[0].lon;
    let storage =
    /*window.*/
    localStorage;

    if (document.getElementById(CBX_ID).checked) {
      storage.setItem(MY_LOCATION_LON, lon);
      storage.setItem(MY_LOCATION_LAT, lat);
      document.getElementById(CBX_ID).checked = false;
    }

    let cityStorageJSON = storage.getItem(CITY_LIST);
    let cityList = cityStorageJSON ? JSON.parse(cityStorageJSON) : [];
    let isNeedAddToHistory = true;

    for (let i = 0; i < cityList.length; i++) {
      if (cityList[i].toLowerCase() === city.toLowerCase()) {
        isNeedAddToHistory = false;
        break;
      }
    }

    if (isNeedAddToHistory) {
      if (cityList.length === LS_CAPACITY) {
        cityList.shift();
        let aList = document.querySelectorAll("a");
        aList[0].parentNode.removeChild(aList[0]);
      }

      cityList.push(city);
      storage.setItem(CITY_LIST, JSON.stringify(cityList));
      addHistoryLink(document.getElementById(HISTORY_DIV_ID), city);
    }

    document.getElementById(MAIN_CONTAINER_ID).showFunc(document.getElementById(IFRAME_ID), lat, lon);
  });
};
let edtKeypress = e => {
  if (e.keyCode === 13) {
    document.getElementById(BTN_ID).click();
  }
};
;// CONCATENATED MODULE: ./src/script/ui.js



let addHistoryLink = (container, city) => {
  let a = document.createElement("a");
  a.innerText = city;
  a.href = "#";
  a.addEventListener("click", aClick);
  container.appendChild(a);
};
let createStyledElement = (tag, style, id) => {
  let el = document.createElement(tag);
  style && (el.className = style);
  id && (el.id = id);
  return el;
};
let createUI = (container, showFunc) => {
  container.className = "main-container";
  container.id = MAIN_CONTAINER_ID; //save show function for using in the events

  container.showFunc = showFunc;
  let lbl = document.createElement("label");
  lbl.innerText = "Мой город";
  let cbx = createStyledElement("input", "cbx", CBX_ID);
  cbx.type = "checkbox";
  let btn = createStyledElement("input", "btn", BTN_ID);
  btn.type = "button";
  btn.value = "Поиск";
  btn.addEventListener("click", btnClick);
  let edit = createStyledElement("input", null, EDIT_ID);
  edit.type = "text";
  edit.addEventListener("keypress", edtKeypress);
  let iframe = createStyledElement("iframe", null, IFRAME_ID);
  let nowDiv = createStyledElement("div", "now-div", NOW_DIV_ID);
  let txtDiv = createStyledElement("div", "txt-div", null);
  let imgDiv = createStyledElement("div", "inline-img", null);
  let p = createStyledElement("p", "bold-p", null);
  p.innerText = "Сейчас:";
  nowDiv.appendChild(p);
  nowDiv.appendChild(createStyledElement("p", null, DESCRIPTION_P_ID));
  txtDiv.appendChild(createStyledElement("p", null, TEMP_P_ID));
  txtDiv.appendChild(createStyledElement("p", null, HUMIDITY_P_ID));
  txtDiv.appendChild(createStyledElement("p", null, WIND_P_ID));
  imgDiv.appendChild(createStyledElement("img", null, IMG_ID));
  nowDiv.appendChild(txtDiv);
  nowDiv.appendChild(imgDiv);
  let forecast = createStyledElement("div", "flex-div", FORECAST_ID);
  forecast.appendChild(nowDiv);
  let searchDiv = createStyledElement("div", "search-div", null);
  searchDiv.appendChild(lbl);
  searchDiv.appendChild(cbx);
  searchDiv.appendChild(edit);
  searchDiv.appendChild(btn);
  let historyDiv = createStyledElement("div", "hist-div", HISTORY_DIV_ID);
  p = document.createElement("p");
  p.innerText = "История:";
  historyDiv.appendChild(p);
  container.appendChild(searchDiv);
  container.appendChild(forecast);
  container.appendChild(iframe);
  container.appendChild(historyDiv);
  let storage =
  /*window.*/
  localStorage;
  let cityStorageJSON = storage.getItem(CITY_LIST);

  if (cityStorageJSON) {
    let cityList = JSON.parse(cityStorageJSON);
    cityList.forEach(el => {
      addHistoryLink(document.getElementById(HISTORY_DIV_ID), el);
    });
  }

  if (storage.getItem(MY_LOCATION_LON)) {
    let lon = storage.getItem(MY_LOCATION_LON);
    let lat = storage.getItem(MY_LOCATION_LAT);
    showFunc(document.getElementById(IFRAME_ID), lat, lon);
  } else {
    /*window.*/
    navigator.geolocation.getCurrentPosition(geolocation => {
      let lat = geolocation.coords.latitude;
      let lon = geolocation.coords.longitude;
      storage.setItem(MY_LOCATION_LON, lon);
      storage.setItem(MY_LOCATION_LAT, lat);
      showFunc(document.getElementById(IFRAME_ID), lat, lon);
    }, () => {
      getLocation().then(data => {
        let lat = data.latitude;
        let lon = data.longitude;
        storage.setItem(MY_LOCATION_LON, lon);
        storage.setItem(MY_LOCATION_LAT, lat);
        showFunc(document.getElementById(IFRAME_ID), lat, lon);
      });
    });
  }
};
;// CONCATENATED MODULE: ./src/script/forecast.js

 //request to weather provider

async function getWeather(lat, lon) {
  let url = `${WEATHER_URL_START}lat=${lat}&lon=${lon}${WEATHER_URL_END}`;
  let response = await (
    /*window.*/
    fetch(url)
  );

  if (response.ok) {
    return await response.json();
  }

  return new Promise((resolve, reject) => {
    reject("-");
  });
}

let showErr = err => {
  document.getElementById(DESCRIPTION_P_ID).innerText = WEATHER_FETCH_ERR;
  document.getElementById(TEMP_P_ID).innerText = `Температура: ${err}`;
  document.getElementById(HUMIDITY_P_ID).innerText = `Влажность: ${err}`;
  document.getElementById(WIND_P_ID).innerText = `Скорость ветра: ${err}`;
};

let showWeather = weather => {
  let wList = weather.list;
  document.getElementById(TEMP_P_ID).innerText = `Температура: ${wList[0].main.temp} \u2103`;
  document.getElementById(DESCRIPTION_P_ID).innerText = wList[0].weather[0].description;
  document.getElementById(HUMIDITY_P_ID).innerText = `Влажность: ${wList[0].main.humidity}%`;
  document.getElementById(WIND_P_ID).innerText = `Скорость ветра: ${wList[0].wind.speed} м/с`;
  document.getElementById(IMG_ID).src = `http://openweathermap.org/img/wn/${wList[0].weather[0].icon}@2x.png`;
  let nowDiv = document.getElementById(NOW_DIV_ID);
  let divFlex = document.getElementById(FORECAST_ID);
  divFlex.innerHTML = "";
  divFlex.appendChild(nowDiv);
  divFlex.appendChild(createStyledElement("div", "big-border-div", null));

  for (let i = 1; i < weather.cnt; i++) {
    if (wList[i].dt_txt.indexOf("00:00:00") > -1 && i !== 1) {
      divFlex.appendChild(createStyledElement("div", "small-border-div", null));
    }

    let div = createStyledElement("div", "forecast-el", null);
    let p = document.createElement("p");
    p.innerText = wList[i].dt_txt;
    div.appendChild(p);
    let img = document.createElement("img");
    img.src = `http://openweathermap.org/img/wn/${wList[i].weather[0].icon}@2x.png`;
    div.appendChild(img);
    p = document.createElement("p");
    p.innerText = `${wList[i].main.temp} \u2103`;
    div.appendChild(p);
    divFlex.appendChild(div);
  }
};

let showLocationInFrame = async (iframe, lat, lon) => {
  lat = Number(lat);
  lon = Number(lon);
  iframe.src = `${MAP_URL_START}${lon - 0.05}%2C${lat - 0.05}%2C${lon + 0.05}%2C${lat + 0.05}${MAP_URL_END}`;

  try {
    showWeather(await getWeather(lat, lon));
  } catch (e) {
    showErr(e);
  }
};
;// CONCATENATED MODULE: ./src/script/bundle.js
__webpack_require__.e(/* import() */ 74).then(__webpack_require__.bind(__webpack_require__, 74));


let mainDiv = document.createElement("div");
document.body.appendChild(mainDiv);
document.body.onload = createUI(mainDiv, showLocationInFrame);
/******/ })()
;
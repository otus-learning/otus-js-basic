import * as prjConst from "./prjConst.js";
import { getLocation } from "./fetches.js";
import { aClick, btnClick, edtKeypress } from "./events.js";

export let addHistoryLink = (container, city) => {
  let a = document.createElement("a");
  a.innerText = city;
  a.href = "#";
  a.addEventListener("click", aClick);
  container.appendChild(a);
};

export let createStyledElement = (tag, style, id) => {
  let el = document.createElement(tag);
  style && (el.className = style);
  id && (el.id = id);
  return el;
};

export let createUI = (container, showFunc) => {
  container.className = "main-container";
  container.id = prjConst.MAIN_CONTAINER_ID;
  //save show function for using in the events
  container.showFunc = showFunc;

  let lbl = document.createElement("label");
  lbl.innerText = "Мой город";

  let cbx = createStyledElement("input", "cbx", prjConst.CBX_ID);
  cbx.type = "checkbox";

  let btn = createStyledElement("input", "btn", prjConst.BTN_ID);
  btn.type = "button";
  btn.value = "Поиск";
  btn.addEventListener("click", btnClick);

  let edit = createStyledElement("input", null, prjConst.EDIT_ID);
  edit.type = "text";
  edit.addEventListener("keypress", edtKeypress);

  let iframe = createStyledElement("iframe", null, prjConst.IFRAME_ID);

  let nowDiv = createStyledElement("div", "now-div", prjConst.NOW_DIV_ID);

  let txtDiv = createStyledElement("div", "txt-div", null);
  let imgDiv = createStyledElement("div", "inline-img", null);

  let p = createStyledElement("p", "bold-p", null);
  p.innerText = "Сейчас:";
  nowDiv.appendChild(p);

  nowDiv.appendChild(createStyledElement("p", null, prjConst.DESCRIPTION_P_ID));

  txtDiv.appendChild(createStyledElement("p", null, prjConst.TEMP_P_ID));
  txtDiv.appendChild(createStyledElement("p", null, prjConst.HUMIDITY_P_ID));
  txtDiv.appendChild(createStyledElement("p", null, prjConst.WIND_P_ID));

  imgDiv.appendChild(createStyledElement("img", null, prjConst.IMG_ID));

  nowDiv.appendChild(txtDiv);
  nowDiv.appendChild(imgDiv);

  let forecast = createStyledElement("div", "flex-div", prjConst.FORECAST_ID);
  forecast.appendChild(nowDiv);

  let searchDiv = createStyledElement("div", "search-div", null);
  searchDiv.appendChild(lbl);
  searchDiv.appendChild(cbx);
  searchDiv.appendChild(edit);
  searchDiv.appendChild(btn);

  let historyDiv = createStyledElement(
    "div",
    "hist-div",
    prjConst.HISTORY_DIV_ID
  );

  p = document.createElement("p");
  p.innerText = "История:";
  historyDiv.appendChild(p);

  container.appendChild(searchDiv);
  container.appendChild(forecast);
  container.appendChild(iframe);
  container.appendChild(historyDiv);

  let storage = /*window.*/ localStorage;

  let cityStorageJSON = storage.getItem(prjConst.CITY_LIST);
  if (cityStorageJSON) {
    let cityList = JSON.parse(cityStorageJSON);
    cityList.forEach((el) => {
      addHistoryLink(document.getElementById(prjConst.HISTORY_DIV_ID), el);
    });
  }

  if (storage.getItem(prjConst.MY_LOCATION_LON)) {
    let lon = storage.getItem(prjConst.MY_LOCATION_LON);
    let lat = storage.getItem(prjConst.MY_LOCATION_LAT);
    showFunc(document.getElementById(prjConst.IFRAME_ID), lat, lon);
  } else {
    /*window.*/ navigator.geolocation.getCurrentPosition(
      (geolocation) => {
        let lat = geolocation.coords.latitude;
        let lon = geolocation.coords.longitude;
        storage.setItem(prjConst.MY_LOCATION_LON, lon);
        storage.setItem(prjConst.MY_LOCATION_LAT, lat);
        showFunc(document.getElementById(prjConst.IFRAME_ID), lat, lon);
      },
      (/*error*/) => {
        getLocation().then((data) => {
          let lat = data.latitude;
          let lon = data.longitude;
          storage.setItem(prjConst.MY_LOCATION_LON, lon);
          storage.setItem(prjConst.MY_LOCATION_LAT, lat);
          showFunc(document.getElementById(prjConst.IFRAME_ID), lat, lon);
        });
      }
    );
  }
};

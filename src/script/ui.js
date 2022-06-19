import * as prjConst from "./prjConst.js";

//request to geocoder
export async function getCoordinates(city) {
  let response = await window.fetch(
    prjConst.GEOCODER_URL_START + city + prjConst.GEOCODER_URL_END
  );
  return await response.json();
}

//request to weather provider
async function getWeather(lat, lon) {
  let url =
    prjConst.WEATHER_URL_START +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    prjConst.WEATHER_URL_END;
  let response = await window.fetch(url);
  return await response.json();
}

let showWeather = (weather) => {
  let main = weather.list[0].main;
  let temp = main.temp;
  if (isNaN(temp)) {
    document.getElementById(prjConst.DESCRIPTION_P_ID).innerText = "ОШИБКА!";
    document.getElementById(prjConst.TEMP_P_ID).innerText =
      "Температура: ОШИБКА!";
    document.getElementById(prjConst.HUMIDITY_P_ID).innerText =
      "Влажность: ОШИБКА!";
    document.getElementById(prjConst.WIND_P_ID).innerText =
      "Скорость ветра: ОШИБКА!";
    return;
  }
  document.getElementById(prjConst.TEMP_P_ID).innerText =
    "Температура: " + Number(temp).toFixed(1) + " \u2103";
  document.getElementById(prjConst.DESCRIPTION_P_ID).innerText =
    /*"За окном: " +*/ weather.list[0].weather[0].description;
  document.getElementById(prjConst.HUMIDITY_P_ID).innerText =
    "Влажность: " + main.humidity + "%";
  document.getElementById(prjConst.WIND_P_ID).innerText =
    "Скорость ветра: " + weather.list[0].wind.speed + "м/с";
  document.getElementById(prjConst.IMG_ID).src =
    "http://openweathermap.org/img/wn/" +
    weather.list[0].weather[0].icon +
    "@2x.png";

  let nowDiv = document.getElementById(prjConst.NOW_DIV_ID);

  let divFlex = document.getElementById(prjConst.FORECAST_ID);
  divFlex.innerHTML = "";

  divFlex.appendChild(nowDiv);
  divFlex.appendChild(createStyledElement("div", "bigBorderDiv", null));

  for (let i = 1; i < weather.cnt; i++) {
    if (weather.list[i].dt_txt.indexOf("00:00:00") > -1 && i !== 1) {
      divFlex.appendChild(createStyledElement("div", "smallBorderDiv", null));
    }

    let div = createStyledElement("div", "forecastEl", null);

    let p = document.createElement("p");
    p.innerText = weather.list[i].dt_txt;
    div.appendChild(p);

    let img = document.createElement("img");
    img.src =
      "http://openweathermap.org/img/wn/" +
      weather.list[i].weather[0].icon +
      "@2x.png";
    div.appendChild(img);

    p = document.createElement("p");
    p.innerText = weather.list[i].main.temp.toFixed(1) + " \u2103";
    div.appendChild(p);

    divFlex.appendChild(div);
  }
};

export let addHistoryLink = (container, city) => {
  let a = document.createElement("a");
  a.innerText = city;
  a.href = "#";
  a.addEventListener("click", (e) => {
    document.getElementById(prjConst.EDIT_ID).value = e.target.innerText;
    document.getElementById(prjConst.BTN_ID).click();
  });
  container.appendChild(a);
};

export let createStyledElement = (tag, style, id) => {
  let el = document.createElement(tag);
  style !== null && (el.className = style);
  id !== null && (el.id = id);
  return el;
};

export let showLocationInFrame = async (iframe, lat, lon) => {
  iframe.src = prjConst.MAP_URL_START;
  iframe.src +=
    Number(lon) -
    0.05 +
    "%2C" +
    (Number(lat) - 0.05) +
    "%2C" +
    (Number(lon) + 0.05) +
    "%2C" +
    (Number(lat) + 0.05);
  iframe.src += prjConst.MAP_URL_END;
  showWeather(await getWeather(lat, lon));
};

export let createUI = (container, showFunc) => {
  container.className = "mainContainer";

  let lbl = document.createElement("label");
  lbl.innerText = "Мой город";

  let cbx = createStyledElement("input", "cbx", prjConst.CBX_ID);
  cbx.type = "checkbox";

  let btn = createStyledElement("input", "btn", prjConst.BTN_ID);
  btn.type = "button";
  btn.value = "Поиск";
  btn.addEventListener("click", (/*e*/) => {
    let city = document.getElementById(prjConst.EDIT_ID).value;
    document.getElementById(prjConst.EDIT_ID).value = "";
    getCoordinates(city).then((cityInfo) => {
      let lat = cityInfo[0].lat;
      let lon = cityInfo[0].lon;

      let storage = window.localStorage;
      if (document.getElementById(prjConst.CBX_ID).checked) {
        storage.setItem(prjConst.MY_LOCATION_LON, lon);
        storage.setItem(prjConst.MY_LOCATION_LAT, lat);
        document.getElementById(prjConst.CBX_ID).checked = false;
      }

      let cityStorageJSON = storage.getItem(prjConst.CITY_LIST);
      let cityList = cityStorageJSON ? JSON.parse(cityStorageJSON) : [];
      let isNeedAddToHistory = true;
      for (let i = 0; i < cityList.length; i++) {
        if (cityList[i].toLowerCase() === city.toLowerCase()) {
          isNeedAddToHistory = false;
          break;
        }
      }

      if (isNeedAddToHistory) {
        if (cityList.length === prjConst.LS_CAPACITY) {
          cityList.shift();
          let aList = document.querySelectorAll("a");
          aList[0].parentNode.removeChild(aList[0]);
        }
        cityList.push(city);
        storage.setItem(prjConst.CITY_LIST, JSON.stringify(cityList));

        addHistoryLink(document.getElementById(prjConst.HISTORY_DIV_ID), city);
      }

      showFunc(document.getElementById(prjConst.IFRAME_ID), lat, lon);
    });
  });

  let edit = createStyledElement("input", null, prjConst.EDIT_ID);
  edit.type = "text";
  edit.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      document.getElementById(prjConst.BTN_ID).click();
    }
  });

  let iframe = createStyledElement("iframe", null, prjConst.IFRAME_ID);

  let nowDiv = createStyledElement("div", "nowDiv", prjConst.NOW_DIV_ID);

  let txtDiv = createStyledElement("div", "txtDiv", null);
  let imgDiv = createStyledElement("div", "inlineImg", null);

  let p = createStyledElement("p", "boldP", null);
  p.innerText = "Сейчас:";
  nowDiv.appendChild(p);

  nowDiv.appendChild(createStyledElement("p", null, prjConst.DESCRIPTION_P_ID));

  txtDiv.appendChild(createStyledElement("p", null, prjConst.TEMP_P_ID));
  txtDiv.appendChild(createStyledElement("p", null, prjConst.HUMIDITY_P_ID));
  txtDiv.appendChild(createStyledElement("p", null, prjConst.WIND_P_ID));

  imgDiv.appendChild(createStyledElement("img", null, prjConst.IMG_ID));

  nowDiv.appendChild(txtDiv);
  nowDiv.appendChild(imgDiv);

  let forecast = createStyledElement("div", "flexDiv", prjConst.FORECAST_ID);
  forecast.appendChild(nowDiv);

  let searchDiv = createStyledElement("div", "searchDiv", null);
  searchDiv.appendChild(lbl);
  searchDiv.appendChild(cbx);
  searchDiv.appendChild(edit);
  searchDiv.appendChild(btn);

  let historyDiv = createStyledElement(
    "div",
    "histDiv",
    prjConst.HISTORY_DIV_ID
  );

  p = document.createElement("p");
  p.innerText = "История:";
  historyDiv.appendChild(p);

  container.appendChild(searchDiv);
  container.appendChild(forecast);
  container.appendChild(iframe);
  container.appendChild(historyDiv);

  let storage = window.localStorage;
  if (storage.getItem(prjConst.MY_LOCATION_LON)) {
    let lon = storage.getItem(prjConst.MY_LOCATION_LON);
    let lat = storage.getItem(prjConst.MY_LOCATION_LAT);
    showFunc(document.getElementById(prjConst.IFRAME_ID), lat, lon);
  } else {
    window.navigator.geolocation.getCurrentPosition((geolocation) => {
      let lat = geolocation.coords.latitude;
      let lon = geolocation.coords.longitude;
      showFunc(document.getElementById(prjConst.IFRAME_ID), lat, lon);
      storage.setItem(prjConst.MY_LOCATION_LON, lon);
      storage.setItem(prjConst.MY_LOCATION_LAT, lat);
    });
  }

  let cityStorageJSON = storage.getItem(prjConst.CITY_LIST);
  if (cityStorageJSON) {
    let cityList = JSON.parse(cityStorageJSON);
    cityList.forEach((el) => {
      addHistoryLink(document.getElementById(prjConst.HISTORY_DIV_ID), el);
    });
  }
};

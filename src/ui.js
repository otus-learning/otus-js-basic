import * as prjConst from "./prjConst.js";
import { getLocation } from "./fetches.js";
import { aClick, btnClick, edtKeypress } from "./events.js";

export let addHistoryLink = (city, historyComponent, history) => {
  history.cities.length === prjConst.LS_CAPACITY && history.cities.shift();
  history.cities.push(city);
  historyComponent.setState(history);
};

export let createUI = (
  container,
  showFunc,
  searchComponent,
  forecastComponent,
  mapComponent,
  historyComponent
) => {
  let history = { cities: [] };

  searchComponent.subscribeToEvents("click@button.btn", btnClick);
  searchComponent.subscribeToEvents("keypress@text.edt", edtKeypress);
  historyComponent.subscribeToEvents("click@a.aClass", aClick);

  container.className = "main-container";
  container.id = prjConst.MAIN_CONTAINER_ID;

  //save show function for using in the events
  container.showFunc = showFunc;
  container.mapComponent = mapComponent;
  container.forecastComponent = forecastComponent;
  container.historyComponent = historyComponent;
  container.history = history;

  let storage = /*window.*/ localStorage;

  let cityStorageJSON = storage.getItem(prjConst.CITY_LIST);
  if (cityStorageJSON) {
    let cityList = JSON.parse(cityStorageJSON);
    cityList.forEach((el) => {
      addHistoryLink(el, historyComponent, history);
    });
  }

  if (storage.getItem(prjConst.MY_LOCATION_LON)) {
    let lon = storage.getItem(prjConst.MY_LOCATION_LON);
    let lat = storage.getItem(prjConst.MY_LOCATION_LAT);
    showFunc(lat, lon, mapComponent, forecastComponent);
  } else {
    /*window.*/ navigator.geolocation.getCurrentPosition(
      (geolocation) => {
        let lat = geolocation.coords.latitude;
        let lon = geolocation.coords.longitude;
        storage.setItem(prjConst.MY_LOCATION_LON, lon);
        storage.setItem(prjConst.MY_LOCATION_LAT, lat);
        showFunc(lat, lon, mapComponent, forecastComponent);
      },
      (/*error*/) => {
        getLocation().then((data) => {
          let lat = data.latitude;
          let lon = data.longitude;
          storage.setItem(prjConst.MY_LOCATION_LON, lon);
          storage.setItem(prjConst.MY_LOCATION_LAT, lat);
          showFunc(lat, lon, mapComponent, forecastComponent);
        });
      }
    );
  }
};

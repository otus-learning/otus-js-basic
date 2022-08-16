import * as ui from "./ui.js";
import * as prjConst from "./prjConst.js";
import { Component } from "./Component";

let lsItems = {};
lsItems.cityList = JSON.stringify(["test1", "test2"]);

let localStorage = {
  setItem: (item, val) => {
    lsItems[item] = val;
  },
  getItem: (item) => {
    return lsItems[item];
  },
};

Object.defineProperty(window, "localStorage", { value: localStorage });

//navigator pass coordinates to program
let navPassExecute = 1;

let navigator = {
  geolocation: {
    getCurrentPosition: (funcPass, funcErr) => {
      if (navPassExecute) {
        funcPass({ coords: { latitude: 1, longitude: 2 } });
      } else {
        funcErr();
      }
    },
  },
};

Object.defineProperty(window, "navigator", { value: navigator });

describe("test that events of all elements are doing correct things", () => {
  //fake response object
  let response = {
    0: {
      lat: 7,
      lon: 8,
    },
    json: () => {
      return new Promise((resolve) => {
        return resolve(response);
      });
    },
  };

  let geocodeUrl;

  let searchComponent;
  let mapComponent;
  let forecastComponent;
  let historyComponent;

  beforeAll(() => {
    //fake fetch function
    window.fetch = (url) => {
      geocodeUrl = url;
      return new Promise((resolve) => {
        process.nextTick(() => {
          resolve(response);
        });
      });
    };
  });

  beforeEach(() => {
    document.body.innerHTML =
      "<div id='#app'><div id='#search-div' class='search-div'>\
			<label>Мой город</label>\
			<input type='checkbox' id='#cbxId' class='cbx'>\
			<input type='text' id='#edtId' class='edt'>\
			<input type='button' value='Поиск' id='#btnId' class='btn'>\
		</div>\
		  <div id='#world-map' class='map-div'>\
			<iframe src='https://www.openstreetmap.org/export/embed.html?bbox={{lonS}}%2C{{latS}}%2C{{lonE}}%2C{{latE}}&amp;layer=mapnik'></iframe>\
		</div>\
		<div id='#forecast-div-id' class='flex-div'>\
			{{for list as listItem}}\
				{{if index == First}}\
					<div class='now-div'>\
						<p class='bold-p'>Сейчас:</p>\
						<p>{{listItem.weather.0.description}}</p>\
						<div class='txt-div'>\
							<p>Температура: {{listItem.main.temp}} &#8451</p>\
							<p>Влажность: {{listItem.main.humidity}} %</p>\
							<p>Скорость ветра: {{listItem.wind.speed}} м/с</p>\
						</div>{{and listItem.weather.0.icon}}<div class='inline-img'>\
							<img src='http://openweathermap.org/img/wn/{{listItem.weather.0.icon}}@2x.png'>\
						</div>\
					</div>\
					<div class='big-border-div'></div>\
				{{endif}}\
			{{endfor}}\
		</div>\
		<div id='#history-div' class='hist-div'>\
			<p>История</p>\
			{{for cities as city}}\
			<a href='#' class='aClass'>{{city}}</a>\
			{{endfor}}\
		</div></div>";

    mapComponent = new Component(document.getElementById("#world-map"));
    forecastComponent = new Component(
      document.getElementById("#forecast-div-id")
    );
    searchComponent = new Component(document.getElementById("#search-div"));
    historyComponent = new Component(document.getElementById("#history-div"));
  });

  it("test that button onClick do something right", (done) => {
    //reorder fakeShowFunc that wait for all functions are finished
    let fakeShowFunc = (lat) => {
      if (lat === 6) {
        expect(document.getElementById(prjConst.EDIT_ID).value).toEqual("");
        expect(JSON.parse(lsItems[prjConst.CITY_LIST]).length).toEqual(3);
        expect(JSON.parse(lsItems[prjConst.CITY_LIST])[2]).toEqual("test");
        done();
      }
    };

    ui.createUI(
      document.getElementById("#app"),
      fakeShowFunc,
      searchComponent,
      forecastComponent,
      mapComponent,
      historyComponent
    );

    response[0].lat = 6;
    response[0].lon = 5;

    let inputs = document.querySelectorAll("input");
    inputs[1].value = "test";
    inputs[2].click();
  });

  it("test that ENTER which pressed on edit do something right", (done) => {
    //reorder fakeShowFunc that wait for all functions are finished
    let fakeShowFunc = (lat, lon) => {
      if (lat === 6) {
        expect(JSON.parse(lsItems[prjConst.CITY_LIST]).length).toEqual(3);
        expect(lat).toEqual(response[0].lat);
        expect(lon).toEqual(response[0].lon);
        done();
      }
    };

    response[0].lat = 6;
    response[0].lon = 5;

    ui.createUI(
      document.getElementById("#app"),
      fakeShowFunc,
      searchComponent,
      forecastComponent,
      mapComponent,
      historyComponent
    );

    let inputs = document.querySelectorAll("input");
    inputs[1].value = "test";
    inputs[1].dispatchEvent(new KeyboardEvent("keypress", { keyCode: 13 }));
  });

  it("test that ordinary editing do something right", () => {
    let count = 0;
    //reorder fakeShowFunc that wait for all functions are finished
    let fakeShowFunc = () => {
      count++;
    };

    response[0].lat = 6;
    response[0].lon = 5;

    ui.createUI(
      document.getElementById("#app"),
      fakeShowFunc,
      searchComponent,
      forecastComponent,
      mapComponent,
      historyComponent
    );

    document
      .getElementById(prjConst.EDIT_ID)
      .dispatchEvent(new KeyboardEvent("keypress", { keyCode: 49 }));
    document
      .getElementById(prjConst.EDIT_ID)
      .dispatchEvent(new KeyboardEvent("keypress", { keyCode: 50 }));
    document
      .getElementById(prjConst.EDIT_ID)
      .dispatchEvent(new KeyboardEvent("keypress", { keyCode: 51 }));
    expect(count).toEqual(1);
  });

  it("test that link clicking do something right", (done) => {
    let fakeShowFunc = (lat) => {
      if (lat === 8) {
        let url = geocodeUrl.replace(prjConst.GEOCODER_URL_START, "");
        url = url.replace(prjConst.GEOCODER_URL_END, "");
        expect(url).toEqual(JSON.parse(lsItems[prjConst.CITY_LIST])[0]);
        done();
      }
    };

    ui.createUI(
      document.getElementById("#app"),
      fakeShowFunc,
      searchComponent,
      forecastComponent,
      mapComponent,
      historyComponent
    );

    response[0].lat = 8;

    document.querySelectorAll("a")[0].click();
  });

  it("test that checkbox clicking is changing home location", (done) => {
    let fakeShowFunc = (lat, lon) => {
      if (lat === 66) {
        expect(lsItems[prjConst.MY_LOCATION_LON]).toEqual(lon);
        expect(lsItems[prjConst.MY_LOCATION_LAT]).toEqual(lat);
        done();
      }
    };

    response[0].lat = 66;
    response[0].lon = 55;

    ui.createUI(
      document.getElementById("#app"),
      fakeShowFunc,
      searchComponent,
      forecastComponent,
      mapComponent,
      historyComponent
    );

    document.getElementById(prjConst.CBX_ID).checked = true;
    document.querySelectorAll("a")[0].click();
  });
});

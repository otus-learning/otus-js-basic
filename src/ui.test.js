import * as ui from "./ui.js";
import * as prjConst from "./prjConst.js";
import { Component } from "./Component";

//initial state of fake localstorage
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

let searchComponent;
let mapComponent;
let forecastComponent;
let historyComponent;

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

beforeAll(() => {
  //fake fetch function
  window.fetch = () => {
    return new Promise((resolve) => {
      process.nextTick(() => {
        resolve(response);
      });
    });
  };
});

describe("test that history links are created right", () => {
  let history = { cities: [] };

  it("test that function exists", () => {
    expect(ui.addHistoryLink).toBeDefined();
  });

  it("test that function adding links", () => {
    ui.addHistoryLink("test", historyComponent, history);
    ui.addHistoryLink("test1", historyComponent, history);

    let links = document.querySelectorAll("a");
    expect(links[0].innerHTML).toEqual("test");
    expect(links[1].innerHTML).toEqual("test1");
    expect(links[0].onclick).toBeDefined();
    expect(links[1].onclick).toBeDefined();
  });
});

describe("Test that user interface draw correctly", () => {
  //fakeShowFunc params
  let fakeLat;
  let fakeLon;

  //fake func that mocks ui.showLocationInFrame function
  //create fake function that shows forecast in iFrame
  let fakeShowFunc = (lat, lon) => {
    fakeLat = lat;
    fakeLon = lon;
  };

  it("test that function exists", () => {
    expect(ui.createUI).toBeDefined();
  });

  it("test that all of need UI elements are created", () => {
    let container = document.getElementById("#app");
    ui.createUI(
      container,
      fakeShowFunc,
      searchComponent,
      forecastComponent,
      mapComponent,
      historyComponent
    );
    expect(container.className).toEqual("main-container");
    expect(container.id).toEqual(prjConst.MAIN_CONTAINER_ID);
    expect(container.mapComponent).toEqual(mapComponent);
    expect(container.forecastComponent).toEqual(forecastComponent);
    expect(container.history).toBeDefined();
    expect(fakeLat).toEqual(1);
    expect(fakeLon).toEqual(2);
  });

  it("test that users location coordinates are getting from local storage", () => {
    lsItems[prjConst.MY_LOCATION_LON] = 4;
    lsItems[prjConst.MY_LOCATION_LAT] = 3;

    let container = document.getElementById("#app");
    ui.createUI(
      container,
      fakeShowFunc,
      searchComponent,
      forecastComponent,
      mapComponent,
      historyComponent
    );

    expect(fakeLat).toEqual(3);
    expect(fakeLon).toEqual(4);
  });
});

describe("test that logic are right", () => {
  it("test that links and items on localStorage count are alwais less than 11", (done) => {
    let count = 0;
    let fakeShowFunc = () => {
      if (count === 13) {
        expect(document.querySelectorAll("a").length).toEqual(
          prjConst.LS_CAPACITY
        );
        expect(JSON.parse(lsItems[prjConst.CITY_LIST]).length).toEqual(
          prjConst.LS_CAPACITY
        );
        expect(JSON.parse(lsItems[prjConst.CITY_LIST])[0]).toEqual("test3");
        expect(
          JSON.parse(lsItems[prjConst.CITY_LIST])[prjConst.LS_CAPACITY - 1]
        ).toEqual("test12");
        done();
      }
      count++;
    };

    //clear local storage
    lsItems = {};
    ui.createUI(
      document.getElementById("#app"),
      fakeShowFunc,
      searchComponent,
      forecastComponent,
      mapComponent,
      historyComponent
    );

    for (let i = 0; i < 13; i++) {
      document.getElementById(prjConst.EDIT_ID).value = `test${i}`;
      document
        .getElementById(prjConst.EDIT_ID)
        .dispatchEvent(new KeyboardEvent("keypress", { keyCode: 13 }));
    }
  });

  it("test if navigator blocking it's data then work is not stopped", (done) => {
    let fakeShowFunc = () => {
      expect(lsItems[prjConst.MY_LOCATION_LON]).toEqual(4);
      expect(lsItems[prjConst.MY_LOCATION_LAT]).toEqual(3);
      done();
    };

    window.fetch = () => {
      return new Promise((resolve) => {
        process.nextTick(() => {
          resolve({
            json: () => {
              return { latitude: 3, longitude: 4 };
            },
          });
        });
      });
    };

    //clear local storage
    lsItems = {};

    //blocking navigator's data
    navPassExecute = 0;

    ui.createUI(
      document.getElementById("#app"),
      fakeShowFunc,
      searchComponent,
      forecastComponent,
      mapComponent,
      historyComponent
    );
  });
});

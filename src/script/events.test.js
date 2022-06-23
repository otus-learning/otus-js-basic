import * as ui from "./ui.js";
import * as prjConst from "./prjConst.js";

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
    document.body.innerHTML = "<div></div>";
  });

  it("test that button onClick do something right", (done) => {
    //reorder fakeShowFunc that wait for all functions are finished
    let fakeShowFunc = (el /*, lat, lon*/) => {
      if (!el) {
        expect(document.getElementById(prjConst.EDIT_ID).value).toEqual("");
        expect(JSON.parse(lsItems[prjConst.CITY_LIST]).length).toEqual(3);
        expect(JSON.parse(lsItems[prjConst.CITY_LIST])[2]).toEqual("test");
        done();
      }
    };

    ui.createUI(document.querySelector("div"), fakeShowFunc);

    response[0].lat = 6;
    response[0].lon = 5;

    //now iframe never been finded (need for fakeShowFunc)
    document.getElementById(prjConst.IFRAME_ID).id = "noId";
    document.getElementById(prjConst.EDIT_ID).value = "test";
    document.getElementById(prjConst.BTN_ID).click();
  });

  it("test that ENTER which pressed on edit do something right", (done) => {
    //reorder fakeShowFunc that wait for all functions are finished
    let fakeShowFunc = (el, lat, lon) => {
      if (!el) {
        expect(JSON.parse(lsItems[prjConst.CITY_LIST]).length).toEqual(3);
        expect(lat).toEqual(response[0].lat);
        expect(lon).toEqual(response[0].lon);
        done();
      }
    };

    response[0].lat = 6;
    response[0].lon = 5;

    ui.createUI(document.querySelector("div"), fakeShowFunc);

    document.getElementById(prjConst.EDIT_ID).value = "test";
    document.getElementById(prjConst.IFRAME_ID).id = "noId";
    document
      .getElementById(prjConst.EDIT_ID)
      .dispatchEvent(new KeyboardEvent("keypress", { keyCode: 13 }));
  });

  it("test that ordinary editing do something right", () => {
    let count = 0;
    //reorder fakeShowFunc that wait for all functions are finished
    let fakeShowFunc = (/*el, lat, lon*/) => {
      count++;
    };

    response[0].lat = 6;
    response[0].lon = 5;

    ui.createUI(document.querySelector("div"), fakeShowFunc);

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
    let fakeShowFunc = (el /*, lat, lon*/) => {
      if (!el) {
        let url = geocodeUrl.replace(prjConst.GEOCODER_URL_START, "");
        url = url.replace(prjConst.GEOCODER_URL_END, "");
        expect(url).toEqual(JSON.parse(lsItems[prjConst.CITY_LIST])[0]);
        done();
      }
    };

    ui.createUI(document.querySelector("div"), fakeShowFunc);

    document.getElementById(prjConst.IFRAME_ID).id = "noId";
    document.querySelectorAll("a")[0].click();
  });

  it("test that checkbox clicking is changing home location", (done) => {
    let fakeShowFunc = (el, lat, lon) => {
      if (!el) {
        expect(lsItems[prjConst.MY_LOCATION_LON]).toEqual(lon);
        expect(lsItems[prjConst.MY_LOCATION_LAT]).toEqual(lat);
        done();
      }
    };

    response[0].lat = 66;
    response[0].lon = 55;

    ui.createUI(document.querySelector("div"), fakeShowFunc);

    document.getElementById(prjConst.CBX_ID).checked = true;
    document.getElementById(prjConst.IFRAME_ID).id = "noId";
    document.querySelectorAll("a")[0].click();
  });
});

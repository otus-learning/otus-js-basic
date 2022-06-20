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

describe("test styled DOM element creation", () => {
  it("test that function exists", () => {
    expect(ui.createStyledElement).toBeDefined();
  });

  it("test that function adding styles and ID's", () => {
    document.body.innerHTML = "";
    document.body.appendChild(
      ui.createStyledElement("div", "testClass", "testID")
    );

    let container = document.querySelector("div");
    expect(container.className).toEqual("testClass");
    expect(container.id).toEqual("testID");
  });
});

describe("test that history links are created right", () => {
  it("test that function exists", () => {
    expect(ui.addHistoryLink).toBeDefined();
  });

  it("test that function adding links", () => {
    document.body.innerHTML = "";
    ui.addHistoryLink(document.body, "test");
    ui.addHistoryLink(document.body, "test1");

    let links = document.querySelectorAll("a");
    expect(links[0].innerText).toEqual("test");
    expect(links[1].innerText).toEqual("test1");
    expect(links[0].onclick).toBeDefined();
    expect(links[1].onclick).toBeDefined();
  });
});

describe("test that geocoder response decoded right", () => {
  it("test that function exists", () => {
    expect(ui.getCoordinates).toBeDefined();
  });

  it("test that function forming right url", async () => {
    let city = "test";

    window.fetch = (url) => {
      url = url.replace(prjConst.GEOCODER_URL_START, "");
      url = url.replace(prjConst.GEOCODER_URL_END, "");

      return new Promise((resolve) => {
        process.nextTick(() => {
          resolve({
            json: () => {
              return url;
            },
          });
        });
      });
    };

    expect(await ui.getCoordinates(city)).toEqual(city);
  });
});

describe("test that some function fetching from ip whois", () => {
  it("test that function exists", () => {
    expect(ui.getLocation).toBeDefined();
  });

  it("test that function getting right url", async () => {
    window.fetch = (url) => {
      return new Promise((resolve) => {
        process.nextTick(() => {
          resolve({
            json: () => {
              return url;
            },
          });
        });
      });
    };

    expect(await ui.getLocation()).toEqual(prjConst.IP_WHOIS_URL);
  });
});

describe("test all server requests and it's results to be shown", () => {
  let rIdx = 0;
  let responses = [
    //right result from server (Response object)
    {
      list: [
        {
          main: {
            temp: 31,
            humidity: 32,
          },
          dt_txt: "18:00:00",
          wind: { speed: 33 },
          weather: [{ description: "test1", icon: "img2" }],
        },
        {
          main: {
            temp: 41,
            humidity: 42,
          },
          dt_txt: "21:00:00",
          wind: { speed: 43 },
          weather: [{ description: "test2", icon: "img2" }],
        },
        {
          main: {
            temp: 51,
            humidity: 52,
          },
          dt_txt: "00:00:00",
          wind: { speed: 53 },
          weather: [{ description: "test2", icon: "img2" }],
        },
      ],
      cnt: 3,
      json: () => {
        return new Promise((resolve) => {
          return resolve(responses[rIdx++]);
        });
      },
    },
    //bad result from server (Response object)
    {
      list: [
        {
          main: {
            temp: NaN,
            humidity: 32,
          },
          dt_txt: "00:00:00",
          wind: { speed: 33 },
          weather: [{ description: "test1", icon: "img2" }],
        },
        {
          main: {
            temp: NaN,
            humidity: 42,
          },
          dt_txt: "12:00:00",
          wind: { speed: 43 },
          weather: [{ description: "test2", icon: "img2" }],
        },
      ],
      cnt: 2,
      json: () => {
        return new Promise((resolve) => {
          resolve(responses[rIdx++]);
        });
      },
    },
  ];

  //create simple UI
  beforeEach(() => {
    document.body.innerHTML = "<iframe></iframe>";
    let pId = [
      prjConst.TEMP_P_ID,
      prjConst.DESCRIPTION_P_ID,
      prjConst.HUMIDITY_P_ID,
      prjConst.WIND_P_ID,
    ];
    for (let i = 0; i < pId.length; i++) {
      let p = document.createElement("p");
      p.id = pId[i];
      document.body.appendChild(p);
    }

    let img = document.createElement("img");
    img.id = prjConst.IMG_ID;
    document.body.appendChild(img);

    let div = document.createElement("div");
    div.id = prjConst.FORECAST_ID;
    document.body.appendChild(div);

    div = document.createElement("div");
    div.id = prjConst.NOW_DIV_ID;
    document.body.appendChild(div);

    window.fetch = (/*url*/) => {
      return new Promise((resolve) => {
        process.nextTick(() => {
          resolve(responses[rIdx]);
        });
      });
    };
  });

  it("test that function exists", () => {
    expect(ui.showLocationInFrame).toBeDefined();
  });

  it("test all of described in the case of good response", async () => {
    let link =
      prjConst.MAP_URL_START +
      -0.05 +
      "%2C" +
      -0.05 +
      "%2C" +
      0.05 +
      "%2C" +
      0.05 +
      prjConst.MAP_URL_END;

    await ui.showLocationInFrame(document.querySelector("iframe"), 0, 0);

    expect(document.querySelector("iframe").src).toEqual(link);
    expect(document.getElementById(prjConst.TEMP_P_ID).innerText).toEqual(
      "Температура: " + responses[0].list[0].main.temp.toFixed(1) + " \u2103"
    );
    expect(
      document.getElementById(prjConst.DESCRIPTION_P_ID).innerText
    ).toEqual(responses[0].list[0].weather[0].description);
    expect(document.getElementById(prjConst.HUMIDITY_P_ID).innerText).toEqual(
      "Влажность: " + responses[0].list[0].main.humidity + "%"
    );
    expect(document.getElementById(prjConst.WIND_P_ID).innerText).toEqual(
      "Скорость ветра: " + responses[0].list[0].wind.speed + "м/с"
    );
    expect(document.querySelectorAll("div").length).toEqual(6);
    expect(document.querySelectorAll("img").length).toEqual(3);
  });

  it("test all of described in the case of wrong response", async () => {
    await ui.showLocationInFrame(document.querySelector("iframe"), 0, 0);
    expect(
      document.getElementById(prjConst.DESCRIPTION_P_ID).innerText
    ).toEqual("ОШИБКА!");
  });
});

describe("Test that user interface draw correctly", () => {
  //fakeShowFunc params
  let fakeLat;
  let fakeLon;
  let fakeIFrame;

  //fake func that mocks ui.showLocationInFrame function
  //create fake function that shows forecast in iFrame
  let fakeShowFunc = (el, lat, lon) => {
    fakeIFrame = el;
    fakeLat = lat;
    fakeLon = lon;
  };

  beforeAll(() => {
    document.body.innerHTML = "<div></div>";
  });

  it("test that function exists", () => {
    expect(ui.createUI).toBeDefined();
  });

  it("test that all of need UI elements are created", () => {
    ui.createUI(document.querySelector("div"), fakeShowFunc);

    expect(document.querySelectorAll("iframe").length).toEqual(1);
    expect(fakeIFrame.id).toEqual(prjConst.IFRAME_ID);
    expect(fakeLat).toEqual(1);
    expect(fakeLon).toEqual(2);
    expect(lsItems[prjConst.MY_LOCATION_LON]).toEqual(2);
    expect(lsItems[prjConst.MY_LOCATION_LAT]).toEqual(1);
    expect(document.querySelectorAll("div").length).toEqual(7);
    expect(document.querySelectorAll("p").length).toEqual(6);
    expect(document.querySelectorAll("input").length).toEqual(3);
    expect(document.querySelectorAll("label").length).toEqual(1);
    expect(document.querySelectorAll("a").length).toEqual(2);
    expect(document.querySelectorAll("a")[0].innerText).toEqual("test1");
    expect(document.querySelectorAll("a")[1].innerText).toEqual("test2");
  });

  it("test that users location coordinates are getting from local storage", () => {
    lsItems[prjConst.MY_LOCATION_LON] = 4;
    lsItems[prjConst.MY_LOCATION_LAT] = 3;

    ui.createUI(document.querySelector("div"), fakeShowFunc);

    expect(fakeIFrame.id).toEqual(prjConst.IFRAME_ID);
    expect(fakeLat).toEqual(3);
    expect(fakeLon).toEqual(4);
  });
});

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

  it("test that links and items on localStorage count are alwais less than 11", (done) => {
    let count = 0;
    let fakeShowFunc = (/*el, lat, lon*/) => {
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

    ui.createUI(document.querySelector("div"), fakeShowFunc);

    for (let i = 0; i < 13; i++) {
      document.getElementById(prjConst.EDIT_ID).value = `test${i}`;
      document
        .getElementById(prjConst.EDIT_ID)
        .dispatchEvent(new KeyboardEvent("keypress", { keyCode: 13 }));
    }
  });

  it("test if navigator blocking it's data then work is not stopped", (done) => {
    let fakeShowFunc = (/*el, lat, lon*/) => {
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

    ui.createUI(document.querySelector("div"), fakeShowFunc);
  });
});

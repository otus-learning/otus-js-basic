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

describe("test that logic are right", () => {
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
    window.fetch = (/*url*/) => {
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

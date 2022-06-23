import { responses, rIdx } from "./forecast.test.data.js";
import * as forecast from "./forecast.js";
import * as prjConst from "./prjConst.js";

describe("test all server requests and it's results to be shown", () => {
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
    expect(forecast.showLocationInFrame).toBeDefined();
  });

  it("test all of described in the case of good response", async () => {
    let link = `${prjConst.MAP_URL_START}-0.05%2C-0.05%2C0.05%2C0.05${prjConst.MAP_URL_END}`;

    await forecast.showLocationInFrame(document.querySelector("iframe"), 0, 0);

    expect(document.querySelector("iframe").src).toEqual(link);
    expect(document.getElementById(prjConst.TEMP_P_ID).innerText).toEqual(
      `Температура: ${responses[0].list[0].main.temp} \u2103`
    );
    expect(
      document.getElementById(prjConst.DESCRIPTION_P_ID).innerText
    ).toEqual(responses[0].list[0].weather[0].description);
    expect(document.getElementById(prjConst.HUMIDITY_P_ID).innerText).toEqual(
      `Влажность: ${responses[0].list[0].main.humidity}%`
    );
    expect(document.getElementById(prjConst.WIND_P_ID).innerText).toEqual(
      `Скорость ветра: ${responses[0].list[0].wind.speed} м/с`
    );
    expect(document.querySelectorAll("div").length).toEqual(6);
    expect(document.querySelectorAll("img").length).toEqual(3);
  });

  it("test all of described in the case of wrong response", async () => {
    await forecast.showLocationInFrame(document.querySelector("iframe"), 0, 0);
    expect(
      document.getElementById(prjConst.DESCRIPTION_P_ID).innerText
    ).toEqual(prjConst.WEATHER_FETCH_ERR);
  });
});

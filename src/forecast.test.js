import { responses, rIdx } from "./forecast.test.data.js";
import { Component } from "./Component";
import * as forecast from "./forecast.js";
import * as prjConst from "./prjConst.js";

describe("test all server requests and it's results to be shown", () => {
  let mapComponent;
  let forecastComponent;

  //create simple UI
  beforeEach(() => {
    document.body.innerHTML =
      "<div id='#world-map' class='map-div'>\
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
		</div>";

    mapComponent = new Component(document.getElementById("#world-map"));
    forecastComponent = new Component(
      document.getElementById("#forecast-div-id")
    );

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
    await forecast.showLocationInFrame(0, 0, mapComponent, forecastComponent);

    let p = document.querySelectorAll("p");
    expect(p[0].innerHTML).toEqual("Сейчас:");
    expect(p[1].innerHTML).toEqual("test1");
    expect(p[2].innerHTML).toEqual("Температура: 31 ℃");
    expect(p[3].innerHTML).toEqual("Влажность: 32 %");
    expect(p[4].innerHTML).toEqual("Скорость ветра: 33 м/с");
  });

  it("test all of described in the case of wrong response", async () => {
    await forecast.showLocationInFrame(0, 0, mapComponent, forecastComponent);
    expect(document.querySelectorAll("p")[1].innerHTML).toEqual(
      prjConst.WEATHER_FETCH_ERR
    );
  });
});

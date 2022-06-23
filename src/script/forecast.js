import { createStyledElement } from "./ui.js";
import * as prjConst from "./prjConst.js";

//request to weather provider
async function getWeather(lat, lon) {
  let url = `${prjConst.WEATHER_URL_START}lat=${lat}&lon=${lon}${prjConst.WEATHER_URL_END}`;
  let response = await /*window.*/ fetch(url);
  if (response.ok) {
    return await response.json();
  }
  return new Promise((resolve, reject) => {
    reject("-");
  });
}

let showErr = (err) => {
  document.getElementById(prjConst.DESCRIPTION_P_ID).innerText =
    prjConst.WEATHER_FETCH_ERR;
  document.getElementById(prjConst.TEMP_P_ID).innerText = `Температура: ${err}`;
  document.getElementById(
    prjConst.HUMIDITY_P_ID
  ).innerText = `Влажность: ${err}`;
  document.getElementById(
    prjConst.WIND_P_ID
  ).innerText = `Скорость ветра: ${err}`;
};

let showWeather = (weather) => {
  let wList = weather.list;
  document.getElementById(
    prjConst.TEMP_P_ID
  ).innerText = `Температура: ${wList[0].main.temp} \u2103`;
  document.getElementById(prjConst.DESCRIPTION_P_ID).innerText =
    wList[0].weather[0].description;
  document.getElementById(
    prjConst.HUMIDITY_P_ID
  ).innerText = `Влажность: ${wList[0].main.humidity}%`;
  document.getElementById(
    prjConst.WIND_P_ID
  ).innerText = `Скорость ветра: ${wList[0].wind.speed} м/с`;
  document.getElementById(
    prjConst.IMG_ID
  ).src = `http://openweathermap.org/img/wn/${wList[0].weather[0].icon}@2x.png`;

  let nowDiv = document.getElementById(prjConst.NOW_DIV_ID);

  let divFlex = document.getElementById(prjConst.FORECAST_ID);
  divFlex.innerHTML = "";

  divFlex.appendChild(nowDiv);
  divFlex.appendChild(createStyledElement("div", "big-border-div", null));

  for (let i = 1; i < weather.cnt; i++) {
    if (wList[i].dt_txt.indexOf("00:00:00") > -1 && i !== 1) {
      divFlex.appendChild(createStyledElement("div", "small-border-div", null));
    }

    let div = createStyledElement("div", "forecast-el", null);

    let p = document.createElement("p");
    p.innerText = wList[i].dt_txt;
    div.appendChild(p);

    let img = document.createElement("img");
    img.src = `http://openweathermap.org/img/wn/${wList[i].weather[0].icon}@2x.png`;
    div.appendChild(img);

    p = document.createElement("p");
    p.innerText = `${wList[i].main.temp} \u2103`;
    div.appendChild(p);

    divFlex.appendChild(div);
  }
};

export let showLocationInFrame = async (iframe, lat, lon) => {
  lat = Number(lat);
  lon = Number(lon);
  iframe.src = `${prjConst.MAP_URL_START}${lon - 0.05}%2C${lat - 0.05}%2C${
    lon + 0.05
  }%2C${lat + 0.05}${prjConst.MAP_URL_END}`;
  try {
    showWeather(await getWeather(lat, lon));
  } catch (e) {
    showErr(e);
  }
};

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

export let showLocationInFrame = async (
  lat,
  lon,
  mapComponent,
  forecastComponent
) => {
  mapComponent.setState({
    lonS: `${Number(lon) - 0.05}`,
    latS: `${Number(lat) - 0.05}`,
    lonE: `${Number(lon) + 0.05}`,
    latE: `${Number(lat) + 0.05}`,
  });
  try {
    forecastComponent.setState(await getWeather(lat, lon));
  } catch (e) {
    forecastComponent.setState({
      list: [
        {
          weather: [{ description: `${prjConst.WEATHER_FETCH_ERR}` }],
          main: { temp: "-", humidity: "-" },
          wind: { speed: "-" },
        },
      ],
    });
  }
};

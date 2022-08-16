export const MAIN_CONTAINER_ID = "#forecast";
export const BTN_ID = "#btnId";
export const EDIT_ID = "#edtId";
export const CBX_ID = "#cbxId";

export const MY_LOCATION_LON = "myLocationLon";
export const MY_LOCATION_LAT = "myLocationLat";
export const CITY_LIST = "cityList";

export const LS_CAPACITY = 10;

export const GEOCODER_URL_START = "https://nominatim.openstreetmap.org/search/";
export const GEOCODER_URL_END =
  "?format=json&addressdetails=1&limit=1&polygon_svg=1";
export const MAP_URL_START =
  "https://www.openstreetmap.org/export/embed.html?bbox=";
export const MAP_URL_END = "&amp;layer=mapnik";
export const WEATHER_API_KEY = "542ffd081e67f4512b705f89d2a611b2";
export const WEATHER_URL_START =
  "https://api.openweathermap.org/data/2.5/forecast?lang=ru&units=metric&";
//const WEATHER_URL_START = "http://api.openweathermap.org/data/2.5/weather?lang=ru&units=metric&"
export const WEATHER_URL_END = "&cnt=24&appid=" + WEATHER_API_KEY;
//const WEATHER_URL_END = "&appid=" + WEATHER_API_KEY;
export const IP_WHOIS_URL = "https://ipwho.is";

export const WEATHER_FETCH_ERR = "Ошибка получения данных";

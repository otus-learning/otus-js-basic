import * as prjConst from "./prjConst";

//request to geocoder
export async function getCoordinates(city) {
  let response = await /*window.*/ fetch(
    `${prjConst.GEOCODER_URL_START}${city}${prjConst.GEOCODER_URL_END}`
  );
  return await response.json();
}

//request to ip whois
export async function getLocation() {
  let response = await /*window.*/ fetch(prjConst.IP_WHOIS_URL);
  return await response.json();
}

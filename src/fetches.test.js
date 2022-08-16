import * as fetches from "./fetches.js";
import * as prjConst from "./prjConst.js";

describe("test that geocoder response decoded right", () => {
  it("test that function exists", () => {
    expect(fetches.getCoordinates).toBeDefined();
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

    expect(await fetches.getCoordinates(city)).toEqual(city);
  });
});

describe("test that some function fetching from ip whois", () => {
  it("test that function exists", () => {
    expect(fetches.getLocation).toBeDefined();
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

    expect(await fetches.getLocation()).toEqual(prjConst.IP_WHOIS_URL);
  });
});

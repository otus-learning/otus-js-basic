export let rIdx = 0;
export let responses = [
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
    ok: true,
  },
  //bad result from server (Response object)
  {
    ok: false,
  },
];

require("./css/style.css");
import { createUI } from "./ui.js";
import { showLocationInFrame } from "./forecast.js";

import { Component } from "./Component";

const forecastComponent = new Component(
  document.getElementById("#forecast-div-id") as HTMLElement
);
const mapComponent = new Component(
  document.getElementById("#world-map") as HTMLElement
);
const searchComponent = new Component(
  document.getElementById("#search-div") as HTMLElement
);
const historyComponent = new Component(
  document.getElementById("#history-div") as HTMLElement
);

document.body.onload = createUI(
  document.getElementById("#forecast") as HTMLElement,
  showLocationInFrame,
  searchComponent,
  forecastComponent,
  mapComponent,
  historyComponent
);

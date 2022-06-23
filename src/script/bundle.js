import("../css/style.css");
import { createUI } from "./ui.js";
import { showLocationInFrame } from "./forecast.js";

let mainDiv = document.createElement("div");
document.body.appendChild(mainDiv);
document.body.onload = createUI(mainDiv, showLocationInFrame);

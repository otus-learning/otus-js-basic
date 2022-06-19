import("../css/style.css");
import { createUI, showLocationInFrame } from "./ui.js";

let mainDiv = document.createElement("div");
document.body.appendChild(mainDiv);
document.body.onload = createUI(mainDiv, showLocationInFrame);

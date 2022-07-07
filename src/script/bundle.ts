require("../scss/reset.scss");
require("../scss/style.scss");

import { createUI } from "../script/gui";
document.body.onload = function () {
  createUI();
};

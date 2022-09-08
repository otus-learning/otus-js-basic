import "../scss/reset.scss";
import "../scss/style.scss";

import * as cdn from "./cdn/cdn";
import { calendarGUI } from "./GUI/calendarGUI";

import { CalendarClasses } from "./calendar/Calendar";
import { Router } from "./router/router";

calendarGUI(
  cdn.Pikaday,
  cdn.MiniSearch,
  new CalendarClasses.Calendar("local"),
  new Router()
);

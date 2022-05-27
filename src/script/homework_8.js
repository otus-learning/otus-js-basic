import { functions } from "./const.js";

export let hw8_f1 = (strDate) => {
  let date = String(strDate).split(".").reverse();
  if (date.length !== 3) {
    return ["Error date in input string"];
  }
  date[1]--;

  let day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date(...date)
  );
  return [day];
};

export let hw8_f2 = () => {
  let date = new Date();
  return [date.getHours() * 60 + date.getMinutes()];
};

export let hw8_f3 = (strDate1, strDate2) => {
  let date1 = String(strDate1).split(".").reverse();
  let date2 = String(strDate2).split(".").reverse();
  if (date1.length !== 3 || date2.length !== 3) {
    return ["Error date in input string"];
  }
  if (date1 > date2) {
    return ["first is yonger"];
  }
  return date1 < date2 ? ["second is yonger"] : ["both is same age"];
};

functions.push({
  name: "Homework 8 task #1",
  func: hw8_f1,
  params: [
    `${(Math.random() * 28) >>> 0}.${(Math.random() * 10 + 1) >>> 0}.2022`,
  ],
});
functions.push({ name: "Homework 8 task #2", func: hw8_f2, params: [] });
functions.push({
  name: "Homework 8 task #3",
  func: hw8_f3,
  params: [
    `${(Math.random() * 28) >>> 0}.${(Math.random() * 10 + 1) >>> 0}.${
      1980 + ((Math.random() * 30) >>> 0)
    }`,
    `${(Math.random() * 28) >>> 0}.${(Math.random() * 10 + 1) >>> 0}.${
      1980 + ((Math.random() * 30) >>> 0)
    }`,
  ],
});

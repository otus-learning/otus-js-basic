import { functions } from "./const.js";

export let hw6_f1 = (a, b) => {
  a = isNaN(Number(a)) ? 0 : Number(a);
  b = isNaN(Number(b)) ? 0 : Number(b);
  return [Math.abs(a - b)];
};

export let hw6_f2 = (str) => {
  str = String(str);
  return [str.split(" ").length !== 1 ? "false" : "true"];
};

export let hw6_f3 = (a, b) => {
  a = isNaN(Number(a)) ? 0 : Number(a);
  b = isNaN(Number(b)) ? 0 : Number(b);

  return [Math.pow(a, b)];
};

functions.push({
  name: "Homework 6 task #1",
  func: hw6_f1,
  params: [+(Math.random() * 100).toFixed(), +(Math.random() * 100).toFixed()],
});
functions.push({
  name: "Homework 6 task #2",
  func: hw6_f2,
  params: [
    Math.random()
      .toFixed(Math.random() * 10)
      .toString() +
      ["", " "][(Math.random() * 2) >>> 0] +
      Math.random()
        .toFixed(Math.random() * 10)
        .toString(),
  ],
});
functions.push({
  name: "Homework 6 task #3",
  func: hw6_f3,
  params: [+(Math.random() * 10).toFixed(), +(Math.random() * 4).toFixed()],
});

import { functions } from "./const.js";

export let hw1_f1 = (a, b) => {
  a = isNaN(Number(a)) ? 0 : Number(a);
  b = isNaN(Number(b)) ? 0 : Number(b);
  return [a * b, a + b];
};

export let hw1_f2 = (str1, str2) => {
  if (!str1) {
    str1 = "";
  }
  if (!str2) {
    str2 = "";
  }
  return [str1.length + str2.length];
};

export let hw1_f3 = (str) => {
  if (!str) {
    str = "000";
  }

  let a = isNaN(Number(str[0])) ? 0 : Number(str[0]);
  let b = isNaN(Number(str[1])) ? 0 : Number(str[1]);
  let c = isNaN(Number(str[2])) ? 0 : Number(str[2]);

  return [a + b + c];
};

functions.push({
  name: "Homework 1 task #1",
  func: hw1_f1,
  params: [+(Math.random() * 100).toFixed(), +(Math.random() * 100).toFixed()],
});
functions.push({
  name: "Homework 1 task #2",
  func: hw1_f2,
  params: [
    Math.random()
      .toFixed(Math.random() * 10)
      .toString(),
    Math.random()
      .toFixed(Math.random() * 10)
      .toString(),
  ],
});
functions.push({
  name: "Homework 1 task #3",
  func: hw1_f3,
  params: [Math.random().toFixed(3).slice(2).toString()],
});

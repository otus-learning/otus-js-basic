import { functions } from "./const.js";

export let hw5_f1 = (a) => {
  let sum = a.reduce((prev, curr) => {
    return prev + (isNaN(Number(curr)) ? 0 : Number(curr));
  }, 0);
  return [sum];
};

export let hw5_f2 = (a) => {
  let rslt = a.map((el) => {
    return (isNaN(Number(el)) ? 0 : Number(el)) * 2;
  });
  return rslt;
};

export let hw5_f3 = (a) => {
  a = a.map((el) => {
    return isNaN(Number(el)) ? 0 : Number(el);
  });
  let rslt = [Math.max(...a)];
  rslt.push(Math.min(...a));
  return rslt;
};

functions.push({
  name: "Homework 5 task #1",
  func: hw5_f1,
  params: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => {
      return (Math.random() * 100).toFixed();
    }),
  ],
});
functions.push({
  name: "Homework 5 task #2",
  func: hw5_f2,
  params: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => {
      return (Math.random() * 10).toFixed();
    }),
  ],
});
functions.push({
  name: "Homework 5 task #3",
  func: hw5_f3,
  params: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => {
      return (Math.random() * 100).toFixed();
    }),
  ],
});

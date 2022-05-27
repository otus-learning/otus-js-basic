import { functions } from "./const.js";

let user = {};
let admin = {};

export let hw4_f1 = () => {
  let n = prompt("Please enter the age of user");
  n = isNaN(Number(n)) ? 0 : Number(n);
  user.name = "John";
  user.age = n;

  let rslt = [];
  rslt.push(user);
  rslt.push("<br>");
  rslt.push(`user.name = ${user.name}, user.age = ${user.age}`);
  return rslt;
};

export let hw4_f2 = () => {
  admin = Object.assign({}, user);
  admin.role = "admin";

  let rslt = [];
  rslt.push(admin);
  rslt.push("<br>");
  rslt.push(
    `admin.name = ${user.name}, admin.age = ${user.age}, admin.role = ${admin.role}`
  );
  return rslt;
};

export let hw4_f3 = () => {
  for (let prop in admin) {
    window[prop] = admin[prop];
  }
  return ["Variables are created in Window object"];
};

functions.push({ name: "Homework 4 task #1", func: hw4_f1, params: [] });
functions.push({ name: "Homework 4 task #2", func: hw4_f2, params: [] });
functions.push({ name: "Homework 4 task #3", func: hw4_f3, params: [] });

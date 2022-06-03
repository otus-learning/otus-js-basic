//функция возвращает разницу чисел между наибольшим и наименьшим
export let diff = (a = 0, b = 0) => {
  return Math.abs(a - b);
};

//функция возвращает true если строка состоит из одного слова и
//false, если из нескольких
export let isWord = (str = "test") => {
  return str.split(" ").length !== 1 ? false : true;
};

//написать функцию возведения в степень
export let pow = (a = 0, b = 0) => {
  return Math.pow(a, b);
};

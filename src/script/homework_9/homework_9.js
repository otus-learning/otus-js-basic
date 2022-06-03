//даны стороны треугольника, определить, является ли он прямоугольным
export let hw9_f1 = (a = 1, b = 1, c = 1) => {
  if (
    Math.pow(a, 2) === Math.pow(b, 2) + Math.pow(c, 2) ||
    Math.pow(b, 2) === Math.pow(c, 2) + Math.pow(a, 2) ||
    Math.pow(c, 2) === Math.pow(a, 2) + Math.pow(b, 2)
  ) {
    console.log("right triangle");
    return;
  }

  console.log("not right tirangle");
};

//пользователь вводит число r, вывести длину окружности и площадь круга с радиусом r
export let hw9_f2 = () => {
  let r = window.prompt("please input r");
  console.log(Math.PI * r * 2, Math.PI * Math.pow(2 * r, 2));
};

//пользователь вводит числа a, b, c. Вывести корни квадратного уравнения с коэфициентами
//a, b, c
export let hw9_f3 = () => {
  let a = window.prompt("please input a");
  let b = window.prompt("please input b");
  let c = window.prompt("please input c");

  let d = Math.pow(b, 2) - 4 * a * c;
  if (d < 0) {
    console.log("no solution");
    return;
  } else {
    if (d > 0) {
      console.log((Math.sqrt(d) - b) / (2 * a), (-Math.sqrt(d) - b) / (2 * a));
      return;
    }
  }

  console.log(-b / (2 * a));
};

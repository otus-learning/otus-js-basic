//Даны два числа, вывести в консоль максимальное из них
export let hw2_f1 = (a = 0, b = 0) => {
  console.log(Math.max(a, b));
};

//пользователь вводит номер месяца от 1 до 12, вывести в консоль его название
export let hw2_f2 = () => {
  let m = window.prompt("Please enter the number of month (1..12)");
  m = Number(m);
  if (m > 12) {
    m = 12;
  }
  if (m < 1) {
    m = 1;
  }
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  console.log(months[m - 1]);
};

//даны площадь круга и квадрата, определить можно ли вписать круг в квадрат
export let hw2_f3 = (circle = 1, square = 1) => {
  square = Number(square);
  circle = Number(circle);

  let r = circle / (Math.PI * 2);
  console.log(r <= Math.sqrt(square) / 2 ? "fitted" : "not fitted");
};

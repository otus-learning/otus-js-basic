//вывести в консоль сумму чисел от 50 до 100
export let hw3_f1 = () => {
  let sum = 0;
  for (let i = 50; i <= 100; i++) {
    sum += i;
  }
  console.log(sum);
};

//вывести в консоль таблицу умножения на 7
export let hw3_f2 = () => {
  for (let i = 1; i < 10; i++) {
    console.log(`7 x ${i} = ${7 * i}`);
  }
};

//запросить у пользователя число N и вывести среднее арифметическое суммы всех нечетных чисел от 1 до N
export let hw3_f3 = () => {
  let n = window.prompt("Please enter the number N");

  if (n < 1) {
    console.log(0);
    return;
  }

  let sum = 0;
  let cnt = 0;
  for (let i = 1; i <= n; i++) {
    if (i & 0x01) {
      cnt++;
      sum += i;
    }
  }
  console.log(sum / cnt);
};

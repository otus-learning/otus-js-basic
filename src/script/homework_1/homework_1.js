//даны два числа, вывести в консоль их произведение и сумму
export let hw1_f1 = (a = 0, b = 0) => {
  console.log(a * b, a + b);
};

//даны две строки, вывести в консоль сумму их длинн
export let hw1_f2 = (str1 = "", str2 = "") => {
  console.log(str1.length + str2.length);
};

//запросить у пользователя число, вывести в консоль сумму первых трёх цифр
export let hw1_f3 = () => {
  let str = window.prompt("please enter the free-digit number");
  console.log(Number(str[0]) + Number(str[1]) + Number(str[2]));
};

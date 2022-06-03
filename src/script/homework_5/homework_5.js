//вывести в консоль сумму всех элементов исходного массива
export let hw5_f1 = (a = [0]) => {
  let sum = a.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
  console.log(sum);
};

//создать массив на основе исходного с элементами в два раза больше, чем в
//исходном по соответствующему индексу
export let hw5_f2 = (a = [0]) => {
  let rslt = a.map((el) => {
    return el * 2;
  });
  return rslt;
};

//вывести в консоль максимальный и минимальный элемент массива
export let hw5_f3 = (a = [0, 1]) => {
  console.log(Math.max(...a), Math.min(...a));
};

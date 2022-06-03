export let user = {};
export let admin = {};

//завести объект с полем name = John, запросить у пользователя число и присвоить
//введенное значение полю age этого объекта
export let hw4_f1 = () => {
  let n = window.prompt("Please enter the age of user");
  user.name = "John";
  user.age = n;
};

//создать объект admin, копию обьекта user и расширить его полем role
//со значением admin
export let hw4_f2 = () => {
  admin = Object.assign({}, user);
  admin.role = "admin";
};

//записать все значения полей обьекта admin в переменные с такими же
//названиями, переменные предварительно создать
export let hw4_f3 = () => {
  for (let prop in admin) {
    window[prop] = admin[prop];
  }
};

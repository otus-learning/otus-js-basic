//запросить у пользователя дату дд.мм.гггг и вывести день недели
export let hw8_f1 = () => {
  let strDate = window.prompt("Input date in dd.mm.yyyy format");
  let date = strDate.split(".").reverse();
  date[1]--;

  let day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date(...date)
  );
  console.log(day);
};

//написать программу, которая выводит в консоль количество минут с начала дня
export let hw8_f2 = () => {
  let date = new Date();
  console.log(date.getHours() * 60 + date.getMinutes());
};

//в двух переменных хранятся даты рождения двух человек в формате "дд.мм.гггг",
//определить какрй из людей моложе
export let hw8_f3 = (strDate1 = "21.01.2000", strDate2 = "21.02.2000") => {
  let date1 = strDate1.split(".").reverse();
  let date2 = strDate2.split(".").reverse();
  if (date1 > date2) {
    console.log("first is yonger");
    return;
  }
  console.log(date1 < date2 ? "second is yonger" : "both is same age");
};

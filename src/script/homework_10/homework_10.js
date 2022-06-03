//определить, чем является введенная строка - датой, адресом электронной почты или номером телефона
export let hw10_f1 = () => {
  let str = window.prompt("please enter the phone number/mail/date");
  if (
    /^[a-zA-Z]{1}[a-zA-Z0-9_-]+[a-zA-Z0-9]{1}@[a-zA-Z0-9]{1}[a-zA-Z0-9-]+[a-zA-Z0-9]{1}\.[a-zA-Z]{2,}$/.test(
      str
    )
  ) {
    console.log("mail");
    return;
  }

  if (/^(((\+7)|8))[89][0-9]{9}$/.test(str)) {
    console.log("phone number");
    return;
  }

  if (/^([0-9]{1,2}\.[0-9]{1,2}\.)([0-9]{4}|[0-9]{2})$/.test(str)) {
    console.log("date");
    return;
  }

  console.log("not correct date or phone number or mail");
};

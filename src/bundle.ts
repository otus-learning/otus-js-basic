import { CalendarClasses } from "./Calendar";

(async () => {
  const calendar = new CalendarClasses.Calendar();
  await calendar.clear();
  console.log(await calendar.create("Задача номер один", "#важные"));
  console.log(await calendar.create("Задача номер два", "#важные"));
  console.log(
    await calendar.create("Задача номер три", "#неважные", "2022.12.31")
  );

  const records = await calendar.read("#важные");
  console.log("All records selected by certain tag: ", records);
  if (records) {
    const filteredRecords = CalendarClasses.Calendar.filter(
      records,
      new CalendarClasses.SortCondition(null, "Задача номер один", null, null),
      new CalendarClasses.SortCondition(null, null, null, null)
    );
    console.log("All filtered records: ", filteredRecords);

    filteredRecords[0] &&
      calendar.update(
        filteredRecords[0].id,
        null,
        "Очень важная задача №1",
        null,
        "passed"
      );
  }
  const updatedRecords = await calendar.read("#важные");
  console.log(
    "Records with one, whos field has been updated: ",
    updatedRecords
  );
})();

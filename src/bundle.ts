import { CalendarClasses } from "./Calendar";

(async () => {
  const calendar = new CalendarClasses.Calendar("first");
  const calendar_ = new CalendarClasses.Calendar("Second");
  await calendar.clear();
  await calendar_.clear();
  console.log("Tasks for first calendar:");
  console.log(
    await calendar.create("Задача номер один", CalendarClasses.Tags.IMPORTANT)
  );
  console.log(
    await calendar.create("Задача номер два", CalendarClasses.Tags.IMPORTANT)
  );
  console.log(
    await calendar.create(
      "Задача номер три",
      CalendarClasses.Tags.NOT_IMPORTANT,
      "2022.12.31"
    )
  );
  console.log("Tasks for second calendar:");
  console.log(
    await calendar_.create(
      "Задача второго календаря",
      CalendarClasses.Tags.NOT_IMPORTANT
    )
  );

  let records = await calendar.read(CalendarClasses.Tags.IMPORTANT);
  console.log(
    "All records selected by certain tag at the first calendar: ",
    records
  );
  if (records) {
    const filteredRecords = CalendarClasses.Calendar.filter(
      records,
      new CalendarClasses.SortCondition({ _toDo: "Задача номер один" }),
      new CalendarClasses.SortCondition({})
    );
    console.log("All filtered records: ", filteredRecords);

    filteredRecords[0] &&
      calendar.update(filteredRecords[0].id, {
        _toDo: "Очень важная задача №1",
        _status: CalendarClasses.Statuses.PENDING,
      });
  }
  const updatedRecords = await calendar.read(CalendarClasses.Tags.IMPORTANT);
  console.log(
    "Records with one, whos field has been updated at the first calendar: ",
    updatedRecords
  );
  await calendar.clear();
  console.log("Now the first calendar is clear");
  records = await calendar_.read(CalendarClasses.Tags.NOT_IMPORTANT);
  console.log(
    "All records selected by certain tag at the second calendar: ",
    records
  );
})();

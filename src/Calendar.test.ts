import { CalendarClasses } from "./Calendar";

//initial state of fake localstorage
let lsItems: { [index: string]: string } = {};
lsItems["maxId"] = "0";

const FakeStorage = {
  setItem: (item: string, val: string) => {
    lsItems[item] = val;
  },
  getItem: (item: string) => {
    return lsItems[item];
  },
  clear: () => {
    lsItems = {};
  },
};

Object.defineProperty(window, "localStorage", { value: FakeStorage });

describe("test Record class", () => {
  it("tests that Record is a class and it defined", () => {
    expect(CalendarClasses.Record).toBeDefined();
    expect(CalendarClasses.Record).toBeInstanceOf(Function);
  });

  it("tests that instance of record class is well-done created by parameters and another record", () => {
    const record = new CalendarClasses.Record(
      null,
      "01.01.2022",
      "task_1",
      "#tag",
      "11"
    );
    expect(record.id).toEqual("11");
    expect(record.date).toEqual("01.01.2022");
    expect(record.toDo).toEqual("task_1");
    expect(record.tag).toEqual("#tag");
    expect(record.status).toEqual("new");

    const record_ = new CalendarClasses.Record(record, null, null, null, null);
    expect(record_.id).toEqual("11");
    expect(record_.date).toEqual("01.01.2022");
    expect(record_.toDo).toEqual("task_1");
    expect(record_.tag).toEqual("#tag");
    expect(record_.status).toEqual("new");
  });

  it("tests that record filter it's propertyes by parameters of method isNeeded", () => {
    const record = new CalendarClasses.Record(
      null,
      "01.01.2022",
      "task_1",
      "#tag",
      "11"
    );
    expect(record.isNeeded("01.01.2022")).toEqual(true);
    expect(record.isNeeded("task_1")).toEqual(true);
    expect(record.isNeeded("#tag")).toEqual(true);
    expect(record.isNeeded("new")).toEqual(true);
    expect(record.isNeeded("test")).toEqual(false);
  });

  it("tests that record change it's propertyes by change method", () => {
    const record = new CalendarClasses.Record(
      null,
      "01.01.2022",
      "task_1",
      "#tag",
      "11"
    );
    record.change("02.02.2022", "task_2", "#tag1", "old");

    expect(record.id).toEqual("11");
    expect(record.date).toEqual("02.02.2022");
    expect(record.toDo).toEqual("task_2");
    expect(record.tag).toEqual("#tag1");
    expect(record.status).toEqual("old");
  });
});

describe("test SortCondition class", () => {
  it("tests that SortCondition is a class and it defined", () => {
    expect(CalendarClasses.SortCondition).toBeDefined();
    expect(CalendarClasses.SortCondition).toBeInstanceOf(Function);
  });

  it("tests that instance of SortCondition class is checks it's equality", () => {
    let sc = new CalendarClasses.SortCondition(
      "01.01.2022",
      "task_1",
      "#tag",
      "new"
    );
    const record = new CalendarClasses.Record(
      null,
      "01.01.2022",
      "task_1",
      "#tag",
      "11"
    );

    expect(sc.isEqual(record)).toEqual(true);
    expect(sc.isNotEqual(record)).toEqual(false);

    sc = new CalendarClasses.SortCondition(
      "02.02.2022",
      "task_2",
      "#tag_1",
      "old"
    );

    expect(sc.isEqual(record)).toEqual(false);
    expect(sc.isNotEqual(record)).toEqual(true);
  });
});

describe("test Calendar class", () => {
  it("tests that Calendar is a class and it defined", () => {
    expect(CalendarClasses.Calendar).toBeDefined();
    expect(CalendarClasses.Calendar).toBeInstanceOf(Function);
  });

  it("tests that calendar instance is correcty created by Calendar class constructor and it can create task", async () => {
    const calendar = new CalendarClasses.Calendar();
    await calendar.create("task", "#tag", "01.01.2022");
    expect(lsItems["0"]).toEqual(
      JSON.stringify(
        new CalendarClasses.Record(null, "01.01.2022", "task", "#tag", "0")
      )
    );
    expect(lsItems["maxId"]).toEqual("1");
    await calendar.create("task1", "#tag1", "02.02.2022");
    expect(lsItems["maxId"]).toEqual("2");
  });

  it("tests that calendar instance is correcty reading", async () => {
    const calendar = new CalendarClasses.Calendar();
    await calendar.create("task3", "#tag3", "03.03.2022");
    await calendar.create("task4", "#tag4", "02.02.2022");
    expect(lsItems["maxId"]).toEqual("4");
    const readed = await calendar.read("02.02.2022");
    expect((readed as CalendarClasses.Record[]).length).toEqual(2);
    expect((readed as CalendarClasses.Record[])[0].tag).toEqual("#tag1");
    expect((readed as CalendarClasses.Record[])[1].tag).toEqual("#tag4");
  });

  it("tests that calendar instance is correcty updates any record", async () => {
    const calendar = new CalendarClasses.Calendar();
    let readed = await calendar.read("02.02.2022");
    await calendar.update(
      (readed as CalendarClasses.Record[])[1].id,
      null,
      null,
      "#tag",
      null
    );
    readed = await calendar.read("02.02.2022");
    expect((readed as CalendarClasses.Record[])[0].tag).toEqual("#tag1");
    expect((readed as CalendarClasses.Record[])[1].tag).toEqual("#tag");
  });

  it("tests that calendar instance is correcty deletes any record", async () => {
    const calendar = new CalendarClasses.Calendar();
    let readed = await calendar.read("02.02.2022");
    expect((readed as CalendarClasses.Record[])[0].status).toEqual("new");
    expect((readed as CalendarClasses.Record[])[1].status).toEqual("new");
    (readed as CalendarClasses.Record[]).forEach((el) => {
      calendar.delete(el.id);
    });
    readed = await calendar.read("02.02.2022");
    expect((readed as CalendarClasses.Record[])[0].status).toEqual("deleted");
    expect((readed as CalendarClasses.Record[])[1].status).toEqual("deleted");
  });

  it("tests that calendar instance is correcty filter records", async () => {
    const calendar = new CalendarClasses.Calendar();
    let readed = await calendar.read("03.03.2022");
    await calendar.update(
      (readed as CalendarClasses.Record[])[0].id,
      "02.02.2022",
      null,
      null,
      null
    );
    readed = await calendar.read("02.02.2022");
    expect((readed as CalendarClasses.Record[]).length).toEqual(3);
    const eqCond = new CalendarClasses.SortCondition(
      "02.02.2022",
      null,
      null,
      null
    );
    const nEqCond = new CalendarClasses.SortCondition(
      null,
      null,
      null,
      "deleted"
    );
    const filtered = CalendarClasses.Calendar.filter(
      readed as CalendarClasses.Record[],
      eqCond,
      nEqCond
    );
    expect((filtered as CalendarClasses.Record[]).length).toEqual(1);
    expect((filtered as CalendarClasses.Record[])[0].tag).toEqual("#tag3");
  });

  it("tests that calendar instance is correcty clears records", async () => {
    const calendar = new CalendarClasses.Calendar();
    await calendar.clear();
    expect(lsItems).toEqual({});
  });
});

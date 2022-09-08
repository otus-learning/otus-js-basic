import { CalendarClasses } from "./Calendar";

//initial state of fake localstorage
let lsItems: { [index: string]: string } = {};
//lsItems["maxId_first"] = "0";
//lsItems["maxId_second"] = "0";

const FakeStorage = {
  setItem: (item: string, val: string) => {
    lsItems[item] = val;
  },
  getItem: (item: string) => {
    return lsItems[item];
  },
  removeItem: (item: string) => {
    delete lsItems[item];
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
    const record = new CalendarClasses.Record({
      _date: "01.01.2022",
      _toDo: "task_1",
      _tag: "#tag",
      _id: "11",
    });
    expect(record.id).toEqual("11");
    expect(record.date).toEqual("01.01.2022");
    expect(record.toDo).toEqual("task_1");
    expect(record.tag).toEqual("#tag");
    expect(record.status).toEqual("new");

    const record_ = new CalendarClasses.Record(record);
    expect(record_.id).toEqual("11");
    expect(record_.date).toEqual("01.01.2022");
    expect(record_.toDo).toEqual("task_1");
    expect(record_.tag).toEqual("#tag");
    expect(record_.status).toEqual("new");
  });

  it("tests that record filter it's propertyes by parameters of method isNeeded", () => {
    const record = new CalendarClasses.Record({
      _date: "01.01.2022",
      _toDo: "task_1",
      _tag: "#tag",
      _id: "11",
    });
    expect(record.isNeeded("01.01.2022")).toEqual(true);
    expect(record.isNeeded("task_1")).toEqual(true);
    expect(record.isNeeded("#tag")).toEqual(true);
    expect(record.isNeeded("new")).toEqual(true);
    expect(record.isNeeded("test")).toEqual(false);
  });

  it("tests that record change it's propertyes by change method", () => {
    const record = new CalendarClasses.Record({
      _date: "01.01.2022",
      _toDo: "task_1",
      _tag: "#tag",
      _id: "11",
    });
    record.change({
      _date: "02.02.2022",
      _toDo: "task_2",
      _tag: "#tag1",
      _status: "old",
    });

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
    let sc = new CalendarClasses.SortCondition({
      _date: "01.01.2022",
      _toDo: "task_1",
      _tag: "#tag",
      _status: "new",
    });
    const record = new CalendarClasses.Record({
      _date: "01.01.2022",
      _toDo: "task_1",
      _tag: "#tag",
      _status: "11",
    });

    expect(sc.isEqual(record)).toEqual(true);
    expect(sc.isNotEqual(record)).toEqual(false);

    sc = new CalendarClasses.SortCondition({
      _date: "02.02.2022",
      _toDo: "task_2",
      _tag: "#tag_1",
      _status: "old",
    });

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
    const calendar = new CalendarClasses.Calendar("first");
    await calendar.create("task", "#tag", "01.01.2022");

    expect(lsItems["0_first"]).toEqual(
      JSON.stringify(
        new CalendarClasses.Record({
          _date: "01.01.2022",
          _toDo: "task",
          _tag: "#tag",
          _id: "0_first",
        })
      )
    );
    expect(lsItems["maxId_first"]).toEqual("1");
    await calendar.create("task1", "#tag1", "02.02.2022");
    expect(lsItems["maxId_first"]).toEqual("2");
  });

  it("tests that calendar instance is correcty reading", async () => {
    const calendar = new CalendarClasses.Calendar("first");
    await calendar.create("task3", "#tag3", "03.03.2022");
    await calendar.create("task4", "#tag4", "02.02.2022");
    expect(lsItems["maxId_first"]).toEqual("4");
    const readed = await calendar.read("02.02.2022");
    expect((readed as CalendarClasses.Record[]).length).toEqual(2);
    expect((readed as CalendarClasses.Record[])[0].tag).toEqual("#tag1");
    expect((readed as CalendarClasses.Record[])[1].tag).toEqual("#tag4");
  });

  it("tests that calendar instance is correcty updates any record", async () => {
    const calendar = new CalendarClasses.Calendar("first");
    let readed = await calendar.read("02.02.2022");
    await calendar.update((readed as CalendarClasses.Record[])[1].id, {
      _tag: "#tag",
    });
    readed = await calendar.read("02.02.2022");
    expect((readed as CalendarClasses.Record[])[0].tag).toEqual("#tag1");
    expect((readed as CalendarClasses.Record[])[1].tag).toEqual("#tag");
  });

  it("tests that calendar instance is correcty deletes any record", async () => {
    const calendar = new CalendarClasses.Calendar("first");
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
    const calendar = new CalendarClasses.Calendar("first");
    let readed = await calendar.read("03.03.2022");
    await calendar.update((readed as CalendarClasses.Record[])[0].id, {
      _date: "02.02.2022",
    });
    readed = await calendar.read("02.02.2022");
    expect((readed as CalendarClasses.Record[]).length).toEqual(3);
    const eqCond = new CalendarClasses.SortCondition({ _date: "02.02.2022" });
    const nEqCond = new CalendarClasses.SortCondition({ _status: "deleted" });
    const filtered = CalendarClasses.Calendar.filter(
      readed as CalendarClasses.Record[],
      eqCond,
      nEqCond
    );
    expect((filtered as CalendarClasses.Record[]).length).toEqual(1);
    expect((filtered as CalendarClasses.Record[])[0].tag).toEqual("#tag3");
  });

  it("tests that calendar instance is correcty clears records in it's own database", async () => {
    const calendar1 = new CalendarClasses.Calendar("first");
    const calendar2 = new CalendarClasses.Calendar("second");
    await calendar1.create("task1", "#tag1");
    await calendar2.create("task2", "#tag2", "01.01.2022");
    await calendar1.clear();
    expect(lsItems["maxId_second"]).toEqual("1");
    expect(lsItems["0_second"]).toEqual(
      JSON.stringify(
        new CalendarClasses.Record({
          _date: "01.01.2022",
          _toDo: "task2",
          _tag: "#tag2",
          _id: "0_second",
        })
      )
    );
  });
});

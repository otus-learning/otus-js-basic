import { AbstractCalendarClasses } from "./AbstractCalendar";

export namespace CalendarClasses {
  export class Record implements AbstractCalendarClasses.AbstractRecord {
    private _id: string;
    private _date: string;
    private _toDo: string;
    private _tag: string;
    private _status: string;

    constructor(
      record: Record | null,
      date: string | null,
      toDo: string | null,
      tag: string | null,
      id: string | null
    ) {
      if (record) {
        this._date = record._date;
        this._toDo = record._toDo;
        this._tag = record._tag;
        this._id = record._id;
        this._status = record._status;
      } else {
        this._date = date as string;
        this._toDo = toDo as string;
        this._tag = tag as string;
        this._id = id as string;
        this._status = "new";
      }
    }

    public isNeeded(property: string) {
      switch (property) {
        case this._date:
        case this._toDo:
        case this._tag:
        case this._status: {
          return true;
        }
      }
      return false;
    }

    public change(
      date: string | null,
      toDo: string | null,
      tag: string | null,
      status: string | null
    ) {
      this._date = date ? date : this._date;
      this._toDo = toDo ? toDo : this._toDo;
      this._tag = tag ? tag : this._tag;
      this._status = status ? status : this._status;

      return this;
    }

    get id() {
      return this._id;
    }

    get date() {
      return this._date;
    }

    set date(newDate: string) {
      this._date = newDate;
    }

    get toDo() {
      return this._toDo;
    }

    set toDo(newToDo: string) {
      this._toDo = newToDo;
    }

    get tag() {
      return this._tag;
    }

    set tag(newTag: string) {
      this._tag = newTag;
    }

    get status() {
      return this._status;
    }

    set status(newStatus: string) {
      this._status = newStatus;
    }
  }

  export class SortCondition
    implements AbstractCalendarClasses.AbstractSortCondition
  {
    private _date: string | null;
    private _toDo: string | null;
    private _tag: string | null;
    private _status: string | null;

    constructor(
      date: string | null,
      toDo: string | null,
      tag: string | null,
      status: string | null
    ) {
      this._date = date;
      this._toDo = toDo;
      this._tag = tag;
      this._status = status;
    }

    public isEqual(record: Record) {
      return (
        record.date === this._date ||
        record.toDo === this._toDo ||
        record.tag === this._tag ||
        record.status === this._status
      );
    }

    public isNotEqual(record: Record) {
      return (
        record.date !== this._date &&
        record.toDo !== this._toDo &&
        record.tag !== this._tag &&
        record.status !== this._status
      );
    }
  }

  export class Calendar implements AbstractCalendarClasses.AbstractCalendar {
    private _maxId: number;
    private _localRecords: { [index: string]: Record };

    private _readOne(id: string) {
      const op = new Promise<Record | null>((resolve) => {
        const ls = window.localStorage;
        let record;

        if (this._localRecords[id]) {
          record = this._localRecords[id];
        } else {
          const str = ls.getItem(id);
          if (str) {
            record = new Record(JSON.parse(str), null, null, null, null);
            this._localRecords[id] = record;
          }
        }
        resolve(record ? record : null);
      });

      op.then((data) => {
        return data;
      });

      return op;
    }

    private _writeOne(record: Record) {
      const op = new Promise<Record>((resolve) => {
        const ls = window.localStorage;
        const id = record.id;
        if (!ls.getItem(id)) {
          ls.setItem("maxId", String(this._maxId + 1));
        }

        this._localRecords[id] = record;
        ls.setItem(id, JSON.stringify(record));
        resolve(record);
      });

      op.then((data) => {
        return data;
      });

      return op;
    }

    constructor() {
      const ls = window.localStorage;
      this._maxId = Number(ls.getItem("maxId"));
      if (isNaN(this._maxId)) {
        this._maxId = 0;
        ls.setItem("maxId", "0");
      }
      this._localRecords = {};
    }

    public create(toDo: string, tag?: string, date?: string) {
      const op = new Promise<Record>(async (resolve) => {
        const day = date ? date : new Date().toLocaleDateString();
        !tag && (tag = "");

        resolve(
          await this._writeOne(
            new Record(null, day, toDo, tag, String(this._maxId))
          )
        );
        this._maxId++;
      });

      op.then((data) => {
        return data;
      });

      return op;
    }

    public read(property: string) {
      const op = new Promise<Record[] | null>(async (resolve) => {
        const rslt: Record[] = [];
        const maxId = this._maxId;

        for (let i = 0; i < maxId; i++) {
          const record = await this._readOne(String(i));
          record && record.isNeeded(property) && rslt.push(record);
        }

        resolve(rslt.length ? rslt : null);
      });

      op.then((data) => {
        return data;
      });

      return op;
    }

    public update(
      id: string,
      date: string | null,
      toDo: string | null,
      tag: string | null,
      status: string | null
    ) {
      const op = new Promise<Record | null>(async (resolve) => {
        const record = await this._readOne(String(id));
        resolve(
          record
            ? await this._writeOne(record.change(date, toDo, tag, status))
            : null
        );
      });

      op.then((data) => {
        return data;
      });

      return op;
    }

    public delete(id: string) {
      const op = new Promise<Record | null>(async (resolve) => {
        const record = await this._readOne(String(id));
        resolve(
          record
            ? await this._writeOne(record.change(null, null, null, "deleted"))
            : null
        );
      });

      op.then((data) => {
        return data;
      });

      return op;
    }

    public static filter(
      records: Record[],
      cfgObjEq: CalendarClasses.SortCondition,
      cfgObjNEq: CalendarClasses.SortCondition
    ) {
      return records.filter((el: Record) => {
        return cfgObjEq.isEqual(el) && cfgObjNEq.isNotEqual(el);
      });
    }

    public clear() {
      const op = new Promise<boolean>((resolve) => {
        this._maxId = 0;
        window.localStorage.clear();
        this._localRecords = {};
        resolve(true);
      });

      op.then((data) => {
        return data;
      });

      return op;
    }
  }
}

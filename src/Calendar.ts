import { AbstractCalendarClasses } from "./AbstractCalendar";

export namespace CalendarClasses {
  export enum Statuses {
    NEW = "new",
    DELETED = "deleted",
    PENDING = "pending",
    CLOSED = "closed",
  }

  export enum Tags {
    IMPORTANT = "#important",
    VERY_IMPORTANT = "#very important",
    NOT_IMPORTANT = "#not important",
  }

  export enum Dbs {
    LOCALSTORAGE = 0,
    //another db
  }
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  type T = { [index: string]: any };

  export class Record
    implements
      AbstractCalendarClasses.AbstractRecord,
      AbstractCalendarClasses.AbstractInputRecord
  {
    /*private*/ _id = "";
    /*private*/ _date = "";
    /*private*/ _toDo = "";
    /*private*/ _tag = "";
    /*private*/ _status = "";

    constructor(record: Partial<AbstractCalendarClasses.AbstractInputRecord>) {
      record._status ??= CalendarClasses.Statuses.NEW;
      for (const key in record) {
        (this as T)[key] = (record as T)[key];
      }
    }

    public isNeeded(property: string) {
      for (const key in this) {
        if ((this as T)[key] === property) {
          return true;
        }
      }
      return false;
    }

    public change(
      record: Partial<AbstractCalendarClasses.AbstractInputRecord>
    ) {
      for (const key in record) {
        (this as T)[key] = (record as T)[key];
      }
      return this;
    }

    get id() {
      return this._id;
    }

    get date() {
      return this._date;
    }

    set date(newDate: string) {
      if (typeof newDate === "string") {
        this._date = newDate;
      }
    }

    get toDo() {
      return this._toDo;
    }

    set toDo(newToDo: string) {
      if (typeof newToDo === "string") {
        this._toDo = newToDo;
      }
    }

    get tag() {
      return this._tag;
    }

    set tag(newTag: string) {
      if (typeof newTag === "string") {
        this._tag = newTag;
      }
    }

    get status() {
      return this._status;
    }

    set status(newStatus: string) {
      if (typeof newStatus === "string") {
        this._status = newStatus;
      }
    }
  }

  export class SortCondition
    implements AbstractCalendarClasses.AbstractSortCondition
  {
    private _date: string | null;
    private _toDo: string | null;
    private _tag: string | null;
    private _status: string | null;

    constructor(record: Partial<AbstractCalendarClasses.AbstractInputRecord>) {
      this._date = this._toDo = this._tag = this._status = null;
      for (const key in record) {
        (this as T)[key] = (record as T)[key];
      }
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
    private _name: string;
    private _isAsync: boolean;

    constructor(name: string, db?: string) {
      this._name = name;
      this._maxId = Number(window.localStorage.getItem(`maxId_${this._name}`));
      if (isNaN(this._maxId)) {
        this._maxId = 0;
        window.localStorage.setItem(`maxId_${this._name}`, "0");
      }
      this._localRecords = {};
      this._isAsync = Boolean(db);
    }

    private async _readOne(id: string) {
      let record: Record | null = null;
      if (this._isAsync) {
        //await async operation
      } else {
        if (this._localRecords[id]) {
          record = this._localRecords[id];
        } else {
          const str = window.localStorage.getItem(id);
          if (str) {
            record = new Record(JSON.parse(str));
            this._localRecords[id] = record;
          }
        }
      }
      return record;
    }

    private async _writeOne(record: Record) {
      if (this._isAsync) {
        //await async operation
      } else {
        const id = record.id;
        if (!window.localStorage.getItem(id)) {
          window.localStorage.setItem(
            `maxId_${this._name}`,
            String(this._maxId)
          );
        }

        this._localRecords[id] = record;
        window.localStorage.setItem(id, JSON.stringify(record));
      }
      return record;
    }

    public async create(toDo: string, tag?: string, date?: string) {
      const day = date ? date : new Date().toLocaleDateString();
      tag ??= "";
      //this._maxId++;
      return await this._writeOne(
        new Record({
          _date: day,
          _toDo: toDo,
          _tag: tag,
          _id: `${this._maxId++}_${this._name}`,
        })
      );
    }

    public async read(property: string) {
      const rslt: Record[] = [];
      const maxId = this._maxId;

      for (let i = 0; i < maxId; i++) {
        const record = await this._readOne(`${i}_${this._name}`);
        record && record.isNeeded(property) && rslt.push(record);
      }

      return rslt.length ? rslt : null;
    }

    public async update(
      id: string,
      newRecord: Partial<AbstractCalendarClasses.AbstractInputRecord>
    ) {
      const record = await this._readOne(String(id));
      return record ? await this._writeOne(record.change(newRecord)) : null;
    }

    public async delete(id: string) {
      const record = await this._readOne(String(id));
      return record
        ? await this._writeOne(
            record.change({ _status: CalendarClasses.Statuses.DELETED })
          )
        : null;
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

    public async clear() {
      if (this._isAsync) {
        //await async operation
      } else {
        for (let i = 0; i < this._maxId; i++) {
          window.localStorage.removeItem(`${i}_${this._name}`);
        }
        window.localStorage.removeItem(`maxId_${this._name}`);
      }
      this._maxId = 0;
      this._localRecords = {};
      return true;
    }
  }
}

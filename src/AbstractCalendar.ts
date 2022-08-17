export namespace AbstractCalendarClasses {
  export interface AbstractInputRecord {
    _date?: string;
    _toDo?: string;
    _tag?: string;
    _status?: string;
    _id?: string;
  }

  export interface AbstractRecord {
    isNeeded: (property: string) => boolean;
    change: (record: Partial<AbstractInputRecord>) => AbstractRecord;
  }

  export interface AbstractSortCondition {
    isEqual(record: AbstractRecord): boolean;
    isNotEqual(record: AbstractRecord): boolean;
  }

  export interface AbstractCalendar {
    create: (
      toDo: string,
      tag?: string,
      date?: string
    ) => Promise<AbstractRecord>;
    read: (property: string) => Promise<AbstractRecord[] | null>;
    update: (
      id: string,
      newRecord: Partial<AbstractInputRecord>
    ) => Promise<AbstractRecord | null>;
    delete: (id: string) => Promise<AbstractRecord | null>;
    clear: () => Promise<boolean>;
  }
}

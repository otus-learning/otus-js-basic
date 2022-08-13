export namespace AbstractCalendarClasses {
  export interface AbstractRecord {
    isNeeded: (property: string) => boolean;
    change: (
      date: string,
      toDo: string,
      tag: string,
      status: string
    ) => AbstractRecord;
  }

  export interface AbstractSortCondition {
    isEqual(record: AbstractRecord): boolean;
    isNotEqual(record: AbstractRecord): boolean;
  }

  export interface AbstractCalendar {
    create: (
      date: string,
      toDo: string,
      tag?: string
    ) => Promise<AbstractRecord>;
    read: (property: string) => Promise<AbstractRecord[] | null>;
    update: (
      id: string,
      date: string | null,
      toDo: string | null,
      tag: string | null,
      status: string | null
    ) => Promise<AbstractRecord | null>;
    delete: (property: string) => Promise<AbstractRecord | null>;
    clear: () => Promise<boolean>;
  }
}

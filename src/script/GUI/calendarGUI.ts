import { CalendarClasses } from "../calendar/Calendar";
import { Router } from "../router/router";
import * as cdn from "../cdn/cdn";
import {
  store,
  actionCreator,
  setAboutVisibleAction,
  setSearchVisibleAction,
  setExistingRecordBtnsUnvisibleAction,
  setExistingRecordBtnsVisibleAction,
  setRecordVisibleAction,
} from "../redux/redux";
import { Actions } from "../redux/reduxTypes";

export const calendarGUI = (
  Pickaday: typeof cdn.Pikaday,
  MSearch: typeof cdn.MiniSearch,
  calendar: CalendarClasses.Calendar,
  router: Router
) => {
  const fuzzySearchByDateAndText = async () => {
    store.dispatch(
      actionCreator(Actions.setPageElements, {
        searchRsltInnerHTML: "",
        isAddingAnchors: false,
      })
    );

    let records = await calendar.read(CalendarClasses.Statuses.NEW);
    if (
      (document.getElementById("#cbxSearchClosed") as HTMLInputElement).checked
    ) {
      const closed = await calendar.read(CalendarClasses.Statuses.CLOSED);
      if (closed && records) {
        records = [...records, ...closed];
      } else {
        closed && !records && (records = closed);
      }
    }

    if (!records) {
      return;
    } else {
      const date = (document.getElementById("#datepicker2") as HTMLInputElement)
        .value;
      const toDo = (
        document.getElementById("#search-field") as HTMLInputElement
      ).value;

      if (!date && !toDo) {
        return;
      }

      let searched;
      const filteredByDate = (searched = date
        ? CalendarClasses.Calendar.filter(
            records,
            new CalendarClasses.SortCondition({ _date: date }),
            new CalendarClasses.SortCondition({})
          )
        : records);
      if (toDo) {
        const miniSearch = new MSearch({ fields: ["_toDo", "_tag"] });
        miniSearch.addAll(filteredByDate);
        searched = miniSearch
          .search(toDo, { prefix: true, fuzzy: 0.2 })
          .sort((a: Record<string, any>, b: Record<string, any>) => {
            return b.score - a.score;
          });
      }

      const resultDiv = document.createElement("div");
      searched.forEach(async (r: CalendarClasses.Record) => {
        const records = await calendar.read(r.id);
        if (records) {
          const record = records[0];
          const a = document.createElement("a");
          let toDo = record._toDo;
          toDo.length > 30 && (toDo = `${toDo.substring(0, 30)}...`);
          a.innerHTML = `${record._date} | ${record._tag} | [${toDo}]${
            record._status === CalendarClasses.Statuses.CLOSED
              ? " | CLOSED"
              : ""
          }`;
          a.href = "#";
          a.classList.add("search-results-container__record");
          a.setAttribute("id", `/otus-learning/${r.id}`);
          a.addEventListener("click", (e: MouseEvent) => {
            const target = e.target as HTMLAnchorElement;
            const id = target.getAttribute("id");
            id && router.go(id, [], [], [], []);
            e.preventDefault();
          });

          store.dispatch(
            actionCreator(Actions.setPageElements, {
              isAddingAnchors: true,
              anchor: a,
            })
          );
        }
      });
    }
  };

  const picker1 = new Pickaday({
    field: document.getElementById("#datepicker1"),
  });
  const picker2 = new Pickaday({
    field: document.getElementById("#datepicker2"),
    onClose: async (date: string) => {
      await fuzzySearchByDateAndText();
    },
  });

  router.on(
    "/otus-learning/list",
    () => {},
    () => {},
    () => {},
    () => {
      store.dispatch(setSearchVisibleAction);
    }
  );
  router.on(
    "/otus-learning/about",
    () => {},
    () => {},
    () => {},
    () => {
      store.dispatch(setAboutVisibleAction);
    }
  );
  router.on(
    "/otus-learning/new",
    () => {},
    () => {},
    () => {},
    () => {
      store.dispatch(
        actionCreator(Actions.setPageElements, {
          toDoTextValue: "Very important new doing",
          tagTextValue: "#important",
          datePicker1TextValue: `${
            new Date()
              .toString()
              .split(new Date().getFullYear().toString())
              .shift() as string
          }${new Date().getFullYear()}`,
        })
      );

      store.dispatch(setExistingRecordBtnsUnvisibleAction);
      store.dispatch(setRecordVisibleAction);
    }
  );

  router.on(
    new RegExp("^/otus-learning/[0-9]+_local$"),
    () => {},
    () => {},
    () => {},
    async () => {
      store.dispatch(setExistingRecordBtnsVisibleAction);
      store.dispatch(setRecordVisibleAction);

      const id = location.href.replace(location.origin, "").substring(15);
      const records = await calendar.read(id);
      if (!records) {
        router.go("/otus-learning/new", [], [], [], []);
        return;
      } else {
        const record = records[0];

        if (record._status === CalendarClasses.Statuses.DELETED) {
          router.go("/otus-learning/new", [], [], [], []);
          return;
        }

        store.dispatch(
          actionCreator(Actions.setPageElements, {
            toDoTextValue: record._toDo,
            tagTextValue: record._tag,
            datePicker1TextValue: record._date,
            cbxClosedChecked:
              record._status === CalendarClasses.Statuses.CLOSED ? true : false,
            isAddingAnchors: false,
          })
        );
      }
    }
  );

  (document.getElementById("#listBtn") as HTMLButtonElement).addEventListener(
    "click",
    () => {
      router.go("/otus-learning/list", [], [], [], []);
    }
  );

  (document.getElementById("#aboutBtn") as HTMLButtonElement).addEventListener(
    "click",
    () => {
      router.go("/otus-learning/about", [], [], [], []);
    }
  );

  (document.getElementById("#newBtn") as HTMLButtonElement).addEventListener(
    "click",
    () => {
      router.go("/otus-learning/new", [], [], [], []);
    }
  );

  (document.getElementById("#saveBtn") as HTMLButtonElement).addEventListener(
    "click",
    async () => {
      const toDo = (document.getElementById("#toDoText") as HTMLTextAreaElement)
        .value;
      const date = (document.getElementById("#datepicker1") as HTMLInputElement)
        .value;
      const tag = (document.getElementById("#tag") as HTMLInputElement).value;
      if (!toDo) {
        window.alert(
          "Empty tasks are not allowed! Please reenter 'ToDo' field."
        );
        return;
      }

      const id = location.href.replace(location.origin, "").substring(15);

      if (id.match(/^[0-9]+_local$/)) {
        const records = await calendar.read(id);
        if (!records) {
          router.go("/otus-learning/new", [], [], [], []);
          return;
        } else {
          const record = records[0];
          if (record._status === CalendarClasses.Statuses.DELETED) {
            router.go("/otus-learning/new", [], [], [], []);
            return;
          }

          const status = (
            document.getElementById("#cbxClosed") as HTMLInputElement
          ).checked
            ? CalendarClasses.Statuses.CLOSED
            : CalendarClasses.Statuses.NEW;
          await calendar.update(record.id, {
            _toDo: toDo.trim(),
            _tag: tag.trim(),
            _date: date.trim(),
            _status: status,
          });
        }
      } else {
        if (id.match(/^new$/)) {
          const record = await (date
            ? calendar.create(toDo.trim(), tag.trim(), date.trim())
            : calendar.create(toDo.trim(), tag.trim()));
          const newId = `/otus-learning/${record.id}`;
          router.go(newId, [], [], [], []);
        }
      }
      window.alert("Saved! Now you can to edit this record.");
    }
  );

  (document.getElementById("#delBtn") as HTMLButtonElement).addEventListener(
    "click",
    async () => {
      const id = location.href.replace(location.origin, "").substring(15);
      if (id.match(/^[0-9]+_local$/)) {
        const records = await calendar.read(id);
        if (!records) {
          router.go("/otus-learning/list", [], [], [], []);
          return;
        } else {
          const record = records[0];
          if (record._status === CalendarClasses.Statuses.DELETED) {
            router.go("/otus-learning/list", [], [], [], []);
            return;
          }

          await calendar.update(record.id, {
            _status: CalendarClasses.Statuses.DELETED,
          });
        }
        alert("Deleted!");
      }
      router.go("/otus-learning/list", [], [], [], []);
    }
  );

  (
    document.getElementById("#search-field") as HTMLInputElement
  ).addEventListener("keyup", async (e: KeyboardEvent) => {
    await fuzzySearchByDateAndText();
  });
  (
    document.getElementById("#cbxSearchClosed") as HTMLInputElement
  ).addEventListener("click", async (e: MouseEvent) => {
    await fuzzySearchByDateAndText();
  });

  document.body.onload = () => {
    let link = location.href.replace(location.origin, "");
    link === "/otus-learning/" && (link = "/otus-learning/list");
    router.go(link, [], [], [], []);
  };
};

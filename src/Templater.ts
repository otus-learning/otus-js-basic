import { AbstractTemplater } from "./AbstractTemplater";

export class Templater implements AbstractTemplater {
  constructor() {}

  public fromTemplate(
    template: string,
    data: { [index: string]: any },
    index?: number,
    count?: number
  ) {
    const getProp = (path: string, data: any): any => {
      const splitted = path.split(".");
      const prop = data[splitted[0]];
      if (splitted.length > 1) {
        splitted.shift();
        return getProp(splitted.join("."), prop);
      }
      return prop;
    };

    //{{for ... as ...}} {{endfor}}
    let re =
      /\{\{\s*for\s*([\w|.]+)\s*as\s*([\w|.]+)\s*\}\}(.*)\{\{\s*endfor\s*\}\}/g;
    let finded = [...template.matchAll(re)];
    if (finded.length) {
      const matches = finded[0];
      const prop = getProp(matches[1], data);
      if (prop) {
        const length = prop.length;
        const list = prop.map((prop: any, index: number) => {
          const data: { [index: string]: any } = {};

          data[String(matches[2])] = prop;
          return this.fromTemplate(String(matches[3]), data, index, length);
        });
        template = template.replace(matches[0], list.join(" "));
      } else {
        template = template.replace(matches[0], "");
      }
    }

    //{{if ...}} {{endif}}
    re =
      /\{\{\s*if\s*((?:\{Part\})?\w[\w|.]*)\s*(([=|!]=)\s*([\w:"]*))?\s*\}\}(.*?)\{\{\s*endif\s*\}\}/g;
    finded = [...template.matchAll(re)];
    if (finded.length) {
      finded.forEach((matches) => {
        let flag = false;
        let idx = 5;
        matches = matches.filter((el) => {
          return el;
        });
        if (matches[1] === "index") {
          //== !=
          if (matches.length > 3) {
            switch (matches[3]) {
              case "==": {
                switch (matches[4]) {
                  case "First":
                    index === 0 && (flag = true);
                    break;
                  case "Last":
                    index === (count !== undefined ? count : 0) - 1 &&
                      (flag = true);
                    break;
                  default:
                    String(index) === matches[4] && (flag = true);
                }
                break;
              }
              case "!=": {
                switch (matches[4]) {
                  case "First":
                    index !== 0 && (flag = true);
                    break;
                  case "Last":
                    index !== (count !== undefined ? count : 0) - 1 &&
                      (flag = true);
                    break;
                  default:
                    String(index) !== matches[4] && (flag = true);
                }
                break;
              }
            }
          }
          //(index !== 0)
          else {
            index && (flag = true);
            idx = 2;
          }
        } else {
          //indexOf
          if (matches[1].match("{Part}.*")) {
            const prop = getProp(matches[1].substring(6), data);
            if (prop !== undefined) {
              switch (matches[3]) {
                case "==":
                  String(prop).indexOf(matches[4]) >= 0 && (flag = true);
                  break;
                case "!=":
                  String(prop).indexOf(matches[4]) === -1 && (flag = true);
                  break;
              }
            } else {
              flag = false;
            }
          } else {
            const prop = getProp(matches[1], data);
            if (prop !== undefined) {
              //== !=
              if (matches.length > 3) {
                switch (matches[3]) {
                  case "==":
                    String(prop) === matches[4] && (flag = true);
                    break;
                  case "!=":
                    String(prop) !== matches[4] && (flag = true);
                    break;
                }
              }
              //prop in obj
              else {
                flag = true;
                idx = 2;
              }
            } else {
              flag = false;
            }
          }
        }

        //if "and" conditions is present
        if (
          flag &&
          matches[idx].match(
            /\{\{\s*and\s*((?:\{Part\})?\w[\w|.]*)\s*(([=|!]=)\s*([\w:"]*))?\s*\}\}(.*?)/g
          )
        ) {
          matches[idx] = matches[idx].replace(/\{\{s*and/, "{{if");
          matches[idx] += "{{endif}}";
        }
        template = template.replace(
          matches[0],
          flag
            ? this.fromTemplate(String(matches[idx]), data, index, length)
            : ""
        );
      });
    }

    //{{obj.prop}} or {{prop}}
    re = /\{\{\s*([\w|.]*)\s*\}\}/g;
    finded = [...template.matchAll(re)];
    if (finded.length) {
      finded.forEach((matches) => {
        const prop = getProp(matches[1], data);
        template = template.replace(matches[0], prop);
      });
    }
    return template;
  }
}

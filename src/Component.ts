import { AbstractEvent } from "./AbstractEvent";
import { AbstractComponent } from "./AbstractComponent";
import { Templater } from "./Templater";

export class Component<State>
  implements AbstractComponent<Record<string, unknown>>
{
  private _el: HTMLElement;
  private _state: State;
  private _events: { [index: string]: AbstractEvent[] };
  private _template: string;
  private _templater: Templater;
  private _firstRender: boolean;
  private _onMount: ((el: HTMLElement) => void) | null;
  constructor(
    el: HTMLElement,
    hook?: ((el: HTMLElement) => void) | null,
    initialState?: Partial<State>
  ) {
    this._el = el;
    if (el) {
      this._template = (this._el as HTMLElement).innerHTML;
      (this._el as HTMLElement).innerHTML = "";
    } else {
      this._template = "";
    }
    this._events = {};
    this._state = initialState
      ? Object.assign({}, initialState as State)
      : ({} as State);
    this._templater = new Templater();
    this._onMount = hook || null;
    this._firstRender = false;
  }

  subscribeToEvents(evtDest: string, evt: AbstractEvent) {
    !this._events[evtDest] && (this._events[evtDest] = []);
    this._events[evtDest].push(evt);
    this.render();
  }

  setState(patch: any) {
    this._state = Object.assign(this._state, patch as State);
    this.render();
  }

  render() {
    if (!this._el) {
      return null;
    }
    if (this._onMount) {
      !this._firstRender && this._onMount(this._el);
      this._firstRender = true;
    }

    let result = this._template.split("\n").join("\u0000");
    result = result.split("\t").join("\u0001");
    result = this._templater.fromTemplate(result, this._state);
    result = result.split("\u0000").join("\n");
    result = result.split("\u0001").join("\t");

    this._el && ((this._el as HTMLElement).innerHTML = result);

    Object.keys(this._events).forEach((key) => {
      const re = /(\w+)@(\w+)\.(\w+)/g;
      const matches = [...key.matchAll(re)];
      const event = matches[0][1];
      const el = matches[0][2];
      const cls = matches[0][3];

      const els = [...this._el.getElementsByClassName(cls)];
      if (!els.length) {
        return;
      }
      els.forEach((node) => {
        if (
          (node as HTMLInputElement).type === el ||
          (node as HTMLElement).localName === el
        ) {
          this._events[key].forEach((evt) => {
            node.addEventListener(event, evt);
          });
        }
      });
    });
    return result;
  }
}

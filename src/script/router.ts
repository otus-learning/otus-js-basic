// eslint-disable-next-line no-unused-vars
type LinkPathCreator = (...params: any[]) => string;
// eslint-disable-next-line no-unused-vars
type VoidFunc = (...params: any[]) => void;

type AbstractListener = {
  url: string | RegExp | (() => string);
  onBeforeEnter: VoidFunc;
  onEnter: VoidFunc;
  onLeave: VoidFunc;
  render: VoidFunc;
};

type AbstractState = Record<string, any>;

export class Router {
  private _listeners: AbstractListener[];
  private _currentID: string;
  private _states: Record<string, AbstractState>;
  private _forward: boolean;

  private _findNeedURLs(url: string) {
    return this._listeners.filter((el: AbstractListener) => {
      const innerURL = el.url;
      if (innerURL instanceof RegExp) {
        return url.match(innerURL) ? true : false;
      }

      const stringURL = innerURL instanceof Function ? innerURL() : innerURL;
      return stringURL === url ? true : false;
    });
  }

  constructor() {
    this._listeners = [];
    this._currentID = String(+new Date());
    this._states = {};
    this._states[this._currentID] = {
      url: "",
      onBeforeEnterArgs: null,
      onEnterArgs: null,
      onLeaveArgs: null,
    };
    this._forward = true;

    window.addEventListener("popstate", async (e) => {
      let listeners = this._findNeedURLs(this._states[this._currentID].url);
      if (e.isTrusted) {
        if (!(this._states[this._currentID] && this._states[e.state.id])) {
          return;
        }

        this._forward = Number(this._currentID) < Number(e.state.id);

        for (let i = 0; i < listeners.length; i++) {
          await listeners[i].onLeave(
            this._forward,
            ...this._states[this._currentID].onLeaveArgs
          );
        }

        this._currentID = e.state.id;

        listeners = this._findNeedURLs(this._states[this._currentID].url);
        for (let i = 0; i < listeners.length; i++) {
          await listeners[i].onBeforeEnter(
            this._forward,
            ...this._states[this._currentID].onBeforeEnterArgs
          );
        }

        window.dispatchEvent(new Event("popstate"));
      } else {
        for (let i = 0; i < listeners.length; i++) {
          await listeners[i].render(
            this._forward,
            ...this._states[this._currentID].renderArgs
          );
        }

        listeners = this._findNeedURLs(this._states[this._currentID].url);
        for (let i = 0; i < listeners.length; i++) {
          await listeners[i].onEnter(
            this._forward,
            ...this._states[this._currentID].onEnterArgs
          );
        }
      }
    });
  }

  async go(
    url: string,
    onBeforeEnterArgs: any[],
    onEnterArgs: any[],
    onLeaveArgs: any[],
    renderArgs: any[]
  ) {
    this._forward = true;

    let listeners = this._findNeedURLs(this._states[this._currentID].url);
    for (let i = 0; i < listeners.length; i++) {
      await listeners[i].onLeave(
        true,
        ...this._states[this._currentID].onLeaveArgs
      );
    }

    const id = String(+new Date());
    this._states[id] = {
      url: url,
      onBeforeEnterArgs: onBeforeEnterArgs,
      onEnterArgs: onEnterArgs,
      onLeaveArgs: onLeaveArgs,
      renderArgs: renderArgs,
    };

    listeners = this._findNeedURLs(url);
    for (let i = 0; i < listeners.length; i++) {
      await listeners[i].onBeforeEnter(true, ...onBeforeEnterArgs);
    }

    this._currentID = id;

    history.pushState({ id: id }, url, url);
    window.dispatchEvent(new Event("popstate"));
  }

  on(
    url: string | RegExp | LinkPathCreator,
    onBeforeEnter: VoidFunc,
    onEnter: VoidFunc,
    onLeave: VoidFunc,
    render: VoidFunc
  ) {
    this._listeners.push({
      url: url,
      onBeforeEnter: onBeforeEnter,
      onEnter: onEnter,
      onLeave: onLeave,
      render: render,
    });
  }
}

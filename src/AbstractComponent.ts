import { AbstractEvent } from "./AbstractEvent";

export declare interface AbstractComponent<State> {
  subscribeToEvents(evtDest: string, evt: AbstractEvent): void;
  setState(patch: any): void;
  render(): string | null;
}

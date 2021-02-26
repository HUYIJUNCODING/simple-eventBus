export interface EventsCollection {
  [key: string]: Array<Function>;
}

export interface BusOptions {
  initEvents?: {
    [eName: string]: Function;
  };
  [key: string]: any;
}

export interface Instance {
  _events: EventsCollection;
  $on: (event: string | Array<string>, fn: Function) => Instance;
  $once: (event: string, fn: Function) => Instance;
  $off: (event?: string | Array<string>, fn?: Function) => Instance;
  $emit: (event: string, ...args: Array<any>) => Instance;
}

import {EventsCollection,BusOptions,Instance} from './types';

export default class EventBus {
  _events: EventsCollection = {};
  constructor(options?: BusOptions) {
    const eventsMap: Array<[string, Function]> =
      (options.events && Object.entries(options.initEvents)) || [];

    for (const [event, fn] of eventsMap) {
      this.$on(event, fn);
    }
  }
  $on(event: string | Array<string>, fn: Function): Instance {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.$on(event[i], fn);
      }
    } else {
      !this._events[event]?.push(fn) && (this._events[event] = []).push(fn);
    }
    return this;
  }

  $once(event: string, fn: Function): Instance {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: Instance = this;
    function on(): void {
      self.$off(event, on);
      // eslint-disable-next-line prefer-rest-params
      fn.apply(self, arguments);
    }
    this.$on(event, on);

    return this;
  }

  $off(event: string | Array<string>, fn?: Function): Instance  {
    // all
    if (!arguments.length) {
      this._events = Object.create(null);
      return this;
    }
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.$off(event[i], fn);
      }
      return this;
    }
    // specific event
    const cbs = this._events[event];
    if (!cbs) {
      return this;
    }
    if (!fn) {
      this._events[event] = null;
      return this;
    }
    // specific handler
    let cb;
    let i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  }

  $emit(event: string, ...rest: any[]): Instance {
    const cbs: Array<Function> = this._events[event];

    if (cbs?.length > 0) {
      for (let i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(this, rest);
      }
    }
    return this;
  }
}

import EventBus from "./Bus";
import { BusOptions,Instance } from "./types";

const busInstance = new EventBus();

export function busFactory(options: BusOptions): Instance  {
  return new EventBus(options);
}

export default busInstance;



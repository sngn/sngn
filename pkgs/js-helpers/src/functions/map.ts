import type { Fn1 } from "../types/index.js";
import type { HasMap } from "../types/index.js";

export const map =
  <In = any, Out = any>(fn: Fn1<In, Out>) =>
  (value: HasMap<In>): HasMap<Out> =>
    value.map(fn);

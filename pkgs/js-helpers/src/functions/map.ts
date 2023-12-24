import type { Fn } from "../types";
import type { HasMap } from "../types";

export const map = <A = any, B = any>(
  fn :Fn<A, B>
) => (
    value :HasMap<A>
) :HasMap<B> => value.map (fn);


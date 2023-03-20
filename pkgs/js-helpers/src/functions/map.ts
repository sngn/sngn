import type { Fn } from "$src/types";
import type { HasMap } from "$src/types";

export const map = <A = any, B = any>(
  fn :Fn<A, B>
) => (
    value :HasMap<A>
) :HasMap<B> => value.map (fn);


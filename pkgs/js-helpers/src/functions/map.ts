import type { Fn } from "../types/index.js";
import type { HasMap } from "../types/index.js";

export const map = <A = any, B = any>(
    fn :Fn<A, B>,
) => (
    value :HasMap<A>,
) :HasMap<B> => value.map (fn);


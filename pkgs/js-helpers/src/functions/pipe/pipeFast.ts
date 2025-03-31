import type { AnyFunc } from "#src/types/index.js";
import type { FirstParameters } from "./shared.js";
import type { LastReturnType } from "./shared.js";
import type { PipeArgs } from "./shared.js";

/**
 * Takes as input a series of functions,
 * where the output of one function is the input for the next
 * For low numbers of piped functions (< 100), use regular pipe function
 * @param fns
 */
export function pipeFast<F extends AnyFunc[]>(
  ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
) {
  const fnsLength = fns.length;

  return function (arg) {
    let output = arg;

    for (let i = 0; i < fnsLength; i++) {
      output = fns[i]!(output);
    }

    return output as LastReturnType<F, typeof arg>;
  } as FirstParameters<F> extends [] ? () => LastReturnType<F, undefined>
  : (...args: FirstParameters<F>) => LastReturnType<F, FirstParameters<F>[0]>;
}

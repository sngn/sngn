import type { FirstParameters } from "./shared.js";
import type { Fn } from "#src/types/index.js";
import type { LastReturnType } from "./shared.js";
import type { PipeArgs } from "./shared.js";

export type PipeException<E = unknown> = {
  /** what was thrown */
  error: E;
  /** pipe argument at index `i` threw */
  index: number;
};

/**
 * Takes as input a series of functions,
 * where the output of one function is the input for the next
 * Function calls are wrapped in a try..catch block, the exception
 * is wrapped in a PipeException
 * @param fns
 */
export function pipe<F extends Fn[]>(...fns: PipeArgs<F> extends F ? F : PipeArgs<F>) {
  return function (arg) {
    let output = arg;

    for (let i = 0; i < fns.length; i++) {
      try {
        output = fns[i]!(output);
      } catch (error: unknown) {
        // pipe argument at index `i` threw
        throw { error, index: i } as PipeException<typeof error>;
      }
    }

    return output as LastReturnType<F, typeof arg>;
  } as FirstParameters<F> extends [] ? () => LastReturnType<F, undefined>
  : (...args: FirstParameters<F>) => LastReturnType<F, FirstParameters<F>[0]>;
}

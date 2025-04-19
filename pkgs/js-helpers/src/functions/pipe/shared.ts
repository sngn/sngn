import type { ExtractLast } from "#src/types/index.js";
import type { Fn } from "#src/types/index.js";

type FnErrorInputType<
  ExpectedInputType = unknown,
  ActualInputType = unknown,
  OutputType = unknown,
> = (expArg: ExpectedInputType, arg: ActualInputType) => OutputType;

export type FirstParameters<F extends any[]> = F[0] extends Fn ? Parameters<F[0]> : [];
export type LastReturnType<F extends any[], Input = any> =
  // F.length >= 1
  F extends [...Fn[], infer Last] ?
    // F.length >= 1
    Last extends Fn ?
      ReturnType<Last>
    : never
  : // F.length === 0
    Input;

/**
 * @param APlus only used when `Acc.length === 0`
 */
type FSingle<Acc extends Fn[], A, B, APlus extends any[] = []> =
  // if Acc.length >= 1
  ExtractLast<Acc> extends (..._: any) => infer B0 ?
    // Acc.length >= 1
    B0 extends A ?
      // types match
      [...Acc, (arg: A) => B] // append the function (effectively has arrity 1 in pipe context)
    : // types do not match
      [...Acc, FnErrorInputType<B0, A, B>]
  : // Acc.length === 0
    [(arg: A, ...args: APlus) => B];

/**
 * @param APlus only used when `Acc.length === 0`
 */
type FMulti<Acc extends Fn[], A, B, Tail extends any[], APlus extends any[] = []> =
  // if Tail has correct type
  Tail extends Fn[] ?
    // if Acc.length >= 1
    ExtractLast<Acc> extends (..._: any) => infer B0 ?
      // Acc.length >= 1
      B0 extends A ?
        // types match
        // if Tail.length >= 1
        Tail extends [Fn, ...Fn[]] ?
          // Tail.length >= 1
          PipeArgs<Tail, [...Acc, (arg: A) => B]> // recurse over tail
        : // Tail.length === 0
          [...Acc, (arg: A) => B]
      : // types do not match
        PipeArgs<Tail, [...Acc, FnErrorInputType<B0, A, B>]> // recurse over tail
    : // Acc.length === 0
      PipeArgs<Tail, FSingle<Acc, A, B, APlus>>
  : ["Tail contains other types than Fn"];

export type PipeArgs<F extends Fn[], Acc extends Fn[] = []> =
  // if F.length === 1
  F extends [(arg: infer A, ...args: infer APlus) => infer B] ?
    // F.length === 1
    FSingle<Acc, A, B, APlus>
  : // F.length != 1
  // else if F.length >= 1
  F extends [(arg: infer A, ...args: infer APlus) => infer B, ...infer Tail] ?
    // F.length > 1
    FMulti<Acc, A, B, Tail, APlus>
  : // F.length === 0
    Acc;

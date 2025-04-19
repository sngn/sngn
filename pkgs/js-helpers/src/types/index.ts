export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
export type ExtractFirst<T extends any[]> = T extends [] ? undefined : T[0];
export type ExtractLast<T extends any[]> = T extends [...any[], infer R] ? R : undefined;
export type ExtractTail<T extends any[]> =
  T extends [infer _, ...infer ExtractedTail] ? ExtractedTail : [];
export type Fn<In extends any[] = any[], Out = any> = (...args: In) => Out;
/** function with arrity 1 */
export type Fn1<In = any, Out = any> = (arg: In) => Out;
export type Thunk<Out = any> = () => Out;
export type TypeGuard<T> = (v: any) => v is T;

export type Cancel = Thunk<void>;
export type GeneralTestFn = Fn1<any, boolean>;
export type HasMap<In = any> = {
  map: <Out = any>(fn: Fn1<In, Out>) => HasMap<Out>;
};
export type Subscriber<T> = Fn1<T, void>;

export type TestFn<T = any> = GeneralTestFn | TypeGuard<any> | TypeGuard<T>;

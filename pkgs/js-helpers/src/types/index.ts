export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
export type Fn<A, B> = (a :A) => B;
export type Thunk<B> = () => B;
export type TypeGuard<T> = (v :any) => v is T;

export interface HasMap<A = any> { map :<B = any>(fn :Fn<A, B>) => HasMap<B>; }
export type Cancel = Thunk<void>;
export type GeneralTestFn = Fn<any, boolean>;
export type Subscriber<T> = Fn<T, void>;

export type TestFn<T = any> = GeneralTestFn | TypeGuard<any> | TypeGuard<T>;


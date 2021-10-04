export type Fn<A, B> = (a :A) => B;
export type Thunk<B> = () => B;

export type Cancel = () => void;
export type Subscriber<T> = (value :T) => void;

export type GeneralTestFn = (v :any) => boolean;
export type TypeGuard<T> = (v :any) => v is T;
export type TestFn<T = any> = GeneralTestFn | TypeGuard<any> | TypeGuard<T>;

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;


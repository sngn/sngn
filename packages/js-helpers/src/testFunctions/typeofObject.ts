export const isNull = (v :any) :v is null => v === null;
export const isObject = (v :any) :v is Record<number|string|symbol, any> =>
  typeof v === "object" && v !== null;


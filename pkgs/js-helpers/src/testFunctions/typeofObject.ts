export const isNull = (v :any) :v is null => v === null;
export const isObject = (v :any) :v is object =>
  typeof v === "object" && v !== null;


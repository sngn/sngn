export const isNull = (v :any) :v is null => v === null;
export const isObject = <T extends object = object>(v :any) :v is T =>
  typeof v === "object" && v !== null;


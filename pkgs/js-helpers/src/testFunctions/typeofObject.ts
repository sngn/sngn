/* @__NO_SIDE_EFFECTS__ */
export const isNull = (v: any): v is null => v === null;
/* @__NO_SIDE_EFFECTS__ */
export const isObject = <T extends object = object>(v: any): v is T =>
  typeof v === "object" && v !== null;

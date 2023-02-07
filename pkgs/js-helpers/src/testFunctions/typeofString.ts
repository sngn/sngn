export const isString = (v :any) :v is string => typeof v === "string";

export const isEmptyString = (v :any) :v is string => isString (v) && !v.length;
export const isNonEmptyString = (v :any) :v is string => isString (v) && !!v.length;


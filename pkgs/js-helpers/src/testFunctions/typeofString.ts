/* @__NO_SIDE_EFFECTS__ */
export const isString = (v: any): v is string => typeof v === "string";

/* @__NO_SIDE_EFFECTS__ */
export const isEmptyString = (v: any): v is string => isString(v) && !v.length;
/* @__NO_SIDE_EFFECTS__ */
export const isNonEmptyString = (v: any): v is string => isString(v) && !!v.length;

/* @__NO_SIDE_EFFECTS__ */
export const isString = (v: unknown): v is string => typeof v === "string";

/* @__NO_SIDE_EFFECTS__ */
export const isEmptyString = (v: unknown): v is string => isString(v) && !v.length;
/* @__NO_SIDE_EFFECTS__ */
export const isNonEmptyString = (v: unknown): v is string => isString(v) && !!v.length;

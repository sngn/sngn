/* @__NO_SIDE_EFFECTS__ */
export const hop =
  (o: unknown) =>
  (prop: string): boolean => {
    const isObject = typeof o === "object" && o !== null;

    return isObject ? Object.prototype.hasOwnProperty.call(o, prop) : false;
  };

export type LogFunction = (...args :any[]) => void;

export const hop
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
= (obj :any) :(prop :PropertyKey) => boolean =>
  (prop :PropertyKey) => Object.prototype.hasOwnProperty.call (obj, prop);


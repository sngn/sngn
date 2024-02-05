export type LogFunction = (...args :any[]) => void;

export const hop
= (obj :any) :(prop :PropertyKey) => boolean => (prop :PropertyKey) => Object.prototype.hasOwnProperty.call (obj, prop);


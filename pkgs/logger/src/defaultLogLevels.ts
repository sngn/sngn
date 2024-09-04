/* eslint-env node */

import chalkTemplate from "chalk-template";
import { hop } from "./shared.js";

// ### Types
import type { LogFunction } from "./shared.js";

export type LogLevel = "verbose" | "debug" | "info" | "warn" | "error" | "silent";

// ### ### ###

const hopConsole = hop(console);

export const logLevels: LogLevel[] = [
  "verbose",
  "debug",
  "info",
  "warn",
  "error",
  "silent",
];

export const logFunctions = logLevels.reduce(
  (acc, lvl) => {
    const consoleMethod =
      lvl === "verbose" ? "log"
      : lvl === "debug" ? "debug"
      : lvl === "info" ? "info"
      : lvl === "warn" ? "warn"
      : lvl === "error" ? "error"
      : "";
    const levelColor =
      lvl === "verbose" ? "cyan"
      : lvl === "debug" ? "blue"
      : lvl === "info" ? "green"
      : lvl === "warn" ? "yellow"
      : lvl === "error" ? "red"
      : "hidden";

    const fn =
      consoleMethod && hopConsole(consoleMethod) ?
        (...args: any[]) =>
          console[consoleMethod](
            chalkTemplate`{bold.${levelColor} ${lvl}} ${args.join(" ")}`,
          )
      : void 0;

    const rv = fn ? { ...acc, [lvl]: fn } : acc;

    return rv;
  },
  {} as Partial<Record<LogLevel, LogFunction>>,
);

/* eslint-env node */

import chalk from "chalk";
import {hop} from "./shared";

// ### Types
/* eslint-disable-next-line sort-imports */
import type {LogFunction} from "./shared";

export type LogLevel = "verbose"|"debug"|"info"|"warn"|"error"|"silent";

// ### ### ###

const hopConsole = hop (console);

export const logLevels :LogLevel[] = ["verbose", "debug", "info", "warn", "error", "silent"];

export const logFunctions = logLevels.reduce ((acc, lvl) => {
  /* eslint-disable multiline-ternary, @typescript-eslint/indent */
  const consoleMethod
  =   lvl === "verbose" ? "log"
    : lvl === "debug"   ? "debug"
    : lvl === "info"    ? "info"
    : lvl === "warn"    ? "warn"
    : lvl === "error"   ? "error"
    : "";
    const levelColor
    =   lvl === "verbose" ? "cyan"
      : lvl === "debug"   ? "blue"
      : lvl === "info"    ? "green"
      : lvl === "warn"    ? "yellow"
      : lvl === "error"   ? "red"
      : "hidden";
    /* eslint-enable multiline-ternary, @typescript-eslint/indent */

  const fn = consoleMethod && hopConsole (consoleMethod)
    /* eslint-disable-next-line no-console */
    ? (...args :any[]) => console [consoleMethod] (
        chalk`{bold.${levelColor} ${lvl}} ${args.join (" ")}`
    )
    : void 0;

  const rv = fn ? { ...acc, [lvl]: fn } : acc;

  return rv;
}, {} as Partial<Record<LogLevel, LogFunction>>);


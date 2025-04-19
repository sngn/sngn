/* eslint-env node */
/* global ProxyHandler */

import { logFunctions as defaultLogFunctions } from "./defaultLogLevels";
import { logLevels as defaultLogLevels } from "./defaultLogLevels";

// ### Types
import type { LogFunction } from "./shared";
import type { LogLevel } from "./defaultLogLevels";

export type { LogFunction };
export * as defaults from "./defaultLogLevels";

export interface Options<TLogLevel extends string> {
  logFunctions?: Partial<Record<TLogLevel, LogFunction>>;
  logLevels?: TLogLevel[];
}

interface LoggerBase<TLogLevel extends string> {
  hasLevel: (lvl: any) => lvl is TLogLevel;
  levels: TLogLevel[]; // active levels
  levelsHas: (lvl: string | TLogLevel) => boolean; // checks if lvl is in active levels
}
export type LogFunctions<TLogLevel extends string> = Partial<
  Record<TLogLevel, LogFunction>
>;
type IsLevelProps<TLogLevel extends string> = Partial<{
  [L in TLogLevel as `is${Capitalize<L>}`]: boolean;
}>;
export type Logger<TLogLevel extends string> = LoggerBase<TLogLevel> &
  Required<LogFunctions<TLogLevel>> &
  Required<IsLevelProps<TLogLevel>>;
type LoggerGenerator<TLogLevel extends string = LogLevel> = (
  lvl?: TLogLevel,
) => Logger<TLogLevel>;

// ### ### ###

const emptyLogFunction = (...args: any[]) => {
  void args;
};
const isString = (v: any): v is string => typeof v === "string";

export const getLogLevels =
  <TLogLevel>(logLevels: TLogLevel[]) =>
  (lvl?: any | TLogLevel): TLogLevel[] => {
    const index = logLevels.indexOf(String(lvl ?? "") as unknown as TLogLevel);

    return logLevels.slice(index);
  };

export const hasLogLevel =
  <TLogLevel extends string>(logLevels: TLogLevel[]) =>
  (lvl: any | TLogLevel): lvl is TLogLevel =>
    isString(lvl) && logLevels.includes(lvl as unknown as TLogLevel);

/**
 * @param options
 */
export function createLogger<TLogLevel extends string = LogLevel>(
  options: Options<TLogLevel> = {},
): LoggerGenerator<TLogLevel> {
  const {
    logFunctions = defaultLogFunctions as LogFunctions<TLogLevel>,
    logLevels = defaultLogLevels as unknown as TLogLevel[],
  } = options;

  const getLevels = getLogLevels(logLevels);
  const hasLevel = hasLogLevel(logLevels);

  /**
   * @param level
   */
  function logger(level?: TLogLevel): Logger<TLogLevel> {
    const levels = getLevels(level);
    const levelsHas = (lvl: string | TLogLevel): lvl is TLogLevel =>
      levels.includes(lvl as unknown as TLogLevel);

    const target: LoggerBase<TLogLevel> = {
      hasLevel,
      levels,
      levelsHas,
    };

    const handler: ProxyHandler<Logger<TLogLevel>> = {
      get: (target, prop, receiver) => {
        let rv:
          | LogFunction
          | boolean
          | ReturnType<typeof Reflect.get<Logger<TLogLevel>, string>>;

        if (isString(prop)) {
          if (hasLevel(prop)) {
            rv =
              levelsHas(prop) ? (logFunctions[prop] ?? emptyLogFunction) : emptyLogFunction;
          } else {
            const unprefixed = prop.replace(/^is/, "").toLowerCase();

            rv =
              hasLevel(unprefixed) ?
                levelsHas(unprefixed)
              : Reflect.get(target, prop, receiver);
          }
        } else {
          rv = Reflect.get(target, prop, receiver);
        }

        return rv;
      },
    };

    return new Proxy(target as Logger<TLogLevel>, handler);
  }

  return logger;
}

// doc loglevels need to be lowercase, sorted in order of most to least output

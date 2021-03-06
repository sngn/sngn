/* eslint-env node */
/* global ProxyHandler */

import {logFunctions as defaultLogFunctions} from "./defaultLogLevels";
import {logLevels as defaultLogLevels} from "./defaultLogLevels";

// ### Types
/* eslint-disable-next-line sort-imports */
import type {LogFunction} from "./shared";
import type {LogLevel} from "./defaultLogLevels";

export interface Options<TLogLevel extends string> {
  logFunctions ?:Partial<Record<TLogLevel, LogFunction>>;
  logLevels ?:TLogLevel[];
}

interface LoggerBase<TLogLevel extends string> {
  hasLevel :(lvl :any) => lvl is TLogLevel;
  levels :TLogLevel[]; // active levels
  levelsHas :(lvl :string|TLogLevel) => boolean; // checks if lvl is in active levels
}
export type LogFunctions<TLogLevel extends string> = Partial<Record<TLogLevel, LogFunction>>; /* eslint-disable-line max-len */
type IsLevelProps<TLogLevel extends string> = Partial<{ [L in TLogLevel as `is${Capitalize<L>}`] :boolean; }>;
export type Logger<TLogLevel extends string>
= LoggerBase<TLogLevel> & LogFunctions<TLogLevel> & IsLevelProps<TLogLevel>;

export * from "./shared";
export * as defaults from "./defaultLogLevels";

// ### ### ###

const emptyLogFunction = (...args :any[]) => { void args; };
const isString = (v :any) :v is string => typeof v === "string";

export const getLogLevels
= <TLogLevel>(logLevels :TLogLevel[]) => (lvl ?:any|TLogLevel) :TLogLevel[] => {
  const index = logLevels.indexOf (String (lvl ?? "") as unknown as TLogLevel);

  return logLevels.slice (index);
};

export const hasLogLevel = <TLogLevel extends string>(logLevels :TLogLevel[]) =>
  (lvl :any|TLogLevel) :lvl is TLogLevel =>
    isString (lvl) && logLevels.includes (lvl as unknown as TLogLevel);

export function createLogger<TLogLevel extends string = LogLevel> (
    options :Options<TLogLevel> = {}
) :(l ?:TLogLevel) => Logger<TLogLevel> {
  const {
    logFunctions = defaultLogFunctions as LogFunctions<TLogLevel>,
    logLevels = defaultLogLevels as unknown as TLogLevel[],
  } = options;

  const getLevels = getLogLevels (logLevels);
  const hasLevel = hasLogLevel (logLevels);

  function Logger (level ?:TLogLevel) :Logger<TLogLevel> {
    const levels = getLevels (level);
    const levelsHas = (lvl :string|TLogLevel) :lvl is TLogLevel => levels.includes (lvl as unknown as TLogLevel); /* eslint-disable-line max-len */

    const target :LoggerBase<TLogLevel> = {
      hasLevel,
      levels,
      levelsHas,
    };

    const handler :ProxyHandler<Logger<TLogLevel>> = {
      get: (target, prop, receiver) => {
        let rv :undefined|boolean|LogFunction;

        if (isString (prop)) {
          if (hasLevel (prop)) {
            if (levelsHas (prop)) {
              //rv = logFunctions [prop as unknown as TLogLevel];
              rv = logFunctions [prop];
            }

            rv = rv ?? emptyLogFunction;
          } else {
            const unprefixed = prop.replace (/^is/, "").toLowerCase ();

            if (hasLevel (unprefixed)) {
              rv = levelsHas (unprefixed);
            }
          }
        }

        return rv === void 0 ? Reflect.get (target, prop, receiver) : rv;
      },
    };

    return new Proxy (target as Logger<TLogLevel>, handler);
  }

  return Logger;
}

// doc loglevels need to be lowercase, sorted in order of most to least output


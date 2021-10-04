/* eslint-env node */
/* global PromiseFulfilledResult */

import chalk from "chalk";
import {createLogger} from "@sngn/logger";
import {determineOutput} from "./determineOutput";
import {dirname} from "path";
import {existsSync} from "fs";
import filesize from "filesize";
import {lstatSync} from "fs";
import {mkdirSync} from "fs";
import {relative} from "path";
import {resolve} from "path";
import svelteDts from "svelte-dts";

// ### Types
/* eslint-disable-next-line sort-imports */
import type {LogLevel} from "esbuild";
import type {OnLoadArgs} from "esbuild";
import type {Options} from "./shared";
import type {Plugin} from "esbuild";
import type {PluginBuild} from "esbuild";

// ### ### ###

const cwd = process.cwd ();
const reSvelte = /\.svelte$/;
const svelteDtsRollup = svelteDts.default;

const logPrefix = chalk.bold ("svelteDtsPlugin");
const logger = createLogger<LogLevel> ({
  logLevels: ["verbose", "debug", "info", "warning", "error", "silent"],
});
let lg = logger ();

async function produceOutputFile (
    inPath :OnLoadArgs["path"],
    output :string,
    extensions ?:Options["extensions"]
) :Promise<string> {
  const relIn = relative (cwd, inPath);
  lg.debug (logPrefix, "starting compilation process", "for file", relIn);

  const rollupPlugin = svelteDtsRollup ({ extensions, output });
  //console.log (logPrefix, "rollupPlugin", rollupPlugin);

  lg.verbose (logPrefix, "calling buildStart", "for file", relIn);
  await rollupPlugin.buildStart ({ input: [inPath] });

  lg.verbose (logPrefix, "calling generateBundle", "for file", relIn);
  await rollupPlugin.generateBundle ();

  const d = resolve (cwd, dirname (output));
  //console.log (logPrefix, "d", d);

  const calledMkDir = !existsSync (d) && mkdirSync (d, { recursive: true });
  calledMkDir && lg.verbose (logPrefix, "created output directory", calledMkDir);

  lg.debug (logPrefix, "calling writeBundle", "for file", relIn);
  await rollupPlugin.writeBundle ();

  return output;
}

const createMessage = (basepath :string) => (f ?:string) => {
  //console.log ("createMessage", basepath, f);

  let rv :string;

  if (f) {
    const stat = lstatSync (f);
    const emph = relative (basepath, resolve (f));
    const partOutput = f.replace (emph, chalk`{bold ${emph}}`);
    const partFilesize = chalk`{cyan ${filesize (stat.size, { spacer: "" })}}`;

    rv = `  ${partOutput} ${partFilesize}\n`;
  } else {
    rv = "";
  }

  return rv;
};

export function svelteDtsPlugin (options :Options = {}) :Plugin {
  const {
    extensions,
  } = options;

  return {
    name: "esbuild-svelte-dts",
    setup (build :PluginBuild) :void|Promise<void> {
      //console.log (logPrefix, "setup", "build", Object.entries (build));

      const {
        initialOptions,
      } = build;

      //console.log (logPrefix, "setup", "initialOptions", Object.entries (initialOptions));

      const {
        logLevel,
      } = initialOptions;

      lg = logger (logLevel);

      lg.verbose (logPrefix, "cwd", cwd);

      let durationOnLoad = 0;
      const list :[string, string][] = [];
      const outFilename = determineOutput ({ cwd, initialOptions, options });

      //build.onResolve ({ filter: reSvelte }, ({ path, kind }) => {
      //});

      build.onLoad ({ filter: reSvelte }, (args :OnLoadArgs) :undefined => {
        const startOnLoad = Date.now ();
        //console.log (logPrefix, "onLoad", "args", Object.entries (args));

        const inPath = args.path;
        const output = outFilename (inPath);
        //console.log (logPrefix, "output", output);

        if (output) {
          list.push ([inPath, output]);
        } else {
          // do nothing
          lg.error ("Could not determine output directory for path", inPath);
        }

        durationOnLoad += Date.now () - startOnLoad;

        return void 0;
      });

      build.onEnd (async () => {
        const startOnEnd = Date.now ();

        const producers = [...new Set (list)]
          .map ((entry) => produceOutputFile (...entry, extensions));
        const settled = await Promise.allSettled (producers);
        //console.log (logPrefix, "settled", settled);

        if (lg.isInfo) {
          const msg = settled
            .map ((s) => (s as PromiseFulfilledResult<string>).value as undefined|string) /* eslint-disable-line no-extra-parens */
            .map (createMessage (outFilename ()))
            .join ("");

          const durationOnEnd = Date.now () - startOnEnd;
          const duration = durationOnLoad + durationOnEnd;

          /* eslint-disable-next-line no-console */
          console.log (
              msg,
              lg.isDebug ? chalk`\n{green ${logPrefix} time spent in onLoad: {bold ${durationOnLoad}ms}}` : "",
              lg.isDebug ? chalk`\n{green ${logPrefix} time spend in onEnd: {bold ${durationOnEnd}ms}}` : "",
              chalk`\n{green ${logPrefix} finished in {bold ${duration}ms}}`,
          );
        }
      });
    },
  };
}


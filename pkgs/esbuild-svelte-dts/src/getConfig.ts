/* eslint-env node */

import {readFileSync} from "fs";
import {resolve} from "path";
import ts from "typescript";

// ### Types
/* eslint-disable-next-line sort-imports */
import type {Options} from "./shared";
import type {PluginBuild} from "esbuild";

interface Config {
  declarationDir :string;
}

// ### ### ###

//const hop = Object.prototype.hasOwnProperty;
const logPrefix = "esbuild-svelte-dts getConfig";

export function getConfig (
    initialOptions :PluginBuild["initialOptions"],
    options :Options,
    cwd = process.cwd (),
) :never|Config {
  const {
    //extensions,
    output : oOutput,
    tsConfig : oTsConfig,
  } = options;

  const {
    outdir : ioOutdir,
  } = initialOptions;

  const ems = [];
  let rv :undefined|Config = void 0;

  const tsConfigPath = oTsConfig
    ? resolve (cwd, oTsConfig)
    : ts.findConfigFile (cwd, ts.sys.fileExists); /* eslint-disable-line @typescript-eslint/unbound-method */

  //console.log (logPrefix, "cwd", cwd);
  //console.log (logPrefix, "tsConfigPath", tsConfigPath);

  if (tsConfigPath) {
    const lConf = ts.readConfigFile (tsConfigPath, (path) => readFileSync (path, "utf-8"));
    //console.log (logPrefix, "lConf", lConf);

    if (lConf.error) {
      ems.push (`
        Code ${lConf.error.code}
        Category ${lConf.error.category}
        File ${lConf.error.file}
      `);
    } else {
      // valid config
      const conf = ts.parseJsonConfigFileContent (lConf.config, ts.sys, cwd);
      //console.log (logPrefix, "conf", conf);

      const {
        declarationDir : tsDeclarationDir,
        outDir : tsOutDir,
      } = conf.options;

      const outputDir = tsDeclarationDir ?? oOutput ?? ioOutdir ?? tsOutDir ?? "";

      if (!outputDir) {
        ems.push ("Could not determine output directory");
      } else {
        rv = {
          //...conf.options,
          //declaration: true,
          declarationDir: outputDir,
          //emitDeclarationOnly: true,
          //noEmit: false,
        };
      }
    }
  } else {
    ems.push ("No config file found");
  }

  const lems = ems.length;

  if (lems || !rv) {
    !lems && ems.push ("No return value AND no errors -> oh no");

    throw new Error (`${logPrefix} ${ems.join ("\n### ### ###\n")}`);
  }

  return rv;
}


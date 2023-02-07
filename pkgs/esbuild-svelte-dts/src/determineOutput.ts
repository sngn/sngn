/* eslint-env node */

import {getConfig} from "./getConfig";
import {join} from "path";
import {lca} from "./lowestCommonAncestor";
import {parse} from "path";
import {relative} from "path";
import {resolve} from "path";

// ### Types
/* eslint-disable-next-line sort-imports */
import type {OnLoadArgs} from "esbuild";
import type {Options} from "./shared";
import type {PluginBuild} from "esbuild";

interface DetermineOutputParams {
  cwd :string; // current working direcgory
  initialOptions :PluginBuild["initialOptions"];
  //olargs :OnLoadArgs;
  options :Options;
}

// ### ### ###

//const logPrefix = "determineOutput";

// when (finally) called with no argument -> return output basepath
// (finally) returns outputfile path as relative path from params.cwd or empty string
export function determineOutput (params :DetermineOutputParams) :(a ?:OnLoadArgs["path"]) => string {
  //console.log (logPrefix, "params", params);

  const {
    cwd,
    initialOptions,
    //olargs,
    options,
  } = params;

  const {
    entryPoints : pEntryPoints,
    //incremental,
    outbase : pOutbase,
    //outdir,
    //outfile,
    //watch,
  } = initialOptions;

  const config = getConfig (initialOptions, options, cwd);
  const entryPoints = Array.isArray (pEntryPoints)
    ? pEntryPoints
    : Object.values (pEntryPoints || {});

  //console.log (logPrefix, "config", config);
  //console.log (logPrefix, "entryPoints", entryPoints);

  const outbase = pOutbase && resolve (cwd, pOutbase) || lca (entryPoints);
  //console.log (logPrefix, "outbase", outbase);

  const {
    declarationDir,
  } = config;

  return (filepath ?:OnLoadArgs["path"]) :string => {
    let rv :string;

    if (filepath === void 0) {
      rv = declarationDir;
    } else {
      if (outbase && filepath) {
        const parsedPath = parse (filepath);
        const pathabs = resolve (parsedPath.dir);
        const pathrel = relative (outbase, pathabs);

        //console.log (logPrefix, "parsedPath", parsedPath);
        //console.log (logPrefix, "pathabs", pathabs);
        //console.log (logPrefix, "pathrel", pathrel);

        // TODO entry files should produce out according to set out name (entry files might be renamed)
        const outFilename = parsedPath.name + ".d.ts";
        //console.log (logPrefix, "outFilename", outFilename);

        rv = relative (cwd, join (declarationDir, pathrel, outFilename));
      } else {
        // no entrypoints or empty string given as filepath
        rv = "";
      }
    }

    //console.log (logPrefix, "returns", rv);
    return rv;
  };
}


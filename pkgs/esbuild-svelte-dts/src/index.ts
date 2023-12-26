/* eslint-env node */

import {default as emitDts} from "./emitDts.js";
import {moduleResolve} from "./moduleResolve.js";

// ### Types
/* eslint-disable-next-line sort-imports */
import type {Plugin} from "esbuild";
import type {PluginBuild} from "esbuild";

//type Params = {};

// ### ### ###

const pluginName = "esbuild-svelte-dts";
const svelteShimsPathPart = "svelte2tsx/svelte-shims-v4.d.ts";

const logprefix = pluginName;
const svelteShimsPath = moduleResolve(svelteShimsPathPart, import.meta.url, true);

export function plugin (/*params :Params = {}*/) :Plugin {

  if (!svelteShimsPath) {
    throw new Error (`${logprefix} could not find svelteShimsPath for ${svelteShimsPathPart}`);
  }

  return {
    name: pluginName,
    setup (build :PluginBuild) {
      const inputFiles :string[] = [];

      build.onLoad ({ filter: /(\.svelte)$/ }, (args) => {
        const {
          path,
        } = args;

        inputFiles.push (args.path);

        return void 0;
      });

      build.onEnd ((/*result*/) => {
        /*const emission = */emitDts ({
          inputFiles,
          svelteShimsPath,
        });
      });
    },
  };
}

export default plugin;


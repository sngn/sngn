import { default as emitDts } from "./emitDts.js";
import { moduleResolve } from "./moduleResolve.js";

// ### Types
import type { Plugin } from "esbuild";
import type { PluginBuild } from "esbuild";

type Params = {
  /**
   * files that match this filter will be processed by the plugin
   * @default /(\.svelte)$/
   */
  filter?: RegExp;
};

// ### ### ###

const pluginName = "esbuild-svelte-dts";
const svelteShimsPathPart = "svelte2tsx/svelte-shims-v4.d.ts";

const logprefix = pluginName;
const svelteShimsPath = moduleResolve(svelteShimsPathPart, import.meta.url);

/**
 * @param {Params=} params - options for the plugin
 * @returns {Plugin} an esbuild plugin
 */
export function plugin(params: Params = {}): Plugin {
  const { filter = /(\.svelte)$/ } = params;

  if (!svelteShimsPath) {
    throw new Error(
      `${logprefix} could not find svelteShimsPath for ${svelteShimsPathPart}`,
    );
  }

  return {
    name: pluginName,
    setup(build: PluginBuild) {
      const inputFiles: string[] = [];

      build.onLoad({ filter }, (args) => {
        inputFiles.push(args.path);

        return void 0;
      });

      build.onEnd((/*result*/) => {
        /*const emission = */ emitDts({
          inputFiles,
          svelteShimsPath,
        });
      });
    },
  };
}

export default plugin;

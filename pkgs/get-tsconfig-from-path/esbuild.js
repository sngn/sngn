/* eslint-env node */

import {build} from "esbuild";
import {dtsPlugin} from "esbuild-plugin-d.ts";
import {nodeExternalsPlugin} from "esbuild-node-externals";

// ### ### ###

const optCommon = {
  bundle: true,
  color: true,
  entryPoints: [
    "./src/index.ts",
  ],
  logLevel: "info",
  platform: "node",
  sourcemap: true,
  target: "node18",
};

const optEsm = {
  ...optCommon,
  format: "esm",
  outExtension: {
    ".js": ".mjs",
  },
  outdir: "dist",
  plugins: [
    nodeExternalsPlugin (),
    dtsPlugin (),
  ],
  splitting: true,
};

build (optEsm);


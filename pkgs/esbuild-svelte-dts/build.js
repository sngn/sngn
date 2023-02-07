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
  //logLevel: "verbose",
  logLevel: "info",
  platform: "node",
  plugins: [
    nodeExternalsPlugin (),
    dtsPlugin (),
  ],
  sourcemap: true,
  target: "node14",
};

const optCjs = {
  ...optCommon,
  format: "cjs",
  outfile: "dist/index.cjs",
};

const optEs6 = {
  ...optCommon,
  format: "esm",
  outfile: "dist/index.js",
};

build (optCjs);
build (optEs6);


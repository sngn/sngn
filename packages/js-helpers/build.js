import {build} from "esbuild";
import {dtsPlugin} from "esbuild-plugin-d.ts";
import {nodeExternalsPlugin} from "esbuild-node-externals";

// ### ### ###

const optCommon = {
  bundle: true,
  color: true,
  entryPoints: [
    "./src/index.ts",
    "./src/testFunctions/index.ts",
  ],
  logLevel: "info",
  platform: "node",
  sourcemap: true,
  target: "node16",
};

const optCjs = {
  ...optCommon,
  format: "cjs",
  outdir: "dist/cjs",
  plugins: [
    nodeExternalsPlugin (),
  ],
};

const optEs6 = {
  ...optCommon,
  format: "esm",
  outdir: "dist/esm",
  plugins: [
    dtsPlugin (),
    nodeExternalsPlugin (),
  ],
  splitting: true,
};

build (optCjs);
build (optEs6);


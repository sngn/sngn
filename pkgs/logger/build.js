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
  //logLevel: "verbose",
  platform: "node",
  sourcemap: true,
  target: "node16",
};

const optCjs = {
  ...optCommon,
  format: "cjs",
  outExtension: {
    ".js": ".cjs",
  },
  outdir: "dist/cjs",
  plugins: [
    nodeExternalsPlugin (),
  ],
};

const optEsm = {
  ...optCommon,
  format: "esm",
  outExtension: {
    ".js": ".mjs",
  },
  outdir: "dist/esm",
  plugins: [
    dtsPlugin (),
    nodeExternalsPlugin (),
  ],
  splitting: true,
};

build (optCjs);
build (optEsm);


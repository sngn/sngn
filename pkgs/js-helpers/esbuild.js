/* eslint-env node */

import { build } from "esbuild";
import { dtsPlugin } from "esbuild-plugin-d.ts";
import { nodeExternalsPlugin } from "esbuild-node-externals";

// ### ### ###

const optCommon = {
  bundle: true,
  color: true,
  entryPoints: [
    "./src/index.ts",
    "./src/testFunctions/index.ts",
  ],
  logLevel: "info",
  //logLevel: "verbose",
  platform: "node",
  sourcemap: true,
  target: "node18",
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
    nodeExternalsPlugin (),
    dtsPlugin (),
  ],
  splitting: true,
};

const cjsbuild = build (optCjs);
const esmbuild = build (optEsm);

/*const builds = */await Promise.all([
  cjsbuild,
  esmbuild,
]).catch(() => process.exit(1));


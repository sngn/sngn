import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { default as globals } from "globals";
import { default as js } from "@eslint/js";
import { default as jsdoc } from "eslint-plugin-jsdoc";
import { default as parserSvelte } from "svelte-eslint-parser";
import { default as parserTs } from "@typescript-eslint/parser";
import { default as path } from "node:path";
import { default as stylistic } from "@stylistic/eslint-plugin";
import { default as svelte } from "eslint-plugin-svelte";
import { default as ts } from "@typescript-eslint/eslint-plugin";

import {default as rules} from "./tools/eslint/rules.js";
import {default as rulesStylistic} from "./tools/eslint/stylistic.js";
import {default as rulesTs} from "./tools/eslint/rulesTs.js";

// ### ### ###

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
  recommendedConfig: ts.configs["recommended-type-checked"],
}); // @typescript-eslint flat workaround

const compatSvelte = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
  recommendedConfig: svelte.configs.recommended,
});

const [_tsbase, tsoffrules, tsrecommendedtypechecked] = compat.extends("plugin:@typescript-eslint/recommended-type-checked"); // @typescript-eslint flat workaround
const [sveltebase, _sveltepluginreg, svelteflat, svelterules] = compatSvelte.extends("plugin:svelte/recommended"); // @typescript-eslint flat workaround

export default [
  js.configs.recommended,
  jsdoc.configs["flat/recommended"],
  stylistic.configs["recommended-flat"],
  { // defaults
    //files: [],
    ignores: [
      "pkgs/**/dist/**/*",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      //globals: {},
      //parser: espree,
      //parserOptions: {},
      //sourceType: "module"|"script"|"commonjs",
    },
    linterOptions: {
      //noInlineConfig: false,
      reportUnusedDisableDirectives: "warn",
    },
    plugins: {
      //"@stylistic": stylistic,
      //"@typescript-eslint": ts,
      jsdoc,
    },
    //processor: "somestring"|{ preprocess(), postprocess() },
    rules: {
      ...rules,
      ...rulesStylistic,
    },
    //settings: {},
  },
  { // eslint config files
    files: [
      //".eslintrc.{js,cjs}",
      "eslint.config.js",
      "./tools/eslint/**/*.js",
    ],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
  { // build scripts
    files: [
      "pkgs/**/esbuild.js",
    ],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  { // cjs files
    files: [
      "**/*.cjs",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "commonjs",
    },
  },
  { // (m)js files
    files: [
      "**/*.m?js",
    ],
    languageOptions: {
      sourceType: "module",
    },
  },
  {
    files: [
      "**/*.svelte",
      "**/*.ts",
    ],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
        //extraFileExtensions: [".cjs", ".mjs", ".svelte"],
        extraFileExtensions: [".svelte"],
        project: [
          "./tsconfig.json",
          "./pkgs/core/*/tsconfig.json",
          "./pkgs/core/components/svelte/*/tsconfig.json",
          "./pkgs/core/components/svelte/inputs/general/*/tsconfig.json",
          "./pkgs/core/components/svelte/inputs/machine/*/tsconfig.json",
          "./pkgs/lib/*/tsconfig.json",
          "./pkgs/oldcore/*/tsconfig.json",
          //"./pkgs/projects/*/tsconfig.json",
        ],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": ts,
    },
    rules: {
      ...tsoffrules.rules, // @typescript-eslint flat workaround
      ...tsrecommendedtypechecked.rules, // @typescript-eslint flat workaround
      ...rulesTs,
    },
  },
  { // svelte files
    files: [
      "**/*.svelte",
    ],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parser: parserSvelte,
      parserOptions: {
        parser: parserTs,
      },
    },
    plugins: {
      svelte,
    },
    processor: sveltebase.processor,
    rules: {
      ...svelteflat.rules,
      ...svelterules.rules,
    },
    //settings: {
    //  svelte: {
    //    //ignoreWarnings: [],
    //    //compileOptions: {},
    //  },
    //},
  },
  { // ts files
    files: [
      "**/*.ts",
    ],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parser: parserTs,
      //parserOptions: {},
    },
    //rules: {},
  },
];


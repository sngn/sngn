import { default as eslintjs } from "@eslint/js";
import { fileURLToPath } from "node:url";
import { default as globals } from "globals";
import { default as jsdoc } from "eslint-plugin-jsdoc";
import { default as parserTs } from "@typescript-eslint/parser";
import { default as path } from "node:path";
import { default as prettierRecommended } from "eslint-plugin-prettier/recommended";
import { default as rules } from "./tools/eslint/rules.js";
import { default as rulesSvelte } from "./tools/eslint/rulesSvelte.js";
import { default as rulesTs } from "./tools/eslint/rulesTs.js";
import { default as splitAndSortImports } from "@sngn/eslint-plugin-split-and-sort-imports";
import { default as svelte } from "eslint-plugin-svelte";
import { default as tseslint } from "typescript-eslint";

/** @typedef {import("eslint").Linter.Config} Config */

// ### ### ###

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const splitAndSortImports_config_recommended = /** @type {Config[]} */ (splitAndSortImports.configs?.["recommended"] ?? []);

export default tseslint.config(
  eslintjs.configs.recommended,
  jsdoc.configs["flat/recommended"],
  ...tseslint.configs.recommendedTypeChecked,
  ...svelte.configs["flat/recommended"], // must come after tseslint.configs.recommendedTypeChecked
  ...svelte.configs["flat/prettier"], // must come after tseslint.configs.recommendedTypeChecked
  prettierRecommended,
  ...splitAndSortImports_config_recommended,
  {
    /* prettier-ignore */
    ignores: [
      ".gitignore",
      ".nx/**/*",
      "pkgs/**/dist/**/*",
      "pkgs/**/tests/**/*",
    ],
  },
  {
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
    //processor: "somestring"|{ preprocess(), postprocess() },
    rules: {
      ...rules,
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-property-description": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/require-returns-description": "off",
    },
    //settings: {},
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  /* prettier-ignore */
  { // eslint config files
    files: [
      "eslint.config.js",
      "./tools/eslint/**/*.js",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "module",
    },
    ...tseslint.configs.disableTypeChecked,
  },
  /* prettier-ignore */
  { // build scripts
    files: [
      "pkgs/**/esbuild.js",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "module",
    },
    rules: {
      "no-console": "off",
    },
    ...tseslint.configs.disableTypeChecked,
  },
  /* prettier-ignore */
  { // cjs files
    files: ["**/*.cjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "commonjs",
    },
    ...tseslint.configs.disableTypeChecked,
  },
  /* prettier-ignore */
  { // (m)js files
    files: ["**/*.m?js"],
    languageOptions: {
      sourceType: "module",
    },
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["**/*.svelte", "**/*.ts"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
        extraFileExtensions: [".svelte"],
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      ...rulesSvelte,
      ...rulesTs,
    },
  },
  /* prettier-ignore */
  { // svelte files
    files: [
      "**/*.svelte",
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        parser: parserTs,
      },
      sourceType: "module",
    },
    //settings: {
    //  svelte: {
    //    //ignoreWarnings: [],
    //    //compileOptions: {},
    //  },
    //},
  },
  /* prettier-ignore */
  { // ts files
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      //parserOptions: {},
      sourceType: "module",
    },
    //rules: {},
  },
);

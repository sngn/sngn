/* eslint-env node */
/* eslint-disable sort-keys */

const path = require ("path");
const typescript = require ("typescript");

const repoRoot = __dirname;
const configPath = path.join (repoRoot, "tools", "eslint");
//console.log ("eslintrc.cjs", "repoRoot", repoRoot);
//console.log ("eslintrc.cjs", "configPath", configPath);

const rules = require (path.join (configPath, "rules.cjs"));
const rulesSvelte = require (path.join (configPath, "rulesSvelte.cjs"));
const rulesTs = require (path.join (configPath, "rulesTs.cjs"));

module.exports = {
  "env": {
    "es2021": true,
  },
  "extends": [
    "eslint:recommended",
  ],
  globals: {
    //Atomics: "readonly",
    //PromiseFulfilledResult: "readonly",
    //SharedArrayBuffer: "readonly",
    //globalThis: "readonly",
  },
  ignorePatterns: [
    "/packages/**/dist/*",
  ],
  overrides: [
    { // svelte files
      "env": {
        "browser": true,
        "es2021": true,
      },
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
      rules: rulesSvelte,
    },
    { // ts files
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts"],
      rules: rulesTs,
    },
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    ecmaFeatures: {
      //impliedStrict: true,
    },
    //"ecmaVersion": 12,
    extraFileExtensions: [".svelte"],
    project: [
      "./tsconfig.json",
      "./packages/*/tsconfig.json",
    ],
    "sourceType": "module",
    tsconfigRootDir: repoRoot,
  },
  "plugins": [
    "svelte3",
    "@typescript-eslint",
  ],
  root: true,
  rules,
  settings: {
    //"svelte3/ignore-styles": () => true,
    //"svelte3/named-blocks": true,
    "svelte3/typescript": typescript,
  },
};

// vim: set ts=2 sw=2 tw=2 foldmethod=syntax et filetype=javascript :

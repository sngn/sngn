/* eslint-env node */
/* eslint-disable sort-keys */

const path = require ("node:path");

const repoRoot = __dirname;
const configPath = path.join (repoRoot, "tools", "eslint");
//console.log ("eslintrc.cjs", "repoRoot", repoRoot);
//console.log ("eslintrc.cjs", "configPath", configPath);

const rules = require (path.join (configPath, "rules.cjs"));
const rulesSvelte = require (path.join (configPath, "rulesSvelte.cjs"));
const rulesTs = require (path.join (configPath, "rulesTs.cjs"));

// ### ### ###

const env = {
  es2021: true,
};

const parserOptions = {
  ecmaFeatures: {
  },
  extraFileExtensions: [".svelte"],
  project: [
    "./tsconfig.json",
    "./pkgs/*/tsconfig.json",
  ],
  sourceType: "module",
  tsconfigRootDir: repoRoot,
};

module.exports = {
  env,
  extends: [
    "eslint:recommended",
  ],
  globals: {
  },
  ignorePatterns: [
    "/pkgs/**/dist/*",
  ],
  overrides: [
    { // svelte files
      env: {
        ...env,
        browser: true,
      },
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:svelte/recommended",
      ],
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      rules: rulesSvelte,
    },
    { // ts files
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts"],
      rules: rulesTs,
    },
    { // cjs files
      env: {
        ...env,
        node: true,
      },
      files: ["*.cjs"],
      parserOptions: {
        ...parserOptions,
        sourceType: "script",
      },
    },
    { // build scripts
      env: {
        ...env,
        node: true,
      },
      files: ["esbuild.js"],
      parserOptions: {
        ...parserOptions,
        sourceType: "script",
      },
      rules: {
        ...rules,
        "no-console": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions,
  plugins: [
    "@typescript-eslint",
  ],
  root: true,
  rules,
  settings: {
  },
};

// vim: set ts=2 sw=2 tw=2 foldmethod=syntax et filetype=javascript :

/** @type {import("prettier").Config["plugins"]} */
const plugins = ["prettier-plugin-css-order", "prettier-plugin-svelte"];

/** @type {import("prettier").Config} */
const config = {
  cssDeclarationSorterOrder: "smacss",
  experimentalTernaries: true,
  overrides: [
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
        svelteIndentScriptAndStyle: false,
      },
    },
    {
      files: "[jt]sconfig.json",
      options: {
        parser: "jsonc",
      },
    },
  ],
  plugins,
  printWidth: 92,
  quoteProps: "consistent",
  singleAttributePerLine: true,
  trailingComma: "all", // default
};

export default config;

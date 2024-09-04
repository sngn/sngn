/* eslint-env node */
/* eslint-disable sort-keys */

const eslintRules = require("./rules.cjs");
const indentRules = require("./indentRule.cjs");

// ### ### ###

const { indentRule } = indentRules;

const rulesTs = {
  ...eslintRules,
  "@typescript-eslint/ban-types": [
    //"off",
    "warn",
    //"error",
    {
      //types: {
      //},
      //extendedDefaults: false,
      //extendedDefaults: true,
    },
  ],
  "@typescript-eslint/explicit-module-boundary-types": [
    //"off",
    "warn",
    //"error",
    {
      //allowArgumentsExplicitlyTypedAsAny: false,
      allowArgumentsExplicitlyTypedAsAny: true,
      allowDirectConstAssertionInArrowFunctions: true,
      allowHigherOrderFunctions: true,
      allowTypedFunctionExpressions: true,
      allowedNames: [],
    },
  ],
  "@typescript-eslint/indent": indentRule,
  "@typescript-eslint/no-explicit-any": [
    "off",
    //"warn",
    //"error",
    {
      //fixToUnknown: false,
      //ignoreRestArgs: false,
      ignoreRestArgs: true,
    },
  ],
  "@typescript-eslint/no-unsafe-assignment": "off",
  //"@typescript-eslint/no-unsafe-assignment": "warn",
  //"@typescript-eslint/no-unsafe-assignment": "error",
  "@typescript-eslint/no-unsafe-call": "off",
  //"@typescript-eslint/no-unsafe-call": "warn",
  //"@typescript-eslint/no-unsafe-call": "error",
  "@typescript-eslint/no-unsafe-member-access": "off",
  //"@typescript-eslint/no-unsafe-member-access": "warn",
  //"@typescript-eslint/no-unsafe-member-access": "error",
  "@typescript-eslint/no-unsafe-return": "off",
  //"@typescript-eslint/no-unsafe-return": "warn",
  //"@typescript-eslint/no-unsafe-return": "error",
  "@typescript-eslint/restrict-template-expressions": [
    "off",
    //"warn",
    //"error",
    {
      allowAny: false,
      allowBoolean: false,
      allowNullish: false,
      allowNumber: true,
    },
  ],
  "@typescript-eslint/type-annotation-spacing": [
    //"off",
    "warn",
    //"error",
    {
      //after: true,
      overrides: {
        arrow: {
          before: true,
          after: true,
        },
        colon: {
          before: true,
          after: false,
        },
      },
    },
  ],
  //"no-undef": "off",
};

module.exports = rulesTs;

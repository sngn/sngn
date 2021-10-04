/* eslint-env node */
/* eslint-disable sort-keys */

const indentRules = require ("./indentRule.cjs");

// ### ### ###

const {
  //indentRule,
  indentRuleOff,
} = indentRules;

const rules = {
  /* ### Possible Errors ### */
  //"no-await-in-loop": "off",
  "no-await-in-loop": "warn",
  //"no-await-in-loop": "error",
  "no-console": [
    //"off",
    "warn",
    //"error",
    {
      //allow: [
      //"warn",
      //"error",
      //],
    },
  ],
  "no-extra-parens": [
    //"off",
    "warn",
    //"error",
    //"functions",
    "all",
    {
      //conditionalAssign: false,
      //returnAssign: false,
      //nestedBinaryExpressions: false,
      nestedBinaryExpressions: true,
      //ignoreJSX: "none",
      //enforceForArrowConditionals: false,
      //enforceForSequenceExpressions: false,
    },
  ],
  /* ### Best Practices ### */
  "block-scoped-var": "warn",
  curly: [
    //"off",
    "warn",
    //"error",
    "all",
  ],
  "consistent-return": [
    //"off",
    "warn",
    //"error",
    {
      //"treatUndefinedAsUnspecified": false,
    },
  ],
  "default-case": [
    //"off",
    //"warn",
    "error",
    {
      //commentPattern: /^no default$/i,
    },
  ],
  "dot-location": [
    //"off",
    "warn",
    //"error",
    "property",
  ],
  "dot-notation": "warn",
  "eqeqeq": [
    //"off",
    "warn",
    //"error",
    //"always",
    "smart",
  ],
  "no-implicit-coercion": [
    //"off",
    "warn",
    //"error",
    {
      "boolean": true,
      "number": true,
      "string": true,
      "allow": [
        "!!",
        //"~",
      ],
    },
  ],
  "no-implicit-globals": "error",
  "no-implied-eval": "error",
  "no-loop-func": "error",
  "no-new-wrappers": "error",
  "no-return-assign": [
    //"off",
    //"warn",
    "error",
    //"exept-parens",
    "always",
  ],
  "no-return-await": "error",
  "no-self-compare": "error",
  "no-sequences": "error",
  "no-useless-call": "error",
  "no-useless-return": "warn",
  "require-await": "error",
  "wrap-iife": [
    //"off",
    //"warn",
    "error",
    //"outside",
    "inside",
  ],
  /* ### Strict Mode ### */
  "strict": [
    //"off",
    "warn",
    //"error",
    "safe",
  ],
  /* ### Variables ### */
  "no-undef": [
    //"off",
    //"warn",
    "error",
    {
      //"typeof": false, // Default
      "typeof": true,
    },
  ],
  //"no-undefined": "off",
  "no-undefined": "warn",
  "no-use-before-define": "error",
  /* ### Node.js and CommonJS ### */
  /* ### Stylistic Issues ### */
  "comma-dangle": [
    //"off",
    "warn",
    //"error",
    {
      //arrays: "never",
      "arrays": "always-multiline",
      //objects: "never",
      "objects": "always-multiline",
      //imports: "never",
      "imports": "always-multiline",
      //exports: "never",
      "exports": "always-multiline",
      //functions: "never"
      //functions: "always-multiline",
      "functions": "only-multiline",
    },
  ],
  "eol-last": [
    //"off",
    "warn",
    //"error",
    "always",
  ],
  "func-call-spacing": [
    //"off",
    "warn",
    //"error",
    "always",
    {
      allowNewlines: true,
    },
  ],
  //"indent": indentRule,
  "indent": indentRuleOff, // see typescript rule
  "linebreak-style": [
    //"off",
    //"warn",
    "error",
    "unix"
  ],
  "max-len": [
    //"off",
    "warn",
    //"error",
    {
      code: 92,
      tabWidth: 2,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    },
  ],
  "multiline-ternary": [
    //"off",
    "warn",
    //"error",
    "always-multiline",
  ],
  "no-trailing-spaces": [
    //"off",
    "warn",
    //"error",
    {
      "ignoreComments": false,
      "skipBlankLines": false,
    },
  ],
  "prefer-const": [
    //"off",
    "warn",
    //"error",
    {
      destructuring: "any",
      ignoreReadBeforeAssign: false,
    },
  ],
  "quotes": [
    //"off",
    "warn",
    //"error",
    "double",
    {
      allowTemplateLiterals: true,
      avoidEscape: true,
    },
  ],
  "semi": [
    //"off",
    //"warn",
    "error",
    "always",
  ],
  "sort-imports": [
    //"off",
    "warn",
    //"error",
    {
      //ignoreCase: false, // default
      //ignoreDeclarationSort: false, // default
      //ignoreMemberSort: false, // default
      //memberSyntaxSortOrder: ["none", "all", "multiple", "single"], // default
    },
  ],
  "sort-keys": "warn",
  "sort-vars": "warn",
  /* ### ECMAScript 6 ### */
  "arrow-parens": [
    //"off",
    "warn",
    //"error",
    "always",
  ],
  "no-useless-rename": "warn",
  "no-var": "error",
  "object-shorthand": [
    //"off",
    "warn",
    //"error",
    "always",
    {
      "avoidQuotes": true,
    },
  ],
};

module.exports = rules;


/* eslint-disable sort-keys */

const rules = {
  "@stylistic/eol-last": ["error", "always"],
  "@stylistic/function-call-argument-newline": ["error", "consistent"],
  "@stylistic/function-paren-newline": ["error", "multiline-arguments"],
  "@stylistic/generator-star-spacing": ["error", { before: true, after: false }],
  "@stylistic/implicit-arrow-linebreak": ["error", "beside"],
  "@stylistic/indent": [
    "warn",
    2,
    {
      //ignoredNodes: [
      //  "TemplateLiteral *",
      //  "JSXElement",
      //  "JSXElement > *",
      //  "JSXAttribute",
      //  "JSXIdentifier",
      //  "JSXNamespacedName",
      //  "JSXMemberExpression",
      //  "JSXSpreadAttribute",
      //  "JSXExpressionContainer",
      //  "JSXOpeningElement",
      //  "JSXClosingElement",
      //  "JSXFragment",
      //  "JSXOpeningFragment",
      //  "JSXClosingFragment",
      //  "JSXText",
      //  "JSXEmptyExpression",
      //  "JSXSpreadChild",
      //  "TSUnionType",
      //  "TSIntersectionType",
      //  "TSTypeParameterInstantiation",
      //  "FunctionExpression > .params[decorators.length > 0]",
      //  "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
      //  "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key",
      //],
      SwitchCase: 1, // default: 0
      VariableDeclarator: "first", // default: 1
      outerIIFEBody: 1, // default: 1
      MemberExpression: 1, // default: 1
      FunctionDeclaration: {
        parameters: 2, // default: 1
        body: 1, // default: 1
      },
      FunctionExpression: {
        parameters: 2, // default: 1
        body: 1, // default: 1
      },
      StaticBlock: {
        body: 1, // default: 1
      },
      CallExpression: {
        arguments: 2, // default: 1
      },
      ArrayExpression: 1, // default: 1
      ObjectExpression: 1, // default: 1
      ImportDeclaration: 1, // default: 1
      flatTernaryExpressions: false, // default: false
      offsetTernaryExpressions: false, // default: false
      ignoreComments: true, // default: false
    },
  ],
  "@stylistic/linebreak-style": ["error", "unix"],
  "@stylistic/max-len": ["warn", { code: 92, ignoreComments: true, ignoreRegExpLiterals: true, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreTrailingComments: true, ignoreUrls: true, tabWidth: 2 }],
  "@stylistic/member-delimiter-style": ["error", { multiline: { delimiter: "semi", requireLast: true }, multilineDetection: "brackets", singleline: { delimiter: "semi", requireLast: true } }],
  "@stylistic/newline-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],
  "@stylistic/no-extra-parens": ["error", "all"],
  "@stylistic/no-extra-semi": "error",
  "@stylistic/no-multiple-empty-lines": ["error", { max: 2, maxBOF: 0, maxEOF: 1 }],
  "@stylistic/object-curly-newline": ["error", { consistent: true }],
  "@stylistic/one-var-declaration-per-line": ["error", "always"],
  "@stylistic/padding-line-between-statements": ["error", { blankLine: "always", prev: "*", next: ["class", "continue", "do", "for", "function", "if", "return", "switch", "throw", "try", "while"] }, { blankLine: "always", prev: ["class", "do", "for", "function", "if", "switch", "try", "while"], next: "*" }],
  "@stylistic/quotes": ["error", "double", { allowTemplateLiterals: true, avoidEscape: false }],
  "@stylistic/semi": ["error", "always"],
  "@stylistic/semi-style": ["error", "last"],
  "@stylistic/space-before-function-paren": ["error", { anonymous: "always", asyncArrow: "always", named: "ignore" }],
  "@stylistic/spaced-comment": "off",
  "@stylistic/switch-colon-spacing": "error",
  "@stylistic/type-annotation-spacing": ["error", { overrides: { arrow: { before: true, after: true }, colon: { before: true, after: false } } }],
  "@stylistic/wrap-iife": ["error", "inside"],
  "@stylistic/yield-star-spacing": ["error", { before: true, after: false }],
  //"@stylistic/type-generic-spacing": ["error"],
};

export default rules;

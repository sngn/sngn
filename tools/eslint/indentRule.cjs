/* eslint-env node */
/* eslint-disable sort-keys */

const indentRuleOff = "off";
const indentRule = [
  //"off",
  "warn",
  //"error",
  2,
  {
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
    CallExpression: {
      arguments: 2, // default: 1
    },
    ArrayExpression: 1, // default: 1
    ObjectExpression: 1, // default: 1
    ImportDeclaration: 1, // default: 1
    flatTernaryExpressions: false, // default: false
    offsetTernaryExpressions: false, // default: false
    ignoredNodes: [],
    ignoreComments: true, // default: false
  },
];

module.exports = {
  indentRule,
  indentRuleOff,
};


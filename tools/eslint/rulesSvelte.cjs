/* eslint-env node */

const indentRules = require ("./indentRule.cjs");
const rulesTs = require ("./rulesTs.cjs");

// ### ### ###

const { indentRuleOff } = indentRules;

const rulesSvelte = {
  ...rulesTs,
  "@typescript-eslint/indent": indentRuleOff,
};

module.exports = rulesSvelte;


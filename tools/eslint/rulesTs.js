const rules = {
  "@typescript-eslint/ban-types": [
    //"off",
    "warn",
    //"error",
    {
      //types: {},
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
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-unsafe-return": "off",
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
};

export default rules;


import fs from "node:fs";
import { options as options_sort_minimal } from "./src/rules/sort-options-minimal.js";
import { options as options_sort_recommended } from "./src/rules/sort-options-recommended.js";
import { options as options_sort_recommended_icons } from "./src/rules/sort-options-recommended-icons.js";
import rule_sort from "./src/rules/sort.js";
import rule_split from "./src/rules/split.js";
import { testcase as sort_named_rx } from "./tests/sort/named-rx.js";
import { testcase as sort_shortlist_minimal } from "./tests/sort/shortlist-minimal.js";
import { testcase as sort_shortlist_recommended } from "./tests/sort/shortlist-recommended.js";

import { RuleTester } from "@typescript-eslint/rule-tester";

const ruleTester = new RuleTester();

const sort_general_invalid = fs.readFileSync("./tests/sort/general-invalid.ts").toString();
const sort_general_valid_minimal = fs
  .readFileSync("./tests/sort/general-valid-minimal.ts")
  .toString();
const sort_general_valid_recommended = fs
  .readFileSync("./tests/sort/general-valid-recommended.ts")
  .toString();
const sort_icons_invalid = fs.readFileSync("./tests/sort/icons-invalid.ts").toString();
const sort_icons_valid_recommended = fs
  .readFileSync("./tests/sort/icons-valid-recommended.ts")
  .toString();
const split_general_invalid = fs
  .readFileSync("./tests/split/general-invalid.ts")
  .toString();
const split_general_valid = fs.readFileSync("./tests/split/general-valid.ts").toString();
const split_multiple_imports_invalid = fs
  .readFileSync("./tests/split/multiple-imports-invalid.ts")
  .toString();
const split_multiple_imports_valid = fs
  .readFileSync("./tests/split/multiple-imports-valid.ts")
  .toString();
const split_peculiar_names_invalid = fs
  .readFileSync("./tests/split/peculiar-names-invalid.ts")
  .toString();
const split_peculiar_names_valid = fs
  .readFileSync("./tests/split/peculiar-names-valid.ts")
  .toString();

ruleTester.run("sort", rule_sort, {
  invalid: [
    {
      code: sort_general_invalid,
      errors: [{ messageId: "sort-imports" }],
      name: "general - minimal",
      options: [options_sort_minimal],
      output: sort_general_valid_minimal,
    },
    {
      code: sort_general_invalid,
      errors: [{ messageId: "sort-imports" }],
      name: "general - recommended",
      options: [options_sort_recommended],
      output: sort_general_valid_recommended,
    },
    {
      code: sort_icons_invalid,
      errors: [{ messageId: "sort-imports" }],
      name: "icons - recommended - with labels",
      options: [options_sort_recommended_icons],
      output: sort_icons_valid_recommended,
    },
  ],
  valid: [sort_shortlist_minimal, sort_shortlist_recommended, sort_named_rx],
});

ruleTester.run("split", rule_split, {
  invalid: [
    {
      code: split_general_invalid,
      errors: [
        { messageId: "split-import" },
        { messageId: "split-import" },
        { messageId: "split-import" },
      ],
      name: "general",
      output: split_general_valid,
    },
    {
      code: split_multiple_imports_invalid,
      errors: [
        { messageId: "split-import" },
        { messageId: "split-import" },
        { messageId: "split-import" },
      ],
      name: "multiple imports",
      output: split_multiple_imports_valid,
    },
    {
      code: split_peculiar_names_invalid,
      errors: [
        { messageId: "split-import" },
        { messageId: "split-import" },
        { messageId: "split-import" },
        { messageId: "split-import" },
      ],
      name: "peculiar names",
      output: split_peculiar_names_valid,
    },
  ],
  valid: [
    {
      code: `import { G as Ga } from "a";`,
      name: "single import",
    },
    {
      code: `import type { G as Ga } from "a";`,
      name: "single type import",
    },
  ],
});

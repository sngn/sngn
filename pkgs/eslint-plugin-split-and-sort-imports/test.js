import fs from "node:fs";
import { options as options_sort_minimal } from "./src/rules/sort-options-minimal.js";
import { options as options_sort_recommended } from "./src/rules/sort-options-recommended.js";
import { options as options_sort_recommended_icons } from "./src/rules/sort-options-recommended-icons.js";
import rule_sort from "./src/rules/sort.js";
import rule_split from "./src/rules/split.js";
import { testcase as sort_named_rx } from "./tests/sort-named-rx.js";
import { testcase as sort_shortlist_minimal } from "./tests/sort-shortlist-minimal.js";
import { testcase as sort_shortlist_recommended } from "./tests/sort-shortlist-recommended.js";

import { RuleTester } from "@typescript-eslint/rule-tester";

const ruleTester = new RuleTester();

const sort_invalid = fs.readFileSync("./tests/sort-invalid.ts").toString();
const sort_invalid_icons = fs.readFileSync("./tests/sort-invalid-icons.ts").toString();
const sort_valid_minimal = fs.readFileSync("./tests/sort-valid-minimal.ts").toString();
const sort_valid_recommended = fs
  .readFileSync("./tests/sort-valid-recommended.ts")
  .toString();
const sort_valid_recommended_icons = fs
  .readFileSync("./tests/sort-valid-recommended-icons.ts")
  .toString();
const split_invalid = fs.readFileSync("./tests/split-invalid.ts").toString();
const split_valid_minimal = fs.readFileSync("./tests/split-valid-minimal.ts").toString();

ruleTester.run("sort", rule_sort, {
  invalid: [
    {
      code: sort_invalid,
      errors: [{ messageId: "sort-imports" }],
      name: "sort - complex - minimal",
      options: [options_sort_minimal],
      output: sort_valid_minimal,
    },
    {
      code: sort_invalid,
      errors: [{ messageId: "sort-imports" }],
      name: "sort - complex - recommended",
      options: [options_sort_recommended],
      output: sort_valid_recommended,
    },
    {
      code: sort_invalid_icons,
      errors: [{ messageId: "sort-imports" }],
      name: "sort - complex - recommended icons - with labels",
      options: [options_sort_recommended_icons],
      output: sort_valid_recommended_icons,
    },
  ],
  valid: [sort_shortlist_minimal, sort_shortlist_recommended, sort_named_rx],
});

ruleTester.run("split", rule_split, {
  invalid: [
    {
      code: `import { F, G as Ga } from "a";`,
      errors: [{ messageId: "split-import" }],
      name: "multiple import",
      output: `import { F } from "a";
import { G as Ga } from "a";`,
    },
    {
      code: split_invalid,
      errors: [
        { messageId: "split-import" },
        { messageId: "split-import" },
        { messageId: "split-import" },
      ],
      name: "complex invalid test",
      output: split_valid_minimal,
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

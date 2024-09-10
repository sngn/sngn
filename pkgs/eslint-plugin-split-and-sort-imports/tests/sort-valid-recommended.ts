/* comment at beginning of file */

/*
 * multiline comment before test2.css
 * multiline comment line 2 test2.css
 *
 */ import "test2.css";
import "test.css"; // comment 1 after test.css//comment 2 after test.css
import styles_a from "testb.scss";
import styles_b from "testa.scss";

/* comment before inline Test.gif */import "Test.gif";
// with comment (test.png)
import "test.png"; // comment beside test.png
import "test3.png";
import test2 from "test2.webp";
import test4 from "test.webp";

import "./sideeffects2.js";
import "./sideeffects1.js";

import * as _ from "lodash";
import * as fs from "node:fs";

import { default as a } from "b";
// with comment (b from "a")
import b from "a";
// with multiple comment lines
// comments line (c, d, type C from "./a")
import { c, d, type C } from "./r";
import { lost } from "./lost"; // comment beside lost // comment2 beside lost

import type { D as Da } from "../a";
import type { E } from "a";
// multiple with comment (type F, G from a)
import type { F, G as Ga } from "a";
import type { G } from "h";
import type { g } from "h";
import type H from "h";
import type { h } from "h";
import { type R, r } from "./a";

// comment for otherExport
const otherExport = "something";
/* multiline
 * comment
 */
const otherExport2 = "something else";

export function openJson() {
  console.log(otherExport, otherExport2);
}

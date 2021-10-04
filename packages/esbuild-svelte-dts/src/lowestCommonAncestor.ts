/* eslint-env node */

import {dirname} from "path";
import {resolve} from "path";
import {sep} from "path";

// ### ### ###

export function lca (paths :string[]) :string {
  //console.log ("lca", "paths", paths);

  const upaths = [...new Set (paths)].map ((p) => resolve (p)); // remove duplicates, make absolute
  const l = upaths.length;
  let rv :string;

  if (l === 0) {
    rv = "";
  } else {
    if (l === 1) {
      rv = dirname (upaths [0]);
    } else {
      const splitPaths = upaths.map ((path) => path.split (sep));

      let index = -1;
      let keepon = true;
      let currentValue = "";

      do {
        ++index;
        currentValue = splitPaths [0] [index];

        for (let i=1; i < l; ++i) {
          const val = splitPaths [i] [index] || "";

          if (currentValue !== val) {
            keepon = false;
            break;
          }
        }
      } while (keepon);

      rv = splitPaths [0].slice (0, index).join (sep);
    }
  }

  //console.log ("lca", "returns", rv);
  return rv;
}


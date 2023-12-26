/* eslint-env node */

import {moduleResolve as moduleResolveOrig} from "import-meta-resolve";

// ### ### ###

const filePrefix = "file://";

export function moduleResolve (
    source :string,
    importer :string|URL,
) :undefined|string {
  let rv :undefined|string;

  try {
    const base = typeof importer === "string"
      ? new URL ((importer.startsWith (filePrefix) ? "" : filePrefix) + importer)
      : importer;

    const resolvedUrl = moduleResolveOrig (source, base);

    rv = resolvedUrl.pathname;
  } catch (e) {
    rv = undefined;
  }

  return rv;
}


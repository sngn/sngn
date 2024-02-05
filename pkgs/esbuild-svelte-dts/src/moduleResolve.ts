/* eslint-env node */

import { moduleResolve as moduleResolveOrig } from "import-meta-resolve";

// ### ### ###

const filePrefix = "file://";

/**
 * Resolves an import path relative to the importing file
 * @param {string} source - import path/expression
 * @param {(string|URL)} importer - importing file
 * @returns {(undefined|string)} - result of resolution effort
 */
export function moduleResolve (
    source :string,
    importer :string | URL,
) :undefined | string {
  let rv :undefined | string;

  try {
    const base = typeof importer === "string"
      ? new URL ((importer.startsWith (filePrefix) ? "" : filePrefix) + importer)
      : importer;

    const resolvedUrl = moduleResolveOrig (source, base);

    rv = resolvedUrl.pathname;
  }
  catch (e) {
    rv = undefined;
  }

  return rv;
}


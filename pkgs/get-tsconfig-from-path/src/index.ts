/* eslint-env node */

import {dirname} from "node:path";
import {default as ts} from "typescript";

// ### Types
/* eslint-disable-next-line sort-imports */
import type {CompilerOptions} from "typescript";
import type {ExtendedConfigCacheEntry} from "typescript";
import type {FileExtensionInfo} from "typescript";
import type {Path} from "typescript";
import type {WatchOptions} from "typescript";

type Params = {
  basepath ?:string;

  // ### findConfigFile options
  configName ?:string;
  fileExists ?:(filename :string) => boolean;

  // ### readConfigFile options
  readFile ?:(path :string) => undefined|string;

  // ### parseJsonConfigFileContent options
  existingOptions ?:CompilerOptions;
  existingWatchOptions ?:WatchOptions;
  extendedConfigCache ?:Map<string, ExtendedConfigCacheEntry>;
  extraFileExtensions ?:readonly FileExtensionInfo[];
  parseConfigHost ?:ts.ParseConfigHost;
  resolutionStack ?:Path[];
};

// ### ### ###

export const getTsConfigFromPath = (searchinitPath :string, params ?:Params) => {
  const {
    basepath : pbasepath,
    configName = "tsconfig.json",
    existingOptions,
    existingWatchOptions,
    extendedConfigCache,
    extraFileExtensions,
    fileExists = ts.sys.fileExists,
    parseConfigHost = ts.sys,
    readFile = ts.sys.readFile,
    resolutionStack,
  } = params ?? {};

  const configFileName = ts.findConfigFile (searchinitPath, fileExists, configName); /* eslint-disable-line @typescript-eslint/unbound-method */

  if (!configFileName) {
    throw new Error (`getTsConfigFromPath Could not find configuration file for typescript, searching from ${searchinitPath}`);
  }

  const {
    config : configFileContent,
    error : configFileError,
  } = ts.readConfigFile (configFileName, readFile); /* eslint-disable-line @typescript-eslint/unbound-method */

  if (configFileError) {
    throw new Error('Malformed tsconfig\n' + JSON.stringify(configFileError, null, 2));
  }

  const basepath = pbasepath ?? dirname(configFileName);

  const pcl = ts.parseJsonConfigFileContent (
    configFileContent,
    parseConfigHost,
    basepath,
    existingOptions,
    configFileName,
    resolutionStack,
    extraFileExtensions,
    extendedConfigCache,
    existingWatchOptions,
  );

  const rv = {
    basepath,
    configFileContent,
    configFileName,
    pcl,
  };

  return rv;
};

export default getTsConfigFromPath;


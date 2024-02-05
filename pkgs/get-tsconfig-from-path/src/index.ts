/* eslint-env node */

import { dirname } from "node:path";
import { default as ts } from "typescript";

// ### Types
/* eslint-disable-next-line sort-imports */
import type { CompilerOptions } from "typescript";
import type { ExtendedConfigCacheEntry } from "typescript";
import type { FileExtensionInfo } from "typescript";
import type { Path } from "typescript";
import type { WatchOptions } from "typescript";

type Params = {
  basepath ?:string;
  outputMode ?:"configFilePath" | "readConfigFile" | "pcl";
  processReadConfigFileOutput ?:(output :ReturnType<typeof ts.readConfigFile>) => ReturnType<typeof ts.readConfigFile>;

  // ### findConfigFile options
  configName ?:string;
  fileExists ?:(filename :string) => boolean;

  // ### readConfigFile options
  readFile ?:(path :string) => undefined | string;

  // ### parseJsonConfigFileContent options
  existingOptions ?:CompilerOptions;
  existingWatchOptions ?:WatchOptions;
  extendedConfigCache ?:Map<string, ExtendedConfigCacheEntry>;
  extraFileExtensions ?:readonly FileExtensionInfo[];
  parseConfigHost ?:ts.ParseConfigHost;
  resolutionStack ?:Path[];
};

// ### ### ###

const id = <T = any>(v :T) :T => v;

export const getTsConfigFromPath = (searchinitPath :string, params ?:Params) => {
  const {
    basepath: pbasepath,
    configName = "tsconfig.json",
    existingOptions,
    existingWatchOptions,
    extendedConfigCache,
    extraFileExtensions,
    fileExists = ts.sys.fileExists,
    outputMode = "pcl",
    parseConfigHost = ts.sys,
    processReadConfigFileOutput,
    readFile = ts.sys.readFile,
    resolutionStack,
  } = params ?? {};

  const configFilePath = ts.findConfigFile (searchinitPath, fileExists, configName);

  let rv;

  if (outputMode === "configFilePath") {
    rv = {
      configFilePath,
      searchinitPath,
    };
  }
  else {
    if (!configFilePath) {
      throw new Error (`getTsConfigFromPath Could not find configuration file for typescript, searching from ${searchinitPath}`);
    }

    const readConfigFileOutput = ts.readConfigFile (configFilePath, readFile);
    const {
      config: configFileContent,
      error: configFileError,
    } = (processReadConfigFileOutput ?? id) (readConfigFileOutput);

    if (outputMode === "readConfigFile") {
      rv = {
        configFileContent,
        configFileError,
        configFilePath,
        readConfigFileOutput,
        searchinitPath,
      };
    }
    else {
      if (configFileError) {
        throw new Error ("Malformed tsconfig\n" + JSON.stringify (configFileError, null, 2));
      }

      const basepath = pbasepath ?? dirname (configFilePath);

      const pcl = ts.parseJsonConfigFileContent (
          configFileContent,
          parseConfigHost,
          basepath,
          existingOptions,
          configFilePath,
          resolutionStack,
          extraFileExtensions,
          extendedConfigCache,
          existingWatchOptions,
      );

      rv = {
        basepath,
        configFileContent,
        configFileError,
        configFilePath,
        pcl,
        readConfigFileOutput,
        searchinitPath,
      };
    }
  }

  return rv;
};

export default getTsConfigFromPath;


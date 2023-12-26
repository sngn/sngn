import {default as getTsconfigFromPath} from "@sngn/get-tsconfig-from-path";
import {svelte2tsx} from "svelte2tsx";
import {default as ts} from "typescript";

// ### Types
/* eslint-disable-next-line sort-imports */

type Params = {
  inputFiles :string[];
  svelteShimsPath :string;
};

// ### ### ###

function isSvelteFilepath(filePath :string) {
  return filePath.endsWith (".svelte");
}

async function createTsCompilerHost(params :Params, options :ts.CompilerOptions, setParentNodes ?:boolean) {
  const { svelteShimsPath } = params;
  const host = ts.createCompilerHost (options, setParentNodes);
  const noSvelteComponentTyped = svelteShimsPath
    .replace(/\\/g, '/')
    .endsWith('svelte2tsx/svelte-shims-v4.d.ts');
  const sveltefiles = new Map();

  const svelteSys :ts.System = {
    ...ts.sys,
    readFile(path, encoding = "utf-8") {
      if (isSvelteFilepath (path)) {
        const alreadySeen = sveltefiles.has(path);

        if (alreadySeen) {
          const content = sveltefiles.get(path);

          return content;
        } else {
          const code = ts.sys.readFile(path, 'utf-8')!;
          const isTsFile = /<script\s+[^>]*?lang=('|")(ts|typescript)('|")/.test(code);
          const svelte2tsxOutput = svelte2tsx(code, {
              filename: path,
              isTsFile,
              mode: "dts",
              noSvelteComponentTyped,
          });
          const transformed = svelte2tsxOutput.code;

          sveltefiles.set(path, transformed);

          return transformed;
        }
      } else {
        return ts.sys.readFile (path, encoding);
      }
    },
  host.readFile = svelteSys.readFile;
  host.resolveModuleNames = (
      moduleNames,
      containingFile,
      _reusedNames,
      _redirectedReference,
      compilerOptions
  ) => {
    return moduleNames.map ((moduleName) => {
      return resolveModuleName (moduleName, containingFile, compilerOptions);
    });
  };
  host.resolveModuleNameLiterals = (
      moduleLiterals,
      containingFile,
      _redirectedReference,
      compilerOptions
  ) => {
    return moduleLiterals.map ((moduleLiteral) => {
      return {
        resolvedModule: resolveModuleName (
            moduleLiteral.text,
            containingFile,
            compilerOptions
        ),
      };
    });
  };

  function resolveModuleName(name :string, containingFile :string, compilerOptions :any) {
    // Delegate to the TS resolver first.
    // If that does not bring up anything, try the Svelte Module loader
    // which is able to deal with .svelte files.
    const tsResolvedModule = ts.resolveModuleName (
        name,
        containingFile,
        compilerOptions,
        ts.sys
    ).resolvedModule;

    const rv = tsResolvedModule
      ? tsResolvedModule
      : ts.resolveModuleName (
          name,
          containingFile,
          compilerOptions,
          svelteSys
      ).resolvedModule;

    return rv;
  }

  return host;
}

function prepareTsconfig(params :Params) {
  const {
    inputFiles,
  } = params;

  const initialpath = inputFiles.find (isSvelteFilepath) ?? process.cwd ();
  const existingOptions = {
  };
  const processReadConfigFileOutput = (
      { config, error } :ReturnType<typeof ts.readConfigFile>
  ) :ReturnType<typeof ts.readConfigFile> => {
  };

  const additionalParams = {
    existingOptions,
    extraFileExtensions: [{
      extension: "svelte",
      isMixedContent: true,
      scriptKind: ts.ScriptKind.Deferred,
    }],
    processReadConfigFileOutput,
  const tsconfig = getTsconfigFromPath (initialpath, additionalParams);
  return tsconfig;
}
async function main(params :Params) {
  const {
    inputFiles,
    svelteShimsPath,
  } = params;

  const { pcl } = prepareTsconfig (params);
  const host = await createTsCompilerHost (params, pcl.options);
  const program = ts.createProgram ({
    host,
    options: pcl.options,
    rootNames: [svelteShimsPath, ...inputFiles],
  });

  program.emit ();
}

export default main;


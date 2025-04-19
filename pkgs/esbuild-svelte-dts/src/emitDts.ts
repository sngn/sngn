import { default as getTsconfigFromPath } from "@sngn/get-tsconfig-from-path";
import { svelte2tsx } from "svelte2tsx";
import { default as ts } from "typescript";

// ### Types
import type { CompilerOptions } from "typescript";

type Params = {
  inputFiles: string[];
  svelteShimsPath: string;
};

// ### ### ###

//const logprefix = "emitDts.ts";

/**
 * @param {string} filePath - string representing a path to a file
 * @returns {boolean} whether or not supplied argument ends with ".svelte"
 */
function isSvelteFilepath(filePath: string): boolean {
  return filePath.endsWith(".svelte");
}

/**
 * @param {Params} params - TODO
 * @param {CompilerOptions} options - TODO
 * @param {boolean=} setParentNodes - TODO
 * @returns a CompilerHost object, equipped to compile .svelte files
 */
function createTsCompilerHost(
  params: Params,
  options: CompilerOptions,
  setParentNodes?: boolean,
) {
  const { svelteShimsPath } = params;

  const noSvelteComponentTyped = svelteShimsPath
    .replace(/\\/g, "/")
    .endsWith("svelte2tsx/svelte-shims-v4.d.ts");
  const sveltefiles = new Map();

  const svelteSys: ts.System = {
    ...ts.sys,
    readDirectory(path, extensions, exclude, include, depth) {
      const extensionsWithSvelte = (extensions || []).concat(".svelte");

      return ts.sys.readDirectory(path, extensionsWithSvelte, exclude, include, depth);
    },
    readFile(path, encoding = "utf-8") {
      if (isSvelteFilepath(path)) {
        if (sveltefiles.has(path)) {
          const content = sveltefiles.get(path);

          return content;
        } else {
          const code = ts.sys.readFile(path, "utf-8")!;
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
        return ts.sys.readFile(path, encoding);
      }
    },
  };

  /**
   * @param name - TODO
   * @param containingFile - TODO
   * @param compilerOptions - TODO
   * @returns TODO
   */
  function resolveModuleName(
    name: string,
    containingFile: string,
    compilerOptions: CompilerOptions,
  ) {
    // Delegate to the TS resolver first.
    // If that does not bring up anything, try the Svelte Module loader
    // which is able to deal with .svelte files.
    const tsResolvedModule = ts.resolveModuleName(
      name,
      containingFile,
      compilerOptions,
      ts.sys,
    ).resolvedModule;

    const rv =
      tsResolvedModule ? tsResolvedModule : (
        ts.resolveModuleName(name, containingFile, compilerOptions, svelteSys)
          .resolvedModule
      );

    return rv;
  }

  const host = ts.createCompilerHost(options, setParentNodes);

  host.readDirectory =
    svelteSys.readDirectory; /* eslint-disable-line @typescript-eslint/unbound-method */
  host.readFile =
    svelteSys.readFile; /* eslint-disable-line @typescript-eslint/unbound-method */
  host.resolveModuleNameLiterals = (
    moduleLiterals,
    containingFile,
    _redirectedReference,
    compilerOptions,
  ) => {
    return moduleLiterals.map((moduleLiteral) => {
      return {
        resolvedModule: resolveModuleName(
          moduleLiteral.text,
          containingFile,
          compilerOptions,
        ),
      };
    });
  };
  host.resolveModuleNames = (
    moduleNames,
    containingFile,
    _reusedNames,
    _redirectedReference,
    compilerOptions,
  ) => {
    return moduleNames.map((moduleName) => {
      return resolveModuleName(moduleName, containingFile, compilerOptions);
    });
  };

  return host;
}

/**
 * @param {Params} params - TODO
 * @returns TODO
 */
function prepareTsconfig(params: Params): ReturnType<typeof getTsconfigFromPath> {
  const { inputFiles } = params;

  const initialpath = inputFiles.find(isSvelteFilepath) ?? process.cwd();
  const existingOptions: CompilerOptions = {
    allowNonTsExtensions: true, // necessary for ts *.svelte file acceptance
    declaration: true, // Needed for d.ts file generation
    emitDeclarationOnly: true, // We only want d.ts file generation
    noEmit: false, // Set to true in case of jsconfig, force false, else nothing is emitted
  };

  const additionalParams = {
    existingOptions,
    extraFileExtensions: [
      {
        extension: "svelte",
        isMixedContent: true,
        scriptKind: ts.ScriptKind.Deferred,
      },
    ],
  };

  const tsconfig = getTsconfigFromPath(initialpath, additionalParams);
  const pcl = tsconfig.pcl!;

  if (
    pcl.options.moduleResolution === undefined ||
    pcl.options.moduleResolution === ts.ModuleResolutionKind.Classic
  ) {
    const moduleResolutionDefault =
      // NodeJS: up to 4.9, Node10: since 5.0
      (ts.ModuleResolutionKind as any).NodeJs ?? ts.ModuleResolutionKind.Node10; // Classic if not set, which gives wrong results

    pcl.options.moduleResolution = moduleResolutionDefault;
  }

  return tsconfig;
}

/**
 * @param params - TODO
 */
function main(params: Params): void {
  const { inputFiles, svelteShimsPath } = params;

  const rootNames = [svelteShimsPath, ...inputFiles];
  const tsconfig = prepareTsconfig(params);
  const pcl = tsconfig.pcl!;
  const host = createTsCompilerHost(params, pcl.options);

  const program = ts.createProgram({
    host,
    options: pcl.options,
    rootNames,
  });

  program.emit();
}

export default main;

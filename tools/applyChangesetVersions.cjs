/* eslint-env node */

const { readFileSync, writeFileSync } = require ("node:fs");
const yaml = require ("js-yaml");
const { basename, join } = require ("node:path");

/**
 * @typedef {("dependencies"|"devDependencies"|"peerDependencies")} DependencyType
 */

/**
 * @typedef {object} LocationVersion
 * @property {string} LocationVersion.location - package root path
 * @property {string} LocationVersion.version - current local version (from package.json)
 */

/**
 * @typedef {{ name ?:string; version ?:string; } & Partial<Record<DependencyType, Record<string, string>>>} PackageFile
 */

/**
 * @typedef {object} PnpmWorkspacesConfigContent
 * @property {string[]} [PnpmWorkspacesConfigContent.packages] - list of workspace packages
 */

/** @typedef {Map<string, LocationVersion>} WorkspaceVersionMap */

// ### ### ###

const workspaceConfigNamePnpm = "pnpm-workspace.yaml";

/** @type {DependencyType[]} */
const dependencyTypes_to_mutate = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
];

/**
 * Parses content of package.json at {@link location}
 * @param {string} location - path that contains a package.json file
 * @returns {ReturnType<typeof JSON.parse>} - parsed content of {@link location}/package.json
 */
const getPackageFileContentAt = (location) =>
  JSON.parse (readFileSync (`${location}/package.json`, "utf-8"));

/**
 * Replaces versions of workspace packages that are used as dependencies in other packages via something like 'workspace:\*'
 * @param {WorkspaceVersionMap} workspaceVersionMap - information about current versions and locations of packages
 */
function replaceVersions (workspaceVersionMap) {
  workspaceVersionMap.forEach ((lv/*, pkg*/) => {
    const { location } = lv;
    const packageFile = /** @type {PackageFile} */ getPackageFileContentAt (location);

    /**
     * takes a {@link DependencyType} and replaces versions of workspace packages
     * from something like 'workspace:\*' to current workspace version
     * NOTE: mutates <packageFile> in place
     * @param {DependencyType} depType - the dependency type
     */
    const mutuateDependencies = (depType) => {
      const dependencies = packageFile[depType] ?? {};
      const depNames = Object.keys (dependencies);

      depNames.forEach ((dep) => {
        if (workspaceVersionMap.has (dep)) {
          const lvDep = /** @type {LocationVersion} */ workspaceVersionMap.get (dep);

          dependencies[dep] = lvDep.version;
        }
      });
    };

    dependencyTypes_to_mutate.forEach (mutuateDependencies);

    const data = `${JSON.stringify (packageFile, null, 2)}\n`;

    writeFileSync (
      `${location}/package.json`,
      data,
      "utf-8"
    );
  });
}

/**
 * Generates a {@link WorkspaceVersionMap}.
 * @param {PnpmWorkspacesConfigContent} workspaces - pnpm workspaces definition TODO abstract away from pnpm specifics
 * @returns {WorkspaceVersionMap} - returns information (package path, version) about workspace packages
 */
function generateWorkspaceVersionsMap (workspaces) {
  /** @type {WorkspaceVersionMap} */
  const workspaceVersionMap = new Map (
    workspaces.packages?.map ((location) => {
      const packagejson = /** @type {PackageFile} */ getPackageFileContentAt (location);

      if (!packagejson.version) {
        throw new Error (`package.json for ${location} does not contain a member "version"`);
      }

      const key = packagejson.name ?? basename (location);
      const value = { location, version: packagejson.version };

      return [ key, value ];
    })
  );

  return workspaceVersionMap;
}

/**
 * Generates workspace definitions from pnpm config
 * @param {string} workspaceConfigPath - path to pnpm-workspace.yaml
 * @returns {PnpmWorkspacesConfigContent} - {@link PnpmWorkspacesConfigContent}
 */
function generateWorkspacesDefinitionsPnpm (workspaceConfigPath) {
  /** @type {PnpmWorkspacesConfigContent} */
  let content;

  try {
    const pnpmWorkspaceConfig = readFileSync (workspaceConfigPath, "utf-8");

    content = /** @type {PnpmWorkspacesConfigContent} */ yaml.load (pnpmWorkspaceConfig);
  } catch (cause) {
    const error = new Error (`Could not read workspaces configuration file '${workspaceConfigPath}'`, { cause });
    console.error (error);

    process.exit (1);
  }

  return content;
}

/**
 * Generates workspace definitions TODO abstract away from pnpm specifics
 * @param {(string)} configPath - filepath to a workspaces config file (ie pnpm-workspace.yaml)
 * @returns {PnpmWorkspacesConfigContent} - returns {PnpmWorkspacesConfigContent} in pnpm workspaces - others not implemented
 */
function generateWorkspacesDefinitions (configPath) {
  if (configPath.includes (workspaceConfigNamePnpm)) {
    return generateWorkspacesDefinitionsPnpm (configPath);
  } else {
    return {};
  }
}

/**
 * Main method of script
 */
function main () {
  const workspaceConfigPathPnpm = join (__dirname, `../${workspaceConfigNamePnpm}`);

  const workspaces = generateWorkspacesDefinitions (workspaceConfigPathPnpm);
  const workspaceVersionMap = generateWorkspaceVersionsMap (workspaces);

  replaceVersions (workspaceVersionMap);
}

main ();


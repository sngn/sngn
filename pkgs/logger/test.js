import { createLogger } from "./dist/esm/index.mjs";

const testGeneralFunctionality = () => {
  const logger = createLogger()("verbose");

  logger.verbose("test.js", "this is VERBOSE");
  logger.debug("test.js", "this is DEBUG");
  logger.info("test.js", "this is INFO");
  logger.warn("test.js", "this is WARN");
  logger.error("test.js", "this is ERROR");
  logger.silent("test.js", "this is SILENT");
};

testGeneralFunctionality();

"use strict";

module.exports = {
  rootDir: ".",
  testEnvironment: "node",
  setupFiles: [
    "./test/setupTests.js"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "test/.+\\.(test|spec)\\.ts$",
  testPathIgnorePatterns: [
    "<rootDir>/__mocks__/",
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "html"],
  coveragePathIgnorePatterns: [
    "<rootDir>/__mocks__/",
    "<rootDir>/dist/",
    "<rootDir>/test/",
    "<rootDir>/node_modules/",
  ],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: true,
    },
  },
};

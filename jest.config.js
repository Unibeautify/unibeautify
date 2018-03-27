"use strict";

module.exports = {
  rootDir: ".",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "test/.+\\.(test|spec)\\.ts$",
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "html"],
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json",
      enableTsDiagnostics: true
    }
  }
};

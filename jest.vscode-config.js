"use strict";

module.exports = Object.assign({}, require("./jest.config.js"), {
  testRegex: "dist/test/.+\\.(test|spec)\\.js$",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  collectCoverage: false,
});

import * as proxyquire from "proxyquire";
import {
  DependencyOptions,
  DependencyType,
  DependencyManager
} from "../../src/DependencyManager";

test.skip("should fail to load dependencies", () => {
  const CustomDependencyManager: typeof DependencyManager = proxyquire.noPreserveCache()(
    "../../src/DependencyManager/DependencyManager.js",
    {}
  ).DependencyManager;
  const options: DependencyOptions = {
    name: "FakeDep",
    package: "fakedep",
    type: DependencyType.Node
  };
  const manager = new CustomDependencyManager([options]);

  expect.assertions(1);
  expect(manager.load()).rejects.toThrowError(
    'Dependency "FakeDep" is required and not installed.'
  );
});

test.skip("should successfully load dependencies", () => {
  const CustomDependencyManager: typeof DependencyManager = proxyquire.noPreserveCache()(
    "../../src/DependencyManager/DependencyManager.js",
    {
      fakedep: {},
      "fakedep/package.json": {
        version: "1.0.0"
      }
    }
  ).DependencyManager;
  const options: DependencyOptions = {
    name: "FakeDep",
    package: "fakedep",
    type: DependencyType.Node
  };
  const manager = new CustomDependencyManager([options]);

  expect.assertions(1);
  expect(manager.load()).resolves.toBe(true);
});

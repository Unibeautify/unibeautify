import * as proxyquire from "proxyquire";
import {
  DependencyOptions,
  DependencyType,
  DependencyManager
} from "../../src/DependencyManager";

test("should fail to find language", () => {
  const CustomDependencyManager: typeof DependencyManager = proxyquire(
    "../../src/DependencyManager/index.ts",
    {}
  ).DependencyManager;
  const options: DependencyOptions = {
    name: "FakeDep",
    package: "fakedep",
    type: DependencyType.Node
  };
  const manager = new CustomDependencyManager([options]);
  expect(manager.load()).rejects.toThrowError(
    'Dependency "FakeDep" is required and not installed.'
  );
});

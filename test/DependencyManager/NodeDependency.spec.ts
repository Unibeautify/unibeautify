import {
  NodeDependency,
  DependencyType,
  DependencyOptions
} from "../../src/DependencyManager";

test("should fail to load Node dependency", async () => {
  expect.assertions(3);
  const options: DependencyOptions = {
    name: "NotFound",
    package: "NotFound",
    type: DependencyType.Node
  };
  const dependency = new NodeDependency(options);

  return await dependency.load().catch(error => {
    expect(error.message).toMatch(
      'Dependency "NotFound" is required and not installed.'
    );
    expect(dependency.isInstalled).toBe(false);
    expect(dependency.errors).toHaveLength(1);
  });
});

describe("successfully loaded Node dependency", () => {
  test("should successfully load Node dependency", async () => {
    expect.assertions(4);
    const options: DependencyOptions = {
      name: "FakeDep",
      package: "fakedep",
      type: DependencyType.Node
    };
    const dependency = new NodeDependency(options);

    return await dependency.load().then(isInstalled => {
      expect(isInstalled).toBe(true);
      expect(dependency.isInstalled).toBe(true);
      expect(dependency.errors).toHaveLength(0);
      expect(dependency.package).not.toBe(undefined);
    });
  });
});

import {
  DependencyOptions,
  DependencyType,
  DependencyManager,
  NodeDependency,
} from "../../src/DependencyManager";

test("should fail to load dependencies", async () => {
  expect.assertions(2);
  const options: DependencyOptions = {
    name: "NotFound",
    package: "notfound",
    type: DependencyType.Node,
  };
  const manager = new DependencyManager([options]);

  return await manager.load().catch(error => {
    expect(error.message).toMatch(
      'Dependency "NotFound" is required and not installed.'
    );
    expect(error.message).toMatch("Cannot find module notfound/package.json");
  });
});

describe("successfully loads dependency", () => {
  test("should successfully load dependencies", async () => {
    expect.assertions(1);
    const options: DependencyOptions = {
      name: "FakeDep",
      package: "fakedep",
      type: DependencyType.Node,
    };
    const manager = new DependencyManager([options]);

    return await expect(manager.load()).resolves.toBe(true);
  });

  test("should have package", async () => {
    expect.assertions(1);
    const packageName = "fakedep";
    const options: DependencyOptions = {
      name: packageName,
      package: packageName,
      type: DependencyType.Node,
    };
    const manager = new DependencyManager([options]);

    return await manager.load().then(() => {
      expect(manager.has(packageName)).toBe(true);
    });
  });

  test("should get package", async () => {
    expect.assertions(1);
    const packageName = "fakedep";
    const options: DependencyOptions = {
      name: packageName,
      package: packageName,
      type: DependencyType.Node,
    };
    const manager = new DependencyManager([options]);

    return await manager.load().then(() => {
      const dep = manager.get<NodeDependency>(packageName);
      expect(dep).not.toBe(undefined);
    });
  });

  test("should get package vesion", async () => {
    expect.assertions(6);
    const packageName = "fakedep";
    const options: DependencyOptions = {
      name: packageName,
      package: packageName,
      type: DependencyType.Node,
    };
    const manager = new DependencyManager([options]);

    return await manager.load().then(() => {
      expect(manager.has(packageName)).toBe(true);
      const dep = manager.get<NodeDependency>(packageName);
      expect(dep).not.toBe(undefined);
      if (dep) {
        expect(dep.version).not.toBe(undefined);
        if (dep.version) {
          expect(dep.version.rawVersion).toBe("1.0.0");
          expect(dep.version.isGreaterThan("0.1.0")).toBe(true);
          expect(dep.version.isGreaterThan("1.1.0")).toBe(false);
        }
      }
    });
  });
});

describe("get", () => {
  test("should throw error if package not found", async () => {
    expect.assertions(1);
    const packageName = "fakedep";
    const manager = new DependencyManager([]);
    return await manager.load().then(() => {
      expect(() => manager.get<NodeDependency>(packageName)).toThrowError();
    });
  });
});

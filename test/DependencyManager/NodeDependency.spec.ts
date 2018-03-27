import * as proxyquire from "proxyquire";
import {
  NodeDependency,
  DependencyType,
  DependencyOptions
} from "../../src/DependencyManager";

test("should fail to load Node dependency", async () => {
  expect.assertions(3);
  const CustomDependency = createDependency({}, {});
  const options: DependencyOptions = {
    name: "FakeDep",
    package: "fakedep",
    type: DependencyType.Node
  };
  const dependency = new CustomDependency(options);

  return await dependency.load().catch(error => {
    expect(error.message).toMatch(
      'Dependency "FakeDep" is required and not installed.'
    );
    expect(dependency.isInstalled).toBe(false);
    expect(dependency.errors).toHaveLength(1);
  });
});

test.skip("should successfully load Node dependency", async () => {
  expect.assertions(3);
  const CustomDependency = createDependency(
    {
      fakedep: {},
      "fakedep/package.json": {
        version: "1.0.0"
      }
    },
    {}
  );
  const options: DependencyOptions = {
    name: "FakeDep",
    package: "fakedep",
    type: DependencyType.Node
  };
  const dependency = new CustomDependency(options);

  return await dependency.load().then(isInstalled => {
    expect(isInstalled).toBe(true);
    expect(dependency.isInstalled).toBe(true);
    expect(dependency.errors).toHaveLength(0);
  });
});

function createDependency(
  local: RequireMap = {},
  global: RequireMap = {}
): typeof NodeDependency {
  function requireg(id: string) {
    return global[id];
  }
  try {
    const fake: any = proxyquire(
      "../../src/DependencyManager/NodeDependency.ts",
      {
        ...local,
        requireg
      }
    );
    return fake.NodeDependency;
  } catch (error) {
    console.error(error);
    const fake: any = proxyquire(
      "../../src/DependencyManager/NodeDependency.js",
      {
        ...local,
        requireg
      }
    );
    return fake.NodeDependency;
  }
}

interface RequireMap {
  [id: string]: any;
}

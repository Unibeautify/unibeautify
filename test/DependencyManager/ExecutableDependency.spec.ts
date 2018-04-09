import {
  ExecutableDependency,
  DependencyType,
  DependencyDefinition,
  DependencyOptions,
} from "../../src/DependencyManager";

describe("fail to load Executable dependency", () => {
  test("should fail to load Executable dependency", async () => {
    expect.assertions(4);
    const def: DependencyDefinition = {
      name: "NotFound",
      program: "NotFound",
      type: DependencyType.Executable,
    };
    const dependency = new ExecutableDependency(def);

    return await dependency.load().catch(error => {
      expect(error.message).toMatch(
        'Dependency "NotFound" is required and not installed.'
      );
      expect(error.message).toMatch("spawn NotFound ENOENT");
      expect(dependency.isInstalled).toBe(false);
      expect(dependency.errors).toHaveLength(1);
    });
  });

  test("should fail to load Executable dependency with incorrect path", () => {
    expect.assertions(4);
    const def: DependencyDefinition = {
      name: "Node",
      program: "node",
      type: DependencyType.Executable,
    };
    const options: DependencyOptions = {
      path: "/this/is/not/going/to/work",
    };
    const dependency = new ExecutableDependency(def, options);

    return dependency.load().catch(error => {
      expect(error.message).toMatch(
        'Dependency "Node" is required and not installed.'
      );
      expect(error.message).toMatch(`spawn ${options.path} ENOENT`);
      expect(dependency.isInstalled).toBe(false);
      expect(dependency.errors).toHaveLength(1);
    });
  });
});

describe("successfully load Executable dependency", () => {
  describe("Load", () => {
    test("should successfully load Executable dependency", async () => {
      expect.assertions(3);
      const options: DependencyDefinition = {
        name: "Node",
        program: "node",
        type: DependencyType.Executable,
      };
      const dependency = new ExecutableDependency(options);

      return await dependency.load().then(isInstalled => {
        expect(isInstalled).toBe(true);
        expect(dependency.isInstalled).toBe(true);
        expect(dependency.errors).toHaveLength(0);
      });
    });

    test("should successfully run command for Executable dependency", async () => {
      expect.assertions(2);
      const options: DependencyDefinition = {
        name: "Node",
        program: "node",
        type: DependencyType.Executable,
      };
      const dependency = new ExecutableDependency(options);

      return await dependency.load().then(() => {
        expect(dependency.isInstalled).toBe(true);
        return dependency.run({ args: ["--help"] }).then(({ stdout }) => {
          expect(stdout).toContain("node");
        });
      });
    });

    describe("Run", () => {
      test("should return stdout", () => {
        expect.assertions(2);
        const options: DependencyDefinition = {
          name: "Node",
          program: "node",
          type: DependencyType.Executable,
        };
        const dependency = new ExecutableDependency(options);
        return dependency.load().then(() => {
          expect(dependency.isInstalled).toBe(true);
          const stdout = "happy output";
          return dependency
            .run({
              args: ["-e", `console.log('${stdout}');`],
            })
            .then(result => {
              expect(result.stdout).toContain(stdout);
            });
        });
      });

      test("should return stderr", () => {
        expect.assertions(2);
        const options: DependencyDefinition = {
          name: "Node",
          program: "node",
          type: DependencyType.Executable,
        };
        const dependency = new ExecutableDependency(options);
        return dependency.load().then(() => {
          expect(dependency.isInstalled).toBe(true);
          const stderr = "sad output";
          return dependency
            .run({
              args: ["-e", `console.error('${stderr}');`],
            })
            .then(result => {
              expect(result.stderr).toContain(stderr);
            });
        });
      });

      test("should return exit code", () => {
        expect.assertions(3);
        const options: DependencyDefinition = {
          name: "Node",
          program: "node",
          type: DependencyType.Executable,
        };
        const dependency = new ExecutableDependency(options);
        return dependency.load().then(() => {
          expect(dependency.isInstalled).toBe(true);
          const exitCode = 123;
          return dependency
            .run({
              args: ["-e", `process.exit(${exitCode})`],
            })
            .then(result => {
              expect(typeof result.exitCode).toBe("number");
              expect(result.exitCode).toBe(exitCode);
            });
        });
      });

      test("should accept stdin parameter", () => {
        expect.assertions(2);
        const options: DependencyDefinition = {
          name: "Node",
          program: "node",
          type: DependencyType.Executable,
        };
        const dependency = new ExecutableDependency(options);
        return dependency.load().then(() => {
          expect(dependency.isInstalled).toBe(true);
          const stdin = "happy output";
          return dependency
            .run({
              args: [
                "-e",
                'console.log("start");process.stdin.pipe(process.stdout);',
              ],
              stdin,
            })
            .then(result => {
              expect(result.stdout).toContain(`start\n${stdin}`);
            });
        });
      });
    });

    test("should only load once", async () => {
      expect.assertions(5);
      const options: DependencyDefinition = {
        name: "Node",
        program: "node",
        type: DependencyType.Executable,
      };
      class CustomExecutableDependency extends ExecutableDependency {
        public reloadCount: number = 0;
        public reload(): Promise<boolean> {
          this.reloadCount += 1;
          return super.reload();
        }
      }
      const dependency = new CustomExecutableDependency(options);
      expect(dependency.reloadCount).toBe(0);
      return await dependency.load().then(() => {
        expect(dependency.isInstalled).toBe(true);
        expect(dependency.reloadCount).toBe(1);
        return dependency.load().then(() => {
          expect(dependency.isInstalled).toBe(true);
          expect(dependency.reloadCount).toBe(1);
        });
      });
    });
  });

  describe("Parse Version", () => {
    test("should successfully parse version with function", () => {
      expect.assertions(2);
      const options: DependencyDefinition = {
        name: "Node",
        parseVersion: (text: string) => {
          const matches = text.match(/v(\d+.\d+.\d+)/);
          return matches ? matches[1] : undefined;
        },
        program: "node",
        type: DependencyType.Executable,
      };
      const dependency = new ExecutableDependency(options);
      return dependency.load().then(() => {
        expect(dependency.isInstalled).toBe(true);
        return dependency.run({ args: ["--help"] }).then(({ stdout }) => {
          expect(stdout).toContain("node");
        });
      });
    });
    test("should successfully parse version with string pattern", () => {
      expect.assertions(2);
      const options: DependencyDefinition = {
        name: "Node",
        parseVersion: "v(\\d+.\\d+.\\d+)",
        program: "node",
        type: DependencyType.Executable,
      };
      const dependency = new ExecutableDependency(options);
      return dependency.load().then(() => {
        expect(dependency.isInstalled).toBe(true);
        return dependency.run({ args: ["--help"] }).then(({ stdout }) => {
          expect(stdout).toContain("node");
        });
      });
    });
    test("should successfully parse version with RegExp pattern", () => {
      expect.assertions(2);
      const options: DependencyDefinition = {
        name: "Node",
        parseVersion: /v(\d+\.\d+\.\d+)/,
        program: "node",
        type: DependencyType.Executable,
      };
      const dependency = new ExecutableDependency(options);
      return dependency.load().then(() => {
        expect(dependency.isInstalled).toBe(true);
        return dependency.run({ args: ["--help"] }).then(({ stdout }) => {
          expect(stdout).toContain("node");
        });
      });
    });

    test("should successfully parse version with array of string patterns", () => {
      expect.assertions(2);
      const options: DependencyDefinition = {
        name: "Node",
        parseVersion: ["invalid", "v(\\d+.\\d+.\\d+)"],
        program: "node",
        type: DependencyType.Executable,
      };
      const dependency = new ExecutableDependency(options);
      return dependency.load().then(() => {
        expect(dependency.isInstalled).toBe(true);
        return dependency.run({ args: ["--help"] }).then(({ stdout }) => {
          expect(stdout).toContain("node");
        });
      });
    });
    test("should successfully parse version with array of RegExp patterns", () => {
      expect.assertions(2);
      const options: DependencyDefinition = {
        name: "Node",
        parseVersion: [/invalid/, /v(\d+\.\d+\.\d+)/],
        program: "node",
        type: DependencyType.Executable,
      };
      const dependency = new ExecutableDependency(options);
      return dependency.load().then(() => {
        expect(dependency.isInstalled).toBe(true);
        return dependency.run({ args: ["--help"] }).then(({ stdout }) => {
          expect(stdout).toContain("node");
        });
      });
    });

    test("should successfully parse partial (major.minor) version with RegExp pattern", () => {
      expect.assertions(2);
      const options: DependencyDefinition = {
        name: "Node",
        parseVersion: /v(\d+\.\d+)/,
        program: "node",
        type: DependencyType.Executable,
      };
      const dependency = new ExecutableDependency(options);
      return dependency.load().then(() => {
        expect(dependency.isInstalled).toBe(true);
        return dependency.run({ args: ["--help"] }).then(({ stdout }) => {
          expect(stdout).toContain("node");
        });
      });
    });

    test("should fail to parse version from text without numbers with RegExp pattern", () => {
      expect.assertions(3);
      const options: DependencyDefinition = {
        name: "Node",
        parseVersion: /v/,
        program: "node",
        type: DependencyType.Executable,
      };
      const dependency = new ExecutableDependency(options);
      return dependency.load().catch(error => {
        expect(dependency.isInstalled).toBe(false);
        expect(error.message).toMatch(
          'Dependency "Node" is required and not installed.'
        );
        expect(error.message).toMatch("Invalid Version:");
      });
    });

    test("should successfully parse version and return first valid version from array of patterns", () => {
      expect.assertions(14);

      const options1: DependencyDefinition = {
        name: "Fake Program 1",
        parseVersion: ["invalid", "v(\\d+.\\d+.\\d+)", "v(\\d+)"],
        program: "node",
        type: DependencyType.Executable,
        versionArgs: ["-e", "console.log('v1.2.3')"],
      };
      const dependency1 = new ExecutableDependency(options1);
      const options2: DependencyDefinition = {
        name: "Fake Program 2",
        parseVersion: ["invalid", "v(\\d+)", "v(\\d+.\\d+.\\d+)"],
        program: "node",
        type: DependencyType.Executable,
        versionArgs: ["-e", "console.log('v1.2.3')"],
      };
      const dependency2 = new ExecutableDependency(options2);

      expect(dependency1.isInstalled).toBe(false);
      expect(dependency2.isInstalled).toBe(false);
      return Promise.all([dependency1.load(), dependency2.load()]).then(() => {
        expect(dependency1.isInstalled).toBe(true);
        expect(dependency2.isInstalled).toBe(true);

        expect(dependency1.version && dependency1.version.major).not.toBe(0);
        expect(dependency1.version && dependency1.version.major).toBe(1);
        expect(dependency2.version && dependency2.version.major).not.toBe(0);
        expect(dependency2.version && dependency2.version.major).toBe(1);

        expect(dependency1.version && dependency1.version.minor).not.toBe(0);
        expect(dependency1.version && dependency1.version.minor).toBe(2);
        expect(dependency2.version && dependency2.version.minor).toBe(0);

        expect(dependency1.version && dependency1.version.patch).not.toBe(0);
        expect(dependency1.version && dependency1.version.patch).toBe(3);
        expect(dependency2.version && dependency2.version.patch).toBe(0);
      });
    });
  });
});

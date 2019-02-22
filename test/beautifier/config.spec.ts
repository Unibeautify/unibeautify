import {
  Unibeautify,
  Language,
  Beautifier,
  DependencyDefinition,
  DependencyType,
  DependencyManager,
} from "../../src/";

beforeEach(() => {
  DependencyManager.clearRegistry();
});

describe("prefer beautifier config default", () => {
  test("should not resolve beautifier config", () => {
    expect.assertions(4);
    const unibeautify = new Unibeautify();
    const lang: Language = {
      atomGrammars: [],
      extensions: ["test"],
      name: "TestLang",
      namespace: "test",
      since: "0.1.0",
      sublimeSyntaxes: [],
      vscodeLanguages: [],
    };
    unibeautify.loadLanguage(lang);

    const beautifierResult = "Testing Result";
    const dependency: DependencyDefinition = {
      name: "Node",
      program: "node",
      type: DependencyType.Executable,
    };
    const resolveConfig = jest.fn();
    const beautifier: Beautifier = {
      beautify: ({ dependencies, beautifierConfig }) => {
        expect(() => dependencies.get(dependency.name)).not.toThrowError();
        expect(typeof beautifierConfig).toBe("object");
        expect(resolveConfig.mock.calls.length).toBe(0);
        return Promise.resolve(beautifierResult);
      },
      dependencies: [dependency],
      name: "TestBeautify",
      options: {
        TestLang: false,
      },
      resolveConfig: resolveConfig as any,
    };
    unibeautify.loadBeautifier(beautifier);
    return expect(
      unibeautify.beautify({
        languageName: lang.name,
        options: {
          [lang.name]: {
            [beautifier.name]: {},
          },
        },
        text: "test",
      })
    ).resolves.toBe(beautifierResult);
  });
});

describe("prefer beautifier config disabled", () => {
  test("should not resolve beautifier config", () => {
    expect.assertions(4);
    const unibeautify = new Unibeautify();
    const lang: Language = {
      atomGrammars: [],
      extensions: ["test"],
      name: "TestLang",
      namespace: "test",
      since: "0.1.0",
      sublimeSyntaxes: [],
      vscodeLanguages: [],
    };
    unibeautify.loadLanguage(lang);

    const beautifierResult = "Testing Result";
    const dependency: DependencyDefinition = {
      name: "Node",
      program: "node",
      type: DependencyType.Executable,
    };
    const resolveConfig = jest.fn();
    const beautifier: Beautifier = {
      beautify: ({ dependencies, beautifierConfig }) => {
        expect(() => dependencies.get(dependency.name)).not.toThrowError();
        expect(typeof beautifierConfig).toBe("object");
        expect(resolveConfig.mock.calls.length).toBe(0);
        return Promise.resolve(beautifierResult);
      },
      dependencies: [dependency],
      name: "TestBeautify",
      options: {
        TestLang: false,
      },
      resolveConfig: resolveConfig as any,
    };
    unibeautify.loadBeautifier(beautifier);
    return expect(
      unibeautify.beautify({
        languageName: lang.name,
        options: {
          [lang.name]: {
            [beautifier.name]: {
              prefer_beautifier_config: false,
            },
          },
        },
        text: "test",
      })
    ).resolves.toBe(beautifierResult);
  });
});

describe("prefer beautifier config enabled", () => {
  test("should resolve beautifier config", () => {
    expect.assertions(3);
    const unibeautify = new Unibeautify();
    const lang: Language = {
      atomGrammars: [],
      extensions: ["test"],
      name: "TestLang",
      namespace: "test",
      since: "0.1.0",
      sublimeSyntaxes: [],
      vscodeLanguages: [],
    };
    unibeautify.loadLanguage(lang);

    const beautifierResult = "Testing Result";
    const dependency: DependencyDefinition = {
      name: "Node",
      program: "node",
      type: DependencyType.Executable,
    };
    const beautifier: Beautifier = {
      beautify: ({ dependencies, beautifierConfig }) => {
        expect(() => dependencies.get(dependency.name)).not.toThrowError();
        return Promise.resolve(beautifierConfig && beautifierConfig.config);
      },
      dependencies: [dependency],
      name: "TestBeautify",
      options: {
        TestLang: false,
      },
      resolveConfig: ({ dependencies, filePath, projectPath }) => {
        expect(() => dependencies.get(dependency.name)).not.toThrowError();
        return Promise.resolve({
          config: beautifierResult,
          filePath: filePath,
        });
      },
    };
    unibeautify.loadBeautifier(beautifier);
    return expect(
      unibeautify.beautify({
        languageName: lang.name,
        options: {
          [lang.name]: {
            [beautifier.name]: {
              prefer_beautifier_config: true,
            },
          },
        },
        text: "test",
      })
    ).resolves.toBe(beautifierResult);
  });
});

describe("prefer beautifier config enabled", () => {
  test("should use path to beautifier config file", () => {
    const unibeautify = new Unibeautify();
    const lang: Language = {
      atomGrammars: [],
      extensions: ["test"],
      name: "TestLang",
      namespace: "test",
      since: "0.1.0",
      sublimeSyntaxes: [],
      vscodeLanguages: [],
    };
    unibeautify.loadLanguage(lang);

    const beautifierResult = "C:\\path1\\path2";
    const dependency: DependencyDefinition = {
      name: "Node",
      program: "node",
      type: DependencyType.Executable,
    };
    const beautifier: Beautifier = {
      beautify: ({ dependencies, beautifierConfig }) => {
        expect(() => dependencies.get(dependency.name)).not.toThrowError();
        return Promise.resolve(
          beautifierConfig &&
            (beautifierConfig.filePath || beautifierConfig.config)
        );
      },
      dependencies: [dependency],
      name: "TestBeautify",
      options: {
        TestLang: false,
      },
    };
    unibeautify.loadBeautifier(beautifier);
    return expect(
      unibeautify.beautify({
        languageName: lang.name,
        options: {
          [lang.name]: {
            [beautifier.name]: {
              beautifier_config_path: beautifierResult,
              prefer_beautifier_config: true,
            },
          },
        },
        text: "test",
      })
    ).resolves.toBe(beautifierResult);
  });
});

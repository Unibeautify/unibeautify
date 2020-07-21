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

test("should throw Error when dependency type is unknown", () => {
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
    const dependency: any = {
        type: "wrong",
    };
    const beautifier: Beautifier = {
        beautify: () => {
            return Promise.resolve(beautifierResult);
        },
        dependencies: [dependency],
        name: "TestBeautify",
        options: {
            TestLang: false,
        },
    };
    return expect(() => {
        unibeautify.loadBeautifier(beautifier);
    }).toThrowError('Dependency type not found for: {"type":"wrong"}');
});

describe("Node", () => {
    test("should throw Error when dependency is not installed", () => {
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
            name: "Fakedep",
            package: "fake",
            type: DependencyType.Node,
        };
        const beautifier: Beautifier = {
            beautify: () => {
                return Promise.resolve(beautifierResult);
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
                languageName: "TestLang",
                options: {},
                text: "test",
            })
        ).rejects.toThrowError(
            'Dependency "Fakedep" is required and not installed.'
        );
    });
});

describe("Executable", () => {
    test("should throw Error when dependency is not installed", () => {
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
            name: "Fake Program",
            parseVersion: text => "",
            program: "fakeprogram",
            type: DependencyType.Executable,
        };
        const beautifier: Beautifier = {
            beautify: ({ dependencies }) => {
                dependencies.get(dependency.name);
                return Promise.resolve(beautifierResult);
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
                languageName: "TestLang",
                options: {},
                text: "test",
            })
        ).rejects.toThrowError(
            'Dependency "Fake Program" is required and not installed.'
        );
    });

    test("should successfully beautify text when dependency is installed", () => {
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
            beautify: ({ dependencies }) => {
                expect(() =>
                    dependencies.get(dependency.name)
                ).not.toThrowError();
                return Promise.resolve(beautifierResult);
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
                languageName: "TestLang",
                options: {},
                text: "test",
            })
        ).resolves.toBe(beautifierResult);
    });

    test("should throw Error when path configuration for dependency is incorrect", () => {
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
            beautify: ({ dependencies }) => {
                dependencies.get(dependency.name);
                return Promise.resolve(beautifierResult);
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
                languageName: "TestLang",
                options: {
                    TestLang: {
                        [beautifier.name]: {
                            Node: {
                                path: "/this/path/is/wrong",
                            },
                        } as any,
                    },
                },
                text: "test",
            })
        ).rejects.toThrowError(
            'Dependency "Node" is required and not installed.'
        );
    });
});

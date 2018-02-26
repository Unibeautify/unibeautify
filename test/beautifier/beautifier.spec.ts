import { Unibeautify, Language, Beautifier } from "../../src/";

test("should load beautifier", () => {
  const unibeautify = new Unibeautify();
  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      TestLang: false
    }
  };
  unibeautify.loadBeautifier(beautifier);
  expect(unibeautify.loadedBeautifiers.map(curr => curr.name)).toEqual([
    beautifier.name
  ]);
});

test("should load beautifiers", () => {
  const unibeautify = new Unibeautify();
  const beautifierResult = "Testing Result";
  const beautifier1: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify1",
    options: {
      TestLang: false
    }
  };
  const beautifier2: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify2",
    options: {
      TestLang: false
    }
  };
  unibeautify.loadBeautifiers([beautifier1, beautifier2]);
  expect(unibeautify.loadedBeautifiers.map(curr => curr.name)).toEqual([
    beautifier1.name,
    beautifier2.name
  ]);
});

test("should successfully beautify text", () => {
  const unibeautify = new Unibeautify();
  const lang: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang",
    namespace: "test",
    since: "0.1.0",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  unibeautify.loadLanguage(lang);

  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      TestLang: false
    }
  };
  unibeautify.loadBeautifier(beautifier);

  return expect(
    unibeautify.beautify({
      languageName: "TestLang",
      options: {},
      text: "test"
    })
  ).resolves.toBe(beautifierResult);
});

test("should fail to find beautifier", () => {
  const unibeautify = new Unibeautify();
  const lang: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang",
    namespace: "test",
    since: "0.1.0",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  unibeautify.loadLanguage(lang);

  return expect(
    unibeautify.beautify({
      languageName: "TestLang",
      options: {},
      text: "test"
    })
  ).rejects.toThrowError(`Beautifiers not found for Language: ${lang.name}`);
});

test("should fail to find language", () => {
  const unibeautify = new Unibeautify();

  return expect(
    unibeautify.beautify({
      languageName: "TestLang",
      options: {},
      text: "test"
    })
  ).rejects.toThrowError("Cannot find language.");
});

test("should successfully transform option values for beautifier", () => {
  const unibeautify = new Unibeautify();
  const lang1: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang1",
    namespace: "test",
    since: "0.1.0",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  const lang2: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang2",
    namespace: "test",
    since: "0.1.0",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  unibeautify.loadLanguages([lang1, lang2]);

  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      _: {
        globalOption: true,
        willBeReplaced: "globalOption"
      },
      [lang1.name]: {
        basicTransform: num => num + 1,
        complexTransform: [
          ["value1", "basicTransform"],
          optionValues => optionValues.value1 + optionValues.basicTransform
        ],
        renamed1: "value1",
        value1: true,
        willBeReplaced: "value1"
      },
      [lang2.name]: true
    }
  };
  unibeautify.loadBeautifier(beautifier);

  const options = {
    basicTransform: 2,
    globalOption: 789,
    value1: 123
  };
  const result1 = Unibeautify.getOptionsForBeautifier(
    beautifier,
    lang1,
    options
  );
  expect(result1.value1).toEqual(options.value1); // "Allow option"
  expect(result1.renamed1).toEqual(options.value1); // "Rename option"
  expect(result1.basicTransform).toEqual(options.basicTransform + 1); // "Perform basic transformation"
  expect(result1.complexTransform).toEqual(
    options.value1 + options.basicTransform
  ); // "Perform complex transformation"
  expect(result1.globalOption).toEqual(options.globalOption); // "Include global option"
  expect(result1.willBeReplaced).toEqual(options.value1); // "Replace global option with language-specific option"
  expect(result1).toEqual({
    basicTransform: options.basicTransform + 1,
    complexTransform: options.value1 + options.basicTransform,
    globalOption: options.globalOption,
    renamed1: options.value1,
    value1: options.value1,
    willBeReplaced: options.value1
  });

  const result2 = Unibeautify.getOptionsForBeautifier(
    beautifier,
    lang2,
    options
  );
  expect(result2.globalOption).toEqual(options.globalOption); // "Include global option"
  expect(result2.willBeReplaced).toEqual(options.globalOption); // "Replace global option with language-specific option"
  expect(result2).toEqual({
    globalOption: options.globalOption,
    willBeReplaced: options.globalOption
  });
});

test("should successfully ignore-next-line", () => {
  const unibeautify = new Unibeautify();
  const lang: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang",
    namespace: "test",
    since: "0.1.0",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  unibeautify.loadLanguage(lang);

  const originalText = "// unibeautify:ignore-next-line\ntest";
  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      TestLang: false
    }
  };
  unibeautify.loadBeautifier(beautifier);

  return expect(
    unibeautify.beautify({
      languageName: "TestLang",
      options: {},
      text: originalText
    })
  ).resolves.toBe(originalText);
});

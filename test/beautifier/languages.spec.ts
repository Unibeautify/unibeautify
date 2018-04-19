import { Unibeautify, Language, Beautifier, OptionsRegistry } from "../../src/";

test("should get all loaded languages", () => {
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
  expect(
    unibeautify.getLoadedLanguages().map(({ name }) => name)
  ).toEqual([lang.name]);
});

test("should return empty array when no languages are supported with a beautifier", () => {
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
  expect(unibeautify.supportedLanguages.map(({ name }) => name)).toEqual([]);
});

test("should supported languages", () => {
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
  const beautifier: Beautifier = {
    beautify: () => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      TestLang: false,
    },
  };
  unibeautify.loadBeautifier(beautifier);
  expect(unibeautify.supportedLanguages.map(({ name }) => name)).toEqual([
    lang.name,
  ]);
});

test("should loaded languages which support a given beautifier", () => {
  const unibeautify = new Unibeautify();
  const lang1: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang1",
    namespace: "test",
    since: "0.1.0",
    sublimeSyntaxes: [],
    vscodeLanguages: [],
  };
  const lang2: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang2",
    namespace: "test",
    since: "0.1.0",
    sublimeSyntaxes: [],
    vscodeLanguages: [],
  };
  unibeautify.loadLanguages([lang1, lang2]);
  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    beautify: () => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      [lang1.name]: false,
    },
  };
  unibeautify.loadBeautifier(beautifier);
  expect(
    unibeautify.getLanguagesForBeautifier(beautifier).map(({ name }) => name)
  ).toEqual([lang1.name]);
});

test("should loaded languages which support a given beautifier", () => {
  const unibeautify = new Unibeautify();
  const lang1: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang1",
    namespace: "test",
    since: "0.1.0",
    sublimeSyntaxes: [],
    vscodeLanguages: [],
  };
  const lang2: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang2",
    namespace: "test",
    since: "0.1.0",
    sublimeSyntaxes: [],
    vscodeLanguages: [],
  };
  unibeautify.loadLanguages([lang1, lang2]);
  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    beautify: () => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      [lang1.name]: false,
    },
  };
  unibeautify.loadBeautifier(beautifier);
  expect(
    unibeautify.getBeautifiersForLanguage(lang1).map(({ name }) => name)
  ).toEqual([beautifier.name]);
  expect(
    unibeautify.getBeautifiersForLanguage(lang2).map(({ name }) => name)
  ).toEqual([]);
});

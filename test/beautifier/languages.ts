import test from "ava";
import { Unibeautify, Language, Beautifier, OptionsRegistry } from "../../src/";

test("should get all loaded languages", (t) => {
  const unibeautify = new Unibeautify();
  const lang: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang",
    namespace: "test",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  unibeautify.loadLanguage(lang);
  t.deepEqual(unibeautify.getLoadedLanguages().map(({ name }) => name), [lang.name]);
});

test("should return empty array when no languages are supported with a beautifier", (t) => {
  const unibeautify = new Unibeautify();
  const lang: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang",
    namespace: "test",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  unibeautify.loadLanguage(lang);
  t.deepEqual(unibeautify.supportedLanguages.map(({ name }) => name), []);
});

test("should supported languages", (t) => {
  const unibeautify = new Unibeautify();
  const lang: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang",
    namespace: "test",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  unibeautify.loadLanguage(lang);
  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    beautify: ({
        Promise
      }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      TestLang: false
    },
  };
  unibeautify.loadBeautifier(beautifier);
  t.deepEqual(unibeautify.supportedLanguages.map(({ name }) => name), [lang.name]);
});

test("should loaded languages which support a given beautifier", (t) => {
  const unibeautify = new Unibeautify();
  const lang1: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang1",
    namespace: "test",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  const lang2: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang2",
    namespace: "test",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  unibeautify.loadLanguages([lang1, lang2]);
  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    beautify: ({
        Promise
      }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      [lang1.name]: false
    },
  };
  unibeautify.loadBeautifier(beautifier);
  t.deepEqual(unibeautify.getLanguagesForBeautifier(beautifier).map(({ name }) => name), [lang1.name]);
});


test("should loaded languages which support a given beautifier", (t) => {
  const unibeautify = new Unibeautify();
  const lang1: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang1",
    namespace: "test",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  const lang2: Language = {
    atomGrammars: [],
    extensions: ["test"],
    name: "TestLang2",
    namespace: "test",
    sublimeSyntaxes: [],
    vscodeLanguages: []
  };
  unibeautify.loadLanguages([lang1, lang2]);
  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    beautify: ({
        Promise
      }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      [lang1.name]: false
    },
  };
  unibeautify.loadBeautifier(beautifier);
  t.deepEqual(unibeautify.getBeautifiersForLanguage(lang1).map(({ name }) => name), [beautifier.name]);
  t.deepEqual(unibeautify.getBeautifiersForLanguage(lang2).map(({ name }) => name), []);
});

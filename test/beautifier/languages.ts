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

import test from "ava";
import { Unibeautify, Language, Beautifier } from "../src/";

test("should successfully beautify text", (t) => {

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

  return unibeautify.beautify({
    languageName: "TestLang",
    options: {},
    text: "test",
  })
    .then((results) => {
      t.is(results, beautifierResult);
    });

});

test("should fail to find beautifier", (t) => {

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

  return unibeautify.beautify({
    languageName: "TestLang",
    options: {},
    text: "test",
  })
    .then((results) => {
      t.fail(results);
    })
    .catch((error) => {
      t.is(error.message, `Beautifier not found for Language: ${lang.name}`);
    });

});

test("should fail to find language", (t) => {

  const unibeautify = new Unibeautify();

  return unibeautify.beautify({
    languageName: "TestLang",
    options: {},
    text: "test",
  })
    .then((results) => {
      t.fail(results);
    })
    .catch((error) => {
      t.is(error.message, "Cannot find language.");
    });

});

test("should successfully transform option values for beautifier", (t) => {

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
      _: {
        globalOption: true,
        willBeReplaced: "globalOption",
      },
      TestLang: {
        basicTransform: (num) => num + 1,
        complexTransform: [["value1", "basicTransform"], (optionValues) => optionValues.value1 + optionValues.basicTransform],
        renamed1: "value1",
        value1: true,
        willBeReplaced: "value1",
      },
    },
  };
  unibeautify.loadBeautifier(beautifier);

  const options = {
    basicTransform: 2,
    globalOption: 789,
    value1: 123,
  };
  const result = Unibeautify.getOptionsForBeautifier(beautifier, lang, options);

  t.is(result.value1, options.value1, "Allow option");
  t.is(result.renamed1, options.value1, "Rename option");
  t.is(result.basicTransform, options.basicTransform + 1, "Perform basic transformation");
  t.is(result.complexTransform, options.value1 + options.basicTransform, "Perform complex transformation");
  t.is(result.globalOption, options.globalOption, "Include global option");
  t.is(result.willBeReplaced, options.value1, "Replace global option with language-specific option");

  t.deepEqual(result, {
    basicTransform: options.basicTransform + 1,
    complexTransform: options.value1 + options.basicTransform,
    globalOption: options.globalOption,
    renamed1: options.value1,
    value1: options.value1,
    willBeReplaced: options.value1,
  });

});

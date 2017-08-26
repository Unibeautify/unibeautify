import test from "ava";
import {Unibeautify, Language, Beautifier} from "../src/";

test("should successfully beautify text", (t) => {

    const b = new Unibeautify();
    const lang: Language = {
      atomGrammars: [],
      extensions: ["test"],
      name: "TestLang",
      namespace: "test",
      sublimeSyntaxes: [],
      vscodeLanguages: []
    };
    b.loadLanguage(lang);

    const beautifierResult = "Testing Result";
    const beautifier: Beautifier = {
      name: "TestBeautify",
      options: {
        TestLang: false
      },
      beautify({
        Promise
      }) {
        return Promise.resolve(beautifierResult);
      }
    };
    b.loadBeautifier(beautifier);

    return b.beautify({
      languageName: "TestLang",
      options: {},
      text: "test",
    })
    .then((results) => {
      t.is(results, beautifierResult);
    });

});

test("should fail to find beautifier", (t) => {

    const b = new Unibeautify();
    const lang: Language = {
      atomGrammars: [],
      extensions: ["test"],
      name: "TestLang",
      namespace: "test",
      sublimeSyntaxes: [],
      vscodeLanguages: []
    };
    b.loadLanguage(lang);

    return b.beautify({
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

    const b = new Unibeautify();

    return b.beautify({
      languageName: "TestLang",
      options: {},
      text: "test",
    })
    .then((results) => {
      t.fail(results);
    })
    .catch((error) => {
      t.is(error.message, `Cannot find language.`);
    });

});

test("should successfully transform option values for beautifier", (t) => {

    const b = new Unibeautify();
    const lang: Language = {
      atomGrammars: [],
      extensions: ["test"],
      name: "TestLang",
      namespace: "test",
      sublimeSyntaxes: [],
      vscodeLanguages: []
    };
    b.loadLanguage(lang);

    const beautifierResult = "Testing Result";
    const beautifier: Beautifier = {
      name: "TestBeautify",
      options: {
        _: {
          globalOption: true,
          willBeReplaced: "globalOption",
        },
        TestLang: {
          value1: true,
          renamed1: "value1",
          basicTransform: (n) => n + 1,
          complexTransform: [["value1", "basicTransform"], (options) => options.value1 + options.basicTransform],
          willBeReplaced: "value1"
        }
      },
      beautify({
        Promise
      }) {
        return Promise.resolve(beautifierResult);
      }
    };
    b.loadBeautifier(beautifier);

    const options = {
      value1: 123,
      basicTransform: 2,
      globalOption: 789,
    };
    const result = Unibeautify.getOptionsForBeautifier(beautifier, lang, options);

    t.is(result.value1, options.value1, "Allow option");
    t.is(result.renamed1, options.value1, "Rename option");
    t.is(result.basicTransform, options.basicTransform + 1, "Perform basic transformation");
    t.is(result.complexTransform, options.value1 + options.basicTransform, "Perform complex transformation");
    t.is(result.globalOption, options.globalOption, "Include global option");
    t.is(result.willBeReplaced, options.value1, "Replace global option with language-specific option");

    t.deepEqual(result, {
      value1: options.value1,
      renamed1: options.value1,
      basicTransform: options.basicTransform + 1,
      complexTransform: options.value1 + options.basicTransform,
      globalOption: options.globalOption,
      willBeReplaced: options.value1,
    });

});

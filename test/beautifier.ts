import test from "ava";
import {Unibeautify, Language, Beautifier} from "../src/";

test("should successfully beautify text", (t) => {

    const b = new Unibeautify();
    const lang: Language = {
      atomGrammars: [],
      extensions: ["test"],
      name: "TestLang",
      namespace: "test",
      sublimeSyntaxes: []
    };
    b.loadLanguage(lang);

    const beautifierResult = "Testing Result";
    const beautifier: Beautifier = {
      name: "TestBeautify",
      options: {
        "TestLang": false
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
      sublimeSyntaxes: []
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

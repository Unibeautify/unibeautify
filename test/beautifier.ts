import test from "ava";
import {Unibeautify, Language, Beautifier} from "../src/";

test("should successfully beautify text", (t) => {

    const b = new Unibeautify();
    const lang: Language = {
      name: "TestLang",
      namespace: "test",
      extensions: ["test"],
      atomGrammars: [],
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
      text: "test",
      languageName: "TestLang",
      options: {}
    })
    .then((results) => {
      t.is(results, beautifierResult);
    });

});

test("should fail to find beautifier", (t) => {

    const b = new Unibeautify();
    const lang: Language = {
      name: "TestLang",
      namespace: "test",
      extensions: ["test"],
      atomGrammars: [],
      sublimeSyntaxes: []
    };
    b.loadLanguage(lang);

    return b.beautify({
      text: "test",
      languageName: "TestLang",
      options: {}
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
      text: "test",
      languageName: "TestLang",
      options: {}
    })
    .then((results) => {
      t.fail(results);
    })
    .catch((error) => {
      t.is(error.message, `Cannot find language.`);
    });

});

import test from "ava";
import unibeautify, {Beautifier} from "../src/";
import * as _ from "lodash";

test("should fail to find language", (t) => {

    return unibeautify.beautify({
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

test("should find JavaScript language and no Beautifier for Language", (t) => {

    return unibeautify.beautify({
      text: "test",
      languageName: "JavaScript",
      options: {}
    })
    .then((results) => {
      t.fail(results);
    })
    .catch((error) => {
      t.is(error.message, `Beautifier not found for Language: JavaScript`);
    });

});

test("should find JavaScript Language and Beautifier", (t) => {

  const unibeautify2 = _.cloneDeep(unibeautify);

  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    name: "JavaScript Beautifier",
    options: {
      "JavaScript": false
    },
    beautify({
      Promise
    }) {
      return Promise.resolve(beautifierResult);
    }
  };
  unibeautify2.loadBeautifier(beautifier);

  return unibeautify2.beautify({
    text: "test",
    languageName: "JavaScript",
    options: {}
  })
  .then((results) => {
    t.is(results, beautifierResult);
  })
  .catch((error) => {
    t.fail(error);
  });

});


test.failing("should find JavaScript Language and not Beautifier", (t) => {

  const unibeautify2 = _.cloneDeep(unibeautify);

  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    name: "Not JavaScript Beautifier",
    options: {
      "Not JavaScript": false
    },
    beautify({
      Promise
    }) {
      return Promise.resolve(beautifierResult);
    }
  };
  unibeautify2.loadBeautifier(beautifier);

  return unibeautify2.beautify({
    text: "test",
    languageName: "JavaScript",
    options: {}
  })
  .then((results) => {
    t.fail("Should not have found beautifier");
  })
  .catch((error) => {
    t.is(error.message, `Beautifier not found for Language: JavaScript`);
  });

});

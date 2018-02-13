import unibeautify, { Beautifier } from "../src/";
import * as _ from "lodash";

test("should fail to find language", () => {
  expect(
    unibeautify.beautify({
      languageName: "TestLang",
      options: {},
      text: "test"
    })
  ).rejects.toThrowError("Cannot find language.");
});

test("should find JavaScript language and no Beautifier for Language", () => {
  expect(
    unibeautify.beautify({
      languageName: "JavaScript",
      options: {},
      text: "test"
    })
  ).rejects.toThrowError("Beautifiers not found for Language: JavaScript");
});

test("should find JavaScript Language and Beautifier", () => {
  expect.assertions(1);
  const unibeautify2 = _.cloneDeep(unibeautify);

  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "JavaScript Beautifier",
    options: {
      JavaScript: false
    }
  };
  unibeautify2.loadBeautifier(beautifier);

  return expect(
    unibeautify2.beautify({
      languageName: "JavaScript",
      options: {},
      text: "test"
    })
  ).resolves.toEqual(beautifierResult);
});

test("should find JavaScript Language and not Beautifier", () => {
  const unibeautify2 = _.cloneDeep(unibeautify);

  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "Not JavaScript Beautifier",
    options: {
      "Not JavaScript": false
    }
  };
  unibeautify2.loadBeautifier(beautifier);

  return expect(
    unibeautify2.beautify({
      languageName: "JavaScript",
      options: {},
      text: "test"
    })
  ).rejects.toThrowError("Beautifiers not found for Language: JavaScript");
});

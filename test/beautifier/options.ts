import test from "ava";
import { Unibeautify, Language, Beautifier, OptionsRegistry } from "../../src/";

test("should get all loaded options", (t) => {
  const unibeautify = new Unibeautify();
  const options1: OptionsRegistry = {
    op1: {
      default: false,
      description:
        "Test option",
      type: "boolean"
    },
  };
  unibeautify.loadOptions(options1);
  const options2: OptionsRegistry = {
    op2: {
      default: false,
      description:
        "Test option",
      type: "boolean"
    },
  };
  unibeautify.loadOptions(options2);
  t.deepEqual(Object.keys(unibeautify.loadedOptions), [
    ...Object.keys(options1),
    ...Object.keys(options2),
  ]);
});

test("should get languages with loaded beautifiers supporting option", (t) => {
  const unibeautify = new Unibeautify();
  const optionName = "op1";
  const options1: OptionsRegistry = {
    [optionName]: {
      default: false,
      description:
        "Test option",
      type: "boolean"
    },
  };
  unibeautify.loadOptions(options1);
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
      [lang1.name]: {
        [optionName]: true,
      },
    },
  };
  unibeautify.loadBeautifier(beautifier);
  t.deepEqual(unibeautify.getLanguagesSupportingOption(optionName).map(({ name }) => name), [lang1.name]);
});

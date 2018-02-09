import test from "ava";
import { Unibeautify, Language, Beautifier, OptionsRegistry } from "../../src/";

test("should get all loaded options", t => {
  const unibeautify = new Unibeautify();
  const options1: OptionsRegistry = {
    op1: {
      default: false,
      description: "Test option",
      type: "boolean"
    }
  };
  unibeautify.loadOptions(options1);
  const options2: OptionsRegistry = {
    op2: {
      default: false,
      description: "Test option",
      type: "boolean"
    }
  };
  unibeautify.loadOptions(options2);
  t.deepEqual(Object.keys(unibeautify.loadedOptions), [
    ...Object.keys(options1),
    ...Object.keys(options2)
  ]);
});

test("should get languages with a loaded beautifier supporting the given option", t => {
  const unibeautify = new Unibeautify();
  const optionName = "op1";
  const options1: OptionsRegistry = {
    [optionName]: {
      default: false,
      description: "Test option",
      type: "boolean"
    }
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
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      [lang1.name]: {
        [optionName]: true
      }
    }
  };
  unibeautify.loadBeautifier(beautifier);
  t.deepEqual(
    unibeautify
      .getLanguagesSupportingOption(optionName)
      .map(({ name }) => name),
    [lang1.name]
  );
});

test("should get beautifiers with a loaded language supporting the given option", t => {
  const unibeautify = new Unibeautify();
  const optionName = "op1";
  const options1: OptionsRegistry = {
    [optionName]: {
      default: false,
      description: "Test option",
      type: "boolean"
    }
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
  const beautifier1: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify1",
    options: {
      [lang1.name]: {
        [optionName]: false
      }
    }
  };
  const beautifier2: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify2",
    options: {
      [lang1.name]: {
        [optionName]: true
      }
    }
  };
  unibeautify.loadBeautifiers([beautifier1, beautifier2]);
  t.deepEqual(
    unibeautify
      .getBeautifiersSupportingOption(optionName)
      .map(({ name }) => name),
    [beautifier2.name]
  );
});

test("should correctly detect whether beautifier supports option for a language", t => {
  const unibeautify = new Unibeautify();
  const optionName = "op1";
  const options1: OptionsRegistry = {
    [optionName]: {
      default: false,
      description: "Test option",
      type: "boolean"
    }
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
  const beautifier1: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify1",
    options: {
      [lang1.name]: {
        [optionName]: false
      }
    }
  };
  const beautifier2: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify2",
    options: {
      [lang1.name]: {
        [optionName]: true
      }
    }
  };
  t.is(
    unibeautify.doesBeautifierSupportOptionForLanguage({
      beautifier: beautifier1,
      language: lang1,
      optionName
    }),
    false
  );
  t.is(
    unibeautify.doesBeautifierSupportOptionForLanguage({
      beautifier: beautifier2,
      language: lang1,
      optionName
    }),
    true
  );
  t.is(
    unibeautify.doesBeautifierSupportOptionForLanguage({
      beautifier: beautifier1,
      language: lang2,
      optionName
    }),
    false
  );
  t.is(
    unibeautify.doesBeautifierSupportOptionForLanguage({
      beautifier: beautifier2,
      language: lang2,
      optionName
    }),
    false
  );
});

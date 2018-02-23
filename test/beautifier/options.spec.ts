import { Unibeautify, Language, Beautifier, OptionsRegistry } from "../../src/";

test("should get all loaded options", () => {
  const unibeautify = new Unibeautify();
  const options1: OptionsRegistry = {
    op1: {
      default: false,
      description: "Test option",
      since: "0.0.0",
      type: "boolean"
    }
  };
  unibeautify.loadOptions(options1);
  const options2: OptionsRegistry = {
    op2: {
      default: false,
      description: "Test option",
      since: "0.0.0",
      type: "boolean"
    }
  };
  unibeautify.loadOptions(options2);
  expect(Object.keys(unibeautify.loadedOptions)).toEqual([
    ...Object.keys(options1),
    ...Object.keys(options2)
  ]);
});

test("should get languages with a loaded beautifier supporting the given option", () => {
  const unibeautify = new Unibeautify();
  const optionName = "op1";
  const options1: OptionsRegistry = {
    [optionName]: {
      default: false,
      description: "Test option",
      since: "0.0.0",
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
  expect(
    unibeautify.getLanguagesSupportingOption(optionName).map(({ name }) => name)
  ).toEqual([lang1.name]);
});

test("should get beautifiers with a loaded language supporting the given option", () => {
  const unibeautify = new Unibeautify();
  const optionName = "op1";
  const options1: OptionsRegistry = {
    [optionName]: {
      default: false,
      description: "Test option",
      since: "0.0.0",
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
  expect(
    unibeautify
      .getBeautifiersSupportingOption(optionName)
      .map(({ name }) => name)
  ).toEqual([beautifier2.name]);
});

test("should correctly determine whether beautifier supports option for a language", () => {
  const unibeautify = new Unibeautify();
  const optionName = "op1";
  const options1: OptionsRegistry = {
    [optionName]: {
      default: false,
      description: "Test option",
      since: "0.0.0",
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
  expect(
    unibeautify.doesBeautifierSupportOptionForLanguage({
      beautifier: beautifier1,
      language: lang1,
      optionName
    })
  ).toEqual(false);
  expect(
    unibeautify.doesBeautifierSupportOptionForLanguage({
      beautifier: beautifier2,
      language: lang1,
      optionName
    })
  ).toEqual(true);
  expect(
    unibeautify.doesBeautifierSupportOptionForLanguage({
      beautifier: beautifier1,
      language: lang2,
      optionName
    })
  ).toEqual(false);
  expect(
    unibeautify.doesBeautifierSupportOptionForLanguage({
      beautifier: beautifier2,
      language: lang2,
      optionName
    })
  ).toEqual(false);
});

test("should get options supported for a language", () => {
  const unibeautify = new Unibeautify();
  const optionName1 = "op1";
  const optionName2 = "op2";
  const optionName3 = "op3";
  const options1: OptionsRegistry = {
    [optionName1]: {
      default: false,
      description: "Test option",
      since: "0.0.0",
      type: "boolean"
    },
    [optionName2]: {
      default: false,
      description: "Test option",
      since: "0.0.0",
      type: "boolean"
    },
    [optionName3]: {
      default: false,
      description: "Test option",
      since: "0.0.0",
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
      _: {
        [optionName1]: optionName2
      },
      [lang1.name]: {
        [optionName1]: false
      },
      [lang2.name]: true
    }
  };
  const beautifier2: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify2",
    options: {
      [lang1.name]: {
        [optionName1]: true,
        [optionName2]: [[optionName2, optionName3], (options: any) => true]
      },
      [lang2.name]: {
        [optionName2]: (value: any) => value
      }
    }
  };
  unibeautify.loadBeautifiers([beautifier1, beautifier2]);
  expect(
    Object.keys(unibeautify.getOptionsSupportedForLanguage(lang1))
  ).toEqual([optionName1, optionName2, optionName3]);
  expect(
    Object.keys(unibeautify.getOptionsSupportedForLanguage(lang2))
  ).toEqual([optionName2]);
});

test("should get options supported by a beautifier for a language", () => {
  const unibeautify = new Unibeautify();
  const optionName = "op1";
  const options1: OptionsRegistry = {
    [optionName]: {
      default: false,
      description: "Test option",
      since: "0.0.0",
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
        [optionName]: true,
        unknownOption: true
      }
    }
  };
  expect(
    Object.keys(
      unibeautify.getOptionsSupportedByBeautifierForLanguage({
        beautifier: beautifier1,
        language: lang1
      })
    )
  ).toEqual([]);
  expect(
    Object.keys(
      unibeautify.getOptionsSupportedByBeautifierForLanguage({
        beautifier: beautifier2,
        language: lang1
      })
    )
  ).toEqual([optionName]);
  expect(
    Object.keys(
      unibeautify.getOptionsSupportedByBeautifierForLanguage({
        beautifier: beautifier1,
        language: lang2
      })
    )
  ).toEqual([]);
  expect(
    Object.keys(
      unibeautify.getOptionsSupportedByBeautifierForLanguage({
        beautifier: beautifier2,
        language: lang2
      })
    )
  ).toEqual([]);
});

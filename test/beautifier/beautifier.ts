import test from "ava";
import { Unibeautify, Language, Beautifier } from "../../src/";

test("should load beautifier", t => {
  const unibeautify = new Unibeautify();
  const beautifierResult = "Testing Result";
  const beautifier: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      TestLang: false
    }
  };
  unibeautify.loadBeautifier(beautifier);
  t.deepEqual(unibeautify.loadedBeautifiers.map(curr => curr.name), [
    beautifier.name
  ]);
});

test("should load beautifiers", t => {
  const unibeautify = new Unibeautify();
  const beautifierResult = "Testing Result";
  const beautifier1: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify1",
    options: {
      TestLang: false
    }
  };
  const beautifier2: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify2",
    options: {
      TestLang: false
    }
  };
  unibeautify.loadBeautifiers([beautifier1, beautifier2]);
  t.deepEqual(unibeautify.loadedBeautifiers.map(curr => curr.name), [
    beautifier1.name,
    beautifier2.name
  ]);
});

test("should successfully beautify text", t => {
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
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: "TestBeautify",
    options: {
      TestLang: false
    }
  };
  unibeautify.loadBeautifier(beautifier);

  return unibeautify
    .beautify({
      languageName: "TestLang",
      options: {},
      text: "test"
    })
    .then(results => {
      t.is(results, beautifierResult);
    });
});

test("should fail to find beautifier", t => {
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

  return unibeautify
    .beautify({
      languageName: "TestLang",
      options: {},
      text: "test"
    })
    .then(results => {
      t.fail(results);
    })
    .catch(error => {
      t.is(error.message, `Beautifiers not found for Language: ${lang.name}`);
    });
});

test("should fail to find language", t => {
  const unibeautify = new Unibeautify();

  return unibeautify
    .beautify({
      languageName: "TestLang",
      options: {},
      text: "test"
    })
    .then(results => {
      t.fail(results);
    })
    .catch(error => {
      t.is(error.message, "Cannot find language.");
    });
});

test("should successfully transform option values for beautifier", t => {
  const unibeautify = new Unibeautify();
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
      _: {
        globalOption: true,
        willBeReplaced: "globalOption"
      },
      [lang1.name]: {
        basicTransform: num => num + 1,
        complexTransform: [
          ["value1", "basicTransform"],
          optionValues => optionValues.value1 + optionValues.basicTransform
        ],
        renamed1: "value1",
        value1: true,
        willBeReplaced: "value1"
      },
      [lang2.name]: true
    }
  };
  unibeautify.loadBeautifier(beautifier);

  const options = {
    basicTransform: 2,
    globalOption: 789,
    value1: 123
  };
  const result1 = Unibeautify.getOptionsForBeautifier(
    beautifier,
    lang1,
    options
  );
  t.is(result1.value1, options.value1, "Allow option");
  t.is(result1.renamed1, options.value1, "Rename option");
  t.is(
    result1.basicTransform,
    options.basicTransform + 1,
    "Perform basic transformation"
  );
  t.is(
    result1.complexTransform,
    options.value1 + options.basicTransform,
    "Perform complex transformation"
  );
  t.is(result1.globalOption, options.globalOption, "Include global option");
  t.is(
    result1.willBeReplaced,
    options.value1,
    "Replace global option with language-specific option"
  );
  t.deepEqual(result1, {
    basicTransform: options.basicTransform + 1,
    complexTransform: options.value1 + options.basicTransform,
    globalOption: options.globalOption,
    renamed1: options.value1,
    value1: options.value1,
    willBeReplaced: options.value1
  });

  const result2 = Unibeautify.getOptionsForBeautifier(
    beautifier,
    lang2,
    options
  );
  t.is(result2.globalOption, options.globalOption, "Include global option");
  t.is(
    result2.willBeReplaced,
    options.globalOption,
    "Replace global option with language-specific option"
  );
  t.deepEqual(result2, {
    globalOption: options.globalOption,
    willBeReplaced: options.globalOption
  });

});

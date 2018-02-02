import test from "ava";
import { newUnibeautify, Beautifier } from "../../src/";
import * as _ from "lodash";

test("should fail when beautifiers option containers unknown beautifier", t => {
  const unibeautify = newUnibeautify();
  const beautifierResult = "Testing Result";
  const beautifierName = "UnknownBeautifier";
  return unibeautify
    .beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {
          beautifiers: [beautifierName]
        }
      },
      text: "test"
    })
    .then(results => {
      t.fail("Should have failed to find beautifier");
    })
    .catch(error => {
      t.is(error.message, `Beautifier not found: ${beautifierName}`);
    });
});

test("should use named beautifier from beautifiers option", t => {
  const unibeautify = newUnibeautify();
  const beautifierResult = "Testing Result";
  const beautifierName = "CustomBeautifier";
  const desiredBeautifier: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: beautifierName,
    options: {
      JavaScript: false
    }
  };
  const otherBeautifier: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve("Bad");
    },
    name: "Other",
    options: {
      JavaScript: false
    }
  };
  unibeautify.loadBeautifier(otherBeautifier);
  unibeautify.loadBeautifier(desiredBeautifier);

  return unibeautify
    .beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {
          beautifiers: [beautifierName]
        }
      },
      text: "test"
    })
    .then(results => {
      t.is(results, beautifierResult);
    })
    .catch(error => {
      t.fail(error);
    });
});

test("should fail to use named beautifier which does not support language", t => {
  const unibeautify = newUnibeautify();
  const beautifierResult = "Testing Result";
  const beautifierName = "CustomBeautifier";
  const beautifier: Beautifier = {
    beautify: ({ Promise }) => {
      return Promise.resolve(beautifierResult);
    },
    name: beautifierName,
    options: {
      HTML: false
    }
  };
  unibeautify.loadBeautifier(beautifier);

  return unibeautify
    .beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {
          beautifiers: [beautifierName]
        }
      },
      text: "test"
    })
    .then(results => {
      t.is(results, beautifierResult);
    })
    .catch(error => {
      t.is(error.message, `Beautifier not found: ${beautifierName}`);
    });
});

test("should use all beautifiers for language when beautifiers option is empty", t => {
  const unibeautify = newUnibeautify();
  const beautifierResult = "Test Output";
  const beautifier1: Beautifier = {
    beautify: ({ Promise, text }) => {
      return Promise.resolve(`${text} Out`);
    },
    name: "Beautifier1",
    options: {
      JavaScript: false
    }
  };
  const beautifier2: Beautifier = {
    beautify: ({ Promise, text }) => {
      return Promise.resolve(`${text}put`);
    },
    name: "Beautifier2",
    options: {
      JavaScript: false
    }
  };
  unibeautify.loadBeautifier(beautifier1);
  unibeautify.loadBeautifier(beautifier2);

  return unibeautify
    .beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {
          beautifiers: []
        }
      },
      text: "Test"
    })
    .then(results => {
      t.is(results, beautifierResult);
    })
    .catch(error => {
      t.fail(error);
    });
});

test("should use all beautifiers for language when beautifiers option is missing", t => {
  const unibeautify = newUnibeautify();
  const beautifierResult = "Test Output";
  const beautifier1: Beautifier = {
    beautify: ({ Promise, text }) => {
      return Promise.resolve(`${text} Out`);
    },
    name: "Beautifier1",
    options: {
      JavaScript: false
    }
  };
  const beautifier2: Beautifier = {
    beautify: ({ Promise, text }) => {
      return Promise.resolve(`${text}put`);
    },
    name: "Beautifier2",
    options: {
      JavaScript: false
    }
  };
  unibeautify.loadBeautifier(beautifier1);
  unibeautify.loadBeautifier(beautifier2);

  return unibeautify
    .beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {}
      },
      text: "Test"
    })
    .then(results => {
      t.is(results, beautifierResult);
    })
    .catch(error => {
      t.fail(error);
    });
});

test("should use beautifiers in order of beautifiers option", t => {
  const unibeautify = newUnibeautify();
  const beautifierResult = "012";
  const beautifier1: Beautifier = {
    beautify: ({ Promise, text }) => {
      return Promise.resolve(`${text}1`);
    },
    name: "Beautifier1",
    options: {
      JavaScript: false
    }
  };
  const beautifier2: Beautifier = {
    beautify: ({ Promise, text }) => {
      return Promise.resolve(`${text}2`);
    },
    name: "Beautifier2",
    options: {
      JavaScript: false
    }
  };
  unibeautify.loadBeautifier(beautifier2);
  unibeautify.loadBeautifier(beautifier1);

  return unibeautify
    .beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {
          beautifiers: ["Beautifier1", "Beautifier2"]
        }
      },
      text: "0"
    })
    .then(results => {
      t.is(results, beautifierResult);
    })
    .catch(error => {
      t.fail(error);
    });
});

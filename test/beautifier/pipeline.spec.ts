import { newUnibeautify, Beautifier } from "../../src/";

test("should fail when beautifiers option containers unknown beautifier", () => {
  const unibeautify = newUnibeautify();
  const beautifierResult = "Testing Result";
  const beautifierName = "UnknownBeautifier";
  return expect(
    unibeautify.beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {
          beautifiers: [beautifierName],
        },
      },
      text: "test",
    })
  ).rejects.toThrowError(`Beautifier not found: ${beautifierName}`);
});

test("should use named beautifier from beautifiers option", () => {
  const unibeautify = newUnibeautify();
  const beautifierResult = "Testing Result";
  const beautifierName = "CustomBeautifier";
  const desiredBeautifier: Beautifier = {
    beautify: () => {
      return Promise.resolve(beautifierResult);
    },
    name: beautifierName,
    options: {
      JavaScript: false,
    },
  };
  const otherBeautifier: Beautifier = {
    beautify: () => {
      return Promise.resolve("Bad");
    },
    name: "Other",
    options: {
      JavaScript: false,
    },
  };
  unibeautify.loadBeautifier(otherBeautifier);
  unibeautify.loadBeautifier(desiredBeautifier);

  return expect(
    unibeautify.beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {
          beautifiers: [beautifierName],
        },
      },
      text: "test",
    })
  ).resolves.toEqual(beautifierResult);
});

test("should fail to use named beautifier which does not support language", () => {
  const unibeautify = newUnibeautify();
  const beautifierResult = "Testing Result";
  const beautifierName = "CustomBeautifier";
  const beautifier: Beautifier = {
    beautify: () => {
      return Promise.resolve(beautifierResult);
    },
    name: beautifierName,
    options: {
      HTML: false,
    },
  };
  unibeautify.loadBeautifier(beautifier);

  return expect(
    unibeautify.beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {
          beautifiers: [beautifierName],
        },
      },
      text: "test",
    })
  ).rejects.toThrowError(`Beautifier not found: ${beautifierName}`);
});

test("should use all beautifiers for language when beautifiers option is empty", () => {
  const unibeautify = newUnibeautify();
  const beautifierResult = "Test Output";
  const beautifier1: Beautifier = {
    beautify: ({ text }) => {
      return Promise.resolve(`${text} Out`);
    },
    name: "Beautifier1",
    options: {
      JavaScript: false,
    },
  };
  const beautifier2: Beautifier = {
    beautify: ({ text }) => {
      return Promise.resolve(`${text}put`);
    },
    name: "Beautifier2",
    options: {
      JavaScript: false,
    },
  };
  unibeautify.loadBeautifier(beautifier1);
  unibeautify.loadBeautifier(beautifier2);

  return expect(
    unibeautify.beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {
          beautifiers: [],
        },
      },
      text: "Test",
    })
  ).resolves.toEqual(beautifierResult);
});

test("should use all beautifiers for language when beautifiers option is missing", () => {
  const unibeautify = newUnibeautify();
  const beautifierResult = "Test Output";
  const beautifier1: Beautifier = {
    beautify: ({ text }) => {
      return Promise.resolve(`${text} Out`);
    },
    name: "Beautifier1",
    options: {
      JavaScript: false,
    },
  };
  const beautifier2: Beautifier = {
    beautify: ({ text }) => {
      return Promise.resolve(`${text}put`);
    },
    name: "Beautifier2",
    options: {
      JavaScript: false,
    },
  };
  unibeautify.loadBeautifier(beautifier1);
  unibeautify.loadBeautifier(beautifier2);

  return expect(
    unibeautify.beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {},
      },
      text: "Test",
    })
  ).resolves.toEqual(beautifierResult);
});

test("should use beautifiers in order of beautifiers option", () => {
  const unibeautify = newUnibeautify();
  const beautifierResult = "012";
  const beautifier1: Beautifier = {
    beautify: ({ text }) => {
      return Promise.resolve(`${text}1`);
    },
    name: "Beautifier1",
    options: {
      JavaScript: false,
    },
  };
  const beautifier2: Beautifier = {
    beautify: ({ text }) => {
      return Promise.resolve(`${text}2`);
    },
    name: "Beautifier2",
    options: {
      JavaScript: false,
    },
  };
  unibeautify.loadBeautifier(beautifier2);
  unibeautify.loadBeautifier(beautifier1);

  return expect(
    unibeautify.beautify({
      languageName: "JavaScript",
      options: {
        JavaScript: {
          beautifiers: ["Beautifier1", "Beautifier2"],
        },
      },
      text: "0",
    })
  ).resolves.toBe(beautifierResult);
});

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

  t.deepEqual(Object.keys(unibeautify.getLoadedOptions()), [
    ...Object.keys(options1),
    ...Object.keys(options2),
  ]);
});

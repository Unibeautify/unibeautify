import test from "ava";
import {Unibeautify, Language, Beautifier} from "../src/";
import * as Promise from "bluebird";

test("foo", t => {
    t.pass();
    const b = new Unibeautify();

    const lang: Language = {
      name: "TestLang",
      namespace: "test",
      extensions: ["test"]
    };
    b.loadLanguage(lang);

    const beautifier: Beautifier = {
      name: "TestBeautify",
      options: {
        123: "test"
      },
      beautify(data) {
        return Promise.resolve("hey");
      }
    };
    b.loadBeautifier(beautifier);

});

// test("bar", async (t) => {
//     const bar = Promise.resolve("bar");
//
//     t.is(await bar, "bar");
// });
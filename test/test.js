"use strict";
const ava_1 = require("ava");
const _1 = require("../src/");
const Promise = require("bluebird");
ava_1.default("foo", t => {
    t.pass();
    const b = new _1.Unibeautify();
    const lang = {
        name: "TestLang",
        namespace: "test",
        extensions: ["test"]
    };
    b.loadLanguage(lang);
    const beautifier = {
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
//# sourceMappingURL=test.js.map
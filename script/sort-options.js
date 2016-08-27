"use strict";
const fs = require("fs");
const path = require("path");
const stringify = require("json-stable-stringify");
const options = require("../src/options.json");
const output = stringify(options, {
    space: 2
});
const optionsPath = path.resolve(__dirname, "../src/options.json");
fs.writeFileSync(optionsPath, output, "utf8");
//# sourceMappingURL=sort-options.js.map
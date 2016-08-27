import * as fs from "fs";
import * as path from "path";
import * as stringify from "json-stable-stringify";

const options = require("../src/options.json");
const output = stringify(options, {
  space: 2
});

const optionsPath = path.resolve(__dirname, "../src/options.json");
fs.writeFileSync(optionsPath, output, "utf8");
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./beautifier"));
__export(require("./languages"));
__export(require("./options"));
const beautifier_2 = require("./beautifier");
const options_2 = require("./options");
const languages_2 = require("./languages");
const unibeautify = new beautifier_2.Unibeautify();
unibeautify.loadOptions(options_2.Options);
unibeautify.loadLanguages(languages_2.Languages);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = unibeautify;
//# sourceMappingURL=index.js.map
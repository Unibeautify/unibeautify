export * from "./beautifier";
export * from "./languages";
export * from "./options";

import {Unibeautify} from "./beautifier";
import {Options} from "./options";
import {Languages} from "./languages";
const unibeautify = new Unibeautify();
unibeautify.loadOptions(Options);
unibeautify.loadLanguages(Languages);
export default unibeautify;

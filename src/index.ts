export * from "./beautifier";
export * from "./languages";
export * from "./options";

import {Unibeautify} from "./beautifier";
import {Options} from "./options";
import {Languages} from "./languages";

export function newUnibeautify(): Unibeautify {
  const unibeautify = new Unibeautify();
  unibeautify.loadOptions(Options);
  unibeautify.loadLanguages(Languages);
  return unibeautify;
}
export default newUnibeautify(); // tslint:disable-line no-default-export export-name

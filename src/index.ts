export * from "./beautifier";
export * from "./language";
export * from "./languages";
export * from "./options";
export * from "./DependencyManager";
export * from "./LanguageManager";
export * from "./OptionsManager";

import { Unibeautify } from "./beautifier";
import { Options } from "./options";
import { Languages } from "./languages";

// tslint:disable no-default-export export-name
export function newUnibeautify(): Unibeautify {
  const unibeautify = new Unibeautify();
  unibeautify.loadOptions(Options);
  unibeautify.loadLanguages(Languages);
  return unibeautify;
}
export default newUnibeautify();

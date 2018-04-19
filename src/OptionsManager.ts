import { OptionsRegistry } from "./options";
import * as _ from "lodash";
import { Language } from "./language";
import {
  Beautifier,
  BeautifierOptionName,
  BeautifierLanguageOptionComplex,
  BeautifyOptionTransformSingleFunction,
  BeautifyOptionTransform,
} from "./beautifier";

export class OptionsManager {
  constructor(public options: OptionsRegistry) {}

  /**
   * Get a shallow copy of the options currently loaded.
   */
  public get loadedOptions(): OptionsRegistry {
    return { ...this.options };
  }

  /**
  Load Options
  */
  public loadOptions(options: OptionsRegistry): OptionsManager {
    _.merge(this.options, options);
    return this;
  }
}

export function optionKeys(
  beautifier: Beautifier,
  language: Language
): BeautifierOptionName[] {
  const beautifierOptions = beautifier.options[language.name];
  if (typeof beautifierOptions === "boolean") {
    return [];
  } else if (typeof beautifierOptions === "object") {
    const options: BeautifierOptionName[] = [];
    Object.keys(beautifierOptions).forEach(fieldKey => {
      const op = (<BeautifierLanguageOptionComplex>beautifierOptions)[fieldKey];
      if (typeof op === "string") {
        options.push(op);
      } else if (isOptionTransformSingleFunction(op)) {
        options.push(fieldKey as BeautifierOptionName);
      } else if (typeof op === "boolean") {
        if (op === true) {
          options.push(fieldKey as BeautifierOptionName);
        }
      } else if (isOptionTransform(op)) {
        options.push(...op[0]);
      } else {
        return new Error(
          `Invalid option "${fieldKey}" with value ${JSON.stringify(op)}.`
        );
      }
    });
    return options;
  } else {
    return [];
  }
}

function isOptionTransformSingleFunction(
  option: any
): option is BeautifyOptionTransformSingleFunction {
  return typeof option === "function";
}

function isOptionTransform(option: any): option is BeautifyOptionTransform {
  return Array.isArray(option);
}

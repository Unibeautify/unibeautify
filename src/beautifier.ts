import {
  Language,
} from "./languages";
import * as _ from "lodash";
import {
  OptionsRegistry
} from "./options";

/**
New name to rename the option (key) to.
Name of an option to configure for a beautifier.
*/
export type BeautifierOptionName = string;
/**
Function to process the given options and return a final option value.
*/
export type BeautifierOptionTransformFunction = (options: OptionValues) => any;
/**
Option that transforms one or more required options into a single value.
*/
export type BeautifyOptionTransform = [BeautifierOptionName[], BeautifierOptionTransformFunction];
/**
Option that transforms a single option value with the same name.
*/
export type BeautifyOptionTransformSingleFunction = (optionValue: any) => any;
/**
Option for Beautifier given the Language.
*/
export type BeautifierLanguageOption =
  boolean |
  BeautifierOptionName |
  BeautifyOptionTransformSingleFunction |
  BeautifyOptionTransform;
/**

*/
export interface BeautifierLanguageOptionComplex {
  [outOptionName: string]: BeautifierLanguageOption;
}
/**

true = supports language, enable all options
false = supports language, disable all options
complex = supports language with specific options
*/
export type BeautifierLanguageOptions = boolean | BeautifierLanguageOptionComplex;
/**
Options for Beautifier.

Keys are the names of Languages.
*/
export interface BeautifierOptions {
  [languageName: string]: BeautifierLanguageOptions;
}

/**
Data given to Beautifier's Beautify function.
*/
export interface BeautifierBeautifyData {
  /**
  Text to beautify
  */
  text: string;
  /**
  Language of text.
  */
  language: Language;
  /**
  Option values for given Language.
  */
  options: { [outOptionName: string]: any };
  /**
  File path.
  */
  filePath?: string;
  /**
  Project directory path.
  */
  projectPath?: string;
  /**
  Promise.
  */
  Promise: typeof Promise;
}

export interface LanguageOptionValues {
  [languageName: string]: OptionValues;
}

export interface OptionValues {
  [optionName: string]: any;
}

/**
Data given to Unibeautify to perform beautification with.
*/
export interface BeautifyData {
  /**
  Text to beautify.
  */
  text: string;
  /**
  Name of language to use for beautification.
  */
  languageName?: string;
  /**
  File extension.
  */
  fileExtension?: string;
  /**
  Atom editor grammar.
  */
  atomGrammar?: string;
  /**
  Sublime Text editor syntax.
  */
  sublimeSyntax?: string;
  /**
   * VSCode Document Selector
   */
  vscodeLanguage?: string;
  /**
  File path.
  */
  filePath?: string;
  /**
  Project path.
  */
  projectPath?: string;
  /**
  Option values.
  */
  options: LanguageOptionValues;
}

export type BeautifierName = string;
/**
Beautifier
*/
export interface Beautifier {
  /**
  Unique identifying name of the beautifier.
  */
  name: BeautifierName;
  /**
  Supports options of the beautifier.
  */
  options: BeautifierOptions;
  /**
  Beautify the given code with the beautifier.
  */
  beautify(data: BeautifierBeautifyData): Promise<string>;
}

/**
Beautifier
*/
export class Unibeautify {

  /**

  */
  private options: OptionsRegistry = {};
  /**

  */
  private languages: Language[] = [];

  /**
  Get a copy of the languages currently loaded.
  */
  public getLoadedLanguages(): Language[] {
    return this.languages.slice();
  }
  /**

  */
  private beautifiers: Beautifier[] = [];

  /**
  Load Options
  */
  public loadOptions(options: OptionsRegistry): Unibeautify {
    _.merge(this.options, options);
    return this;
  }

  /**
  Load a Language
  */
  public loadLanguage(language: Language): Unibeautify {
    this.languages.push(language);
    return this;
  }

  /**
  Load multiple Languages
  */
  public loadLanguages(languages: Language[]): Unibeautify {
    this.languages.push(...languages);
    return this;
  }

  /**
  Load a Beautifier
  */
  public loadBeautifier(beautifier: Beautifier): Unibeautify {
    this.beautifiers.push(beautifier);
    return this;
  }

  /**
  Load multiple beautifiers.
  */
  public loadBeautifiers(beautifiers: Beautifier[]): Unibeautify {
    this.beautifiers.push(...beautifiers);
    return this;
  }

  /**
  Find and return the appropriate Language for the given file extension.
  */
  private findLanguagesForExtension(extension: string): Language[] {
    return this.findLanguages({
      extension
    });
  }

  /**
  Find and return the appropriate Languages that match any of the given filter criteria.
  An empty array will be returned if there are no matches.

  Precedence:
  - name
  - namespace
  - extension
  - atomGrammar
  - sublimeSyntax
  - vscodeLanguage
  */
  private findLanguages(query: {
    /**
    Language name
    */
    name?: string;
    /**
    Language namespace
    */
    namespace?: string;
    /**
    Language extension
    */
    extension?: string;
    /**
    Language Atom grammar
    */
    atomGrammar?: string;
    /*
    Language Sublime Syntax
    */
    sublimeSyntax?: string;
    /**
     * VSCode Language ID
     */
    vscodeLanguage?: string;
  }): Language[] {
    const langs: Language[][] = [];
    // Name
    langs.push(_.filter(this.languages, (c: Language): boolean => _.isEqual(c.name, query.name)));
    // Namespace
    langs.push(_.filter(this.languages, (c: Language): boolean => _.isEqual(c.namespace, query.namespace)));
    // Extension
    langs.push(_.filter(this.languages, (c: Language): boolean => _.includes(c.extensions, query.extension)));
    // Atom Grammar
    langs.push(_.filter(this.languages, (c: Language): boolean => _.includes(c.atomGrammars, query.atomGrammar)));
    // Sublime Syntax
    langs.push(_.filter(this.languages, (c: Language): boolean => _.includes(c.sublimeSyntaxes, query.sublimeSyntax)));
    // VSCode Language ID
    langs.push(_.filter(this.languages, (c: Language): boolean => _.includes(c.vscodeLanguages, query.vscodeLanguage)));
    // Return unique array of Languages
    return _.uniq(_.flatten(langs));
  }

  public get supportedLanguages() {
    return this.getLoadedLanguages()
      .filter(language => Boolean(this.getBeautifierForLanguage(language)));
  }

  /**
  Find and return the appropriate Beautifiers for the given Language.
  */
  public getBeautifiersForLanguage(language: Language): Beautifier[] {
    // TODO
    return _.filter(this.beautifiers, (b: Beautifier): boolean => _.includes(Object.keys(b.options), language.name));
  }

  /**
  Get default beautifier for given language and options.
  */
  private getBeautifierForLanguage(language: Language, options: OptionValues = {}): Beautifier | null {
    // TODO
    return _.find(this.beautifiers, (b: Beautifier): boolean => _.includes(Object.keys(b.options), language.name));
  }

  /**
  Extract the Language-specific option values.
  */
  public static getOptionsForLanguage(language: Language, options: LanguageOptionValues): OptionValues {
    const { name } = language;
    return options[name] || {};
  }

  /**
  Extract the option values that the Beautifier supports, including applying transformations.
  */
  public static getOptionsForBeautifier(beautifier: Beautifier, language: Language, options: OptionValues): OptionValues {
    const globalOptions = beautifier.options._;
    let beautifierOptions = beautifier.options[language.name];
    // Global options
    if (typeof globalOptions === "object") {
      if (beautifierOptions === true) {
        beautifierOptions = globalOptions;
      } else if (typeof beautifierOptions === "object") {
        beautifierOptions = Object.assign({}, globalOptions, beautifierOptions);
      }
    }
    // Transform options
    if (typeof beautifierOptions === "boolean") {
      if (beautifierOptions === true) {
        return options;
      } else {
        return {};
      }
    } else if (typeof beautifierOptions === "object") {
      const transformedOptions: OptionValues = {};
      for (const field in beautifierOptions) {
        const op = beautifierOptions[field];
        if (typeof op === "string") {
          transformedOptions[field] = options[op as string];
        } else if (typeof op === "function") {
          transformedOptions[field] = (op as BeautifyOptionTransformSingleFunction)(options[field]);
        } else if (typeof op === "boolean") {
          if (op === true) {
            transformedOptions[field] = options[field];
          }
        } else if (_.isArray(op)) {
          const [fields, fn] = (op as BeautifyOptionTransform);
          const vals = _.map(fields, function(f) {
            return options[f];
          });
          const obj = _.zipObject(fields, vals);
          transformedOptions[field] = fn(obj);
        }
      }
      return transformedOptions;
    } else {
      return options;
    }
  }

  /**
  Beautify code
  */
  public beautify(data: BeautifyData): Promise<string> {

    // Get Language
    const langs: Language[] = this.findLanguages({
      atomGrammar: data.atomGrammar,
      extension: data.fileExtension,
      name: data.languageName,
      sublimeSyntax: data.sublimeSyntax,
    });
    const lang: Language | null = langs.length > 0 ? langs[0] : null;
    if (lang == null) {
      return Promise.reject(new Error("Cannot find language."));
    }

    // Get Options for Language
    const langOptions: OptionValues = Unibeautify.getOptionsForLanguage(lang as Language, data.options);

    // Get Beautifier
    const beautifier: Beautifier | null = this.getBeautifierForLanguage(lang as Language, langOptions);

    // Run beautifier
    if (beautifier != null ) {
      // Get Options for Beautifier
      const options: OptionValues = Unibeautify.getOptionsForBeautifier(beautifier, lang, langOptions);
      return (beautifier as Beautifier).beautify({
        filePath: data.fileExtension,
        language: lang,
        options,
        Promise,
        projectPath: data.projectPath,
        text: data.text,
      });
    } else {
      return Promise.reject(new Error(`Beautifier not found for Language: ${lang.name}`));
    }
  }

}

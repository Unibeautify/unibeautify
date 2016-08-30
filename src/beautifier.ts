/// <reference path="../typings/modules/bluebird/index.d.ts" />
const options: any = require("./options.json");
import * as Promise from "bluebird";
import {Language} from "./languages";
import * as _ from "lodash";
import {OptionsRegistry} from "./options";

/**
New name to rename the option (key) to.
*/
export type BeautifierOptionRename = string;
/**
Function to process the given options and return a final option value.
*/
export type BeautifierOptionTransformFunction = (options: {
  [key: string]: any
}) => any;
/**
Option that transforms one or more required options into a single value.
*/
export type BeautifyOptionTransform = {
  /**
  Required options that will be transformed.
  */
  options: string[],
  fn: BeautifierOptionTransformFunction
};
/**
Option for Beautifier given the Language.
*/
export type BeautifierLanguageOption = boolean | BeautifierOptionRename | BeautifyOptionTransform;
/**

*/
export type BeautifierLanguageOptionComplex = {
  [key: string]: BeautifierLanguageOption;
};
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
export type BeautifierOptions = {
  [key: string]: BeautifierLanguageOptions;
};

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
  options: { [key: string]: any };
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
  /**
  Languages
  */
  [key: string]: OptionValues;
}

export interface OptionValues {
  /**
  Options
  */
  [key: string]: any;
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
  private getLanguagesForExtension(extension: string): Language[] {
    return this.getLanguages({
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
  */
  private getLanguages(query: {
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
    // Return unique array of Languages
    return _.uniq(_.flatten(langs));
  }

  /**
  Find and return the appropriate Beautifiers for the given Language.
  */
  private getBeautifiersForLanguage(language: Language): Beautifier[] {
    // TODO
    return _.filter(this.beautifiers, (b: Beautifier): boolean => _.includes(Object.keys(b.options), language.name));
  }

  /**
  Get default beautifier for given language and options.
  */
  private getBeautifierForLanguage(language: Language, options: OptionValues): Beautifier | null {
    // TODO
    const beautifiers = this.getBeautifiersForLanguage(language);
    if (beautifiers.length > 0) {
      return beautifiers[0];
    } else {
      return null;
    }
  }

  /**
  Extract the Language-specific option values.
  */
  private getOptionsForLanguage(language: Language, options: LanguageOptionValues): OptionValues {
    const { namespace } = language;
    return options[namespace] = {};
  }

  /**
  Beautify code
  */
  public beautify(data: BeautifyData): Promise<string> {

    // Get Language
    const langs: Language[] = this.getLanguages({
      name: data.languageName,
      extension: data.fileExtension,
      atomGrammar: data.atomGrammar,
      sublimeSyntax: data.sublimeSyntax,
    });
    const lang: Language | null = langs.length > 0 ? langs[0] : null;
    if (lang == null) {
      return Promise.reject(new Error('Cannot find language.'));
    }

    // Get Options for Language
    const options: OptionValues = this.getOptionsForLanguage(lang as Language, data.options);

    // Get Beautifier
    const beautifier: Beautifier | null = this.getBeautifierForLanguage(lang as Language, options);

    // Run beautifier
    if (beautifier != null ) {
      return (beautifier as Beautifier).beautify({
        // Required
        text: data.text,
        language: lang,
        options,
        Promise,
        // Optional
        filePath: data.fileExtension,
        projectPath: data.projectPath,
      });
    } else {
      return Promise.reject(new Error(`Beautifier not found for Language: ${lang.name}`));
    }
  }

}

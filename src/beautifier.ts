import { Language } from "./language";
import { LanguageManager, LanguageQuery } from "./LanguageManager";
import { OptionsRegistry } from "./options";
import { OptionsManager, optionKeys } from "./OptionsManager";
import { InlineFlagManager } from "./InlineFlagManager";
import {
  DependencyDefinition,
  DependencyManager,
  Badge,
} from "./DependencyManager";
import { zipObject, unique } from "./utils";

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
export type BeautifyOptionTransform = [
  BeautifierOptionName[],
  BeautifierOptionTransformFunction
];
/**
Option that transforms a single option value with the same name.
*/
export type BeautifyOptionTransformSingleFunction = (optionValue: any) => any;
/**
Option for Beautifier given the Language.
*/
export type BeautifierLanguageOption =
  | boolean
  | BeautifierOptionName
  | BeautifyOptionTransformSingleFunction
  | BeautifyOptionTransform;
/**

*/
export interface BeautifierLanguageOptionComplex {
  [outOptionName: string]: BeautifierLanguageOption | undefined;
}
/**

true = supports language, enable all options
false = supports language, disable all options
complex = supports language with specific options
*/
export type BeautifierLanguageOptions =
  | boolean
  | BeautifierLanguageOptionComplex;
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
   * Dependencies
   */
  dependencies: DependencyManager;
  /**
   * Beautifier-specific configuration
   */
  beautifierConfig?: ResolvedConfig;
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
   * Parsed Package.json file as JSON.
   */
  // tslint:disable-next-line:no-reserved-keywords
  package?: object;
  /**
   * Runtime dependencies of the beautifier.
   */
  dependencies?: DependencyDefinition[];
  /**
   * Function to retrieve beautifier-specific configuration file and/or parsed value.
   */
  resolveConfig?(resolveConfigData: ResolveConfigData): Promise<ResolvedConfig>;
  /**
  Beautify the given code with the beautifier.
  */
  beautify(data: BeautifierBeautifyData): Promise<string>;
  /**
   * Badges to display in automatically generated documentation.
   */
  badges?: Badge[];
}

export interface ResolveConfigData {
  dependencies: DependencyManager;
  filePath?: string;
  projectPath?: string;
}

export interface ResolvedConfig {
  /**
   * The parsed configuration object
   */
  config?: any;
  /**
   * The path to the config file that was found
   */
  filePath?: string;
}

/**
Beautifier
*/
export class Unibeautify {
  private options: OptionsRegistry = {};

  private languages: Language[] = [];

  private beautifiers: Beautifier[] = [];

  private languageManager: LanguageManager = new LanguageManager(
    this.languages
  );

  private optionsManager: OptionsManager = new OptionsManager(this.options);

  /**
   * Get loaded languages which have a loaded beautifier supporting the given option
   */
  public getLanguagesSupportingOption(
    optionName: BeautifierOptionName
  ): Language[] {
    return this.supportedLanguages.filter(
      language =>
        this.beautifiers.findIndex(beautifier =>
          this.doesBeautifierSupportOptionForLanguage({
            beautifier,
            language,
            optionName,
          })
        ) !== -1
    );
  }

  /**
   * Get options supported for language and all loaded beautifiers
   */
  public getOptionsSupportedForLanguage(language: Language): OptionsRegistry {
    return this.beautifiers.reduce(
      (options, beautifier) => ({
        ...options,
        ...this.getOptionsSupportedByBeautifierForLanguage({
          beautifier,
          language,
        }),
      }),
      {}
    );
  }

  /**
   * Get options supported by beautifier for a language.
   */
  public getOptionsSupportedByBeautifierForLanguage({
    beautifier,
    language,
  }: {
    beautifier: Beautifier;
    language: Language;
  }): OptionsRegistry {
    const keys: BeautifierOptionName[] = optionKeys(beautifier, language);
    const allOptions = this.optionsManager.options;
    return keys.reduce((options, key) => {
      const option = allOptions[key];
      if (!option) {
        return options;
      }
      return {
        ...options,
        [key]: option,
      };
    }, {});
  }

  /**
   * Get all loaded languages which have at least one supporting beautifier.
   */
  public get supportedLanguages(): Language[] {
    return this.getLoadedLanguages().filter(language =>
      Boolean(this.getBeautifierForLanguage(language))
    );
  }

  /**
  Beautify code
  */
  public beautify(data: BeautifyData): Promise<string> {
    const lang: Language | null = this.languageManager.getLanguage(data);
    if (lang == null) {
      return Promise.reject(new Error("Cannot find language."));
    }
    const langOptions: OptionValues = Unibeautify.getOptionsForLanguage(
      lang,
      data.options
    );

    const {
      selectedBeautifiers,
      missingBeautifierName,
    } = this.beautifiersForLanguageAndOptions(lang, langOptions);
    if (selectedBeautifiers.length === 0) {
      return Promise.reject(
        new Error(`Beautifiers not found for Language: ${lang.name}`)
      );
    }
    if (missingBeautifierName) {
      return Promise.reject(
        new Error(`Beautifier not found: ${missingBeautifierName}`)
      );
    }

    return this.beautifyWithBeautifiers({
      beautifiers: selectedBeautifiers as Beautifier[],
      fileExtension: data.fileExtension,
      filePath: data.filePath,
      langOptions,
      language: lang,
      projectPath: data.projectPath,
      text: data.text,
    });
  }

  private beautifiersForLanguageAndOptions(
    lang: Language,
    langOptions: OptionValues
  ): {
    selectedBeautifiers: (Beautifier | undefined)[];
    missingBeautifierName: string | undefined;
  } {
    const allBeautifiers: Beautifier[] = this.getBeautifiersForLanguage(lang);
    const beautifierNames: string[] = langOptions.beautifiers || [];
    const selectedBeautifiers: (Beautifier | undefined)[] =
      beautifierNames.length > 0
        ? this.beautifiersWithNames(beautifierNames, allBeautifiers)
        : allBeautifiers;

    const missingBeautifierName: string | undefined = selectedBeautifiers
      .map((curr, index) => (curr ? undefined : beautifierNames[index]))
      .find(curr => !!curr);
    return {
      missingBeautifierName,
      selectedBeautifiers,
    };
  }

  private beautifiersWithNames(
    names: string[],
    beautifiers: Beautifier[]
  ): (Beautifier | undefined)[] {
    const beautifiersByName = beautifiers.reduce(
      (index, current) => {
        index[current.name] = current;
        return index;
      },
      {} as { [beautifierName: string]: Beautifier }
    );
    return names.map(name => beautifiersByName[name]);
  }

  // tslint:disable:max-func-body-length
  private beautifyWithBeautifiers({
    beautifiers,
    language,
    langOptions,
    fileExtension,
    filePath,
    projectPath,
    text,
  }: {
    beautifiers: Beautifier[];
    language: Language;
    langOptions: OptionValues;
    text: BeautifyData["text"];
    fileExtension: BeautifyData["fileExtension"];
    filePath: BeautifyData["filePath"];
    projectPath: BeautifyData["projectPath"];
  }): Promise<string> {
    return beautifiers.reduce(
      (promise: Promise<string>, beautifier: Beautifier) => {
        const options: OptionValues = Unibeautify.getOptionsForBeautifier(
          beautifier,
          language,
          langOptions
        );
        return promise.then(currentText => {
          const beautifierOptions = langOptions[beautifier.name] || {};
          const dependencyManager = new DependencyManager(
            beautifier.name,
            beautifier.dependencies || [],
            beautifierOptions
          );
          return dependencyManager
            .load()
            .then(() => {
              if (beautifierOptions.prefer_beautifier_config) {
                if (beautifierOptions.beautifier_config_path) {
                  return Promise.resolve({
                    filePath: beautifierOptions.beautifier_config_path,
                  });
                } else if (beautifier.resolveConfig) {
                  return beautifier.resolveConfig({
                    dependencies: dependencyManager,
                    filePath,
                    projectPath,
                  });
                }
              }
              return Promise.resolve({});
            })
            .then((beautifierConfig: ResolvedConfig) => {
              return beautifier
                .beautify({
                  beautifierConfig,
                  dependencies: dependencyManager,
                  filePath: filePath,
                  language: language,
                  options,
                  projectPath: projectPath,
                  text: currentText,
                })
                .then(newText => {
                  if (typeof newText !== "string") {
                    return Promise.reject(
                      new Error(
                        `Beautifier response type must be "string" not "${typeof newText}": ${newText}`
                      )
                    );
                  }
                  return Promise.resolve(newText);
                })
                .then((newText: string) =>
                  this.handleInlineFlags(currentText, newText)
                );
            });
        });
      },
      Promise.resolve(text)
    );
  }

  private handleInlineFlags(currentText: string, newText: string): string {
    const manager = new InlineFlagManager(currentText, newText);
    return manager.text;
  }

  /**
   * @deprecated use LanguageManager
   */
  public findLanguages(query: LanguageQuery): Language[] {
    return this.languageManager.findLanguages(query);
  }

  /**
   * @deprecated use LanguageManager
   */
  public getLoadedLanguages(): Language[] {
    return this.languageManager.getLoadedLanguages();
  }

  /**
   * Get first loaded beautifier for given language.
   */
  private getBeautifierForLanguage(language: Language): Beautifier | undefined {
    return this.beautifiers.find(beautifier =>
      this.doesBeautifierSupportLanguage(beautifier, language)
    );
  }

  /**
   * Find and return the appropriate Beautifiers for the given Language.
   */
  public getBeautifiersForLanguage(language: Language): Beautifier[] {
    return this.beautifiers.filter(beautifier =>
      this.doesBeautifierSupportLanguage(beautifier, language)
    );
  }

  private doesBeautifierSupportLanguage(
    beautifier: Beautifier,
    language: Language
  ): boolean {
    return beautifier.options.hasOwnProperty(language.name);
  }

  /**
   * Get loaded beautifiers which have a loaded languages supporting the given option
   */
  public getBeautifiersSupportingOption(
    optionName: BeautifierOptionName
  ): Beautifier[] {
    return this.beautifiers.filter(
      beautifier =>
        this.languageManager.languages.findIndex(language =>
          this.doesBeautifierSupportOptionForLanguage({
            beautifier,
            language,
            optionName,
          })
        ) !== -1
    );
  }

  /**
   * Determine whether beautifier supports option for a language
   */
  public doesBeautifierSupportOptionForLanguage({
    beautifier,
    language,
    optionName,
  }: {
    beautifier: Beautifier;
    language: Language;
    optionName: BeautifierOptionName;
  }): boolean {
    return optionKeys(beautifier, language).indexOf(optionName) !== -1;
  }

  /**
   * Find loaded languages the given beautifier supports.
   */
  public getLanguagesForBeautifier(beautifier: Beautifier): Language[] {
    const { options } = beautifier;
    return this.languageManager.languages.filter(lang =>
      options.hasOwnProperty(lang.name)
    );
  }

  /**
   * Get a shallow copy of the options currently loaded.
   */
  public get loadedOptions(): OptionsRegistry {
    return this.optionsManager.loadedOptions;
  }

  /**
   * Get a shallow copy of the beautifiers currently loaded.
   */
  public get loadedBeautifiers(): Beautifier[] {
    return this.beautifiers.slice();
  }

  /**
  Extract the Language-specific option values.
  */
  public static getOptionsForLanguage(
    language: Language,
    options: LanguageOptionValues
  ): OptionValues {
    const { name } = language;
    return options[name] || {};
  }

  /**
  Extract the option values that the Beautifier supports, including applying transformations.
  */
  public static getOptionsForBeautifier(
    beautifier: Beautifier,
    language: Language,
    options: OptionValues
  ): OptionValues {
    const beautifierOptions = beautifier.options[language.name];
    if (typeof beautifierOptions === "boolean" && beautifierOptions === false) {
      return {};
    } else if (typeof beautifierOptions === "object") {
      return Object.keys(beautifierOptions).reduce(
        (acc: OptionValues, key: string) => {
          const option = beautifierOptions[key];
          if (typeof option === "string") {
            return {
              ...acc,
              [key]: options[option],
            };
          } else if (typeof option === "function") {
            return {
              ...acc,
              [key]: option(options[key]),
            };
          } else if (option === true) {
            return {
              ...acc,
              [key]: options[key],
            };
          } else if (option instanceof Array) {
            const [fields, fn] = option;
            const values = fields.map(field => options[field]);
            const obj = zipObject(fields, values);
            return {
              ...acc,
              [key]: fn(obj),
            };
          }

          // tslint:disable-next-line
          console.log(
            `Invalid option "${key}" with value ${JSON.stringify(option)}.`
          );
          return acc;
        },
        {} as OptionValues
      );
    } else {
      return options;
    }
  }

  /**
  Load a Beautifier
  */
  public loadBeautifier(beautifier: Beautifier): Unibeautify {
    this.validateBeautifier(beautifier);
    this.beautifiers.push(beautifier);
    return this;
  }

  private validateBeautifier(beautifier: any = {}): void {
    if (!beautifier.name) {
      throw new Error('Beautifier is missing a "name" property.');
    }
    // tslint:disable-next-line:no-unused-expression
    new DependencyManager(beautifier.name, beautifier.dependencies, {});
  }

  /**
  Load multiple beautifiers.
  */
  public loadBeautifiers(beautifiers: Beautifier[]): Unibeautify {
    beautifiers.forEach(beautifier => this.loadBeautifier(beautifier));
    return this;
  }

  /**
   * Load a single language
   */
  public loadLanguage(language: Language): Unibeautify {
    this.languageManager.loadLanguage(language);
    return this;
  }

  /**
   * Load multiple languages
   */
  public loadLanguages(languages: Language[]): Unibeautify {
    this.languageManager.loadLanguages(languages);
    return this;
  }

  /**
   * Load multiple options
   */
  public loadOptions(options: OptionsRegistry): Unibeautify {
    this.optionsManager.loadOptions(options);
    return this;
  }
}

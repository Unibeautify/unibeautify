const options: any = require("./options.json");
import * as Promise from "bluebird";

/**
Language
*/
export interface Language {
  /**
  Common and human-readable name of language.
  */
  name: string;
  /**
  Namespace for language's options.
  */
  namespace: string;
  /**
  Supported file extensions
  */
  extensions: string[];
}

/**
New name to rename the option (key) to.
*/
export type BeautifyOptionRename = string;
/**
Function to process the given options and return a final option value.
*/
export type BeautifyOptionTransformFunction = (options: {
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
  fn: BeautifyOptionTransformFunction
};
/**
Option for Beautifier given the Language.
*/
export type BeautifyOption = boolean | BeautifyOptionRename | BeautifyOptionTransform;
/**
Options for Beautifier.

Keys are the names of Languages.
*/
export type BeautifyOptions = {
  [key: string]: BeautifyOption;
};

/**
Beautify data
*/
export interface BeautifyData {
  /**
  Text of code to beautify
  */
  text: string;
  /**
  Name of language of text.
  */
  language: string;
  /**
  Option values.
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
}

/**
Beautifier
*/
export interface Beautifier {
  /**
  Unique identifying name of the beautifier.
  */
  name: string;
  /**
  Supports options of the beautifier.
  */
  options: BeautifyOptions;
  /**
  Beautify the given code with the beautifier.
  */
  beautify(data: BeautifyData): Promise<string>;
}

/**
Beautifier
*/
export class Unibeautify {

  /**
  Load a Language
  */
  loadLanguage(language: Language): Unibeautify {
    return this;
  }

  /**
  Load a Beautifier
  */
  loadBeautifier(beautifier: Beautifier): Unibeautify {
    return this;
  }

  /**
  Beautify code
  */
  beautify(data: BeautifyData): Promise<string> {
    return Promise.resolve("test");
  }

}

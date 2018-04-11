import { unique } from "./utils";
import { BeautifyData } from "./beautifier";

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
   * Available since version.
   */
  since: string;
  /**
   * Name of the parent language.
   * Languages in a group are counted in the statistics as the parent language.
   */
  group?: string;
  /**
   * An Array of additional aliases (implicitly includes name.downcase)
   */
  aliases?: string[];
  /**
    Supported file extensions.
    */
  extensions: string[];
  /**
   * File names
   */
  fileNames?: string[];
  /**
    Atom editor grammars.
    */
  atomGrammars: string[];
  /**
    Sublime Text editor syntaxes.
    */
  sublimeSyntaxes: string[];
  /**
   * VSCode Language ID
   */
  vscodeLanguages: string[];
  /**
   * GitHub's Liguist Language ID
   */
  liguistLanguageId?: number;
  /**
   * A String name of the Ace Mode used for highlighting whenever a file is edited.
   */
  aceMode?: string;
  /**
   * A String name of the CodeMirror Mode used for highlighting whenever a file is edited.
   * This must match a mode from https://git.io/vi9Fx
   */
  codeMirrorMode?: string;
  /**
   * A String name of the CodeMirror Mime Type used for highlighting whenever a file is edited.
   */
  codeMirrorMimeType?: string;
  /**
   * The TextMate scope that represents this programming language.
   */
  textMateScope?: string;
}

export class LanguageManager {
  /**

  */
  private _languages: Language[] = [];

  public get getLanguages(): Language[] {
    return this._languages;
  }

  /**
  Get a shallow copy of the languages currently loaded.
  */
  public getLoadedLanguages(): Language[] {
    return this._languages.slice();
  }

  /**
  Load a Language
  */
  public loadLanguage(language: Language): LanguageManager {
    this._languages.push(language);
    return this;
  }

  /**
  Load multiple Languages
  */
  public loadLanguages(languages: Language[]): LanguageManager {
    this._languages.push(...languages);
    return this;
  }

  public getLanguage(data: {
    atomGrammar?: BeautifyData["atomGrammar"];
    fileExtension?: BeautifyData["fileExtension"];
    languageName?: BeautifyData["languageName"];
    sublimeSyntax?: BeautifyData["sublimeSyntax"];
  }): Language | null {
    const langs: Language[] = this.findLanguages({
      atomGrammar: data.atomGrammar,
      extension: data.fileExtension,
      name: data.languageName,
      sublimeSyntax: data.sublimeSyntax,
    });
    return langs.length > 0 ? langs[0] : null;
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
  public findLanguages(query: {
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
    const langs: Language[] = [
      ...this._languages.filter(lang => lang.name === query.name),
      ...this._languages.filter(lang => lang.namespace === query.namespace),
      ...this._languages.filter(
        lang =>
          query.extension && lang.extensions.indexOf(query.extension) !== -1
      ),
      ...this._languages.filter(
        lang =>
          query.atomGrammar &&
          lang.atomGrammars.indexOf(query.atomGrammar) !== -1
      ),
      ...this._languages.filter(
        lang =>
          query.sublimeSyntax &&
          lang.sublimeSyntaxes.indexOf(query.sublimeSyntax) !== -1
      ),
      ...this._languages.filter(
        lang =>
          query.vscodeLanguage &&
          lang.vscodeLanguages.indexOf(query.vscodeLanguage) !== -1
      ),
    ];

    return unique<Language>(langs);
  }
}

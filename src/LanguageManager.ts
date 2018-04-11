import { unique } from "./utils";
import { BeautifyData } from "./beautifier";
import { Language } from "./language";

export class LanguageManager {

  constructor(
    protected _languages: Language[]
  ) {}

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
  public findLanguages(query: LanguageQuery): Language[] {
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

  /**
  Get a shallow copy of the languages currently loaded.
  */
  public getLoadedLanguages(): Language[] {
    return this._languages.slice();
  }

  /**
  Get a raw copy of the languages currently loaded.
  */
  public get languages(): Language[] {
    return this._languages;
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
}

export interface LanguageQuery {
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
}

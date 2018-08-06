import { unique, filterMultiCriteria } from "./utils";
import { BeautifyData } from "./beautifier";
import { Language } from "./language";

export class LanguageManager {
  constructor(public readonly languages: Language[]) {}

  public getLanguage(data: {
    atomGrammar?: BeautifyData["atomGrammar"];
    fileExtension?: BeautifyData["fileExtension"];
    languageName?: BeautifyData["languageName"];
    sublimeSyntax?: BeautifyData["sublimeSyntax"];
    vscodeLanguage?: BeautifyData["vscodeLanguage"];
  }): Language | null {
    const langs: Language[] = this.findLanguages({
      atomGrammar: data.atomGrammar,
      extension: data.fileExtension,
      name: data.languageName,
      sublimeSyntax: data.sublimeSyntax,
      vscodeLanguage: data.vscodeLanguage,
    });
    // Here is where we should compare the returned langs with the "data." filters to find the best match
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
    const filters = {
      name: query.name,
      namespace: query.namespace,
      // tslint:disable-next-line:object-literal-sort-keys
      extensions: query.extension,
      atomGrammars: query.atomGrammar,
      sublimeSyntaxes: query.sublimeSyntax,
      vscodeLanguages: query.vscodeLanguage,
    };
    const langs: Language[] = filterMultiCriteria(this.languages, filters);
    return unique<Language>(langs);
  }

  /**
  Get a shallow copy of the languages currently loaded.
  */
  public getLoadedLanguages(): Language[] {
    return this.languages.slice();
  }

  /**
  Load a Language
  */
  public loadLanguage(language: Language): LanguageManager {
    this.languages.push(language);
    return this;
  }

  /**
  Load multiple Languages
  */
  public loadLanguages(languages: Language[]): LanguageManager {
    this.languages.push(...languages);
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

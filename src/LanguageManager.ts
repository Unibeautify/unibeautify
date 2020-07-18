import { unique, filterMultiCriteria } from './utils';
import { BeautifyData } from './beautifier';
import { Language } from './language';

export class LanguageManager {
    constructor(public readonly languages: Language[]) {}

    public getLanguage(data: {
        atomGrammar?: BeautifyData['atomGrammar'];
        fileExtension?: BeautifyData['fileExtension'];
        languageName?: BeautifyData['languageName'];
        sublimeSyntax?: BeautifyData['sublimeSyntax'];
        vscodeLanguage?: BeautifyData['vscodeLanguage'];
    }): Language | null {
        const filters = {
            atomGrammars: data.atomGrammar,
            extensions: data.fileExtension,
            name: data.languageName,
            sublimeSyntaxes: data.sublimeSyntax,
            vscodeLanguages: data.vscodeLanguage,
        };
        const langs: Language[] = this.findLanguages({
            atomGrammar: data.atomGrammar,
            extension: data.fileExtension,
            name: data.languageName,
            sublimeSyntax: data.sublimeSyntax,
            vscodeLanguage: data.vscodeLanguage,
        });
        return this.getBestMatchLanguage(langs, filters);
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

    private getBestMatchLanguage(
        langs: Language[],
        filters: { [T in keyof Language]?: any }
    ) {
        let bestMatch = langs[0];
        let highest = 0;
        const keys: (keyof Language)[] = Object.keys(filters) as any;
        langs.forEach(lang => {
            let score = 0;
            keys.forEach(key => {
                const value = lang[key];
                if (Array.isArray(value)) {
                    if (filters[key] && value.indexOf(filters[key]) !== -1) {
                        score = score + 1;
                    }
                } else if (filters[key] === lang[key]) {
                    score = score + 1;
                }
            });
            if (score > highest) {
                bestMatch = lang;
                highest = score;
            }
        });
        return bestMatch;
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

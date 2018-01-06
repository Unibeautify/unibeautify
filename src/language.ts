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
   * The TextMate scope that represents this programming language.
   */
  textMateScope?: string;
}

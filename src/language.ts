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

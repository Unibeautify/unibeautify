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
  Supported file extensions.
  */
  extensions: string[];
  /**
  Atom editor grammars.
  */
  atomGrammars: string[];
  /**
  Sublime Text editor syntaxes.
  */
  sublimeSyntaxes: string[];
}

export const Languages: Language[] = [
  // {
  //   name: "Sample_Language",
  //   namespace: "sample",
  //   extensions: ["samp"],
  //   atomGrammars: [],
  //   sublimeSyntax: []
  // },
  {
    atomGrammars: [],
    extensions: ["js"],
    name: "JavaScript",
    namespace: "js",
    sublimeSyntaxes: []
  },
];
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
  /**
   * VSCode Language ID
   */
  vscodeLanguages: string[];
}

export const Languages: Language[] = [
  {
    "atomGrammars": [
      "Apex"
    ],
    "extensions": [
      "cls",
      "trigger"
    ],
    "name": "Apex",
    "namespace": "apex",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Arduino"
    ],
    "extensions": [
      "ino",
      "pde"
    ],
    "name": "Arduino",
    "namespace": "arduino",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "C#"
    ],
    "extensions": [
      "cs"
    ],
    "name": "C#",
    "namespace": "cs",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "C",
      "opencl"
    ],
    "extensions": [
      "h",
      "c",
      "cl"
    ],
    "name": "C",
    "namespace": "c",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "CoffeeScript"
    ],
    "extensions": [
      "coffee"
    ],
    "name": "CoffeeScript",
    "namespace": "coffeescript",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "html"
    ],
    "extensions": [
      "cfm",
      "cfml",
      "cfc"
    ],
    "name": "Coldfusion",
    "namespace": "cfml",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "C++"
    ],
    "extensions": [
      "h",
      "hh",
      "cc",
      "cpp",
      "cxx",
      "C",
      "c++",
      "hpp",
      "hxx",
      "h++"
    ],
    "name": "C++",
    "namespace": "cpp",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Crystal"
    ],
    "extensions": [
      "cr"
    ],
    "name": "Crystal",
    "namespace": "crystal",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "CSS"
    ],
    "extensions": [
      "css"
    ],
    "name": "CSS",
    "namespace": "css",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "CSV"
    ],
    "extensions": [
      "csv"
    ],
    "name": "CSV",
    "namespace": "csv",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "D"
    ],
    "extensions": [
      "d"
    ],
    "name": "D",
    "namespace": "d",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "JavaScript Template",
      "HTML (Angular)"
    ],
    "extensions": [
    ],
    "name": "EJS",
    "namespace": "ejs",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Elm"
    ],
    "extensions": [
      "elm"
    ],
    "name": "Elm",
    "namespace": "elm",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "HTML (Ruby - ERB)",
      "HTML (Rails)"
    ],
    "extensions": [
      "erb"
    ],
    "name": "ERB",
    "namespace": "erb",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Erlang"
    ],
    "extensions": [
      "erl"
    ],
    "name": "Erlang",
    "namespace": "erlang",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Gherkin"
    ],
    "extensions": [
      "feature"
    ],
    "name": "Gherkin",
    "namespace": "gherkin",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Go"
    ],
    "extensions": [
      "go"
    ],
    "name": "Go",
    "namespace": "go",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Fortran - Modern"
    ],
    "extensions": [
      "f90",
      "F90"
    ],
    "name": "Fortran",
    "namespace": "fortran",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Handlebars",
      "HTML (Handlebars)"
    ],
    "extensions": [
      "hbs",
      "handlebars"
    ],
    "name": "Handlebars",
    "namespace": "handlebars",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Haskell"
    ],
    "extensions": [
      "hs"
    ],
    "name": "Haskell",
    "namespace": "haskell",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "HTML"
    ],
    "extensions": [
      "html"
    ],
    "name": "HTML",
    "namespace": "html",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Jade",
      "Pug"
    ],
    "extensions": [
      "jade",
      "pug"
    ],
    "name": "Jade",
    "namespace": "jade",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Java"
    ],
    "extensions": [
      "java"
    ],
    "name": "Java",
    "namespace": "java",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "JavaScript"
    ],
    "extensions": [
      "js"
    ],
    "name": "JavaScript",
    "namespace": "js",
    "sublimeSyntaxes": [
    ],
    "vscodeLanguages": [
      "javascript"
    ]
  },
  {
    "atomGrammars": [
      "JSON"
    ],
    "extensions": [
      "json"
    ],
    "name": "JSON",
    "namespace": "json",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "JSX",
      "JavaScript (JSX)"
    ],
    "extensions": [
      "jsx",
      "js"
    ],
    "name": "JSX",
    "namespace": "jsx",
    "sublimeSyntaxes": [
    ],
    "vscodeLanguages": [
      "javascriptreact"
    ]
  },
  {
    "atomGrammars": [
      "LaTeX"
    ],
    "extensions": [
      "tex"
    ],
    "name": "LaTeX",
    "namespace": "latex",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "LESS"
    ],
    "extensions": [
      "less"
    ],
    "name": "LESS",
    "namespace": "less",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Lua"
    ],
    "extensions": [
      "lua"
    ],
    "name": "Lua",
    "namespace": "lua",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "GitHub Markdown"
    ],
    "extensions": [
      "markdown",
      "md"
    ],
    "name": "Markdown",
    "namespace": "markdown",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Marko"
    ],
    "extensions": [
      "marko"
    ],
    "name": "Marko",
    "namespace": "marko",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "HTML (Mustache)"
    ],
    "extensions": [
      "mustache"
    ],
    "name": "Mustache",
    "namespace": "mustache",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Objective-C",
      "Objective-C++"
    ],
    "extensions": [
      "m",
      "mm",
      "h"
    ],
    "name": "Objective-C",
    "namespace": "objectivec",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "OCaml"
    ],
    "extensions": [
      "ml"
    ],
    "name": "OCaml",
    "namespace": "ocaml",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Pawn"
    ],
    "extensions": [
    ],
    "name": "Pawn",
    "namespace": "pawn",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Perl",
      "Perl 6"
    ],
    "extensions": [
      "pl",
      "PL",
      "pm",
      "pod",
      "t"
    ],
    "name": "Perl",
    "namespace": "perl",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "PHP"
    ],
    "extensions": [
      "php",
      "module",
      "inc"
    ],
    "name": "PHP",
    "namespace": "php",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Puppet"
    ],
    "extensions": [
      "pp"
    ],
    "name": "Puppet",
    "namespace": "puppet",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Python"
    ],
    "extensions": [
      "py"
    ],
    "name": "Python",
    "namespace": "python",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Riot.js",
      "HTML (Riot Tag)"
    ],
    "extensions": [
      "tag"
    ],
    "name": "Riot.js",
    "namespace": "riot",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Ruby",
      "Ruby on Rails"
    ],
    "extensions": [
      "rb"
    ],
    "name": "Ruby",
    "namespace": "ruby",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Rust"
    ],
    "extensions": [
      "rs",
      "rlib"
    ],
    "name": "Rust",
    "namespace": "rust",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Sass"
    ],
    "extensions": [
      "sass"
    ],
    "name": "Sass",
    "namespace": "sass",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "SCSS"
    ],
    "extensions": [
      "scss"
    ],
    "name": "SCSS",
    "namespace": "scss",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Spacebars"
    ],
    "extensions": [
    ],
    "name": "Spacebars",
    "namespace": "spacebars",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "SQL (Rails)",
      "SQL"
    ],
    "extensions": [
      "sql"
    ],
    "name": "SQL",
    "namespace": "sql",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "SVG"
    ],
    "extensions": [
      "svg"
    ],
    "name": "SVG",
    "namespace": "svg",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "HTML (Swig)",
      "SWIG"
    ],
    "extensions": [
      "swig"
    ],
    "name": "Swig",
    "namespace": "swig",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "TSS"
    ],
    "extensions": [
      "tss"
    ],
    "name": "TSS",
    "namespace": "tss",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "HTML (Twig)"
    ],
    "extensions": [
      "twig"
    ],
    "name": "Twig",
    "namespace": "twig",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "TypeScript"
    ],
    "extensions": [
      "ts"
    ],
    "name": "TypeScript",
    "namespace": "typescript",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Vala"
    ],
    "extensions": [
      "vala",
      "vapi"
    ],
    "name": "Vala",
    "namespace": "vala",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Vue Component"
    ],
    "extensions": [
      "vue"
    ],
    "name": "Vue",
    "namespace": "vue",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "Visualforce"
    ],
    "extensions": [
      "page"
    ],
    "name": "Visualforce",
    "namespace": "visualforce",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "SLD",
      "XML",
      "XHTML",
      "XSD",
      "XSL",
      "JSP",
      "GSP"
    ],
    "extensions": [
      "sld",
      "xml",
      "xhtml",
      "xsd",
      "xsl",
      "jsp",
      "gsp"
    ],
    "name": "XML",
    "namespace": "xml",
    "sublimeSyntaxes": [
    ]
  },
  {
    "atomGrammars": [
      "XTemplate"
    ],
    "extensions": [
      "xtemplate"
    ],
    "name": "XTemplate",
    "namespace": "xtemplate",
    "sublimeSyntaxes": [
    ]
  }
].map(lang => Object.assign({}, {
  vscodeLanguages: []
}, lang));



export interface Option {
  title?: string;
  type: "string" | "boolean" | "integer" | "array";
  description: string;
  default?: any;
  enum?: any[];
  maximum?: number;
  minimum?: number;
  items?: {
    type: string
  };
}

export interface OptionsRegistry {
  [key: string]: Option;
}

export const Options: OptionsRegistry = {
  "align_assignments": {
    "default": false,
    "description": "If lists of assignments or properties should be vertically aligned for faster and easier reading.",
    "type": "boolean"
  },
  "align_columns_in_environments": {
    "description": "Aligns columns by the alignment tabs for environments specified",
    "default": [
      "tabular",
      "matrix",
      "bmatrix",
      "pmatrix"
    ],
    "type": "array"
  },
  "always_look_for_split_braces": {
    "default": true,
    "description": "If `latexindent` should look for commands that split braces across lines",
    "type": "boolean"
  },
  "always_look_for_split_brackets": {
    "default": false,
    "description": "If `latexindent` should look for commands that split brackets across lines",
    "type": "boolean"
  },
  "brace_style": {
    "default": "collapse",
    "description": "[collapse|collapse-preserve-inline|expand|end-expand|none]",
    "enum": [
      "collapse",
      "collapse-preserve-inline",
      "expand",
      "end-expand",
      "none"
    ],
    "type": "string"
  },
  "break_chained_methods": {
    "default": false,
    "description": "Break chained method calls across subsequent lines",
    "type": "boolean"
  },
  "commonmark": {
    "default": false,
    "description": "Allows and disallows several constructs.",
    "type": "boolean"
  },
  "configPath": {
    "default": "",
    "description": "Path to uncrustify config file. i.e. uncrustify.cfg",
    "title": "Config Path",
    "type": "string"
  },
  "convert_quotes": {
    "default": "none",
    "description": "Convert the quote characters delimiting strings from either double or single quotes to the other.",
    "enum": [
      "none",
      "double",
      "single"
    ],
    "type": "string"
  },
  "cs_fixer_path": {
    "default": "",
    "description": "Path to the `php-cs-fixer` CLI executable",
    "title": "PHP-CS-Fixer Path",
    "type": "string"
  },
  "emacs_path": {
    "default": "",
    "description": "Path to the `emacs` executable",
    "type": "string"
  },
  "emacs_script_path": {
    "default": "",
    "description": "Path to the emacs script",
    "type": "string"
  },
  "end_with_comma": {
    "default": false,
    "description": "If a terminating comma should be inserted into arrays, object literals, and destructured objects.",
    "type": "boolean"
  },
  "end_with_newline": {
    "default": false,
    "description": "End output with newline",
    "type": "boolean"
  },
  "eval_code": {
    "default": false,
    "description": "",
    "type": "boolean"
  },
  "extra_liners": {
    "default": [
      "head",
      "body",
      "/html"
    ],
    "description": "List of tags (defaults to [head,body,/html] that should have an extra newline before them.",
    "items": {
      "type": "string"
    },
    "type": "array"
  },
  "fixers": {
    "default": "",
    "description": "Add fixer(s). i.e. linefeed,-short_tag,indentation",
    "type": "string"
  },
  "force_indentation": {
    "default": false,
    "description": "if indentation should be forcefully applied to markup even if it disruptively adds unintended whitespace to the documents rendered output",
    "type": "boolean"
  },
  "gfm": {
    "default": true,
    "description": "GitHub Flavoured Markdown",
    "type": "boolean"
  },
  "identifiers": {
    "default": "unchanged",
    "description": "Change case of identifiers",
    "enum": [
      "unchanged",
      "lower",
      "upper",
      "capitalize"
    ],
    "type": "string"
  },
  "ignore": {
    "default": [
      "E24"
    ],
    "description": "do not fix these errors/warnings",
    "items": {
      "type": "string"
    },
    "type": "array"
  },
  "indent_char": {
    "default": " ",
    "description": "Indentation character",
    "enum": [
      " ",
      "\t"
    ],
    "minimum": 0,
    "type": "string"
  },
  "indent_comments": {
    "default": true,
    "description": "Determines whether comments should be indented.",
    "type": "boolean"
  },
  "indent_inner_html": {
    "default": false,
    "description": "Indent <head> and <body> sections.",
    "type": "boolean"
  },
  "indent_level": {
    "default": 0,
    "description": "Initial indentation level",
    "type": "integer"
  },
  "indent_preamble": {
    "default": false,
    "description": "Indent the preable",
    "type": "boolean"
  },
  "indent_scripts": {
    "default": "normal",
    "description": "[keep|separate|normal]",
    "enum": [
      "keep",
      "separate",
      "normal"
    ],
    "type": "string"
  },
  "indent_size": {
    "default": 4,
    "description": "Indentation size/length",
    "minimum": 0,
    "type": "integer"
  },
  "indent_with_tabs": {
    "default": true,
    "description": "Indentation uses tabs, overrides `Indent Size` and `Indent Char`",
    "type": "boolean"
  },
  "jslint_happy": {
    "default": false,
    "description": "Enable jslint-stricter mode",
    "type": "boolean"
  },
  "keep_array_indentation": {
    "default": false,
    "description": "Preserve array indentation",
    "type": "boolean"
  },
  "keep_function_indentation": {
    "default": false,
    "description": "",
    "type": "boolean"
  },
  "keywords": {
    "default": "upper",
    "description": "Change case of keywords",
    "enum": [
      "unchanged",
      "lower",
      "upper",
      "capitalize"
    ],
    "type": "string"
  },
  "level": {
    "default": "",
    "description": "By default, all PSR-2 fixers and some additional ones are run.",
    "type": "string"
  },
  "max_line_length": {
    "default": 79,
    "description": "set maximum allowed line length",
    "type": "integer"
  },
  "max_preserve_newlines": {
    "default": 10,
    "description": "Number of line-breaks to be preserved in one chunk",
    "type": "integer"
  },
  "newline_between_rules": {
    "default": true,
    "description": "Add a newline between CSS rules",
    "type": "boolean"
  },
  "no_lead_zero": {
    "default": false,
    "description": "If in CSS values leading 0s immediately preceeding a decimal should be removed or prevented.",
    "type": "boolean"
  },
  "omit_div": {
    "default": false,
    "description": "Whether to omit/remove the 'div' tags.",
    "type": "boolean"
  },
  "perltidy_profile": {
    "default": "",
    "description": "Specify a configuration file which will override the default name of .perltidyrc",
    "type": "string"
  },
  "phpcbf_path": {
    "default": "",
    "description": "Path to the `phpcbf` CLI executable",
    "title": "PHPCBF Path",
    "type": "string"
  },
  "predefinedConfig": {
    "default": "csscomb",
    "description": "Used if neither a project or custom config file exists.",
    "enum": [
      "csscomb",
      "yandex",
      "zen"
    ],
    "title": "comb predefined config",
    "type": "string"
  },
  "preserve_newlines": {
    "default": true,
    "description": "Preserve line-breaks",
    "type": "boolean"
  },
  "remove_trailing_whitespace": {
    "default": false,
    "description": "Remove trailing whitespace",
    "type": "boolean"
  },
  "rubocop_path": {
    "default": "",
    "description": "Path to the `rubocop` CLI executable",
    "title": "Rubocop Path",
    "type": "string"
  },
  "rustfmt_path": {
    "default": "",
    "description": "Path to rustfmt program",
    "type": "string"
  },
  "selector_separator_newline": {
    "default": false,
    "description": "Add a newline between multiple selectors",
    "type": "boolean"
  },
  "sort_imports": {
    "default": false,
    "description": "sort imports (requires isort installed)",
    "type": "boolean"
  },
  "space_after_anon_function": {
    "default": false,
    "description": "Add a space before an anonymous function's parens, ie. function ()",
    "type": "boolean"
  },
  "space_before_conditional": {
    "default": true,
    "description": "",
    "type": "boolean"
  },
  "space_in_paren": {
    "default": false,
    "description": "Add padding spaces within paren, ie. f( a, b )",
    "type": "boolean"
  },
  "standard": {
    "default": "",
    "description": "Standard name Squiz, PSR2, PSR1, PHPCS, PEAR, Zend, MySource... or path to CS rules",
    "title": "PHPCBF Standard",
    "type": "string"
  },
  "syntax": {
    "default": "html",
    "description": "[html|concise]",
    "enum": [
      "html",
      "concise"
    ],
    "type": "string"
  },
  "unescape_strings": {
    "default": false,
    "description": "Decode printable characters encoded in xNN notation",
    "type": "boolean"
  },
  "unformatted": {
    "default": [
      "a",
      "abbr",
      "area",
      "audio",
      "b",
      "bdi",
      "bdo",
      "br",
      "button",
      "canvas",
      "cite",
      "code",
      "data",
      "datalist",
      "del",
      "dfn",
      "em",
      "embed",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "keygen",
      "label",
      "map",
      "mark",
      "math",
      "meter",
      "noscript",
      "object",
      "output",
      "progress",
      "q",
      "ruby",
      "s",
      "samp",
      "select",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "svg",
      "template",
      "textarea",
      "time",
      "u",
      "var",
      "video",
      "wbr",
      "text",
      "acronym",
      "address",
      "big",
      "dt",
      "ins",
      "small",
      "strike",
      "tt",
      "pre",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6"
    ],
    "description": "List of tags (defaults to inline) that should not be reformatted",
    "items": {
      "type": "string"
    },
    "type": "array"
  },
  "wrap_attributes": {
    "default": "auto",
    "description": "Wrap attributes to new lines [auto|force]",
    "enum": [
      "auto",
      "force"
    ],
    "type": "string"
  },
  "wrap_attributes_indent_size": {
    "default": 4,
    "description": "Indent wrapped attributes to after N characters",
    "minimum": 0,
    "type": "integer"
  },
  "wrap_line_length": {
    "default": 0,
    "description": "Wrap lines at next opportunity after N characters",
    "type": "integer"
  },
  "yaml": {
    "default": true,
    "description": "Enables raw YAML front matter to be detected (thus ignoring markdown-like syntax).",
    "type": "boolean"
  }
};
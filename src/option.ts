

export interface Option {
  type: "string" | "boolean" | "integer";
  description: string;
  default?: any;
  enum?: any[];
  maximum?: number;
  minimum?: number;
}

export interface OptionsRegistry {
  [key: string]: Option
}

export const Options: OptionsRegistry = {
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
  "indent_char": {
    "default": " ",
    "description": "Indentation character",
    "type": "string"
  },
  "indent_level": {
    "default": 0,
    "description": "Initial indentation level",
    "type": "integer"
  },
  "indent_size": {
    "default": 2,
    "description": "Indentation size/length",
    "maximum": 10,
    "minimum": 0,
    "type": "integer"
  },
  "indent_with_tabs": {
    "default": false,
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
  "max_preserve_newlines": {
    "default": 10,
    "description": "Number of line-breaks to be preserved in one chunk",
    "type": "integer"
  },
  "preserve_newlines": {
    "default": true,
    "description": "Preserve line-breaks",
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
  "unescape_strings": {
    "default": false,
    "description": "Decode printable characters encoded in xNN notation",
    "type": "boolean"
  },
  "wrap_line_length": {
    "default": 0,
    "description": "Wrap lines at next opportunity after N characters",
    "type": "integer"
  }
};
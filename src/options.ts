export type SemVer = string;

// tslint:disable:no-reserved-keywords
export interface Option {
  title?: string;
  type: 'string' | 'boolean' | 'integer' | 'array';
  description: string;
  /**
   * Available since version
   */
  since: SemVer;
  /**
   * Deprecated since version
   */
  deprecated?: SemVer;
  default?: any;
  enum?: any[];
  maximum?: number;
  minimum?: number;
  multipleOf?: number;
  items?: {
    type: string;
  };
}
// tslint:enable:no-reserved-keywords

export interface OptionsRegistry {
  [key: string]: Option;
}

export const Options: OptionsRegistry = {
  align_assignments: {
    default: false,
    description:
      'If lists of assignments or properties should be vertically aligned for faster ' +
      'and easier reading.',
    since: '0.7.0',
    type: 'boolean',
  },
  arrow_parens: {
    default: 'always',
    description: 'Require parenthesis in arrow function arguments',
    enum: ['always', 'as-needed'],
    since: '0.7.0',
    type: 'string',
  },
  brace_style: {
    default: 'collapse',
    description: 'Brace style',
    enum: [
      'collapse',
      'collapse-preserve-inline',
      'expand',
      'end-expand',
      'none',
    ],
    since: '0.7.0',
    type: 'string',
  },
  break_chained_methods: {
    default: false,
    description: 'Break chained method calls across subsequent lines',
    since: '0.7.0',
    type: 'boolean',
  },
  comma_first: {
    default: false,
    description: 'Put commas at the beginning of new line instead of end',
    since: '0.7.0',
    type: 'boolean',
  },
  end_of_line: {
    default: 'System Default',
    description: 'End-Of-Line (EOL) separator',
    enum: ['CRLF', 'LF', 'System Default'],
    since: '0.7.0',
    type: 'string',
  },
  end_with_comma: {
    default: false,
    description:
      'If a terminating comma should be inserted into arrays, object literals, and de' +
      'structured objects.',
    since: '0.7.0',
    type: 'boolean',
  },
  end_with_newline: {
    default: false,
    description: 'End output with newline',
    since: '0.7.0',
    type: 'boolean',
  },
  end_with_semicolon: {
    default: false,
    description: 'Insert a semicolon at the end of statements',
    since: '0.7.0',
    type: 'boolean',
  },
  force_indentation: {
    default: false,
    description:
      'if indentation should be forcefully applied to markup even if it disruptively ' +
      'adds unintended whitespace to the documents rendered output',
    since: '0.7.0',
    type: 'boolean',
  },
  identifier_case: {
    default: 'lowercase',
    description: 'Case type for identifiers',
    enum: ['lowercase', 'uppercase', 'capitalize'],
    since: '0.17.0',
    type: 'string',
  },
  indent_chained_methods: {
    default: true,
    description: 'Indent chained method calls',
    since: '0.10.0',
    type: 'boolean',
  },
  indent_char: {
    default: ' ',
    deprecated: '0.8.0',
    description: 'Indentation character',
    enum: [' ', '\t'],
    since: '0.7.0',
    type: 'string',
  },
  indent_comments: {
    default: true,
    description: 'Determines whether comments should be indented.',
    since: '0.7.0',
    type: 'boolean',
  },
  indent_inner_html: {
    default: false,
    description: 'Indent <head> and <body> sections.',
    since: '0.7.0',
    type: 'boolean',
  },
  indent_level: {
    default: 0,
    description: 'Initial indentation level',
    minimum: 0,
    multipleOf: 1,
    since: '0.7.0',
    type: 'integer',
  },
  indent_scripts: {
    default: 'normal',
    description: 'Indent scripts',
    enum: ['keep', 'separate', 'normal'],
    since: '0.7.0',
    type: 'string',
  },
  indent_size: {
    default: 2,
    description: 'Indentation size/length',
    minimum: 0,
    multipleOf: 1,
    since: '0.7.0',
    type: 'integer',
  },
  indent_style: {
    default: 'space',
    description: 'Indentation style',
    enum: ['space', 'tab'],
    since: '0.8.0',
    type: 'string',
  },
  indent_with_tabs: {
    default: true,
    deprecated: '0.8.0',
    description:
      'Indentation uses tabs, overrides `Indent Size` and `Indent Char`',
    since: '0.7.0',
    type: 'boolean',
  },
  jslint_happy: {
    default: false,
    description: 'Enable jslint-stricter mode',
    since: '0.7.0',
    title: 'JSLint Happy',
    type: 'boolean',
  },
  jsx_brackets: {
    default: false,
    description:
      'Put the `>` of a multi-line JSX element at the end of the last line',
    since: '0.7.0',
    title: 'JSX Brackets',
    type: 'boolean',
  },
  keep_array_indentation: {
    default: false,
    description: 'Preserve array indentation',
    since: '0.7.0',
    type: 'boolean',
  },
  keyword_case: {
    default: 'lowercase',
    description: 'Case type for keywords',
    enum: ['lowercase', 'uppercase', 'capitalize'],
    since: '0.17.0',
    type: 'string',
  },
  max_preserve_newlines: {
    default: 10,
    description: 'Number of line-breaks to be preserved in one chunk',
    multipleOf: 1,
    since: '0.7.0',
    type: 'integer',
  },
  multiline_ternary: {
    default: 'always',
    description:
      'Enforces new lines between the operands of a ternary expression',
    enum: ['always', 'always-multiline', 'never'],
    since: '0.7.0',
    type: 'string',
  },
  newline_before_tags: {
    default: ['head', 'body', '/html'],
    description: 'List of tags which should have an extra newline before them.',
    items: {
      type: 'string',
    },
    since: '0.7.0',
    type: 'array',
  },
  newline_between_rules: {
    default: true,
    description: 'Add a newline between CSS rules',
    since: '0.7.0',
    type: 'boolean',
  },
  no_leading_zero: {
    default: false,
    description:
      'If in CSS values leading 0s immediately preceeding a decimal should be removed' +
      ' or prevented.',
    since: '0.7.0',
    type: 'boolean',
  },
  object_curly_spacing: {
    default: true,
    description:
      'Inserts a space before/after brackets for object literals, destructuring assig' +
      'nments, and import/export specifiers',
    since: '0.7.0',
    type: 'boolean',
  },
  pragma_insert: {
    default: false,
    description:
      'Insert a marker at the top of a file specifying the file has been beautified',
    since: '0.7.0',
    type: 'boolean',
  },
  pragma_require: {
    default: false,
    description:
      'Restrict beautifying files to only those with a pragma at the top',
    since: '0.7.0',
    type: 'boolean',
  },
  preserve_newlines: {
    default: true,
    description: 'Preserve line-breaks',
    since: '0.7.0',
    type: 'boolean',
  },
  quotes: {
    default: 'none',
    description:
      'Convert the quote characters delimiting strings from either double or single q' +
      'uotes to the other.',
    enum: ['none', 'double', 'single'],
    since: '0.7.0',
    type: 'string',
  },
  remove_trailing_whitespace: {
    default: false,
    description: 'Remove trailing whitespace',
    since: '0.7.0',
    type: 'boolean',
  },
  selector_separator_newline: {
    default: false,
    description: 'Add a newline between multiple selectors',
    since: '0.7.0',
    type: 'boolean',
  },
  space_after_anon_function: {
    default: false,
    description:
      "Add a space before an anonymous function's parentheses. ie. `function ()`",
    since: '0.7.0',
    type: 'boolean',
  },
  space_before_conditional: {
    default: true,
    description: 'Add a space before conditional, `if(true)` vs `if (true)`',
    since: '0.7.0',
    type: 'boolean',
  },
  space_in_empty_paren: {
    default: false,
    description: 'Add padding spaces within empty parentheses, ie. `f( )`',
    since: '0.7.0',
    type: 'boolean',
  },
  space_in_paren: {
    default: false,
    description: 'Add padding spaces within parentheses, ie. `f( a, b )`',
    since: '0.7.0',
    type: 'boolean',
  },
  typesafe_equality_operators: {
    default: false,
    description:
      'Use typesafe equality operators (`===` and `!==` instead of `==` and `!=`)',
    since: '0.10.0',
    type: 'boolean',
  },
  unescape_strings: {
    default: false,
    description: 'Decode printable characters encoded in xNN notation',
    since: '0.7.0',
    type: 'boolean',
  },
  unformatted: {
    default: [
      'a',
      'abbr',
      'area',
      'audio',
      'b',
      'bdi',
      'bdo',
      'br',
      'button',
      'canvas',
      'cite',
      'code',
      'data',
      'datalist',
      'del',
      'dfn',
      'em',
      'embed',
      'i',
      'iframe',
      'img',
      'input',
      'ins',
      'kbd',
      'keygen',
      'label',
      'map',
      'mark',
      'math',
      'meter',
      'noscript',
      'object',
      'output',
      'progress',
      'q',
      'ruby',
      's',
      'samp',
      'select',
      'small',
      'span',
      'strong',
      'sub',
      'sup',
      'svg',
      'template',
      'textarea',
      'time',
      'u',
      'var',
      'video',
      'wbr',
      'text',
      'acronym',
      'address',
      'big',
      'dt',
      'strike',
      'tt',
      'pre',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ],
    description:
      'List of tags (defaults to inline) that should not be reformatted',
    items: {
      type: 'string',
    },
    since: '0.7.0',
    type: 'array',
  },
  unindent_chained_methods: {
    default: false,
    deprecated: '0.10.0',
    description: 'Do not indent chained method calls',
    since: '0.7.0',
    type: 'boolean',
  },
  wrap_attributes: {
    default: 'auto',
    description: 'Wrap attributes to new lines',
    enum: ['auto', 'force', 'force-aligned'],
    since: '0.7.0',
    type: 'string',
  },
  wrap_attributes_indent_size: {
    default: 4,
    description: 'Indent wrapped attributes to after N characters',
    minimum: 0,
    multipleOf: 1,
    since: '0.7.0',
    type: 'integer',
  },
  wrap_line_length: {
    default: 80,
    description: 'Wrap lines at next opportunity after N characters',
    minimum: 0,
    multipleOf: 1,
    since: '0.7.0',
    type: 'integer',
  },
  wrap_prose: {
    default: 'preserve',
    description: 'Wrap markdown text to new lines',
    enum: ['always', 'never', 'preserve'],
    since: '0.7.0',
    type: 'string',
  },
};

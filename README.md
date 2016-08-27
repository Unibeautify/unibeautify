# Unibeautify

[![Build Status](https://travis-ci.org/Unibeautify/unibeautify.svg?branch=master)](https://travis-ci.org/Unibeautify/unibeautify)

> One Beautifier to rule them all, One Beautifier to clean them, One Beautifier to bring them all and in the darkness sheen them

## Why
- Single beautifier abstracting multiple beautifiers for multiple languages
- Unified beautifier configuration options

## Install

```bash
$ npm install --save unibeautify
```

## Usage

```javascript
import Beautifier from 'unibeautify';

const jsLanguage = {
  name: 'JavaScript',
  namespace: 'js',
  extensions: 'js',

};
const jsBeautifier = {
  name: 'JavaScript Example Beautifier',
  options: {
    // Apply these options first / globally, for all languages
    _: {
      inchar: [
        "indent_with_tabs", "indent_char", function(indent_with_tabs, indent_char) {
          if (indent_with_tabs === true) {
            return "\t";
          } else {
            return indent_char;
          }
        }
      ],
      insize: [
        "indent_with_tabs", "indent_size", function(indent_with_tabs, indent_size) {
          if (indent_with_tabs === true) {
            return 1;
          } else {
            return indent_size;
          }
        }
      ],
      objsort: function(objsort) {
        return objsort || false;
      },
      preserve: [
        'preserve_newlines', function(preserve_newlines) {
          if (preserve_newlines === true) {
            return "all";
          } else {
            return "none";
          }
        }
      ],
      comments: [
        "indent_comments", function(indent_comments) {
          if (indent_comments === false) {
            return "noindent";
          } else {
            return "indent";
          }
        }
      ],
      force: "force_indentation",
      quoteConvert: "convert_quotes",
      vertical: [
        'align_assignments', function(align_assignments) {
          if (align_assignments === true) {
            return "all";
          } else {
            return "none";
          }
        }
      ],
      wrap: "wrap_line_length",
      space: "space_after_anon_function",
      noleadzero: "no_lead_zero",
      endcomma: "end_with_comma",
      methodchain: [
        'break_chained_methods', function(break_chained_methods) {
          if (break_chained_methods === true) {
            return false;
          } else {
            return true;
          }
        }
      ],
      ternaryline: "preserve_ternary_lines"
    },
    // Apply language-specific options
    JSX: true,
    JavaScript: true,
  },
  beautify({ text, language, options, filePath, projectPath, Promise }) {
    return new Promise((resolve, reject) => {
      resolve('text!');
    });
  }
};

const beautifier = new Beautifier()
  .loadLanguage(jsLanguage)
  .loadBeautifier(jsBeautifier);

// ({ text, language, options, filePath, projectPath })
beautifier.beautify(text, language.name, options, context)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

/*╔═══════════════════════════════════════════════════════╗
  ║                                                                 ║
  ║              Unibeautify example with text string               ║
  ║                                                                 ║
  ╚═══════════════════════════════════════════════════════╝*/

import { Unibeautify } from "unibeautify";
import beautifier from "@unibeautify/beautifier-eslint";
const unibeautify = Unibeautify();
unibeautify.loadBeautifier(beautifier);

/** ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
 * Create a variable that holds the string
 */
const text = "if (foo) {bar();} else {baz();}";

unibeautify
  .beautify({
    languageName: "JavaScript",
    options: {
      JavaScript: {
        brace_style: "collapse",
        indent_style: "tab",
      },
    },
    text, // <- pass the text string in here
  })
  .then(results => {
    // to something with results
  });

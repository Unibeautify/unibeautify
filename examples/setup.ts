/*╔═══════════════════════════════════════════════════════╗
  ║                                                                 ║
  ║              How to setup Unibeautify in Node.js                ║
  ║                                                                 ║
  ╚═══════════════════════════════════════════════════════╝*/

/** ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
 * Import Unibeautify and an example beautifier
 */
import { Unibeautify } from "unibeautify";
import beautifier from "@unibeautify/beautifier-eslint";

/** ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
 * Initialize Unibeautify
 */
const unibeautify = Unibeautify();

/** ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
 * Load a beautifier to our unibeautifier constant
 */
unibeautify.loadBeautifier(beautifier);

/** ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
 * Start beautifying a file or text string
 * To learn more about languages and options go to:
 * @see https://unibeautify.com/docs/getting-started
 */
unibeautify
  .beautify({
    languageName: "JavaScript", // <- insert the language you want to beautify
    options: {
      // ^- insert some options for the language
      JavaScript: {
        brace_style: "collapse",
        indent_style: "tab",
      },
    },
  })
  .then(results => {
    // to something with results
  });

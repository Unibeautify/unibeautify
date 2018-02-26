// tslint:disable:no-multiline-string
import * as _ from "lodash";
import * as dedent from "dedent";

import { InlineFlagManager } from "../src/InlineFlagManager";

describe("ignore-next-line", () => {
  test("should ignore single-line change", () => {
    const oldText = dedent`
    console.log('hello world');
    // unibeautify:ignore-next-line
    console.log('hello world');
    `;
    const newText = dedent`
    console.log("hello world");
    // unibeautify:ignore-next-line
    console.log("hello world");
    `;
    const expectedText = dedent`
    console.log("hello world");
    // unibeautify:ignore-next-line
    console.log('hello world');
    `;
    const manager = new InlineFlagManager(oldText, newText);
    const finalText = manager.text;
    expect(finalText).toEqual(expectedText);
  });
  test("should ignore multi-line change", () => {
    const oldText = dedent`
    matrix(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    )

    // unibeautify:ignore-next-line
    matrix(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    )
    `;
    const newText = dedent`
    matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);

    // unibeautify:ignore-next-line
    matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);
    `;
    const expectedText = dedent`
    matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);

    // unibeautify:ignore-next-line
    matrix(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    )
    `;
    const manager = new InlineFlagManager(oldText, newText);
    const finalText = manager.text;
    expect(finalText).toEqual(expectedText);
  });
});

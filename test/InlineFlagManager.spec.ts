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
  test("should not add newline at end of file", () => {
    const oldText = `console.log('hello world');`;
    const newText = `console.log("hello world");`;
    const expectedText = `console.log("hello world");`;
    const manager = new InlineFlagManager(oldText, newText);
    const finalText = manager.text;
    expect(finalText).toEqual(expectedText);
  });
  test("should keep newline at end of file", () => {
    const oldText = `console.log('hello world');\n`;
    const newText = `console.log("hello world");\n`;
    const expectedText = `console.log("hello world");\n`;
    const manager = new InlineFlagManager(oldText, newText);
    const finalText = manager.text;
    expect(finalText).toEqual(expectedText);
  });
});

describe("disable/enable", () => {
  test("should apply changes without disable", () => {
    const oldText = dedent`
    console.log('hello world');
    `;
    const newText = dedent`
    console.log("hello world");
    `;
    const expectedText = dedent`
    console.log("hello world");
    `;
    const manager = new InlineFlagManager(oldText, newText);
    const finalText = manager.text;
    expect(finalText).toEqual(expectedText);
  });
  test("should ignore changes after disable", () => {
    const oldText = dedent`
    console.log('hello world');
    // unibeautify:disable
    console.log('hello world');
    `;
    const newText = dedent`
    console.log("hello world");
    // unibeautify:disable
    console.log("hello world");
    `;
    const expectedText = dedent`
    console.log("hello world");
    // unibeautify:disable
    console.log('hello world');
    `;
    const manager = new InlineFlagManager(oldText, newText);
    const finalText = manager.text;
    expect(finalText).toEqual(expectedText);
  });
  test("should ignore changes after disable until enable", () => {
    const oldText = dedent`
    // unibeautify:disable
    console.log('hello world');
    // unibeautify:enable
    console.log('hello world');
    `;
    const newText = dedent`
    // unibeautify:disable
    console.log("hello world");
    // unibeautify:enable
    console.log("hello world");
    `;
    const expectedText = dedent`
    // unibeautify:disable
    console.log('hello world');
    // unibeautify:enable
    console.log("hello world");
    `;
    const manager = new InlineFlagManager(oldText, newText);
    const finalText = manager.text;
    expect(finalText).toEqual(expectedText);
  });

  test("should ignore changes after disable outside block", () => {
    const oldText = dedent`
    // unibeautify:disable
    function helloWorld() {
    console.log('hello world');
    }
    `;
    const newText = dedent`
    // unibeautify:disable
    function helloWorld() {
      console.log('hello world');
    }
    `;
    const expectedText = dedent`
    // unibeautify:disable
    function helloWorld() {
    console.log('hello world');
    }
    `;
    const manager = new InlineFlagManager(oldText, newText);
    const finalText = manager.text;
    expect(finalText).toEqual(expectedText);
  });

  test("should ignore changes after disable inside block", () => {
    const oldText = dedent`
    function helloWorld() {
    // unibeautify:disable
    console.log('hello world');
    }
    `;
    const newText = dedent`
    function helloWorld() {
      // unibeautify:disable
      console.log('hello world');
    }
    `;
    const expectedText = dedent`
    function helloWorld() {
    // unibeautify:disable
    console.log('hello world');
    }
    `;
    const manager = new InlineFlagManager(oldText, newText);
    const finalText = manager.text;
    expect(finalText).toEqual(expectedText);
  });

  test("should ignore changes after multiple disable lines", () => {
    const oldText = dedent`
    function helloWorld() {
        // unibeautify:disable
    console.log("Test1");
        // unibeautify:disable
    console.log("Test2");
    }
    `;
    const newText = dedent`
    function helloWorld() {
        // unibeautify:disable
        console.log("Test1");
        // unibeautify:disable
        console.log("Test2");
    }
    `;
    const expectedText = dedent`
    function helloWorld() {
        // unibeautify:disable
    console.log("Test1");
        // unibeautify:disable
    console.log("Test2");
    }
    `;
    const manager = new InlineFlagManager(oldText, newText);
    const finalText = manager.text;
    expect(finalText).toEqual(expectedText);
  });

  test("should ignore changes after multiple disable lines", () => {
    const oldText = dedent`
    function helloWorld() {
    // unibeautify:disable
    console.log("Test1");
    // unibeautify:disable
    console.log("Test2");
    }
    `;
    const newText = dedent`
    function helloWorld() {
        // unibeautify:disable
        console.log("Test1");
        // unibeautify:disable
        console.log("Test2");
    }
    `;
    const expectedText = dedent`
    function helloWorld() {
    // unibeautify:disable
    console.log("Test1");
    // unibeautify:disable
    console.log("Test2");
    }
    `;
    const manager = new InlineFlagManager(oldText, newText);
    const finalText = manager.text;
    expect(finalText).toEqual(expectedText);
  });
});

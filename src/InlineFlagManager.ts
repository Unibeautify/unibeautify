import {
  parsePatch,
  createTwoFilesPatch,
  applyPatch,
  ParsedDiff,
  Hunk,
} from 'diff';

export class InlineFlagManager {
  private readonly oldLines: string[] = [];
  private readonly containsDisable: boolean;
  constructor(private oldText: string, private newText: string) {
    this.oldLines = oldText.split('\n');
    this.containsDisable =
      this.oldText.indexOf(InlineFlagPrefix.Disable) !== -1;
  }

  public get text(): string {
    const { patch, oldText } = this;
    const afterPatchText = applyPatch(oldText, patch);
    return this.fixEndOfFile(afterPatchText);
  }

  private fixEndOfFile(text: string): string {
    const shouldEndWithNewline = this.endsWithNewline(this.newText);
    const afterEndsWithNewline = this.endsWithNewline(text);
    if (shouldEndWithNewline === afterEndsWithNewline) {
      return text;
    }
    if (shouldEndWithNewline) {
      return `${text}\n`;
    }
    return text.slice(0, -1);
  }

  private endsWithNewline(text: string): boolean {
    return text.charAt(text.length - 1) === '\n';
  }

  private get patch(): ParsedDiff {
    const { rawPatch } = this;
    const filteredHunks = this.filterHunks(rawPatch.hunks);
    return {
      ...rawPatch,
      hunks: filteredHunks,
    };
  }

  private get rawPatch(): ParsedDiff {
    const oldFileName = 'Old';
    const newFileName = 'New';
    const oldHeader = '';
    const newHeader = '';
    const options = {
      context: 0,
    };
    return parsePatch(
      createTwoFilesPatch(
        oldFileName,
        newFileName,
        this.oldText,
        this.newText,
        oldHeader,
        newHeader,
        options
      )
    )[0];
  }

  private filterHunks(hunks: Hunk[]): Hunk[] {
    return hunks.filter(this.shouldApplyHunk.bind(this));
  }

  private shouldApplyHunk(hunk: Hunk): boolean {
    const lineNumber = hunk.oldStart;
    return !(
      this.shouldIgnoreThisLine(lineNumber) || this.isDisabledAtLine(lineNumber)
    );
  }

  private shouldIgnoreThisLine(lineNumber: number): boolean {
    const prevLineNum = lineNumber - 1;
    const prevLineCode = this.codeAtLine(prevLineNum);
    return Boolean(
      prevLineCode &&
        prevLineCode.indexOf(InlineFlagPrefix.IgnoreNextLine) !== -1
    );
  }

  private isDisabledAtLine(lineNumber: number): boolean {
    if (this.containsDisable) {
      const reversedLines = this.oldLines
        .slice(0, Math.max(0, lineNumber))
        .reverse()
        .join('\n');
      const disableIndex = reversedLines.indexOf(InlineFlagPrefix.Disable);
      const enableIndex = reversedLines.indexOf(InlineFlagPrefix.Enable);
      if (
        disableIndex !== -1 &&
        (enableIndex === -1 || disableIndex < enableIndex)
      ) {
        return true;
      }
    }
    return false;
  }

  private codeAtLine(lineNumber: number): string | undefined {
    return this.oldLines[Math.max(0, lineNumber - 1)];
  }
}

enum InlineFlagPrefix {
  IgnoreNextLine = 'unibeautify:ignore-next-line',
  Enable = 'unibeautify:enable',
  Disable = 'unibeautify:disable',
}

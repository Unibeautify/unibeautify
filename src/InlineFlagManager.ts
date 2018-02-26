import {
  parsePatch,
  createTwoFilesPatch,
  createPatch,
  applyPatch,
  IUniDiff,
  IHunk
} from "diff";

export class InlineFlagManager {
  private readonly oldLines: string[] = [];
  constructor(private oldText: string, private newText: string) {
    this.oldLines = oldText.split("\n");
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
    return text.charAt(text.length - 1) === "\n";
  }

  private get patch(): IUniDiff {
    const { rawPatch } = this;
    const filteredHunks = this.filterHunks(rawPatch.hunks);
    return {
      ...rawPatch,
      hunks: filteredHunks
    };
  }

  private get rawPatch(): IUniDiff {
    const oldFileName = "Old";
    const newFileName = "New";
    const oldHeader = "";
    const newHeader = "";
    const options = {
      context: 0
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

  private filterHunks(hunks: IHunk[]): IHunk[] {
    return hunks.filter(this.shouldApplyHunk.bind(this));
  }

  private shouldApplyHunk(hunk: IHunk): boolean {
    const prevLineNum = hunk.oldStart - 1;
    const prevLineCode = this.codeAtLine(prevLineNum);
    return !(
      prevLineCode &&
      prevLineCode.indexOf("unibeautify:ignore-next-line") !== -1
    );
  }

  private codeAtLine(lineNumber: number): string | undefined {
    return this.oldLines[Math.max(0, lineNumber - 1)];
  }
}

import { structuredPatch, applyPatch, IUniDiff, IHunk } from "diff";

export class InlineFlagManager {
  private readonly oldLines: string[] = [];
  constructor(private oldText: string, private newText: string) {
    this.oldLines = oldText.split("\n");
  }

  public get text(): string {
    const { patch, oldText } = this;
    return applyPatch(oldText, patch).trim();
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
    return this.fixPatch(
      structuredPatch(
        oldFileName,
        newFileName,
        this.oldText,
        this.newText,
        oldHeader,
        newHeader,
        options
      )
    );
  }

  // See https://github.com/kpdecker/jsdiff/issues/157
  private fixPatch(patch: IUniDiff): IUniDiff {
    return {
      ...patch,
      hunks: patch.hunks.map(hunk => ({
        ...hunk,
        linedelimiters: hunk.lines.map(() => "\n")
      }))
    };
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
    return this.oldLines[lineNumber - 1];
  }
}

import { Dependency, ExecutableDependencyOptions } from "./Dependency";

export class ExecutableDependency extends Dependency {
  constructor(protected options: ExecutableDependencyOptions) {
    super(options);
  }

  protected loadVersion() {
    return this.run(this.versionArgs).then(({ stdout }) => stdout);
  }

  private get versionArgs(): string[] {
    return this.options.versionArgs || ["--version"];
  }

  public run(_args: RunArg[], _options: RunOptions = {}): Promise<RunResponse> {
    return Promise.resolve({
      exitCode: 0,
      stderr: "",
      stdout: "executable run output",
    });
  }
}

export type RunArg = string | Promise<string> | undefined | null;

export interface RunOptions {
  cwd?: string;
}

export interface RunResponse {
  stdout: string;
  stderr: string;
  exitCode: number;
}

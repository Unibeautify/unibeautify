import { spawn, SpawnOptions } from "child_process";

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

  public run(args: RunArg[], options: RunOptions = {}): Promise<RunResponse> {
    return this.resolveArgs(args).then(finalArgs =>
      this.spawn({ exe: this.program, args: finalArgs, options }),
    );
  }

  private resolveArgs(args: RunArg[]): Promise<string[]> {
    const truthyArgs: any[] = args.filter(Boolean);
    return Promise.all(truthyArgs);
  }

  private get program(): string {
    return this.options.program;
  }

  private spawn({
    exe,
    args,
    options,
    stdin,
  }: {
    exe: string;
    args: string[];
    options: SpawnOptions;
    stdin?: any;
  }): Promise<RunResponse> {
    return new Promise((resolve, reject) => {
      const cmd = spawn(exe, args, options);
      let stdout = "";
      let stderr = "";
      cmd.stdout.on("data", data => {
        return (stdout += data);
      });
      cmd.stderr.on("data", data => {
        return (stderr += data);
      });
      cmd.on("close", exitCode => {
        return resolve({ exitCode, stdout, stderr });
      });
      cmd.on("error", err => {
        return reject(err);
      });
      if (stdin) {
        cmd.stdin.end(stdin);
      }
    });
  }
}

export type RunArg = string | Promise<string> | undefined | null;

export interface RunOptions extends SpawnOptions {
  cwd?: string;
}

export interface RunResponse {
  stdout: string;
  stderr: string;
  exitCode: number;
}

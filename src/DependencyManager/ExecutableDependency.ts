import { spawn as Spawn, SpawnOptions } from "child_process";

import {
  Dependency,
  ExecutableDependencyDefinition,
  DependencyOptions,
} from "./Dependency";

export class ExecutableDependency extends Dependency {
  constructor(
    protected definition: ExecutableDependencyDefinition,
    options: DependencyOptions = {}
  ) {
    super(definition, options);
  }

  protected loadVersion() {
    return this.run({ args: this.versionArgs }).then(
      ({ stdout, exitCode, stderr }) => {
        return stdout || stderr;
      }
    );
  }

  private get versionArgs(): string[] {
    return this.definition.versionArgs || ["--version"];
  }

  public run({
    args,
    options = {},
    stdin,
  }: {
    args: RunArg[];
    options?: RunOptions;
    stdin?: any;
  }): Promise<RunResponse> {
    return this.resolveArgs(args).then(finalArgs =>
      this.spawn({ exe: this.pathOrProgram, args: finalArgs, options, stdin })
    );
  }

  private resolveArgs(args: RunArg[]): Promise<string[]> {
    return Promise.all(args as any[]).then(resolvedArgs =>
      resolvedArgs.filter(Boolean)
    );
  }

  private get pathOrProgram(): string {
    return this.programPath || this.program;
  }

  private get program(): string {
    return this.definition.program;
  }

  private get programPath(): string | undefined {
    return this.options.path;
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
      // tslint:disable-next-line:no-require-imports
      const spawn: typeof Spawn = require("child_process").spawn;
      const cmd = spawn(exe, args, {
        ...options,
        env: {
          ...process.env,
          ...(options.env || {}),
        },
      });
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

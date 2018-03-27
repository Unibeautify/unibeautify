import { Version } from "./Version";

export abstract class Dependency {
  private _isInstalled: boolean = false;
  private _version?: Version;
  private _errors: Error[] = [];

  constructor(protected options: DependencyOptions) {}

  public load(): Promise<boolean> {
    if (this.isInstalled) {
      return Promise.resolve(this.isInstalled);
    }
    return this.reload();
  }

  public reload(): Promise<boolean> {
    this.clearErrors();
    return this.loadVersion()
      .then(version => {
        this._version = this.parseVersion(version);
        return (this._isInstalled = true);
      })
      .catch((error: Error) => {
        this.addError(error);
        this._version = undefined;
        return (this._isInstalled = false);
      })
      .then(isInstalled => {
        if (this.required && !isInstalled) {
          throw new Error(
            `Dependency "${this.name}" is required and not installed.`
          );
        }
        return isInstalled;
      });
  }

  private parseVersion(version: string): Version {
    const { parseVersion } = this.options;
    return new Version(parseVersion ? parseVersion(version) : version);
  }

  protected abstract loadVersion(): Promise<string>;

  public get isInstalled(): boolean {
    return this._isInstalled;
  }

  private addError(error: Error): void {
    this._errors.push(error);
  }

  private clearErrors(): void {
    this._errors = [];
  }

  public get name(): string {
    return this.options.name;
  }

  public get required(): boolean {
    return !Boolean(this.options.optional);
  }

  public get version(): Version | undefined {
    return this._version;
  }

  public get errors() {
    return this._errors;
  }
}

export interface BaseDependencyOptions {
  // tslint:disable-next-line:no-reserved-keywords
  type: DependencyType;
  name: string;
  parseVersion?(text: string): string;
  optional?: boolean;
}

export enum DependencyType {
  Node = "node",
  Executable = "exec"
}

export interface NodeDependencyOptions extends BaseDependencyOptions {
  // tslint:disable-next-line:no-reserved-keywords
  type: DependencyType.Node;
  // tslint:disable-next-line:no-reserved-keywords
  package: string;
}

export interface ExecutableDependencyOptions extends BaseDependencyOptions {
  // tslint:disable-next-line:no-reserved-keywords
  type: DependencyType.Executable;
  program: string;
  versionArgs?: string[];
  docker?: {
    image: string;
  };
}

export type DependencyOptions =
  | NodeDependencyOptions
  | ExecutableDependencyOptions;

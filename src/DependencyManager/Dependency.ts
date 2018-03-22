import { SemVer } from "semver";

export abstract class Dependency {
  private _isInstalled: boolean = false;
  private _version?: SemVer;

  constructor(protected options: DependencyOptions) {}

  public load(): Promise<boolean> {
    if (this.isInstalled) {
      return Promise.resolve(this.isInstalled);
    }
    return this.reload();
  }

  public reload(): Promise<boolean> {
    return this.loadVersion()
      .then(version => {
        this._version = this.parseVersion(version);
        return (this._isInstalled = true);
      })
      .catch(error => {
        this._version = undefined;
        return (this._isInstalled = false);
      });
  }

  private parseVersion(version: string): SemVer {
    const { parseVersion } = this.options;
    return new SemVer(parseVersion ? parseVersion(version) : version, true);
  }

  protected abstract loadVersion(): Promise<string>;

  public get isInstalled(): boolean {
    return this._isInstalled;
  }
  public get name(): string {
    return this.options.name;
  }

  public get version(): SemVer | undefined {
    return this._version;
  }

  public get required(): boolean {
    return !Boolean(this.options.optional);
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

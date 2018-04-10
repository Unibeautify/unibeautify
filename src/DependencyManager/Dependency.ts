import { Version } from "./Version";

export abstract class Dependency {
  private _isInstalled: boolean = false;
  private _version?: Version;
  private _errors: Error[] = [];

  constructor(protected definition: DependencyDefinition, protected options: DependencyOptions) {}

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
            [
              `Dependency "${this.name}" is required and not installed.`,
              ...this.errors.map(error => `  - ${error.message}`),
            ].join("\n")
          );
        }
        return isInstalled;
      });
  }

  private parseVersion(text: string): Version {
    return new Version(this.versionFromText(text) || "");
  }

  private versionFromText(text: string): string | undefined {
    const { parseVersion } = this.definition;
    if (!parseVersion) {
      return text;
    }
    if (typeof parseVersion === "function") {
      return parseVersion(text);
    }
    const patterns = Array.isArray(parseVersion)
      ? parseVersion
      : [parseVersion];
    return this.extractWithPatterns(text, patterns) || "";
  }

  private extractWithPatterns(
    text: string,
    patterns: (string | RegExp)[]
  ): string | undefined {
    return patterns.reduce(
      (extracted: string | undefined, pattern: string | RegExp) => {
        if (extracted) {
          return extracted;
        }
        const expr =
          typeof pattern === "string" ? new RegExp(pattern) : pattern;
        const matches = text.match(expr);
        if (matches) {
          return matches[1];
        }
        return undefined;
      },
      undefined
    );
  }

  protected abstract loadVersion(): Promise<string>;

  public get isInstalled(): boolean {
    return this._isInstalled;
  }

  protected addError(error: Error): void {
    this._errors.push(error);
  }

  private clearErrors(): void {
    this._errors = [];
  }

  public get name(): string {
    return this.definition.name;
  }

  public get required(): boolean {
    return !Boolean(this.definition.optional);
  }

  public get version(): Version | undefined {
    return this._version;
  }

  public get errors() {
    return this._errors;
  }
}

export interface BaseDependencyDefinition {
  // tslint:disable-next-line:no-reserved-keywords
  type: DependencyType;
  name: string;
  parseVersion?: DependencyVersionParser;
  optional?: boolean;
}

export enum DependencyType {
  Node = "node",
  Executable = "exec",
}

export type DependencyVersionParser =
  | string
  | RegExp
  | (string | RegExp)[]
  | DependencyVersionParserFunction;

export type DependencyVersionParserFunction = (
  text: string
) => string | undefined;

export interface NodeDependencyDefinition extends BaseDependencyDefinition {
  // tslint:disable-next-line:no-reserved-keywords
  type: DependencyType.Node;
  // tslint:disable-next-line:no-reserved-keywords
  package: string;
}

export interface ExecutableDependencyDefinition extends BaseDependencyDefinition {
  // tslint:disable-next-line:no-reserved-keywords
  type: DependencyType.Executable;
  program: string;
  versionArgs?: string[];
  docker?: {
    image: string;
  };
}

export type DependencyDefinition =
  | NodeDependencyDefinition
  | ExecutableDependencyDefinition;

export interface DependencyOptions {
  path?: string;
}

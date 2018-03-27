import { Dependency, NodeDependencyOptions } from "./Dependency";

// tslint:disable-next-line:no-require-imports no-var-requires
const requireg = require("requireg");

export class NodeDependency extends Dependency {
  constructor(protected options: NodeDependencyOptions) {
    super(options);
  }

  protected loadVersion() {
    try {
      return Promise.resolve(this.require("package.json").version);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // tslint:disable-next-line:no-reserved-keywords
  public get package() {
    return this.require();
  }

  // tslint:disable-next-line:no-reserved-keywords
  private require(id?: string): any {
    // tslint:disable-next-line:no-require-imports non-literal-require
    return require(this.resolve(id));
  }

  private resolve(file?: string): string {
    const path = this.fullPath(file);
    return this.resolveLocal(path) || this.resolveGlobal(path);
  }

  private resolveLocal(path: string): string {
    return require.resolve(path);
  }

  private resolveGlobal(path: string): string {
    return requireg.resolve(path);
  }

  private fullPath(filePath?: string): string {
    if (filePath) {
      return `${this.packageName}/${filePath}`;
    }
    return this.packageName;
  }

  private get packageName(): string {
    return this.options.package;
  }
}

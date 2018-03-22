// tslint:disable:no-reserved-keywords
import { SemVer } from "semver";
import { DependencyFactory } from "./DependencyFactory";
import { Dependency, DependencyOptions } from "./Dependency";

export class DependencyManager {
  private readonly dependencies: Dependency[];
  private readonly lookup: { [name: string]: Dependency };

  constructor(dependencies: DependencyOptions[]) {
    this.dependencies = dependencies.map(dependency =>
      new DependencyFactory(dependency).dependency()
    );
    this.lookup = this.dependencies.reduce(
      (lookup, dep) => ({
        ...lookup,
        [dep.name]: dep
      }),
      {}
    );
  }

  public has(name: string): boolean {
    return Boolean(this.get(name));
  }

  public get<T extends Dependency>(name: string): T | undefined {
    return this.lookup[name] as T;
  }

  public load(): Promise<void[]> {
    return Promise.all(
      this.dependencies.map(dep => {
        return dep.load().then(isInstalled => {
          if (dep.required && !isInstalled) {
            throw new Error(
              `Dependency "${dep.name}" is required and not installed.`
            );
          }
        });
      })
    );
  }
}

export interface DependencyMap {
  [name: string]: Dependency;
}

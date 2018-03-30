// tslint:disable:no-reserved-keywords
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
        [dep.name]: dep,
      }),
      {}
    );
  }

  public has(name: string): boolean {
    return Boolean(this.get(name));
  }

  public get<T extends Dependency>(name: string): T {
    const dep = this.lookup[name] as T | undefined;
    if (!dep) {
      throw new Error(`Dependency with name ${name} not found.`);
    }
    return dep;
  }

  public load(): Promise<boolean> {
    return Promise.all(
      this.dependencies.map(dep => {
        return dep.load();
      })
    ).then(() => true);
  }
}

export interface DependencyMap {
  [name: string]: Dependency;
}

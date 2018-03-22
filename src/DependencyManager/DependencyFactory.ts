import {
  Dependency,
  DependencyType,
  NodeDependencyOptions,
  ExecutableDependencyOptions,
  DependencyOptions
} from "./Dependency";
import { NodeDependency } from "./NodeDependency";
import { ExecutableDependency } from "./ExecutableDependency";

export class DependencyFactory {
  constructor(private options: DependencyOptions) {}

  public dependency(): Dependency {
    const { options } = this;
    switch (options.type) {
      case DependencyType.Node:
        return new NodeDependency(options);
      case DependencyType.Executable:
        return new ExecutableDependency(options);
      default:
        throw new Error(
          `Dependency type not found for: ${JSON.stringify(options)}`
        );
    }
  }
}

import { Dependency, DependencyType, DependencyDefinition, DependencyOptions } from "./Dependency";
import { NodeDependency } from "./NodeDependency";
import { ExecutableDependency } from "./ExecutableDependency";

export class DependencyFactory {
  constructor(private definition: DependencyDefinition, private options: DependencyOptions) {}

  public dependency(): Dependency {
    const { definition, options } = this;
    switch (definition.type) {
      case DependencyType.Node:
        return new NodeDependency(definition, options);
      case DependencyType.Executable:
        return new ExecutableDependency(definition, options);
      default:
        throw new Error(
          `Dependency type not found for: ${JSON.stringify(definition)}`
        );
    }
  }
}

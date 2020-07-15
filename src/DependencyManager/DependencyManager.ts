// tslint:disable:no-reserved-keywords
import { DependencyFactory } from './DependencyFactory';
import {
    Dependency,
    DependencyDefinition,
    DependencyOptions,
} from './Dependency';

export class DependencyManager {
    private static registry: DependencyRegistry = {};

    public static clearRegistry(): void {
        this.registry = {};
    }

    constructor(
        private beautifierName: string,
        private dependencyDefinitions: DependencyDefinition[] = [],
        private options: LanguageDependencyOptions = {}
    ) {
        this.initializeDependencies();
    }

    public load(): Promise<boolean> {
        return Promise.all(
            this.dependencyDefinitions
                .map(def => this.get(def.name))
                .map(dep => dep.load())
        ).then(() => true);
    }

    private initializeDependencies(): void {
        const lookup = DependencyManager.registry;
        const beautifierLookup = lookup[this.beautifierName] || {};
        lookup[this.beautifierName] = beautifierLookup;

        this.dependencyDefinitions.forEach(def => {
            const { name: dependencyName } = def;
            const options = this.optionsForDependency(dependencyName);
            const optionsKey = this.keyForOptions(options);
            const depLookup = beautifierLookup[dependencyName] || {};
            beautifierLookup[dependencyName] = depLookup;
            depLookup[optionsKey] =
                depLookup[optionsKey] || this.createDependency(def, options);
        });
    }

    public has(name: string): boolean {
        return Boolean(this.get(name));
    }

    public get<T extends Dependency>(dependencyName: string): T {
        const options = this.optionsForDependency(dependencyName);
        const optionsKey = this.keyForOptions(options);
        const lookup = this.registry[dependencyName] || {};
        const dep = lookup[optionsKey] as T | undefined;
        if (!dep) {
            throw new Error(
                `Dependency with name ${dependencyName} not found.`
            );
        }
        return dep;
    }

    private optionsForDependency(dependencyName: string): DependencyOptions {
        return this.options[dependencyName];
    }

    protected get registry(): DependencyRegistry[string] {
        return DependencyManager.registry[this.beautifierName];
    }

    protected createDependency(
        definition: DependencyDefinition,
        options: DependencyOptions
    ): Dependency {
        return new DependencyFactory(definition, options).dependency();
    }

    private keyForOptions(options: DependencyOptions = {}): string {
        return JSON.stringify(options);
    }
}

export interface LanguageDependencyOptions {
    [dependencyName: string]: DependencyOptions;
}

export interface DependencyRegistry {
    [beautifierName: string]: {
        [dependencyName: string]: {
            [optionsKey: string]: Dependency;
        };
    };
}

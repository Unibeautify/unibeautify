import {
    Dependency,
    NodeDependencyDefinition,
    DependencyOptions,
} from './Dependency';

export class NodeDependency extends Dependency {
    constructor(
        protected definition: NodeDependencyDefinition,
        options: DependencyOptions = {}
    ) {
        super(definition, options);
    }

    protected loadVersion() {
        try {
            return Promise.resolve(this.require('package.json').version);
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
        const path = this.fullPath(id);
        const modulePath = this.resolve(path);
        if (modulePath) {
            // tslint:disable-next-line:no-require-imports non-literal-require
            return require(modulePath);
        } else {
            throw new Error(`Cannot find module ${path}`);
        }
    }

    private resolve(path: string): string | undefined {
        return this.resolveLocal(path) || this.resolveGlobal(path);
    }

    private resolveLocal(path: string): string | undefined {
        return this.resolveWith(require.resolve)(path);
    }

    private resolveGlobal(path: string): string | undefined {
        // tslint:disable-next-line:no-require-imports no-var-requires
        const requireg = require('requireg');
        return this.resolveWith(requireg.resolve)(path);
    }

    private resolveWith(
        resolver: (path: string) => string
    ): (path: string) => string | undefined {
        return (path: string) => {
            try {
                return resolver(path);
            } catch (error) {
                return undefined;
            }
        };
    }

    private fullPath(filePath?: string): string {
        if (filePath) {
            return `${this.packageName}/${filePath}`;
        }
        return this.packageName;
    }

    private get packageName(): string {
        return this.definition.package;
    }
}

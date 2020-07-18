import * as SemVer from 'semver';

export class Version {
    private readonly semVer: SemVer.SemVer;

    constructor(public readonly rawVersion: string) {
        this.semVer = new SemVer.SemVer(
            SemVer.coerce(this.rawVersion) || this.rawVersion,
            true
        );
    }

    public isGreaterThan(anotherVersion: string): boolean {
        return SemVer.gt(this.semVer, anotherVersion);
    }

    public satisfies(ranger: string): boolean {
        return SemVer.satisfies(this.semVer, ranger);
    }

    public get major(): number {
        return this.semVer.major;
    }
    public get minor(): number {
        return this.semVer.minor;
    }
    public get patch(): number {
        return this.semVer.patch;
    }
}

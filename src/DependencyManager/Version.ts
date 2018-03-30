import * as SemVer from "semver";

export class Version {
  public readonly semVer: SemVer.SemVer;

  constructor(public readonly rawVersion: string) {
    this.semVer = new SemVer.SemVer(SemVer.coerce(this.rawVersion) || this.rawVersion, true);
  }

  public isGreaterThan(anotherVersion: string): boolean {
    return SemVer.gt(this.semVer, anotherVersion);
  }

  public satisfies(ranger: string): boolean {
    return SemVer.satisfies(this.semVer, ranger);
  }
}

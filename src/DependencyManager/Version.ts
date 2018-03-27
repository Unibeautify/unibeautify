import * as SemVer from "semver";

export class Version {
  public readonly semVer: SemVer.SemVer;

  constructor(public readonly rawVersion: string) {
    this.semVer = new SemVer.SemVer(this.rawVersion, true);
  }

  public greaterThan(anotherVersion: string): boolean {
    return SemVer.gt(this.semVer, anotherVersion);
  }
}

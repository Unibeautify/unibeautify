import { Version } from "../../src/DependencyManager";

describe("invalid version text", () => {
  test("should fail to parse undefined", () => {
    expect(() => new Version(void 0 as any)).toThrowError();
    expect(() => new Version(undefined as any)).toThrowError();
  });
  test("should fail to parse null", () => {
    expect(() => new Version(null as any)).toThrowError();
  });
  test("should fail to parse empty string", () => {
    expect(() => new Version("")).toThrowError();
  });
  test("should fail to parse non-empty string without numbers", () => {
    expect(() => new Version("a.b.c")).toThrowError();
    expect(() => new Version("A.B.C")).toThrowError();
    expect(() => new Version("-.+.-")).toThrowError();
  });
});

describe("valid version text", () => {
  test("should successfully parse full (major.minor.patch) version", () => {
    expect(() => new Version("1.2.3")).not.toThrowError();
  });
  test("should successfully parse partial (major.minor) version", () => {
    expect(() => new Version("1.2")).not.toThrowError();
  });
  test("should successfully parse partial (major) version", () => {
    expect(() => new Version("1")).not.toThrowError();
  });
  test("should successfully parse version within non-numeric text", () => {
    expect(
      () => new Version("Docker version 17.12.0-ce, build c97c6d6")
    ).not.toThrowError();
  });

  describe("isGreaterThan", () => {
    test("should return boolean", () => {
      const version = new Version("1.2.3");
      expect(version.isGreaterThan("1.0.0")).toBe(true);
      expect(version.isGreaterThan("2.0.0")).toBe(false);
      expect(version.isGreaterThan("1.2.2")).toBe(true);
      expect(version.isGreaterThan("1.2.4")).toBe(false);
    });
  });

  describe("satisfies", () => {
    test("should return boolean", () => {
      const version = new Version("1.2.3");
      expect(version.satisfies(">=1.0.0")).toBe(true);
      expect(version.satisfies(">=2.0.0")).toBe(false);
      expect(version.satisfies(">=1.2.2")).toBe(true);
      expect(version.satisfies(">=1.2.4")).toBe(false);
    });
  });
});

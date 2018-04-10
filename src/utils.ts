export function zipObject(keys: string[], values: string[]) {
  return keys.reduce(
    (acc, key, idx) => ({
      ...acc,
      [key]: values[idx],
    }),
    {}
  );
}

export function unique<T>(array: T[]): T[] {
  return array.reduce(
    (acc, val) => (acc.indexOf(val) === -1 ? acc.concat(val) : acc),
    [] as T[]
  );
}

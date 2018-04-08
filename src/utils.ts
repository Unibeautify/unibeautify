export function zipObject(keys: string[], values: string[]) {
  return keys.reduce((acc, key, idx) => ({
    [key]: values[idx],
    ...acc,
  }), {});
}

export function unique(array: any[]): any[] {
  return array.reduce((acc, val) => acc.indexOf(val) === -1
    ? acc.concat(val)
    : acc
  , []);
}

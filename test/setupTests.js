jest.mock("requireg", () => {
  function requireg(id) {
    // tslint:disable-next-line:no-require-imports non-literal-require
    return require(`requireg-${id}`);
  }
  requireg.resolve = (id) => {
    return require.resolve(`requireg-${id}`);
  };
  return requireg;
});

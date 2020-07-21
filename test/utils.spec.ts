import { zipObject, unique } from "../src/utils";

test("zipObject should transform 2 arrays into object", () => {
  const keys = ["key1", "key2", "key3"];
  const values = ["value1", "value2", "value3"];

  const zipped = zipObject(keys, values);

  expect(zipped).toEqual({
    key1: "value1",
    key2: "value2",
    key3: "value3",
  });
});

describe("unique function", () => {
  it("should make array unique", () => {
    const array = [1, 2, 3, 4, 1, 3];

    const uniqueArray = unique(array);

    expect(uniqueArray).toEqual([1, 2, 3, 4]);
  });
});

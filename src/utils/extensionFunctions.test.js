import { quantity, sum } from "./extensionFunctions";

test("should add all quantity values of items in array", () => {
  const arr = [
    { id: 1, quantity: 5 },
    { id: 2, quantity: 6 },
    { id: 3, quantity: 2 },
  ];
  expect(arr.map(quantity).reduce(sum)).toBe(13);
});

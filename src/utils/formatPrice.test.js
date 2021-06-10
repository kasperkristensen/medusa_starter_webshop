import { formatPrice } from "./formatPrice";

test("formats amount 1000 in currency EUR to 10.00 EUR", () => {
  expect(formatPrice(1000, "EUR")).toBe("10.00 EUR");
});

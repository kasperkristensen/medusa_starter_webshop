export const formatPrice = (price, currency) => {
  return `${(price / 100).toFixed(2)} ${currency}`;
};

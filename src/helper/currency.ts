/**
 *
 * Transforms numbers to EU currency
 *
 * @param number
 * @returns string
 */
export const transformCurrency = (number: number) => {
  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  });
  return formatter.format(number);
};

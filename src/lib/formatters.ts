export const formatCurrency = (number: number) => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return CURRENCY_FORMATTER.format(number);
};

export const formatCurrency = (
  amount,
  currency = "USD",
  language = "en-EN"
) => {
  if (typeof window !== "undefined") {
    const exchange_rates = !!window.localStorage.getItem("exchange_rates")
      ? JSON.parse(window.localStorage.getItem("exchange_rates"))
      : undefined;
    const to_currency = window.localStorage?.getItem("currency");
    if (!!to_currency && currency === to_currency) {
      return format(amount, currency, language);
    } else if (!!to_currency && !!exchange_rates) {
      const currencyPerUSD = exchange_rates[currency] || 1;
      const targetCurrencyPerUSD = exchange_rates[to_currency] || 1;
      const finalAmountInUSD = Number(amount) / currencyPerUSD;
      const finalAmountInLocalCurrency =
        finalAmountInUSD * targetCurrencyPerUSD;
      return format(finalAmountInLocalCurrency, to_currency, language);
    } else return format(amount, currency, language);
  } else return format(amount, currency, language);
};

const format = (amount, currency, language) => {
  if (!!amount || amount === 0)
    try {
      return new Intl.NumberFormat(language, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
      }).format(amount);
    } catch {
      return new Intl.NumberFormat(language, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(amount);
    }
  else return "N/A";
};

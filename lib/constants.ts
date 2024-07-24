export const CRYPTO_TABLE = {
  TOTAL_PAGES: 10,
  PAGE_LIMIT: 10,
  COLUMNS: [
    { label: "Symbol", value: "symbol" },
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: "Market Cap", value: "marketCapUsd" },
  ],
};

export const FAVORITES_LS_KEY = "cc_favorites";

export const CRYPTO_DATA_URI = "https://api.coincap.io/v2/assets";

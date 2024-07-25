import { CryptoCurrency, HistoryEntry } from "@/app/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CRYPTO_TABLE, CRYPTO_FAVORITES_LS_KEY } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPaginatedData = (
  data: CryptoCurrency[],
  currentPage: number
): CryptoCurrency[] => {
  const startingItemIndex = currentPage * CRYPTO_TABLE.PAGE_LIMIT;
  const paginatedData = data.slice(
    startingItemIndex,
    startingItemIndex + CRYPTO_TABLE.PAGE_LIMIT
  );

  return paginatedData;
};

export const favoriteCryptoInLS = (symbol: string) => {
  const favoritesData = localStorage.getItem(CRYPTO_FAVORITES_LS_KEY);
  if (!favoritesData) {
    localStorage.setItem(
      CRYPTO_FAVORITES_LS_KEY,
      JSON.stringify({ [symbol]: true })
    );
    return;
  }

  const parsedData = JSON.parse(favoritesData);

  if (!parsedData[symbol]) {
    localStorage.setItem(
      CRYPTO_FAVORITES_LS_KEY,
      JSON.stringify({ ...parsedData, [symbol]: true })
    );
    return;
  }

  localStorage.setItem(
    CRYPTO_FAVORITES_LS_KEY,
    JSON.stringify({ ...parsedData, [symbol]: false })
  );
  return;
};

export const getFavorites = () => {
  const favoritesData = localStorage.getItem(CRYPTO_FAVORITES_LS_KEY);

  if (!favoritesData) return {};

  return JSON.parse(favoritesData);
};

export const getCryptoHistoryEndpoint = (
currency: string,
  interval: string
) => {
  return `https://api.coincap.io/v2/assets/${currency}/history?interval=${interval}`;
};

export const getDataForLast30Days = (historyData: HistoryEntry[] | null) => {
  if (!historyData || !historyData.length) return [];

  const length = historyData.length;

  return historyData.slice(length - 30, length).map((data) => ({
    date: new Date(data.date).toLocaleDateString(),
    price: Number(data.priceUsd),
  }));
};

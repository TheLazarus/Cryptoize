import { CryptoCurrency, HistoryEntry } from "@/app/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CRYPTO_FAVORITES_LS_KEY } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPaginatedData = (
  data: CryptoCurrency[],
  currentPage: number,
  limit: number
): CryptoCurrency[] => {
  const startingItemIndex = currentPage * limit;
  const paginatedData = data.slice(
    startingItemIndex,
    startingItemIndex + limit
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

export const getDataForLastNDays = (
  historyData: HistoryEntry[] | null,
  days: number
) => {
  if (!historyData || !historyData.length) return [];

  const length = historyData.length;

  return historyData.slice(length - days, length).map((data) => ({
    date: new Date(data.date).toLocaleDateString(),
    Price: Number(data.priceUsd).toFixed(6),
  }));
};

export const getFlow = (
  oldPrice: number,
  newPrice: number,
  lim: number
): "inc" | "dec" | null => {
  if (oldPrice === newPrice) return null;

  if (Math.abs(oldPrice - newPrice) >= lim && oldPrice < newPrice) {
    return "inc";
  }
  if (Math.abs(oldPrice - newPrice) >= lim && newPrice < oldPrice) {
    return "dec";
  }

  return null;
};

export const getFormattedPrice = (price: string): string => {
  const formattedPrice = parseFloat(price).toFixed(6);

  return formattedPrice;
};

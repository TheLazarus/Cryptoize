import { CryptoCurrency } from "@/app/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CRYPTO_TABLE, FAVORITES_LS_KEY } from "./constants";

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
  const favoritesData = localStorage.getItem(FAVORITES_LS_KEY);
  if (!favoritesData) {
    localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify({ [symbol]: true }));
    return;
  }

  const parsedData = JSON.parse(favoritesData);

  if (!parsedData[symbol]) {
    localStorage.setItem(
      FAVORITES_LS_KEY,
      JSON.stringify({ ...parsedData, [symbol]: true })
    );
    return;
  }

  localStorage.setItem(
    FAVORITES_LS_KEY,
    JSON.stringify({ ...parsedData, [symbol]: false })
  );
  return;
};

export const getFavorites = () => {
  const favoritesData = localStorage.getItem(FAVORITES_LS_KEY);

  if (!favoritesData) return {};

  return JSON.parse(favoritesData);
};

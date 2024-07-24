import {
  ApiState,
  ColumnsToSort,
  CryptoCurrency,
  HistoryEntry,
  SortingOrder,
} from "@/app/types";
import { useEffect, useState } from "react";
import { CRYPTO_DATA_URI } from "./constants";
import {
  favoriteCryptoInLS,
  getCryptoHistoryEndpoint,
  getFavorites,
} from "./utils";

export const usePagination = (totalPages: number) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const goToNextPage = (): void => {
    setCurrentPage((currentPage) => {
      if (currentPage === totalPages - 1) return currentPage;

      return currentPage + 1;
    });
  };

  const goToPrevPage = (): void => {
    setCurrentPage((currentPage) => {
      if (currentPage === 0) return currentPage;

      return currentPage - 1;
    });
  };

  return { currentPage, goToNextPage, goToPrevPage, setCurrentPage };
};

export const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState<CryptoCurrency[] | null>(null);
  const [apiState, setApiState] = useState<ApiState | null>(null);

  useEffect(() => {
    async function getCryptoData() {
      try {
        setApiState("LOADING");
        const response = await fetch(CRYPTO_DATA_URI, { cache: "no-store" });
        const parsedResponse = await response.json();
        const { data = [] } = parsedResponse || {};
        setCryptoData(data);
        setApiState("SUCCESS");
      } catch (error) {
        setApiState("ERROR");
      }
    }

    getCryptoData();
  }, []);

  return { cryptoData, apiState, setCryptoData };
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(getFavorites);

  const toggleFavorite = (symbol: string): void => {
    const newFavorites = {
      ...favorites,
      [symbol]: !favorites[symbol],
    };
    setFavorites(newFavorites);
    favoriteCryptoInLS(symbol);
  };

  return { favorites, toggleFavorite };
};

export const useSorting = () => {
  const [currentColumn, setCurrentColumn] = useState<ColumnsToSort | null>(
    null
  );
  const [currentOrder, setCurrentOrder] = useState<SortingOrder | null>(null);

  const sortData = (column: ColumnsToSort, data: CryptoCurrency[]) => {
    setCurrentColumn(column);

    return data.toSorted((a, b) => {
      if (currentOrder === null || currentOrder === "DECREASING") {
        setCurrentOrder("INCREASING");
        return a[column].charCodeAt(0) - b[column].charCodeAt(0);
      }

      setCurrentOrder("DECREASING");
      return b[column].charCodeAt(0) - a[column].charCodeAt(0);
    });
  };

  return { currentColumn, currentOrder, sortData };
};

export const useCryptoHistory = (currency: string, interval: string) => {
  const [cryptoHistoryData, setCryptoHistoryData] = useState<
    HistoryEntry[] | null
  >(null);
  const [apiState, setApiState] = useState<ApiState | null>(null);

  useEffect(() => {
    async function getCryptoHistory() {
      try {
        setApiState("LOADING");
        const response = await fetch(
          getCryptoHistoryEndpoint(currency, interval),

          { cache: "no-store" }
        );
        const parsedResponse = await response.json();
        const { data = [] } = parsedResponse || {};
        setCryptoHistoryData(data);
        setApiState("SUCCESS");
      } catch (error) {
        setApiState("ERROR");
      }
    }

    getCryptoHistory();
  }, []);

  return { cryptoHistoryData, apiState, setCryptoHistoryData };
};

import { ApiState, CryptoCurrency } from "@/app/types";
import { useEffect, useState } from "react";
import { CRYPTO_DATA_URI } from "./constants";

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

  return { currentPage, goToNextPage, goToPrevPage };
};

export const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState<CryptoCurrency[] | null>(null);
  const [apiState, setApiState] = useState<ApiState | null>(null);

  useEffect(() => {
    async function getCryptoData() {
      try {
        setApiState("LOADING");
        const response = await fetch(CRYPTO_DATA_URI);
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

  return { cryptoData, apiState };
};

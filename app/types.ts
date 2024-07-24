export type CryptoCurrency = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
};

export type CryptoTableProps = {
  columns: string[];
  data: CryptoCurrency[];
};

export type ApiState = "LOADING" | "ERROR" | "SUCCESS";

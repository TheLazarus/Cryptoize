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
  columns: ColumnConfig[];
  data: CryptoCurrency[];
  setCryptoData: (data: CryptoCurrency[]) => void;
};

export type ColumnConfig = {
  label: string;
  value: string;
};

export type ColumnsToSort = keyof Pick<CryptoCurrency, "symbol" | "name">;

export type SortingOrder = "INCREASING" | "DECREASING";

export type ApiState = "LOADING" | "ERROR" | "SUCCESS";

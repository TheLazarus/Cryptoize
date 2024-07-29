import { ColumnsToSort, CryptoTableProps } from "@/app/types";
import { CRYPTO_TABLE } from "@/lib/constants";
import {
  useFavorites,
  usePagination,
  useRealtimePrices,
  useSorting,
} from "@/lib/hooks";
import { cn, getPaginatedData } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MoveDown,
  MoveUp,
  MoveVertical,
} from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function CryptoTable({
  columns = [],
  data = [],
  setCryptoData,
}: CryptoTableProps) {
  const { currentPage, goToNextPage, goToPrevPage, setCurrentPage } =
    usePagination(CRYPTO_TABLE.TOTAL_PAGES);

  const { favorites, toggleFavorite } = useFavorites();
  const { currentColumn, currentOrder, sortData } = useSorting();

  const dataToRender = getPaginatedData(
    data,
    currentPage,
    CRYPTO_TABLE.PAGE_LIMIT
  );
  const showPrevButton = currentPage > 0;
  const showNextButton = currentPage < CRYPTO_TABLE.TOTAL_PAGES - 1;

  useRealtimePrices(data, setCryptoData);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(({ label, value }) => {
              if (!["symbol", "name"].includes(value)) {
                return (
                  <TableHead className="w-[100px] last:text-right" key={value}>
                    {label}
                  </TableHead>
                );
              }
              return (
                <TableHead
                  className="w-[100px] last:text-right relative"
                  key={value}
                  onClick={() => {
                    setCurrentPage(0);
                    setCryptoData(sortData(value as ColumnsToSort, data));
                  }}
                >
                  {label}
                  {currentColumn !== value && (
                    <MoveVertical
                      className="absolute right-0 top-[50%]"
                      size={15}
                    />
                  )}
                  {currentColumn === value && currentOrder === "INCREASING" && (
                    <MoveUp className="absolute right-0 top-[50%]" size={15} />
                  )}
                  {currentColumn === value && currentOrder === "DECREASING" && (
                    <MoveDown
                      className="absolute right-0 top-[50%]"
                      size={15}
                    />
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataToRender.map((data) => {
            const { id, symbol, name, priceUsd, marketCapUsd, flow } =
              data || {};

            const formattedPrice = `${parseFloat(priceUsd).toFixed(2)}`;
            const formattedMarketCap = `${parseFloat(marketCapUsd).toFixed(2)}`;

            const isFavorite = favorites[symbol] ?? false;

            return (
              <TableRow key={name}>
                <TableCell className="flex gap-5">
                  <Heart
                    className="cursor-pointer"
                    onClick={() => toggleFavorite(symbol)}
                    {...(isFavorite ? { fill: "red", stroke: "none" } : {})}
                  />
                  {symbol}
                </TableCell>

                <TableCell>
                  <Link href={{ pathname: "/details", query: { id } }}>
                    {name}
                  </Link>
                </TableCell>
                <TableCell
                  className={cn({
                    "animate-greenup": flow === "inc",
                    "animate-redup": flow === "dec",
                  })}
                >
                  <span className="font-bold">$</span>
                  {formattedPrice}
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-bold">$</span>
                  {formattedMarketCap}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-between">
        <span>
          Page {currentPage + 1} out of {CRYPTO_TABLE.TOTAL_PAGES}
        </span>
        <div className="flex gap-4">
          <button onClick={goToPrevPage} disabled={!showPrevButton}>
            <ChevronLeft stroke={showPrevButton ? "black" : "gray"} />
          </button>
          <button onClick={goToNextPage} disabled={!showNextButton}>
            <ChevronRight stroke={showNextButton ? "black" : "gray"} />
          </button>
        </div>
      </div>
    </div>
  );
}

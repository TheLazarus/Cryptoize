import { ColumnsToSort, CryptoTableProps } from "@/app/types";
import { CRYPTO_TABLE } from "@/lib/constants";
import { useFavorites, usePagination, useSorting } from "@/lib/hooks";
import { getPaginatedData } from "@/lib/utils";
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

  const dataToRender = getPaginatedData(data, currentPage);
  const showPrevButton = currentPage > 0;
  const showNextButton = currentPage < CRYPTO_TABLE.TOTAL_PAGES - 1;

  return (
    <div>
      <div className="flex justify-end">
        <div className="flex gap-4">
          <button onClick={goToPrevPage} disabled={!showPrevButton}>
            <ChevronLeft stroke={showPrevButton ? "black" : "gray"} />
          </button>
          <button onClick={goToNextPage} disabled={!showNextButton}>
            <ChevronRight stroke={showNextButton ? "black" : "gray"} />
          </button>
        </div>
      </div>
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
                    <MoveVertical className="absolute right-0" />
                  )}
                  {currentColumn === value && currentOrder === "INCREASING" && (
                    <MoveDown className="absolute right-0" />
                  )}
                  {currentColumn === value && currentOrder === "DECREASING" && (
                    <MoveUp className="absolute right-0" />
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataToRender.map((data) => {
            const { id, symbol, name, priceUsd, marketCapUsd } = data || {};

            const formattedPrice = `$${parseFloat(priceUsd).toFixed(4)}`;
            const formattedMarketCap = `${parseFloat(marketCapUsd).toFixed(4)}`;

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
                <TableCell>{formattedPrice}</TableCell>
                <TableCell className="text-right">
                  {formattedMarketCap}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

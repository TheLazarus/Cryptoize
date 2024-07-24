import { CryptoTableProps } from "@/app/types";
import { CRYPTO_TABLE } from "@/lib/constants";
import { usePagination, useFavorites } from "@/lib/hooks";
import { getPaginatedData } from "@/lib/utils";
import { Heart } from "lucide-react";
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
}: CryptoTableProps) {
  const { currentPage, goToNextPage, goToPrevPage } = usePagination(
    CRYPTO_TABLE.TOTAL_PAGES
  );

  const { favorites, toggleFavorite } = useFavorites();

  console.log(favorites);

  const dataToRender = getPaginatedData(data, currentPage);
  const showPrevButton = currentPage > 0;
  const showNextButton = currentPage < CRYPTO_TABLE.TOTAL_PAGES - 1;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((columnName) => (
              <TableHead className="w-[100px] last:text-right" key={columnName}>
                {columnName}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataToRender.map((data) => {
            const { symbol, name, priceUsd, marketCapUsd } = data || {};

            const formattedPrice = `$${parseFloat(priceUsd)}`;
            const formattedMarketCap = `${parseFloat(marketCapUsd)}`;

            const isFavorite = favorites[symbol] ?? false;

            return (
              <TableRow key={name}>
                <TableCell className="font-medium flex gap-5">
                  <Heart
                    className="cursor-pointer"
                    onClick={() => toggleFavorite(symbol)}
                    {...(isFavorite ? { fill: "red", stroke: "none" } : {})}
                  />
                  {symbol}
                </TableCell>

                <TableCell>{name}</TableCell>
                <TableCell>{formattedPrice}</TableCell>
                <TableCell className="text-right">
                  {formattedMarketCap}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="">
        <h2>
          Page {currentPage + 1} out of {CRYPTO_TABLE.TOTAL_PAGES}
        </h2>
        {showPrevButton && <button onClick={goToPrevPage}>Prev</button>}
        {showNextButton && <button onClick={goToNextPage}>Next</button>}
      </div>
    </div>
  );
}

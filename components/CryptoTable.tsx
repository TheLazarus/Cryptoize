import { CryptoTableProps } from "@/app/types";
import { Heart, Link } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { CRYPTO_TABLE } from "@/lib/constants";
import { usePagination } from "@/lib/hooks";
import { favoriteCrypto, getPaginatedData } from "@/lib/utils";

export default function CryptoTable({
  title = CRYPTO_TABLE.TITLE,
  columns = [],
  data = [],
}: CryptoTableProps) {
  const { currentPage, goToNextPage, goToPrevPage } = usePagination(
    CRYPTO_TABLE.TOTAL_PAGES
  );

  const dataToRender = getPaginatedData(data, currentPage);
  const showPrevButton = currentPage > 0;
  const showNextButton = currentPage < CRYPTO_TABLE.TOTAL_PAGES - 1;

  return (
    <div>
      <Table>
        <TableCaption>{title}</TableCaption>
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

            return (
              <TableRow key={name}>
                <TableCell className="font-medium flex gap-5">
                  {symbol}
                  <Heart
                    className="cursor-pointer"
                    onClick={() => favoriteCrypto(symbol)}
                  />
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

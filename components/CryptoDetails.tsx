"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { CryptoCurrency } from "@/app/types";

export default function CryptoDetails() {
  const [data, setData] = useState<CryptoCurrency[] | null>(null);
  const [apiState, setApiState] = useState<string | null>(null);

  useEffect(() => {
    async function getCryptoData() {
      try {
        setApiState("LOADING");
        const response = await fetch("https://api.coincap.io/v2/assets");
        const data = await response.json();
        setData(data?.data);
        setApiState("SUCCESS");
      } catch (error) {
        setApiState("ERROR");
      }
    }

    getCryptoData();
  }, []);

  if (apiState === "LOADING") {
    return <h1>Loading...</h1>;
  }

  if (!data) return null;

  return (
    <section className="p-6">
      <Table>
        <TableCaption>List of cryptocurrencies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((currencyData) => {
            const { symbol, name, priceUsd, marketCapUsd } = currencyData || {};

            const formattedPrice = `$${parseInt(priceUsd).toFixed(3)}`;

            return (
              <TableRow key={name}>
                <TableCell className="font-medium">{symbol}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{formattedPrice}</TableCell>
                <TableCell className="text-right">{marketCapUsd}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );

  console.log(data);
  return <section className=""></section>;
}

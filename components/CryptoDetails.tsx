"use client";

import { CRYPTO_TABLE } from "@/lib/constants";
import { useCryptoData } from "@/lib/hooks";
import { Loader } from "lucide-react";
import CryptoTable from "./CryptoTable";

export default function CryptoDetails() {
  const { cryptoData, apiState } = useCryptoData();

  if (apiState === "ERROR") {
    // Need to handle API Errors
  }

  if (apiState === "LOADING") {
    return <Loader />;
  }

  if (!cryptoData) return null;

  return (
    <section className="p-6">
      <CryptoTable columns={CRYPTO_TABLE.COLUMNS} data={cryptoData} />
    </section>
  );
}

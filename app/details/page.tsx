"use client";

import { useCryptoHistory } from "@/lib/hooks";
import { getDataForLast30Days } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function CryptoDetails() {
  const params = useSearchParams();
  const id = params.get("id") || "";

  console.log(id);

  const { apiState, cryptoHistoryData } = useCryptoHistory(id, "d1");
  const last30DaysData = getDataForLast30Days(cryptoHistoryData);

  console.log(last30DaysData);
  return (
    <main>
      <h1>Crypto Details Page</h1>
    </main>
  );
}

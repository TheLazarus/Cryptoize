"use client";

import { CRYPTO_TABLE } from "@/lib/constants";
import { useCryptoData } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import CryptoTable from "./CryptoTable";
import FullPageLoader from "./FullPageLoader";

export default function CryptoDetails() {
  const { cryptoData, apiState, setCryptoData } = useCryptoData();
  const router = useRouter();

  if (apiState === "ERROR") {
    router.push("/404");
  }

  if (apiState === "LOADING") {
    return <FullPageLoader />;
  }

  if (!cryptoData) return null;

  return (
    <section className="p-6">
      <CryptoTable
        columns={CRYPTO_TABLE.COLUMNS}
        data={cryptoData}
        setCryptoData={setCryptoData}
      />
    </section>
  );
}

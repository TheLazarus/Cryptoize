"use client";

import { useCryptoHistory } from "@/lib/hooks";
import { getDataForLast30Days } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CryptoDetails() {
  const params = useSearchParams();
  const id = params.get("id") || "";

  const { cryptoHistoryData } = useCryptoHistory(id, "d1");
  const last30DaysData = getDataForLast30Days(cryptoHistoryData);

  return (
    <main className="min-h-screen grid justify-center p-10">
      <h1 className="text-3xl text-center">
        Last 30 Days Price Movmement for {id.toUpperCase()}
      </h1>

      <div className="grid place-items-center">
        <LineChart
          width={1400}
          height={500}
          data={last30DaysData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </div>
    </main>
  );
}

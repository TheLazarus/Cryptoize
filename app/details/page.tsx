"use client";

import FullPageLoader from "@/components/FullPageLoader";
import { useCryptoHistory } from "@/lib/hooks";
import { getDataForLastNDays } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CryptoDetails() {
  const params = useSearchParams();
  const id = params.get("id") || "";

  const router = useRouter();

  const { apiState, cryptoHistoryData } = useCryptoHistory(id, "d1");
  const last30DaysData = getDataForLastNDays(cryptoHistoryData, 30);

  if (apiState === "ERROR") {
    router.push("/404");
  }

  if (apiState === "LOADING") {
    return <FullPageLoader />;
  }

  return (
    <main className="min-h-screen grid  p-10 relative">
      <Image
        src={"/ethereum.svg"}
        alt=""
        width={100}
        height={100}
        className="absolute h-full w-full opacity-5 left-0 object-cover"
      />
      <h1 className="text-[1rem] text-center font-light md:text-[3rem]">
        Price Movement of{" "}
        <span className="font-extralight p-2 bg-black text-white">
          {id.toUpperCase()}
        </span>
      </h1>

      <div className="grid place-items-center pt-8">
        <ResponsiveContainer className={"tableContainer"}>
          <LineChart
            data={last30DaysData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: "Price", angle: -90, position: "left" }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

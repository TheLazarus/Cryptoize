import CryptoDetails from "@/components/CryptoDetails";
import { Bitcoin, HeartIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="p-2 grid place-items-center">
        <h1 className="text-black font-normal text-[6rem] relative">
          <span className="font-extralight">Cryp</span>t
          <span className="text-red-400">01</span>ing.
          <Bitcoin size={200} className="absolute top-0 left-0 opacity-10" />
        </h1>
        <h2>The place to track your favorite Cryptocurrencies!</h2>
      </div>

      <CryptoDetails />
    </main>
  );
}

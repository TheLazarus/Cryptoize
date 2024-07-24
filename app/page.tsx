import CryptoDetails from "@/components/CryptoDetails";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="p-2 grid place-items-center">
        <h1 className="text-white font-normal text-[6rem]">
          <span className="font-extralight">Cryp</span>toize
        </h1>
        <h2>Track your cryptocurrencies with ease!</h2>
      </div>

      <CryptoDetails />
    </main>
  );
}

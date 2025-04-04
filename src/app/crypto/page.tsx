import CryptoCard from "@/components/CryptoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getCryptos } from "@/lib/api/crypto";
import React, { Suspense } from "react";


export const metadata = {
  title: "Cryptocurrencies | Dashboard",
  description: "Live cryptocurrency prices and market data",
}

function page() {

  const cryptoIds = [
    "bitcoin",
    "ethereum",
    "ripple",
    "cardano",
    "solana",
    "polkadot",
    "dogecoin",
    "litecoin",
    "chainlink",
  ]


  return (
    <div className="space-y-6">
      <div>
    <h1 className="text-3xl font-bold tracking-tight
    "> Cryptocurrencies</h1>
    <p className="text-muted-foreground">Live cryptocurrency 
      prices and market data from CoinCap.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={Array(9)
            .fill(0)
            .map((_, i) => <Skeleton key={i} className="h-[150px] w-full" />)}
        >
          <CryptoList cryptoIds={cryptoIds} />
        </Suspense>
      </div>


    </div>
  )
}
async function CryptoList({ cryptoIds }: { cryptoIds: string[] }) {
  try {
    const cryptoData = await getCryptos(cryptoIds)

    return (
      <>
        {cryptoData.map((data : any) => (
          <CryptoCard key={data.id} data={data} />
        ))}
      </>
    )
  } catch (error) {
    return (
      <div className="col-span-full rounded-md bg-destructive/15 p-4 text-center text-destructive">
        Failed to load cryptocurrency data. Please try again later.
      </div>
    )
  }
}

export default page;

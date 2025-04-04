import { CryptoDetails } from "@/components/CryptoDetails"
import { CryptoMetrics } from "@/components/CryptoMetrics"
import { CryptoPriceChart } from "@/components/CryptoPriceChart"
import { Skeleton } from "@/components/ui/skeleton"
import { getCryptoById, getCryptoHistory } from "@/lib/api/crypto"
import { notFound } from "next/navigation"
import { Suspense } from "react"


interface PageProps {
    params:{
        id : string
    }
    searchParams : {
        [key : string] : string | string[] | undefined
    }
}

export default async function CryptoPage(props : PageProps){
   
    const id = decodeURIComponent(props.params.id)

    try {
        const cryptoData = await getCryptoById(id)
        const historyData = await getCryptoHistory(id)

        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">
                    {cryptoData?.name}
                </h1>
                <div className="grid gap-6 md:grid-cols-2">
                    <Suspense fallback = {<Skeleton className="h-[300px] w-full" />}>
                    <CryptoDetails data ={cryptoData} />
                    </Suspense>
                    <Suspense fallback = {<Skeleton className="h-[300px] w-full" />}>
                    <CryptoPriceChart data={historyData} />
                    </Suspense>
                    </div>
                    <Suspense fallback = {<Skeleton className="h-[200px] w-full" />}>
                   <CryptoMetrics id = {id} />
                    </Suspense>
               

            </div>
        )
        
    } catch (error) {
        notFound()
    }
}
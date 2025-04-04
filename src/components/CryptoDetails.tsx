"use client"

import type { CryptoData } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"

interface CryptoDetailsProps{
    data : CryptoData
}

export function CryptoDetails({data} : CryptoDetailsProps){
const priceChangePercent = Number.parseFloat(data.price_change_percentage_24h)
  const isPriceUp = priceChangePercent >= 0

  return (
    <Card>
        <CardHeader>
            <CardTitle>Market Overview</CardTitle>

        </CardHeader>
        <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">{data.name}</h2>
              <p className="text-lg text-muted-foreground uppercase">{data.symbol}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${data.current_price.toLocaleString()}</div>
              <div
                className={`flex items-center justify-end gap-1 text-lg ${
                  isPriceUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPriceUp ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                {Math.abs(priceChangePercent).toFixed(2)}%
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-lg font-medium">${data.market_cap.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">24h Volume</p>
              <p className="text-lg font-medium">${data.total_volume.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">24h High</p>
              <p className="text-lg font-medium">${data.high_24h.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">24h Low</p>
              <p className="text-lg font-medium">${data.low_24h.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Circulating Supply</p>
              <p className="text-lg font-medium">
                {data.circulating_supply.toLocaleString()} {data.symbol.toUpperCase()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Max Supply</p>
              <p className="text-lg font-medium">
                {data.max_supply ? `${data.max_supply.toLocaleString()} ${data.symbol.toUpperCase()}` : "N/A"}
              </p>
            </div>
          </div>
        </div>
        </CardContent>
    </Card>
  )
}
"use client"

import type { CryptoData } from '@/lib/types'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Star, TrendingDown, TrendingUp } from 'lucide-react'


interface CryptoCardProps{
    data : CryptoData
}

function CryptoCard({data} : CryptoCardProps) {

const priceChangePercent = Number.parseFloat(data.price_change_percentage_24h)
  const isPriceUp = priceChangePercent >= 0



  return (
    <Link href={`/crypto/${data.id}`}>
        <Card className='overflow-hidden transition-colors
        hover:bg-accent/50'>
            <CardContent>
            <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{data.name}</h3>
                <span className="text-xs text-muted-foreground uppercase">{data.symbol}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" >
                  <Star className='h-4 w-4'  />
                  <span className="sr-only"></span>
                </Button>
                </div>
                </div>
                <div className="text-right">
              <div className="text-xl font-bold">${data.current_price.toLocaleString()}</div>
              <div
                className={`flex items-center justify-end gap-1 text-sm ${
                  isPriceUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPriceUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(priceChangePercent).toFixed(2)}%
              </div>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div>Market Cap: ${data.market_cap.toLocaleString()}</div>
            <div>Volume: ${data.total_volume.toLocaleString()}</div>
          </div>
            </CardContent>
        </Card>
    </Link>
  )
}

export default CryptoCard

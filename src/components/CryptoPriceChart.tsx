"use client"

import type { CryptoHistoryData } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"


interface CryptoPriceChartProps{
    data : CryptoHistoryData[]
}

export function CryptoPriceChart({data} : CryptoPriceChartProps){
    const formattedData = data.map((item) => ({
        date: new Date(item.timestamp).toLocaleDateString(),
        price: item.price,
        volume: item.volume,
      }))

      return (
        <Card>
            <CardHeader>
                <CardTitle>Price History (Last 7 days)</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                config={{
                    price: {
                      label: "Price (USD)",
                      color: "hsl(var(--chart-1))",
                    },
                    volume: {
                      label: "Volume (USD)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]">
                    <LineChart data={formattedData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="price"
              stroke="var(--color-price)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="volume"
              stroke="var(--color-volume)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            /> 
                    </LineChart>
                  </ChartContainer>
            </CardContent>
        </Card>
      )

}
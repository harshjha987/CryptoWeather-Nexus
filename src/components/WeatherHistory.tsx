"use client";

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

import { CartesianGrid, Line, XAxis, YAxis,LineChart } from 'recharts';

interface WeatherHistoryProps{
    data : any[]
}

function WeatherHistory({data} : WeatherHistoryProps) {

    const formattedData = data.map((item)=>{
        const timestamp = item.dt ? item.dt : item.timestamp
        const temp = item.main?.temp ?? item.temperture
        const humidity =item.main?.humidity ?? item.humidity

        return{
            date : new Date(timestamp * 1000).toLocaleDateString(),
            temperature : Math.round(temp),
            humidity : humidity
        }
    })
  return (
    <Card>
        <CardHeader>
            <CardTitle>Temperature History</CardTitle>

        </CardHeader>
        <CardContent>
            <ChartContainer
            config={{
                temperature : {
                    label : "Temperature (°C)",
                    color : "hsl(var(--chart-1))",

                },
                humidity : {
                    label : "Humidity (%)",
                    color : "hsl(var(--chart-2))",
                },
            }}
            className='h-[300px]'>
                <LineChart data={formattedData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="var(--color-temperature)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="var(--color-humidity)"
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

export default WeatherHistory

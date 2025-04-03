"use client"

import type { WeatherData } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface CityWeatherDetailsProps {
    city : string
    data : WeatherData
}

export default function CityWeatherDetails({city,data} : CityWeatherDetailsProps){
    return(
        <Card >
            <CardHeader>
                <CardTitle>Current Weather</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">
                                {city}
                            </h2>
                            <p className="text-lg text-muted-foreground capitalize">
                                {data.weather[0].description}
                            </p>
                        </div>
                        <div className="text-5xl font-bold">{Math.round(data.main.temp)}°C</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Feels Like</p>
              <p className="text-lg font-medium">{Math.round(data.main.feels_like)}°C</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-lg font-medium">{data.main.humidity}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="text-lg font-medium">{Math.round(data.wind.speed)} m/s</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Pressure</p>
              <p className="text-lg font-medium">{data.main.pressure} hPa</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Min Temp</p>
              <p className="text-lg font-medium">{Math.round(data.main.temp_min)}°C</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Max Temp</p>
              <p className="text-lg font-medium">{Math.round(data.main.temp_max)}°C</p>
            </div>
          </div>
        </div>
            
            </CardContent>
        </Card>
    )
}
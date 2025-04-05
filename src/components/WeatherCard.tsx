"use Client"

import { WeatherData } from "@/lib/types";
import Link from "next/link";

import type React from "react"
// import { useDispatch,useSelector } from "react-redux";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
// import { RootState } from "@/lib/store";
// import { addFavouriteCity, removeFavouriteCity } from "@/lib/features/favourites/favouritesSlice";

interface WeatherCardProps {
  data: WeatherData;
}
function WeatherCard({ data }: WeatherCardProps) {
  
  // const dispatch = useDispatch()
  // const favorites = useSelector((state: RootState) => state.favourites.cities)
  // const isFavorite = favorites.includes(data.name)

  // const toggleFavorite = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   e.stopPropagation()

  //   if (isFavorite) {
  //     dispatch(removeFavouriteCity(data.name))
  //   } else {
  //     dispatch(addFavouriteCity(data.name))
  //   }
  // }

  return (
    <Link href={`/weather/${encodeURIComponent(data.name)}`}>
      <Card className="overflow-hidden transition-colors hover:bg-accent/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{data.name}</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6" >
                  <Star />
                  <span className="sr-only"></span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{data.weather[0].description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{Math.round(data.main.temp)}°C</div>
              <div className="text-xs text-muted-foreground">
                H: {Math.round(data.main.temp_max)}° L: {Math.round(data.main.temp_min)}°
              </div>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div>Humidity: {data.main.humidity}%</div>
            <div>Wind: {Math.round(data.wind.speed)} m/s</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}


export default WeatherCard;

"use Client";

import { WeatherData } from "@/lib/types";
import Link from "next/link";
import React from "react";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

interface WeatherCardProps {
  data: WeatherData;
}
function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Link href={`/weather/${encodeURIComponent(data.name)}`}>
      <Card
        className="overflow-hidden transition-colors
        hover:bg-accent/50"
      >
        <CardContent>
          <div
            className="flex items-center
                justify-between"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{data.name}</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Star />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {data.weather[0].description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {Math.round(data.main.temp)}°C
              </div>
              <div className="text-xs text-muted-foreground">
                H: {Math.round(data.main.temp_max)}° L:{" "}
                {Math.round(data.main.temp_min)}°
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
  );
}

export default WeatherCard;

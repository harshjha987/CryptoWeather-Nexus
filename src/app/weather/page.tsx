"use client"
import { Skeleton } from "@/components/ui/skeleton";
import WeatherCard from "@/components/WeatherCard";
import { getWeatherForCities } from "@/lib/api/weather";
import React, { Suspense } from "react";
export const metadata = {
  title: "Weather | Dashboard",
  description: "Weather information for major cities",
}

async function page() {
  const cities = [
    "New York",
    "London",
    "Tokyo",
    "Kolkata",
    "Sydney",
    "Mumbai",
    "Delhi",
    "Patna",
    "Bengaluru",
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-3xl font-bold
        tracking-tight"
        >
          Weather
        </h1>
        <p className="text-muted-foreground">
          Current weather consitions in major cities around the world.
        </p>
      </div>

      <div
        className="grid gap-4 sm:grid-cols-2
      lg:grid-cols-3"
      >
        <Suspense
          fallback={Array(9)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                className="h-[150px]
          w-full"
              />
            ))}
        >
          <CityWeatherList cities={cities} />
        </Suspense>
      </div>
    </div>
  );
}

async function CityWeatherList({ cities }: { cities: string[] }) {
  try {
    const weatherData = await getWeatherForCities(cities);
    return (
      <>
        {weatherData?.map((data) => (
          <WeatherCard key={data.name} data={data} />
        ))}
      </>
    );
  } catch (error) {
    return (
      <div className="col-span-full rounded-md bg-destructive/15 p-4 text-center text-destructive">
        Failed to load weather data. Please try again later.
      </div>
    );
  }
}

export default page;

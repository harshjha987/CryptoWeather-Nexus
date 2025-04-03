"use client";
import { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowRight, Cloud } from "lucide-react";
import type { RootState, AppDispatch } from "@/lib/store";
import { fetchWeatherData } from "@/lib/features/weather/weatherThunks";
import { Skeleton } from "./ui/skeleton";
import WeatherCard from "./WeatherCard";
import { Button } from "./ui/button";
import Link from "next/link";

function WeatherSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.weather,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWeatherData());
    }
    const intervalId = setInterval(
      () => {
        dispatch(fetchWeatherData());
      },
      30 * 60 * 1000,
    );

    return () => clearInterval(intervalId);
  }, [dispatch, status]);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Weather
        </CardTitle>
        <CardDescription>Current Weather in Major Cities.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === "loading" && data.length === 0 ? (
          <>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </>
        ) : status === "failed" ? (
          <div className="rounded-md bg-destructive/15 p-4 text-center text-destructive">
            {error || "Failed to load weather data"}
          </div>
        ) : (
          data.map((city) => <WeatherCard key={city.name} data={city} />)
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link
            href="/weather"
            className="flex items-center justify-center gap-2"
          >
            View all cities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default WeatherSection;

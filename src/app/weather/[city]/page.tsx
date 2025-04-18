import CityWeatherDetails from "@/components/CityWeatherDetails";
import { Skeleton } from "@/components/ui/skeleton";
import WeatherHistory from "@/components/WeatherHistory";
import { getWeatherByCity, getWeatherHistory } from "@/lib/api/weather";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export async function generateMetadata(props: PageProps) {
  // Await the params object before using it
  const params = await props.params;
  const city =  decodeURIComponent(params.city);
  return {
    title: `${city} Weather | Dashboard`,
    description: `Weather details for ${city}`,
  }
}

async function CityPage(props: PageProps) {
  const params = await props.params;
  //   const paramsData = await Promise.resolve(params);
  const city =  decodeURIComponent(params.city);
  try {
    const weatherData = await getWeatherByCity(city);
    if (weatherData.cod && weatherData.cod !== 200) {
      console.error("Weather API error:", weatherData.message);
      notFound();
    }
    const historyData = await getWeatherHistory(city);
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">{city}'s Weather</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Suspense
            fallback={
              <Skeleton
                className="h-[300px]
                    w-full"
              />
            }
          >
            <CityWeatherDetails city={city} data={weatherData} />
          </Suspense>
          <Suspense
            fallback={
              <Skeleton
                className="h-[300px]
                    w-full"
              />
            }
          >
            <WeatherHistory data={historyData} />
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in city page: ", error);
    notFound();
  }
}

export default CityPage;

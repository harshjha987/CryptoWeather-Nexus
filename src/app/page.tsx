import DashBoardHeader from "@/components/DashBoardHeader";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import WeatherSection from "@/components/WeatherSection";
import CryptoSection from "@/components/CryptoSection";
import NewsSection from "@/components/NewsSection";
export default function Home() {
  return (
    <div className="space-y-6">
      <DashBoardHeader />
      <div className="grid gap-6 md:grid-cols-3">
        <Suspense
          fallback={
            <Skeleton
              className="
      h-[400px] w-full"
            />
          }
        >
          <WeatherSection />
        </Suspense>
        <Suspense
          fallback={
            <Skeleton
              className="
      h-[400px] w-full"
            />
          }
        >
          <CryptoSection />
        </Suspense>
        <Suspense
          fallback={
            <Skeleton
              className="
      h-[400px] w-full "
            />
          }
        >
          <NewsSection />
        </Suspense>
      </div>
    </div>
  );
}

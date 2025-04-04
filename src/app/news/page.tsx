import NewsCard from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getNews } from "@/lib/api/news";
import React, { Suspense } from "react";

export const metadata = {
  title: "News | Dashboard",
  description: "Latest cryptocurrency and financial news",
}

function page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">News</h1>
        <p className="text-muted-foreground">
          Latest cryptocurrency and financial news.
        </p>
      </div>
      <Suspense
        fallback={
          <div
            className="grid gap-4 sm:grid-cols-2
        lg:grid-cols-3"
          >
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-[200px]
            w-full"
                />
              ))}
          </div>
        }
      >
        <NewsList />
      </Suspense>
    </div>
  );
}

async function NewsList() {
  try {
    const newsData = await getNews();

    if (!newsData || newsData.length === 0) {
      return (
        <div
          className="rounded-md
      bg-muted p-4 text-center"
        >
          No news articles available at this moment.
        </div>
      );
    }
    return (
      <>
        <div
          className="grid gap-4 sm:grid-cols-2
      lg:grid-cols-3"
        >
          {newsData.map((article: any, index: any) => (
            <NewsCard key={article.title || index} data={article} />
          ))}
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-center text-destructive">
        Failed to load news data. Please try again later.
      </div>
    );
  }
}

export default page;

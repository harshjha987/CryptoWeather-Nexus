const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export async function getNews() {
  try {
    const res = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&q=cryptocurrency&language=en`,
    );

    if (!res.ok) {
      throw new Error(`News Api error ${res.status}`);
    }
    const data = await res.json();
    if (data.results && Array.isArray(data.results)) {
      return data.results.map((article: any) => ({
        title: article.title,
        description:
          article.description || article.content || "No description available",
        url: article.link,
        source: article.source_id,
        publishedAt: article.pubDate,
      }));
    }
    throw new Error("Invalid news format");
  } catch (error) {
    console.error("failed to fetch news data: ", error);
  }
}

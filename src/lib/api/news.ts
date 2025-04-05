const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export async function getNews() {
  try {
    const res = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&q=cryptocurrency&language=en`,
      {
        cache: "no-store",
      }
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
    return mockNewsData
  }
}

const mockNewsData = [
  {
    title: "Bitcoin Surges Past $50,000 as Institutional Adoption Grows",
    description:
      "Bitcoin has surged past the $50,000 mark for the first time in several months, driven by increasing institutional adoption and positive market sentiment.",
    url: "https://example.com/news/1",
    source: "Crypto News",
    publishedAt: "2023-06-01T10:30:00.000Z",
  },
  {
    title: "Ethereum 2.0 Upgrade: What You Need to Know",
    description:
      "The long-awaited Ethereum 2.0 upgrade is approaching. Here's what you need to know about the transition to proof-of-stake and what it means for the network.",
    url: "https://example.com/news/2",
    source: "Blockchain Insider",
    publishedAt: "2023-05-31T14:15:00.000Z",
  },
  {
    title: "Regulatory Clarity: New Cryptocurrency Framework Proposed",
    description:
      "Lawmakers have proposed a new regulatory framework for cryptocurrencies, aiming to provide clarity for businesses and investors while protecting consumers.",
    url: "https://example.com/news/3",
    source: "Financial Times",
    publishedAt: "2023-05-30T09:45:00.000Z",
  },
  {
    title: "DeFi Market Cap Reaches New All-Time High",
    description:
      "The total market capitalization of decentralized finance (DeFi) protocols has reached a new all-time high, surpassing $100 billion for the first time.",
    url: "https://example.com/news/4",
    source: "DeFi Daily",
    publishedAt: "2023-05-29T16:20:00.000Z",
  },
  {
    title: "NFT Sales Surge as Digital Art Market Expands",
    description:
      "Non-fungible token (NFT) sales have surged in the past month, with several high-profile digital art pieces selling for millions of dollars.",
    url: "https://example.com/news/5",
    source: "Art & Tech",
    publishedAt: "2023-05-28T11:10:00.000Z",
  },
]



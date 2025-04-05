const CRYPTO_API_KEY = process.env.NEXT_PUBLIC_CRYPTO_API_KEY

// Helper function to format CoinCap API data to match our app's expected format
function formatCryptoData(data: any) {
    return {
      id: data.id,
      symbol: data.symbol.toLowerCase(),
      name: data.name,
      image: `https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png`,
      current_price: Number.parseFloat(data.priceUsd),
      market_cap: Number.parseFloat(data.marketCapUsd),
      market_cap_rank: Number.parseInt(data.rank),
      fully_diluted_valuation: data.maxSupply
        ? Number.parseFloat(data.priceUsd) * Number.parseFloat(data.maxSupply)
        : null,
      total_volume: Number.parseFloat(data.volumeUsd24Hr),
      high_24h: Number.parseFloat(data.vwap24Hr) * 1.05, // Approximation since CoinCap doesn't provide this directly
      low_24h: Number.parseFloat(data.vwap24Hr) * 0.95, // Approximation
      price_change_24h: Number.parseFloat(data.priceUsd) * (Number.parseFloat(data.changePercent24Hr) / 100),
      price_change_percentage_24h: data.changePercent24Hr,
      market_cap_change_24h: Number.parseFloat(data.marketCapUsd) * (Number.parseFloat(data.changePercent24Hr) / 100),
      market_cap_change_percentage_24h: data.changePercent24Hr,
      circulating_supply: Number.parseFloat(data.supply),
      total_supply: data.supply ? Number.parseFloat(data.supply) : null,
      max_supply: data.maxSupply ? Number.parseFloat(data.maxSupply) : null,
      ath: Number.parseFloat(data.priceUsd) * 1.5, // Placeholder since CoinCap doesn't provide ATH
      ath_change_percentage: -30, // Placeholder
      ath_date: "2021-11-10T14:24:11.849Z", // Placeholder
      atl: Number.parseFloat(data.priceUsd) * 0.1, // Placeholder
      atl_change_percentage: 900, // Placeholder
      atl_date: "2018-01-01T00:00:00.000Z", // Placeholder
      last_updated: new Date().toISOString(),
    }
  }

export async function getCryptoById(id : string){
    try {

        const res = await fetch(`https://rest.coincap.io/v3/assets/${id}`,
            {
                headers : {
                    Authorization : `Bearer ${CRYPTO_API_KEY}`
                },
                cache: "no-store",
            }
        )
        if(!res.ok){
            throw new Error(`Crypto api errior : ${res.status}`);
            
        }
        const data = await res.json();
        return formatCryptoData(data.data)
        
    } catch (error) {
        console.error("Failed to fetch crypto data:", error)
        return mockCryptoData.find((crypto) => crypto.id === id) || mockCryptoData[0]
    }
}

export async function getCryptos(ids: string[]) {
  try {
    // CoinCap doesn't support filtering by multiple IDs in one request,
    // so we'll get all assets and filter them
    const response = await fetch(`https://rest.coincap.io/v3/assets?limit=20`, {
      headers: {
        Authorization: `Bearer ${CRYPTO_API_KEY}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`CoinCap API error: ${response.status}`)
    }

    const data = await response.json()

    // If specific IDs were requested, filter the results
    if (ids.length > 0) {
      const filteredData = data.data.filter((crypto: any) => ids.includes(crypto.id))
      return filteredData.map(formatCryptoData)
    }

    // Otherwise return the top 20
    return data.data.map(formatCryptoData)
  } catch (error) {
    console.error("Failed to fetch crypto data:", error)
    return mockCryptoData.filter((crypto) => ids.includes(crypto.id))
    
   
  }
}

export async function getCryptoHistory(id : string){
    try {
        const response = await fetch(`https://rest.coincap.io/v3/assets/${id}/history?interval=d1&limit=7`, {
            headers: {
              Authorization: `Bearer ${CRYPTO_API_KEY}`,
            },
            cache: "no-store",
          })
          if(!response.ok){
            throw new Error(`Crypto api error : ${response.status}`);
            
          }
          const data = await response.json();
          return data.data.map((item :any)=>({
            timestamp : item.time,
            price : Number.parseFloat(item.priceUsd),
            volume : Number.parseFloat(item.volumeUsd24Hr || "0")
          }))
        
    } catch (error) {
        console.error("Failed to fetch crypto history:", error)
        return mockCryptoHistoryData
    }
}

export async function getCryptoMetrics(id : string){
    try {
        const response = await fetch(`https://rest.coincap.io/v3/assets/${id}`, {
            headers: {
              Authorization: `Bearer ${CRYPTO_API_KEY}`,
            },
            cache: "no-store",
          })
      
          if (!response.ok) {
            throw new Error(`Crypto API error: ${response.status}`)
          }

          const data = await response.json();
          const asset = data.data;

          return {
            market_cap_rank: Number.parseInt(asset.rank),
      supply_percentage: asset.maxSupply
        ? ((Number.parseFloat(asset.supply) / Number.parseFloat(asset.maxSupply)) * 100).toFixed(2)
        : "N/A",
      market_cap_usd: Number.parseFloat(asset.marketCapUsd).toFixed(2),
      volume_24h_usd: Number.parseFloat(asset.volumeUsd24Hr).toFixed(2),
      percent_change_24h: Number.parseFloat(asset.changePercent24Hr).toFixed(2),
      vwap_24h: Number.parseFloat(asset.vwap24Hr).toFixed(2),
      explorer: asset.explorer || "N/A",
          }
    } catch (error) {
      console.error("Failed to fetch crypto metrics:", error)
      return {
        market_cap_rank: 1,
        liquidity_score: 89.5,
        public_interest_score: 76.2,
        community_score: 82.7,
        developer_score: 93.1,
        sentiment_votes_up_percentage: 78,
        sentiment_votes_down_percentage: 22,
        price_change_percentage_7d: 5.2,
        price_change_percentage_30d: -2.8,
        price_change_percentage_1y: 42.5,
      }
    }
}

// Keep the mock data as fallback
const mockCryptoData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 50000,
    market_cap: 950000000000,
    market_cap_rank: 1,
    fully_diluted_valuation: 1050000000000,
    total_volume: 30000000000,
    high_24h: 51000,
    low_24h: 49000,
    price_change_24h: 1000,
    price_change_percentage_24h: "2.04",
    market_cap_change_24h: 20000000000,
    market_cap_change_percentage_24h: 2.15,
    circulating_supply: 19000000,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69000,
    ath_change_percentage: -27.54,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 67.81,
    atl_change_percentage: 73732.54,
    atl_date: "2013-07-06T00:00:00.000Z",
    last_updated: "2023-06-01T12:00:00.000Z",
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3000,
    market_cap: 360000000000,
    market_cap_rank: 2,
    fully_diluted_valuation: 360000000000,
    total_volume: 15000000000,
    high_24h: 3050,
    low_24h: 2950,
    price_change_24h: 50,
    price_change_percentage_24h: "1.69",
    market_cap_change_24h: 6000000000,
    market_cap_change_percentage_24h: 1.69,
    circulating_supply: 120000000,
    total_supply: 120000000,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -38.5,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 0.432979,
    atl_change_percentage: 693033.48,
    atl_date: "2015-10-20T00:00:00.000Z",
    last_updated: "2023-06-01T12:00:00.000Z",
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    current_price: 0.5,
    market_cap: 25000000000,
    market_cap_rank: 6,
    fully_diluted_valuation: 50000000000,
    total_volume: 1000000000,
    high_24h: 0.51,
    low_24h: 0.49,
    price_change_24h: 0.01,
    price_change_percentage_24h: "2.04",
    market_cap_change_24h: 500000000,
    market_cap_change_percentage_24h: 2.04,
    circulating_supply: 50000000000,
    total_supply: 100000000000,
    max_supply: 100000000000,
    ath: 3.4,
    ath_change_percentage: -85.29,
    ath_date: "2018-01-07T00:00:00.000Z",
    atl: 0.002802,
    atl_change_percentage: 17774.89,
    atl_date: "2014-05-22T00:00:00.000Z",
    last_updated: "2023-06-01T12:00:00.000Z",
  },
]

const mockCryptoHistoryData = Array.from({ length: 7 }, (_, i) => ({
  timestamp: Date.now() - i * 86400000,
  price: 50000 + (Math.random() - 0.5) * 5000,
  volume: 30000000000 + (Math.random() - 0.5) * 10000000000,
}))


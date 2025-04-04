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
                }
            }
        )
        if(!res.ok){
            throw new Error(`Crypto api errior : ${res.status}`);
            
        }
        const data = await res.json();
        return formatCryptoData(data.data)
        
    } catch (error) {
        console.error("Failed to fetch crypto data:", error)
    }
}

export async function getCryptos(ids: string[]) {
  try {
    // CoinCap doesn't support filtering by multiple IDs in one request,
    // so we'll get all assets and filter them
    const response = await fetch(`https://rest.coincap.io/v3/assets?limit=20`, {
      headers: CRYPTO_API_KEY
        ? { Authorization: `Bearer ${CRYPTO_API_KEY}` }
        : undefined,
    
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
    
   
  }
}

export async function getCryptoHistory(id : string){
    try {
        const response = await fetch(`https://rest.coincap.io/v3/assets/${id}/history?interval=d1&limit=7`, {
            headers: {
              Authorization: `Bearer ${CRYPTO_API_KEY}`,
            },
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
    }
}

export async function getCryptoMetrics(id : string){
    try {
        const response = await fetch(`https://rest.coincap.io/v3/assets/${id}`, {
            headers: {
              Authorization: `Bearer ${CRYPTO_API_KEY}`,
            },
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
        
    }
}


const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY


export async function getWeatherByCity(city : string){
    try {
        const response = await 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`)
    
        if(!response.ok){
            throw new Error(`Weather api error : $(response.status)`)
            
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch weather data: ",error);
        
        
    }
}

export async function getWeatherForCities(cities: string[]) {
    try {
      const promises = cities.map((city) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`,
        ).then((res) => {
          if (!res.ok) {
            throw new Error(`Weather API error for ${city}: ${res.status}`)
          }
          return res.json()
        }),
      )
  
      return await Promise.all(promises)
    } catch (error) {
      console.error("Failed to fetch weather data for cities:", error)
      
      
    }
  }
  
  export async function getWeatherHistory(city: string) {
    try {
     
      const cityData = await getWeatherByCity(city)
      const { lat, lon } = cityData.coord
  
     
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`,
      )
  
      if (!response.ok) {
        throw new Error(`Weather history API error: ${response.status}`)
      }
  
      const data = await response.json()
  
      // Return the list of forecast data points
      return data.list.slice(0, 20) 
    } catch (error) {
      console.error("Failed to fetch weather history:", error)
      
     
    }
  }
  
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export async function getWeatherByCity(city: string) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`,
      {
        
          
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Weather api error : $(response.status)`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch weather data: ", error);
    return mockWeatherData.find((data) => data.name.toLowerCase() === city.toLowerCase()) || mockWeatherData[0]
    
  }
}

export async function getWeatherForCities(cities: string[]) {
  try {
    const promises = cities.map((city) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`,
        {
          
        
          cache: "no-store",
        }
      ).then((res) => {
        if (!res.ok) {
          throw new Error(`Weather API error for ${city}: ${res.status}`);
        }
        return res.json();
      }),
    );

    return await Promise.all(promises);
  } catch (error) {
    console.error("Failed to fetch weather data for cities:", error);
    return mockWeatherData
  }
}

export async function getWeatherHistory(city: string) {
  try {
    const cityData = await getWeatherByCity(city);
    const { lat, lon } = cityData.coord;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`,
      {
        
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Weather history API error: ${response.status}`);
    }

    const data = await response.json();

    // Return the list of forecast data points
    return data.list.slice(0, 20);
  } catch (error) {
    console.error("Failed to fetch weather history:", error);
    return mockWeatherHistoryData
  }
}
const mockWeatherData = [
  {
    name: "New York",
    main: {
      temp: 22.5,
      feels_like: 23.1,
      temp_min: 21.2,
      temp_max: 24.3,
      pressure: 1012,
      humidity: 65,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    wind: {
      speed: 3.6,
      deg: 160,
    },
  },
  {
    name: "London",
    main: {
      temp: 18.2,
      feels_like: 17.8,
      temp_min: 16.9,
      temp_max: 19.5,
      pressure: 1009,
      humidity: 72,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04d",
      },
    ],
    wind: {
      speed: 4.1,
      deg: 210,
    },
  },
  {
    name: "Tokyo",
    main: {
      temp: 26.8,
      feels_like: 28.2,
      temp_min: 25.3,
      temp_max: 28.1,
      pressure: 1015,
      humidity: 58,
    },
    weather: [
      {
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10d",
      },
    ],
    wind: {
      speed: 2.1,
      deg: 90,
    },
  },
]

const mockWeatherHistoryData = Array.from({ length: 5 }, (_, i) => ({
  dt: Math.floor(Date.now() / 1000) - i * 86400,
  main: {
    temp: 20 + Math.random() * 10,
    feels_like: 21 + Math.random() * 10,
    temp_min: 18 + Math.random() * 8,
    temp_max: 25 + Math.random() * 5,
    pressure: 1010 + Math.random() * 10,
    humidity: 60 + Math.random() * 20,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  wind: {
    speed: 2 + Math.random() * 5,
    deg: Math.random() * 360,
  },
}))



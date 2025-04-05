// Weather alerts API implementation
import { v4 as uuidv4 } from "uuid"
import { store } from "@/lib/store"
import { addNotification } from "../features/notifications/notificationSlice"

const WEATHER_API_KEY = process.env.WEATHER_API_KEY

// Cities to monitor for weather alerts
const MONITORED_CITIES = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
]

// Fetch weather alerts for a specific city
export async function fetchWeatherAlerts(city: { name: string; lat: number; lon: number }) {
  try {
    // Using OpenWeatherMap One Call API which includes alerts
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly&units=metric&lang=en&appid=${WEATHER_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()

    // Process alerts if they exist
    if (data.alerts && data.alerts.length > 0) {
      processWeatherAlerts(city.name, data.alerts)
      return data.alerts
    }

    // Check for extreme weather conditions even if no official alerts
    checkExtremeWeather(city.name, data.current, data.daily[0])

    return []
  } catch (error) {
    console.error(`Failed to fetch weather alerts for ${city.name}:`, error)
    return []
  }
}

// Process official weather alerts from the API
function processWeatherAlerts(cityName: string, alerts: any[]) {
  alerts.forEach((alert) => {
    // Create a notification for each alert
    store.dispatch(
      addNotification({
        id: uuidv4(),
        type: "weather_alert",
        title: `${cityName} - ${alert.event}`,
        message: alert.description.substring(0, 200) + (alert.description.length > 200 ? "..." : ""),
        timestamp: Date.now(),
        data: {
          city: cityName,
          alertType: alert.event,
          start: alert.start,
          end: alert.end,
        },
      }),
    )
  })
}

// Check for extreme weather conditions even when no official alerts exist
function checkExtremeWeather(cityName: string, current: any, forecast: any) {
  const temp = current.temp - 273.15 // Convert from Kelvin to Celsius
  const windSpeed = current.wind_speed
  const humidity = current.humidity
  const rainChance = forecast.pop // Probability of precipitation

  // Check for extreme temperatures
  if (temp > 35) {
    createExtremeWeatherAlert(
      cityName,
      "Extreme Heat",
      `Temperature in ${cityName} is currently ${Math.round(temp)}°C. Stay hydrated and avoid prolonged sun exposure.`,
    )
  } else if (temp < -10) {
    createExtremeWeatherAlert(
      cityName,
      "Extreme Cold",
      `Temperature in ${cityName} is currently ${Math.round(temp)}°C. Bundle up and be cautious of icy conditions.`,
    )
  }

  // Check for high winds
  if (windSpeed > 15) {
    createExtremeWeatherAlert(
      cityName,
      "Strong Winds",
      `Wind speeds in ${cityName} are currently ${Math.round(windSpeed)} m/s. Secure loose objects outdoors.`,
    )
  }

  // Check for high humidity combined with high temperature (heat index concern)
  if (temp > 28 && humidity > 70) {
    createExtremeWeatherAlert(
      cityName,
      "High Heat Index",
      `High temperature (${Math.round(temp)}°C) and humidity (${humidity}%) in ${cityName} creating dangerous conditions.`,
    )
  }

  // Check for high probability of rain
  if (rainChance > 0.7) {
    createExtremeWeatherAlert(
      cityName,
      "Heavy Rain Expected",
      `High probability (${Math.round(rainChance * 100)}%) of precipitation in ${cityName} in the next 24 hours.`,
    )
  }
}

// Create a notification for extreme weather conditions
function createExtremeWeatherAlert(cityName: string, alertType: string, message: string) {
  // Check if we already have a similar alert for this city
  const state = store.getState()
  const existingAlerts = state.notifications.items.filter(
    (notification) =>
      notification.type === "weather_alert" &&
      notification.data.city === cityName &&
      notification.data.alertType === alertType &&
      // Only consider alerts from the last 6 hours
      notification.timestamp > Date.now() - 6 * 60 * 60 * 1000,
  )

  // If no similar alert exists, create one
  if (existingAlerts.length === 0) {
    store.dispatch(
      addNotification({
        id: uuidv4(),
        type: "weather_alert",
        title: `${cityName} - ${alertType}`,
        message,
        timestamp: Date.now(),
        data: {
          city: cityName,
          alertType,
        },
      }),
    )
  }
}

// Start monitoring all cities for weather alerts
export function startWeatherAlertMonitoring(intervalMinutes = 30) {
  console.log(`Starting weather alert monitoring for ${MONITORED_CITIES.length} cities...`)

  // Immediately check for alerts
  MONITORED_CITIES.forEach((city) => {
    fetchWeatherAlerts(city)
  })

  // Set up interval to check regularly
  const intervalId = setInterval(
    () => {
      MONITORED_CITIES.forEach((city) => {
        fetchWeatherAlerts(city)
      })
    },
    intervalMinutes * 60 * 1000,
  )

  // Return cleanup function
  return () => {
    clearInterval(intervalId)
  }
}


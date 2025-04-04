// Central notification system to manage all real-time alerts
import { startWeatherAlertMonitoring } from "./api/weatherAlert"
import { startNewsMonitoring } from "./api/newsMonitor"
import { startCryptoPriceMonitoring } from "./api/crypto-alerts"
import { initializeWebSocket } from "./websockets"

// Initialize all notification systems
export function initializeNotificationSystems() {
  console.log("Initializing real-time notification systems...")

  // Start WebSocket for real-time crypto price updates
  const cryptoWebSocketCleanup = initializeWebSocket()

  // Start weather alert monitoring (check every 30 minutes)
  const weatherMonitoringCleanup = startWeatherAlertMonitoring(30)

  // Start news monitoring (check every 15 minutes)
  const newsMonitoringCleanup = startNewsMonitoring(15)

  // Start crypto price threshold monitoring (check every 5 minutes)
  const cryptoPriceMonitoringCleanup = startCryptoPriceMonitoring(5)

  // Return a cleanup function that cleans up all monitoring systems
  return () => {
    cryptoWebSocketCleanup()
    weatherMonitoringCleanup()
    newsMonitoringCleanup()
    cryptoPriceMonitoringCleanup()
  }
}


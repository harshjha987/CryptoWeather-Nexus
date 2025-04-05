
"use client"
// Crypto price alerts implementation
import { v4 as uuidv4 } from "uuid"
import { store } from "@/lib/store"
import { addNotification } from "../features/notifications/notificationSlice"

// Track price thresholds for alerts
interface PriceThreshold {
  id: string
  name: string
  upperThreshold: number | null
  lowerThreshold: number | null
  lastChecked: number
}

// Initialize with some default thresholds
const priceThresholds: PriceThreshold[] = [
  { id: "bitcoin", name: "Bitcoin", upperThreshold: null, lowerThreshold: null, lastChecked: 0 },
  { id: "ethereum", name: "Ethereum", upperThreshold: null, lowerThreshold: null, lastChecked: 0 },
  { id: "ripple", name: "XRP", upperThreshold: null, lowerThreshold: null, lastChecked: 0 },
]

// Check current prices against thresholds
export function checkCryptoPriceAlerts() {
  const state = store.getState()
  const cryptoData = state.crypto.data

  if (!cryptoData || cryptoData.length === 0) return

  cryptoData.forEach((crypto) => {
    // Find or create threshold for this crypto
    let threshold = priceThresholds.find((t) => t.id === crypto.id)
    if (!threshold) {
      threshold = {
        id: crypto.id,
        name: crypto.name,
        upperThreshold: null,
        lowerThreshold: null,
        lastChecked: 0,
      }
      priceThresholds.push(threshold)
    }

    const currentPrice = crypto.current_price

    // If this is the first check, set the thresholds based on current price
    if (threshold.upperThreshold === null || threshold.lowerThreshold === null) {
      threshold.upperThreshold = currentPrice * 1.05 // 5% above current price
      threshold.lowerThreshold = currentPrice * 0.95 // 5% below current price
      threshold.lastChecked = Date.now()
      return
    }

    // Check if price crossed any threshold
    if (currentPrice >= threshold.upperThreshold) {
      // Price went above upper threshold
      createCryptoPriceAlert(crypto.id, crypto.name, currentPrice, threshold.upperThreshold, "above")

      // Set new thresholds
      threshold.upperThreshold = currentPrice * 1.05
      threshold.lowerThreshold = currentPrice * 0.95
    } else if (currentPrice <= threshold.lowerThreshold) {
      // Price went below lower threshold
      createCryptoPriceAlert(crypto.id, crypto.name, currentPrice, threshold.lowerThreshold, "below")

      // Set new thresholds
      threshold.upperThreshold = currentPrice * 1.05
      threshold.lowerThreshold = currentPrice * 0.95
    }

    threshold.lastChecked = Date.now()
  })
}

// Create a notification for a price alert
function createCryptoPriceAlert(
  id: string,
  name: string,
  currentPrice: number,
  threshold: number,
  direction: "above" | "below",
) {
  const percentChange =
    direction === "above"
      ? ((currentPrice - threshold) / threshold) * 100
      : ((threshold - currentPrice) / threshold) * 100

  store.dispatch(
    addNotification({
      id: uuidv4(),
      type: "price_alert",
      title: `${name} Price Alert`,
      message: `${name} price has gone ${direction} ${threshold.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
      })} threshold. Current price: ${currentPrice.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
      })} (${percentChange.toFixed(2)}% change)`,
      timestamp: Date.now(),
      data: {
        cryptoId: id,
        priceChange: percentChange,
        direction,
      },
    }),
  )
}

// Start monitoring for crypto price alerts
export function startCryptoPriceMonitoring(intervalMinutes = 5) {
  console.log("Starting crypto price monitoring...")

  // Set up interval to check regularly
  const intervalId = setInterval(
    () => {
      checkCryptoPriceAlerts()
    },
    intervalMinutes * 60 * 1000,
  )

  // Return cleanup function
  return () => {
    clearInterval(intervalId)
  }
}


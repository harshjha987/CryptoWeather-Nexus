"use client"
// import {v4 as uuidv4} from "uuid"
import { store } from "./store"
import { updateCryptoPrice } from "./features/crypto/cryptoSlice"
const CRYPTO_API_KEY = process.env.NEXT_PUBLIC_CRYPTO_API_KEY

export function initializeWebSocket() {
    let ws: WebSocket | null = null
    let reconnectAttempts = 0
    let reconnectInterval: NodeJS.Timeout | null = null
    const maxReconnectAttempts = 5
  
    // Function to create and set up the WebSocket
    const setupWebSocket = () => {
      try {
        console.log("Attempting to connect to CoinCap WebSocket...")
  
        // Close existing connection if any
        if (ws) {
          ws.close()
        }
  
        // Connect to CoinCap WebSocket API
        // Note: CoinCap's WebSocket API doesn't use authentication in the connection URL
        ws = new WebSocket(
          `wss://wss.coincap.io/prices?assets=bitcoin,ethereum,ripple,cardano,solana,polkadot,dogecoin,litecoin,chainlink
          usdc&apiKey=${CRYPTO_API_KEY}`,
        )
  
        ws.onopen = () => {
          console.log("WebSocket connection established")
          reconnectAttempts = 0 // Reset reconnect attempts on successful connection
  
          // Clear any existing reconnect interval
          if (reconnectInterval) {
            clearInterval(reconnectInterval)
            reconnectInterval = null
          }
        }
  
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            handleCryptoUpdate(data)
          } catch (error) {
            console.error("Error parsing WebSocket message:", error)
          }
        }
  
        ws.onerror = (error) => {
          console.error("WebSocket error:", error)
          // Don't attempt to reconnect here, let onclose handle it
        }
  
        ws.onclose = (event) => {
          console.log(`WebSocket connection closed: ${event.code} ${event.reason}`)
  
          // Attempt to reconnect if we haven't exceeded max attempts
          if (reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++
            const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000) // Exponential backoff with max of 30 seconds
  
            console.log(
              `Attempting to reconnect in ${delay / 1000} seconds... (Attempt ${reconnectAttempts} of ${maxReconnectAttempts})`,
            )
  
            // Set up reconnect timer
            setTimeout(() => {
              setupWebSocket()
            }, delay)
          } else {
            console.log("Max reconnect attempts reached. Falling back to simulation.")
            // Fall back to simulation
            startSimulation()
          }
        }
      } catch (error) {
        console.error("Failed to initialize WebSocket:", error)
        // Fall back to simulation
        startSimulation()
      }
    }
  
    // Start the WebSocket connection
    setupWebSocket()
  
    // Fallback simulation function
    let simulationInterval: NodeJS.Timeout | null = null
  
    function startSimulation() {
      if (!simulationInterval) {
        console.log("Starting price simulation as fallback")
        simulationInterval = setInterval(() => {
          simulateWebSocketMessage()
        }, 10000) // Simulate a message every 10 seconds
      }
    }
  
    // Simulate weather alerts occasionally
    const weatherAlertId = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance of weather alert
        simulateWeatherAlert()
      }
    }, 30000) // Check every 30 seconds
  
    // Return a cleanup function
    return () => {
      if (ws) {
        ws.close()
      }
      if (simulationInterval) {
        clearInterval(simulationInterval)
      }
      if (reconnectInterval) {
        clearInterval(reconnectInterval)
      }
      clearInterval(weatherAlertId)
    }
  }
  
  // Handle real-time crypto price updates from WebSocket
  function handleCryptoUpdate(data: Record<string, string>) {
    const state = store.getState()
  
    // Process each crypto update
    Object.entries(data).forEach(([cryptoId, priceString]) => {
      const crypto = state.crypto.data.find((c) => c.id === cryptoId)
      if (!crypto) return
  
      const newPrice = Number.parseFloat(priceString)
      if (isNaN(newPrice)) return
  
      // Calculate price change percentage
      const oldPrice = crypto.current_price
      const priceChangePercent = ((newPrice - oldPrice) / oldPrice) * 100
  
      // Update the price in the store
      store.dispatch(
        updateCryptoPrice({
          id: cryptoId,
          price: newPrice,
        }),
      )
  
      // If price change is significant (more than 1%), add a notification
    //   if (Math.abs(priceChangePercent) > 1) {
    //     const direction = priceChangePercent > 0 ? "up" : "down"
    //     store.dispatch(
    //       addNotification({
    //         id: uuidv4(),
    //         type: "price_alert",
    //         title: `${crypto.name} Price Alert`,
    //         message: `${crypto.name} price has gone ${direction} by ${Math.abs(priceChangePercent).toFixed(2)}%`,
    //         timestamp: Date.now(),
    //         data: {
    //           cryptoId: cryptoId,
    //           priceChange: priceChangePercent,
    //         },
    //       }),
    //     )
    //   }
    })
  }
  
  // Fallback function to simulate WebSocket messages if the real connection fails
  function simulateWebSocketMessage() {
    const cryptos = ["bitcoin", "ethereum", "ripple", "cardano", "solana"]
    const randomCrypto = cryptos[Math.floor(Math.random() * cryptos.length)]
  
    // Get current price from store
    const state = store.getState()
    const crypto = state.crypto.data.find((c) => c.id === randomCrypto)
  
    if (!crypto) return
  
    // Generate a random price change (between -3% and +3%)
    const priceChangePercent = (Math.random() - 0.5) * 6
    const newPrice = crypto.current_price * (1 + priceChangePercent / 100)
  
    // Update the price in the store
    store.dispatch(
      updateCryptoPrice({
        id: randomCrypto,
        price: newPrice,
      }),
    )
  
    // If price change is significant (more than 1.5%), add a notification
    // if (Math.abs(priceChangePercent) > 1.5) {
    //   const direction = priceChangePercent > 0 ? "up" : "down"
    //   store.dispatch(
    //     addNotification({
    //       id: uuidv4(),
    //       type: "price_alert",
    //       title: `${crypto.name} Price Alert`,
    //       message: `${crypto.name} price has gone ${direction} by ${Math.abs(priceChangePercent).toFixed(2)}%`,
    //       timestamp: Date.now(),
    //       data: {
    //         cryptoId: randomCrypto,
    //         priceChange: priceChangePercent,
    //       },
    //     }),
    //   )
    // }
  }
  
  function simulateWeatherAlert() {
    const cities = ["New York", "London", "Tokyo","Kolkata","Patna","Bengaluru","Mumbai"]
    const randomCity = cities[Math.floor(Math.random() * cities.length)]
  
    const alertTypes = [
      { type: "Heavy Rain", message: `Heavy rainfall expected in ${randomCity} in the next 24 hours.` },
      { type: "Heat Wave", message: `Heat wave warning for ${randomCity}. Temperatures expected to rise significantly.` },
      { type: "Strong Winds", message: `Strong wind advisory for ${randomCity}. Gusts up to 60 mph expected.` },
      { type: "Thunderstorm", message: `Thunderstorm warning for ${randomCity}. Lightning and heavy rain expected.` },
    ]
  
    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)]
  
    // store.dispatch(
    //   addNotification({
    //     id: uuidv4(),
    //     type: "weather_alert",
    //     title: `${randomCity} - ${randomAlert.type} Alert`,
    //     message: randomAlert.message,
    //     timestamp: Date.now(),
    //     data: {
    //       city: randomCity,
    //       alertType: randomAlert.type,
    //     },
    //   }),
    // )
  }
  
  
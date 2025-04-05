"use client"
// News monitoring implementation
import { v4 as uuidv4 } from "uuid"
import { store } from "@/lib/store"
import { addNotification } from "../features/notifications/notificationSlice"
import { getNews } from "./news"

// Track the latest news we've seen to avoid duplicate notifications
let latestNewsTimestamp = Date.now()
let processedNewsIds = new Set<string>()

// Fetch latest news and create notifications for new items
export async function checkForNewsUpdates() {
  try {
    const news = await getNews()

    if (!news || news.length === 0) return

    // Sort news by published date (newest first)
    const sortedNews = [...news].sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })

    // Get news items newer than our last check
    const newItems = sortedNews.filter((item) => {
      const pubTime = new Date(item.publishedAt).getTime()
      const isNew = pubTime > latestNewsTimestamp
      const notProcessed = !processedNewsIds.has(item.title)
      return isNew && notProcessed
    })

    // Update our latest timestamp if we found newer items
    if (newItems.length > 0 && new Date(newItems[0].publishedAt).getTime() > latestNewsTimestamp) {
      latestNewsTimestamp = new Date(newItems[0].publishedAt).getTime()
    }

    // Create notifications for new items (limit to 3 to avoid spam)
    newItems.slice(0, 3).forEach((item) => {
      // Add to processed set to avoid duplicates
      processedNewsIds.add(item.title)

      // Create notification
      store.dispatch(
        addNotification({
          id: uuidv4(),
          type: "news_alert",
          title: `Breaking News: ${item.source}`,
          message: item.title,
          timestamp: Date.now(),
          data: {
            url: item.url,
            source: item.source,
            publishedAt: item.publishedAt,
          },
        }),
      )
    })

    // Limit the size of our processed set to avoid memory issues
    if (processedNewsIds.size > 100) {
      processedNewsIds = new Set([...processedNewsIds].slice(-50))
    }

    return newItems
  } catch (error) {
    console.error("Failed to check for news updates:", error)
    return []
  }
}

// Start monitoring for news updates
export function startNewsMonitoring(intervalMinutes = 15) {
  console.log("Starting news monitoring...")

  // Initialize with current time
  latestNewsTimestamp = Date.now()

  // Immediately check for news
  checkForNewsUpdates()

  // Set up interval to check regularly
  const intervalId = setInterval(
    () => {
      checkForNewsUpdates()
    },
    intervalMinutes * 60 * 1000,
  )

  // Return cleanup function
  return () => {
    clearInterval(intervalId)
  }
}


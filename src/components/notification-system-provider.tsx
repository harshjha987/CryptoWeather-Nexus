"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { initializeNotificationSystems } from "../lib/notifiction-system"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function NotificationSystemProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Initialize all real-time notification systems
      const cleanup = initializeNotificationSystems()

      // Clean up on unmount
      return cleanup
    } catch (err) {
      console.error("Failed to initialize notification systems:", err)
      setError("Failed to initialize real-time notifications. Some features may be limited.")
      return () => {}
    }
  }, [])

  return (
    <>
      {error && (
        <Alert variant="destructive" className="fixed bottom-4 right-4 z-50 max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Notification System Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {children}
    </>
  )
}


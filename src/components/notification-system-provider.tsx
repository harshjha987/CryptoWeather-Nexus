"use client"

import type React from "react"

import { useEffect } from "react"
import { initializeNotificationSystems } from "../lib/notifiction-system"

export function NotificationSystemProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize all real-time notification systems
    const cleanup = initializeNotificationSystems()

    // Clean up on unmount
    return cleanup
  }, [])

  return <>{children}</>
}


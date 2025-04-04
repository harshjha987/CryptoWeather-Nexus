"use client";

import React,{useEffect} from "react";

import { Provider } from "react-redux";

import { store } from "./store";

import { initializeNotificationSystems } from "./notifiction-system";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize all real-time notification systems
    const cleanup = initializeNotificationSystems()

    // Clean up on unmount
    return cleanup
  }, [])

  return <Provider store={store}>{children}</Provider>
}

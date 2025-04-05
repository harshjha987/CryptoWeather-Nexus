"use client"

import React,{useEffect} from "react";

import { Provider } from "react-redux";

import { store } from "./store";

import { NotificationSystemProvider } from "@/components/notification-system-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NotificationSystemProvider>{children}</NotificationSystemProvider>
    </Provider>
  )
}
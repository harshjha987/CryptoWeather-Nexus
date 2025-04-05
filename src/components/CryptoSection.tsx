"use client"

import React, { useState,useEffect} from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { AlertCircle, ArrowRight, TrendingUp } from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { RootState,AppDispatch } from "@/lib/store";
import { fetchCryptoData } from "@/lib/features/crypto/cryptoThunks";
import { initializeWebSocket } from "@/lib/websockets";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import Link from "next/link";
import CryptoCard from "./CryptoCard";
function CryptoSection() {

  const dispatch = useDispatch<AppDispatch>();

  const {data,status,error} = useSelector((state : RootState)=> state.crypto);
  const [wsStatus,setWsStatus] = useState<"connecting"
  | "connected" | "error" | "fallback">("connecting")

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCryptoData())
    }

    // Initialize WebSocket connection for real-time updates
    const cleanup = initializeWebSocket()

    // Listen for WebSocket status messages from console.log
    const originalConsoleLog = console.log
    const originalConsoleError = console.error

    console.log = (...args) => {
      originalConsoleLog(...args)
      const message = args.join(" ")
      if (message.includes("WebSocket connection established")) {
        setWsStatus("connected")
      } else if (message.includes("Starting price simulation as fallback")) {
        setWsStatus("fallback")
      }
    }

    // console.error = (...args) => {
    //   originalConsoleError(...args)
    //   const message = args.join(" ")
    //   if (message.includes("WebSocket error") || message.includes("Failed to initialize WebSocket")) {
    //     setWsStatus("error")
    //   }
    // }

    // Refresh crypto data every 5 minutes
    const intervalId = setInterval(
      () => {
        dispatch(fetchCryptoData())
      },
      5 * 60 * 1000,
    )

    return () => {
      cleanup() // close WS
      clearInterval(intervalId)
      console.log = originalConsoleLog
      console.error = originalConsoleError
    }
  }, [dispatch, status])
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Cryptocurrencies
        </CardTitle>
        <CardDescription>
          Live cryptocurrency prices
          {wsStatus === "connected" && (
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
              Live updates
            </span>
          )}
          {wsStatus === "fallback" && (
            <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
              Simulated updates
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {wsStatus === "error" && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>WebSocket Connection Issue</AlertTitle>
            <AlertDescription>Unable to connect to real-time updates. Using simulated data instead.</AlertDescription>
          </Alert>
        )}

        {status === "loading" && data.length === 0 ? (
          <>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </>
        ) : status === "failed" ? (
          <div className="rounded-md bg-destructive/15 p-4 text-center text-destructive">
            {error || "Failed to load cryptocurrency data"}
          </div>
        ) : (
          data.slice(0, 3).map((crypto) => <CryptoCard key={crypto.id} data={crypto} />)
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/crypto" className="flex items-center justify-center gap-2">
            View all cryptocurrencies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}



export default CryptoSection;

"use client";

import { getCryptoMetrics } from "@/lib/api/crypto";
import { useState , useEffect} from "react";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ExternalLink, Key } from "lucide-react";

interface CryptoMetricProps{
    id: string
}

export function CryptoMetrics({id} : CryptoMetricProps){
    const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMetrics(){
        try {
            setLoading(true);
            const data = await getCryptoMetrics(id)
            setMetrics(data);
            setError(null)
            
        } catch (error) {
            setError("Failed to load metrics data")
        }
        finally{
            
            setLoading(false)
        }
    }
    fetchMetrics()
  
  }, [id])

  if (loading) {
    return <Skeleton className="h-[200px] w-full" />
  }
  if (error) {
    return <div className="rounded-md bg-destructive/15 p-4 text-center text-destructive">{error}</div>
  }
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Additional Metrics
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {metrics &&
            Object.entries(metrics).map(([key, value]: [string, any]) => (
              <div key={key} className="space-y-1">
                <p className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, " ")}</p>
                {key === "explorer" && value !== "N/A" ? (
                  <a
                    href={value.toString()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    Explorer <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <p className="text-lg font-medium">
                    {typeof value === "number"
                      ? value.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })
                      : value.toString()}
                  </p>
                )}
              </div>
            ))}
            </div>
        </CardContent>
    </Card>
  )

}
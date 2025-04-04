"use client"
import type { Notification } from "@/lib/types"
import { AlertTriangle, Cloud, Newspaper, TrendingDown, TrendingUp, X } from "lucide-react"
import { Button } from "./ui/button"
import { useDispatch } from "react-redux"
import { removeNotification } from "@/lib/features/notifications/notificationSlice"

interface NotificationItemProps{
    notification : Notification
}

function NotificationItem({notification} : NotificationItemProps){
    const dispatch = useDispatch();
    const handleDismiss = () => {
        dispatch(removeNotification(notification.id))
      }


    const getNotificationIcon = () => {
        switch (notification.type) {
          case "price_alert":
            return notification.data.priceChange > 0 ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )
          case "weather_alert":
            return <Cloud className="h-5 w-5 text-blue-500" />
          case "news_alert":
            return <Newspaper className="h-5 w-5 text-purple-500" />
          default:
            return <AlertTriangle className="h-5 w-5 text-amber-500" />
        }
      }

      return (
        <div className="flex items-start gap-2 border-b p-3 last:border-0">
 <div className="mt-0.5">{getNotificationIcon()}</div>
<div className="flex-1">
        <div className="font-medium">{notification.title}</div>
        <div className="text-sm text-muted-foreground">{notification.message}</div>
        {notification.type === "news_alert" && notification.data.url && (
          <a
            href={notification.data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-xs text-primary hover:underline"
          >
            Read more
          </a>
        )}
        <div className="mt-1 text-xs text-muted-foreground">
          {new Date(notification.timestamp).toLocaleTimeString()}
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDismiss} >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
        </div>

      )

}

export default NotificationItem


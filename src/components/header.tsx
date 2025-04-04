"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useDispatch,useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { clearNotifications } from "@/lib/features/notifications/notificationSlice";
import NotificationItem from "./Notification-item";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import { Badge } from "./ui/badge";


function Header() {
  const { setTheme } = useTheme();
  const dispatch = useDispatch();

  const notifications = useSelector((state: RootState)=>
  state.notifications.items)

  const[mounted,setMounted] = useState(false);

  const[notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

useEffect(()=>{
  if (notifications.length > 0 && mounted) {
    // Get the most recent notification
    const latestNotification = notifications[0]

    // Only play sound if the notification is recent (within the last 5 seconds)
    const isRecent = Date.now() - latestNotification.timestamp < 5000

    if (isRecent) {
      // Play a notification sound
      try {
        const audio = new Audio("/notifi.mp3")
        audio.volume = 0.5
        audio.play().catch((e) => console.log("Error playing notification sound:", e))
      } catch (error) {
        console.log("Error with notification sound:", error)
      }
    }
  }

},[notifications,mounted])
if (!mounted) {
  return null
}

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b-2 bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar isSheet/>
        </SheetContent>
      </Sheet>
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold">
          CryptoWeather Nexus
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu open = {notificationOpen}
        onOpenChange={setNotificationOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                  {notifications.length}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
          <div className="flex items-center justify-between p-2">
              <h2 className="font-semibold">Notifications</h2>
              {notifications.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => dispatch(clearNotifications())}>
                  Clear all
                </Button>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No new notifications</div>
              ) : (
                notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun
                className="h-5 w-5 rotate-0 scale-100
      transition-all dark:-rotate-90
      dark:scale-0"
              />
              <Moon
                className="absolute h-5 w-5 rotate-0 scale-0
      transition-all dark:-rotate-90
      dark:scale-100"
              />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;

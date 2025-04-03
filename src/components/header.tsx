"use client";
import Link from 'next/link'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { Bell, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'


function Header() {

  const {setTheme} = useTheme();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b-2 bg-background px-4 md:px-6">
      <div className='flex-1'>
        <Link href= "/" className='text-xl font-bold'>
        Dashboard
        </Link>
      </div>
      <div className='flex items-center gap-2'>
      <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant= "outline" size= "icon"
    className='relative'>
      <Bell className='h-5 w-5' />
      <span className='sr-only'>Notifications</span>
    </Button>
    </DropdownMenuTrigger>
    
  
</DropdownMenu>
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant='outline' size= "icon">
      <Sun className='h-5 w-5 rotate-0 scale-100
      transition-all dark:-rotate-90
      dark:scale-0' />
      <Moon className='absolute h-5 w-5 rotate-0 scale-0
      transition-all dark:-rotate-90
      dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align='end'>
    <DropdownMenuItem onClick={()=> setTheme("light")}>Light</DropdownMenuItem>
    <DropdownMenuItem onClick={()=> setTheme
      ("dark")}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={()=> setTheme("system")}>
        System
      </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

      </div>

    </header>
  )
}

export default Header

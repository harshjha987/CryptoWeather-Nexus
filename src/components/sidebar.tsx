"use client";

import { cn } from '@/lib/utils';
import { Cloud, HomeIcon, Newspaper, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

function Sidebar() {

    const pathname = usePathname();
    const routes = [
        {
            name : "Dashboard",
            path: "/",
            icon : HomeIcon,
        },
        {
            name : "Weather",
            path : "/weather",
            icon : Cloud,
        },
        {
            name : "Crypto Currencies",
            path : "/crypto",
            icon : TrendingUp,
        },
        {
            name : "News",
            path : "/news",
            icon : Newspaper,

        },
        
    ]
    return (
        <aside className='hidden border-r bg-background 
        md:block md:w-64'>
            <div className='flex h-full flex-col gap-2 p-4'>
                <div className='flex h-14 items-center border-b
                px-2 py-4'>
                    <h2 className='text-lg 
                    font-semibold'> Dashboard</h2>
                </div>
                <nav className='flex-1 space-y-2 py-2'>
                    {routes.map((route)=>(
                        <Link
                          key= {route.path}
                          href = {route.path}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            pathname === route.path && "bg-accent text-accent-foreground",
                          )}>
                            <route.icon className='h-5 w-5' />
                            {route.name}
                          </Link>
                    ))}
                </nav>
            </div>
        </aside>
    )
  
}

export default Sidebar

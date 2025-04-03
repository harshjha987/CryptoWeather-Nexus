"use client";

import React,{useEffect} from 'react'
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ArrowRight, Newspaper } from 'lucide-react';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchNewsData } from '@/lib/features/news/newsThunks';
import { Skeleton } from './ui/skeleton';
import NewsCard from './NewsCard';
import { Button } from './ui/button';
import Link from 'next/link';

function NewsSection() {
  const dispatch = useDispatch<AppDispatch>()
  const {data,status,error} = useSelector((state : RootState)=> state.news)
  useEffect(() => {

    if(status === "idle"){
      dispatch(fetchNewsData())
    }

    const intervalId = setInterval(
      ()=>{
        dispatch(fetchNewsData())
      },
      30 * 60 * 1000
    )
    return ()=> clearInterval(intervalId)
  
  }, [dispatch,status])
  return (
    <Card className='col-span-1'>
        <CardHeader>
            <CardTitle className='flex items-center gap-2'>
                <Newspaper className='h-5 w-5'/>
                Latest News.

            </CardTitle>
            <CardDescription>
                Top crypto-related headlines
            </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {status === "loading" && data.length === 0 ? (
            <>
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-24 w-full' />
            
            </>
          ) : status === "failed" ? (
            <div className="rounded-md bg-destructive/15 p-4 text-center text-destructive">
            {error || "Failed to load news data"}
          </div>
          ) : data.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No news articles available at the moment</div>
          ) : (
            <div className='grid gap-4 '>
              {data.slice(0,3).map((article,index)=>(
                <NewsCard key={article.title || index}
                data = {article} />
              ))}

            </div>
          )}
        </CardContent>
        <CardFooter >
          <Button asChild variant = "ghost" className='w-full'>
            <Link href = "/news" className = "flex items-center justify-center gap-2">
            View all news 
            <ArrowRight className='h-4 w-4' />
            </Link>
          </Button>
        </CardFooter>
    </Card>
  )
}

export default NewsSection

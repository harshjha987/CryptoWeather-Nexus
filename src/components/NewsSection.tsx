"use client";

import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Newspaper } from 'lucide-react';

function NewsSection() {
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
    </Card>
  )
}

export default NewsSection

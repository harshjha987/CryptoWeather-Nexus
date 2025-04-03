"use client";

import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Cloud } from 'lucide-react';

function WeatherSection() {
  return (
    <Card className='col-span-1'>
        <CardHeader>
            <CardTitle className='flex items-center gap-2'>
               <Cloud className='h-5 w-5' />
               Weather 
            </CardTitle>
            <CardDescription>
                Current Weather in Major Cities.
            </CardDescription>
        </CardHeader>
    </Card>
  )
}

export default WeatherSection

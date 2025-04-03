import { createAsyncThunk } from "@reduxjs/toolkit";

import { getWeatherForCities } from "@/lib/api/weather";

export const fetchWeatherData = createAsyncThunk("weather/fetchWeatherData"
    ,async()=>{
        const cities = ["New York","London","Paris","Kolkata"
            ,"Patna"]
            return await getWeatherForCities(cities);
    }
)
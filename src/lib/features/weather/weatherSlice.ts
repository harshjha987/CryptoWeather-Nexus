import { createSlice } from "@reduxjs/toolkit"
import { fetchWeatherData } from "./weatherThunks"
import type { WeatherData } from "@/lib/types"

interface WeatherState {
  data: WeatherData[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: WeatherState = {
  data: [],
  status: "idle",
  error: null,
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload ?? []
        state.error = null
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch weather data"
      })
  },
})

export default weatherSlice.reducer


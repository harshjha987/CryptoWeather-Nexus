import type { CryptoData } from "@/lib/types";
import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { fetchCryptoData } from "./cryptoThunks";


interface CryptoState{
    data : CryptoData[]
    status : "idle" | "loading" | "succeeded" | "failed"
    error : string | null
}

const initialState : CryptoState = {
    data : [],
    status : "idle",
    error : null,
}

const cryptoSlice = createSlice({
    name : "crypto",
    initialState,
    reducers: {
        updateCryptoPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
          const { id, price } = action.payload
          const crypto = state.data.find((c) => c.id === id)
          if (crypto) {
            const oldPrice = crypto.current_price
            crypto.current_price = price
    
            // Update price change percentage
            const priceChange = price - oldPrice
            const priceChangePercentage = (priceChange / oldPrice) * 100
            crypto.price_change_24h = priceChange
            crypto.price_change_percentage_24h = priceChangePercentage.toFixed(2)
          }
        },
      },
      extraReducers : (builder)=>{
        builder
        .addCase(fetchCryptoData.pending,(state)=>{
            state.status = "loading"
        })
        .addCase(fetchCryptoData.fulfilled,(state,action)=>{
            state.status = "succeeded"
            state.data = action.payload
            state.error = null
        })
        .addCase(fetchCryptoData.rejected,(state,action)=>{
            state.status = "failed"
            state.error = action.error.message || "failed to fetch crypto data"
        })
      }
})


export const {updateCryptoPrice} = cryptoSlice.actions
export default cryptoSlice.reducer
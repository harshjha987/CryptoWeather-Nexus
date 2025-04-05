import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { FavouritesData } from "@/lib/types";

interface FavouriteState{
    cities : string[]
    cryptos : FavouritesData[]
}

const initialState : FavouriteState = {
    cities : [],
    cryptos : []
}

const favouriteSlice = createSlice({
    name : "favourites",
    initialState,
    reducers : {
        addFavouriteCity : (state,action : PayloadAction<string>)=>{
            if(!state.cities.includes(action.payload)){
                state.cities.push(action.payload)
            }

        },
        removeFavouriteCity : (state,action : PayloadAction<string>)=>{
            state.cities = state.cities.filter((city)=> city !== action.payload)
        },
        addfavouriteCrypto : (state,action : PayloadAction<FavouritesData>)=>{
            if(!state.cryptos.some((crypto)=>
                crypto.id === action.payload.id
            )){
                state.cryptos.push(action.payload)
            }
        },
        removeFavouriteCrypto : (state,action: PayloadAction<string>)=>{
                state.cryptos = state.cryptos.filter((crypto)=> crypto.id !== action.payload)
        }
    }
})

export const {addFavouriteCity,addfavouriteCrypto
    ,removeFavouriteCity,removeFavouriteCrypto} = favouriteSlice.actions

export default favouriteSlice.reducer
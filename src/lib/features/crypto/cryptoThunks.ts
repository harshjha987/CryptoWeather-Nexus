import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCryptos } from "@/lib/api/crypto";

export const fetchCryptoData = createAsyncThunk("crypto/fetchCryptoData",
    async()=>{

        const cryptos = [
            "bitocoin",
            "ethereum",
            "ripple",
            "cardano",
            "solana",
            "polkadot",
            "dogecoin",
            "litecoin",
            "chainlink",
        ]
        return await getCryptos(cryptos)
    })
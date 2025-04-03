import { createSlice } from "@reduxjs/toolkit";

import { fetchNewsData } from "./newsThunks";

import type { NewsData } from "@/lib/types";

interface NewsState {
  data: NewsData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NewsState = {
  data: [],
  status: "idle",
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "failed to fetch news data";
      });
  },
});

export default newsSlice.reducer;

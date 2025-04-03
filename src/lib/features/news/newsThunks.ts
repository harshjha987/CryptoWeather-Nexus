import { createAsyncThunk } from "@reduxjs/toolkit";

import { getNews } from "@/lib/api/news";

export const fetchNewsData = createAsyncThunk(
  "news/fetchNewsData",
  async () => {
    return await getNews();
  },
);

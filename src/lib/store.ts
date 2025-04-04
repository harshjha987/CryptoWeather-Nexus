import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weather/weatherSlice";
import newsReducer from "./features/news/newsSlice";
import cryptoReducer from "./features/crypto/cryptoSlice"
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    news: newsReducer,
    crypto : cryptoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

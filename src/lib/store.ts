import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weather/weatherSlice";
import newsReducer from "./features/news/newsSlice";
import cryptoReducer from "./features/crypto/cryptoSlice"
import notificationsReducer from "./features/notifications/notificationSlice"
import favouritesReducer from "./features/favourites/favouritesSlice"
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    news: newsReducer,
    crypto : cryptoReducer,
    notifications : notificationsReducer,
    favourites : favouritesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

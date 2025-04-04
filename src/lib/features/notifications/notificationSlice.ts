import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

import type { Notification } from "@/lib/types";

interface NotificationState {
    items : Notification []
}

const initialState : NotificationState = {
    items : []
}

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
      addNotification: (state, action: PayloadAction<Notification>) => {
        state.items.unshift(action.payload)
        // Limit to 10 notifications
        if (state.items.length > 10) {
          state.items = state.items.slice(0, 10)
        }
      },
      removeNotification: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      },
      clearNotifications: (state) => {
        state.items = []
      },
    },
  })
  
  export const { addNotification, removeNotification, clearNotifications } = notificationsSlice.actions
  export default notificationsSlice.reducer
  
  
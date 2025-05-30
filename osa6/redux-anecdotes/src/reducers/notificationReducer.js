import { createSlice } from "@reduxjs/toolkit"


const initialMessage = ''


const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialMessage,
    reducers: {
      setNotification(state, action) {
        const notification = action.payload
        return notification
      },
      clearNotification() {
        return ''
      }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
import { createSlice } from "@reduxjs/toolkit"


const initialMessage = ''


const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialMessage,
    reducers: {
      setNotificationInStore(state, action) {
        const notification = action.payload
        return notification
      },
      clearNotification() {
        return ''
      }
    }
})

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(setNotificationInStore(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)

  }
}

export const { setNotificationInStore, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
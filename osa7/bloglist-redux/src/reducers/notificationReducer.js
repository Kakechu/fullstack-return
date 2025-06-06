import { createSlice } from '@reduxjs/toolkit'

const initialMessage = { text: '', type: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialMessage,
  reducers: {
    setNotificationInStore(state, action) {
      const notification = action.payload
      return notification
    },
    clearNotification() {
      return { text: '', type: '' }
    },
  },
})

export const setNotification = (message) => {
  return async (dispatch) => {
    dispatch(setNotificationInStore(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 4000)
  }
}

export const { setNotificationInStore, clearNotification } =
  notificationSlice.actions
export default notificationSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    }
  },
})

export const { set } = notificationSlice.actions

export const setNotification = (notification, seconds) => {
  return async dispatch => {
    await dispatch(set(notification))
    setTimeout(() => {
      dispatch(set(''))
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
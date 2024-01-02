import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

const initialState = {
    isLoading: false,
    status: null,
    notifications:[],
}
export const getUserNotification = createAsyncThunk('notification/getUserNotification', async() => {
    try {
        const {data} = await axios.get('/notification')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const readNotificationByUser = createAsyncThunk('notification/readNotificationByUser', async(id) => {
    try {
        const {data} = await axios.post(`/notification/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
  },
  extraReducers: {
        [getUserNotification.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getUserNotification.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.notifications = action.payload
        },
        [getUserNotification.rejected]: (state, action) => {
            state.status = action.payload.status
            state.isLoading = false
        },
        [readNotificationByUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [readNotificationByUser.fulfilled]: (state) => {
            state.isLoading = false
            state.status = null
            
        },
        [readNotificationByUser.rejected]: (state, action) => {
            state.status = action.payload.status
            state.isLoading = false
        },
    }
})


export default notificationSlice.reducer
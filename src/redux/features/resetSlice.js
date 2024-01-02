import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  status: null
}

export const sendResetEmail = createAsyncThunk('reset/sendResetEmail', async({username, email}) => {
    try {
        const { data } = await axios.post('http://localhost:4444/api/reset', { username, email })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const resetUserPass = createAsyncThunk('reset/resetUserPass', async({password,token}) => {
    try {
        const {data} = await axios.post(`http://localhost:4444/api/reset/${token}`, {password, token})
        return data
    } catch (error) {
        console.log(error)
    }
})

export const resetSlice = createSlice({
  name: 'reset',
  initialState,
  reducers: {
  },
  extraReducers: {
    [sendResetEmail.pending]: (state) => {
        state.status = null
    },
    [sendResetEmail.fulfilled]: (state, action) => {
        state.status = action.payload?.message
    },
    [sendResetEmail.rejected]: (state, action) => {
        state.status = action.payload.status
    },
    [resetUserPass.pending]: (state) => {
        state.status = null
    },
    [resetUserPass.fulfilled]: (state, action) => {
        state.status = action.payload?.message
    },
    [resetUserPass.rejected]: (state, action) => {
        state.status = action.payload.status
    },
  }
})

export default resetSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

const initialState = {
    isLoading: false,
    status: null,
    reports:[],
}

export const sendUserReport = createAsyncThunk('report/sendUserReport', async({contentId, content, by, guilty, contentType }) => {
    try {
        const {data} = await axios.post('/report', {
            contentId, content, by, guilty, contentType
        })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getReports = createAsyncThunk('report/getReports', async() => {
    try {
        const {data} = await axios.get('/report')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const solveTheReport = createAsyncThunk('report/solveTheReport', async(id) => {
    try {
        const {data} = await axios.delete(`/report/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})



export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
  },
  extraReducers: {
        [sendUserReport.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [sendUserReport.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
        },
        [sendUserReport.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        [getReports.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getReports.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.reports = action.payload
        },
        [getReports.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        [solveTheReport.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [solveTheReport.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.reports = state.reports.filter(x => x._id !== action.payload.report._id)
            state.status = action.payload.message
        },
        [solveTheReport.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    }
})


export default reportSlice.reducer
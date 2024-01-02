import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../utils/axios'

const initialState = {
    isLoading: false,
    avatar: '',
    statusUser: '',
    user: null,
}

export const getUserById = createAsyncThunk('profile/getUserById', async (id) => {
    try {
        const {data} = await axios.get(`/profile/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const changeUserAvatar = createAsyncThunk('profile/changeUserAvatar', async(params) => {
    try {
        const {data} = await axios.post(`/profile/avatar`, params)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const resetUserAvatar = createAsyncThunk('profile/resetUserAvatar', async(id) => {
    try {
        const {data} = await axios.post(`/profile/avatar/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getUserAvatar = createAsyncThunk('profile/getUserAvatar', async(id) => {
    try {
        const {data} = await axios.get(`/profile/avatar/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updateStatus = createAsyncThunk('profile/updateStatus', async({id, status}) => {
    try {
        const {data} = await axios.post(`/profile/status/${id}`, {id, status})
        return data
    } catch (error) {
        console.log(error)
    }
})
export const getStatus = createAsyncThunk('profile/getStatus', async(id) => {
    try {
        const {data} = await axios.get(`/profile/status/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: {
        [getUserById.pending]: (state) => {
            state.isLoading = true
        },
        [getUserById.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = action.payload
        },
        [getUserById.rejected]: (state) => {
            state.isLoading = false
        },
        [changeUserAvatar.pending]: (state) => {
            state.isLoading = true
        },
        [changeUserAvatar.fulfilled]: (state, action) => {
            state.isLoading = false
            state.avatar = action.payload
        },
        [changeUserAvatar.rejected]: (state) => {
            state.isLoading = false
        },
        [getUserAvatar.pending]: (state) => {
            state.isLoading = true
        },
        [getUserAvatar.fulfilled]: (state, action) => {
            state.isLoading = false
            state.avatar = action.payload
        },
        [getUserAvatar.rejected]: (state) => {
            state.isLoading = false
        },
        [resetUserAvatar.pending]: (state) => {
            state.isLoading = true
        },
        [resetUserAvatar.fulfilled]: (state, action) => {
            state.isLoading = false
            state.avatar = action.payload
        },
        [resetUserAvatar.rejected]: (state) => {
            state.isLoading = false
        },
        [updateStatus.pending]: (state) => {
            state.isLoading = true
        },
        [updateStatus.fulfilled]: (state) => {
            state.isLoading = false
        },
        [updateStatus.rejected]: (state) => {
            state.isLoading = false
        },
        [getStatus.pending]: (state) => {
            state.isLoading = true
        },
        [getStatus.fulfilled]: (state, action) => {
            state.isLoading = false
            state.statusUser = action.payload
        },
        [getStatus.rejected]: (state) => {
            state.isLoading = false
        },
    }
})

export default profileSlice.reducer
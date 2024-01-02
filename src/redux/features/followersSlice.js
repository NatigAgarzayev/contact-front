import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../utils/axios'
const initialState = {
    followers: [],
    following: [],
    loading: false
}

export const followUser = createAsyncThunk('followers/followUser', async(id) => {
    const {data} = await axios.post(`/followers/${id}`, id, {
        headers: {'content-type': 'multipart/form-data'}
    })
    return data
})

export const getUserFollowers = createAsyncThunk('followers/getUserFollowers', async(id) => {
    const {data} = await axios.get(`/followers/${id}`, id)
    return data
})

export const getUserFollowing = createAsyncThunk('followers/getUserFollowing', async(id) => {
    const {data} = await axios.get(`/followers/user/${id}`, id)
    return data
})

export const unfollowUser = createAsyncThunk('followers/unfollowUser', async(id) => {
    const {data} = await axios.delete(`/followers/${id}`, id)
    return data
})

export const followersSlice = createSlice({
    name: 'followers',
    initialState,
    reducers: {},
    extraReducers: {
        [followUser.pending]: (state) => {
            state.loading = true
        },
        [followUser.fulfilled]: (state, action) => {
            state.loading = false
            state.followers.push(action.payload.followers.followers)
        },
        [followUser.rejected]: (state) => {
            state.loading = false
        },
        [getUserFollowers.pending]: (state) => {
            state.loading = true
        },
        [getUserFollowers.fulfilled]: (state, action) => {
            state.loading = false
            state.followers = action.payload
        },
        [getUserFollowers.rejected]: (state) => {
            state.loading = false
        },
        [getUserFollowing.pending]: (state) => {
            state.loading = true
        },
        [getUserFollowing.fulfilled]: (state, action) => {
            state.loading = false
            state.following = action.payload
        },
        [getUserFollowing.rejected]: (state) => {
            state.loading = false
        },
        [unfollowUser.pending]: (state) => {
            state.loading = true
        },
        [unfollowUser.fulfilled]: (state, action) => {
            state.loading = false
            state.followers = state.followers.filter(x => x.user !== action.payload.user)
        },
        [unfollowUser.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default followersSlice.reducer
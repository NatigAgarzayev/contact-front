import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axiosadmin'

const initialState = {
    admin: null,
    token: null,
    isLoading: false,
    status: null,
    stats: {},
}

export const loginAdmin = createAsyncThunk('admin/loginAdmin', async ({username, password}) => {
    try {
        const {data} = await axios.post('/admin/auth', {
            username,
            password
        })
        if(data.token){
            window.sessionStorage.setItem('admin', data.token)
        }
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getAdmin = createAsyncThunk('admin/getAdmin', async () => {
    try {
        const {data} = await axios.get('/admin/me')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getDashStats = createAsyncThunk('admin/getDashStats', async () => {
    try {
        const {data} = await axios.get('/admin/stats')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const deleteUsers = createAsyncThunk('admin/deleteUsers', async (id) => {
    try {
        const {data} = await axios.delete(`/admin/user/delete/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const changeUserRole = createAsyncThunk('admin/changeUserRole', async ({id, role}) => {
    try {
        const {data} = await axios.post('/admin/user/role', {
            id,
            role
        })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const changeUserStatus = createAsyncThunk('admin/changeUserStatus', async ({id, status}) => {
    try {
        const {data} = await axios.post('/admin/user/status', {
            id,
            status
        })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const notificationCreating = createAsyncThunk('admin/notificationCreating', async({title, text}) => {
    try {
        const {data} = await axios.post('/admin/notification', {
            title,
            text
        })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const deletePosts = createAsyncThunk('admin/deletePosts', async ({postid, userid}) => {
    try {
        const {data} = await axios.delete(`/admin/post/delete`, {
            data: {
                postid,
                userid
            }
        })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
      logout: (state) => {
          state.admin = null
          state.token = null
          state.isLoading = false
          state.status = null
      }
  },
  extraReducers: {
        [loginAdmin.pending]: (state) => {
            state.isLoading = true
            state.status = null
            
        },
        [loginAdmin.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.admin = action.payload.admin
            state.token = action.payload.token
        },
        [loginAdmin.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        [getAdmin.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getAdmin.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.admin = action.payload?.admin
            state.token = action.payload?.token
        },
        [getAdmin.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        [getDashStats.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getDashStats.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.stats = action.payload
        },
        [getDashStats.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        [deleteUsers.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [deleteUsers.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.stats.user = state.stats.user.filter(x => x._id !== action.payload.user._id)
        },
        [deleteUsers.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        [changeUserRole.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [changeUserRole.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.stats.user = action.payload.user
        },
        [changeUserRole.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        [changeUserStatus.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [changeUserStatus.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.status = action.payload.message
            state.stats.user = action.payload.user
        },
        [changeUserStatus.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        [deleteUsers.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [deleteUsers.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            // state.stats.post = state.stats.post.filter(x => x._id !== action.payload.post._id)
        },
        [deleteUsers.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    }
})

export const isAdminHere = (state) => Boolean(state.admin.token)

export const {logout} = adminSlice.actions

export default adminSlice.reducer
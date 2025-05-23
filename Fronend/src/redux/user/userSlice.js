import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios.js";
import {API_ROOT} from "~/utils/constants.js";
import {toast} from "react-toastify";

const initialState = {
    currentUser: null
}

export const logoutUserAPI = createAsyncThunk(
    'user/logoutUserAPI',
    async (showSuccessMessage = true) => {
        const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
        if (showSuccessMessage) {
            toast.success('Logged out successfully!')
        }
        return response.data
    }
)

export const loginUserAPI = createAsyncThunk(
    'user/loginUserAPI',
    async (data) => {
        const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
        return response.data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUserAPI.fulfilled, (state, action) => {
            const user = action.payload
            state.currentUser = user
        })
    }
})

export const selectCurrentUser = (state) => {
    return state.user.currentUser
}

export const userReducer = userSlice.reducer
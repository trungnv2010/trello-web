import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios.js";
import {API_ROOT} from "~/utils/constants.js";

const initialState = {
    currentNotification: null
}

export const fetchInvitationsAPI = createAsyncThunk(
    'notifications/fetchInvitationsAPI',
    async () => {
        const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`)
        return response.data
    }
)

export const updateBoardInvitationAPI = createAsyncThunk(
    'notification/updateBoardInvitationAPI',
    async ({status, invitationId}) => {
        const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, {status})
        return response.data
    }
)


export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        clearCurrentNotification: (state) => {
            state.currentNotification = null
        },
        updateCurrentNotification: (state, action) => {
            state.currentNotification = action.payload
        },
        addNotification: (state, action) => {
            const incomingInvitation = action.payload
            state.currentNotification.unshift(incomingInvitation)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
            let incomingInvitations = action.payload
            state.currentNotification = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
        })
        builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
            const incomingInvitation = action.payload
            const getInvitation = state.currentNotification.find(i => i._id === incomingInvitation._id)
            getInvitation.boardInvitation = incomingInvitation.boardInvitation
        })
    }
})


export const {
    clearCurrentNotification,
    updateCurrentNotification,
    addNotification
} = notificationsSlice.actions


export const selectCurrentNotifications = state => {
    return state.notifications.currentNotification
}


export const notificationsReducer = notificationsSlice.reducer
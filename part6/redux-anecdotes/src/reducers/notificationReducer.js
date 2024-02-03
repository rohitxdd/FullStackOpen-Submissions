import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: "test",
    reducers: {
        notify: (state, action) => {
            return action.payload
        },
        removeNotification: () => {
            return ""
        }
    }
})

export const { notify, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer
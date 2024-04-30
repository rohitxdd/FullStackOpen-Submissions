import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: localStorage.getItem("username")
}

const userReducer = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem("username", action.payload.username)
            return { ...state, username: action.payload.username }
        },
        reset: () => {
            localStorage.setItem("username", null)
            return initialState
        }
    }
})
export const { setUser, reset } = userReducer.actions

export default userReducer.reducer
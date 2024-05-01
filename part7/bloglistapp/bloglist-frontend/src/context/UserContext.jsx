import { createContext, useContext, useReducer } from "react";

const initialState = {
    username: ""
}

const UserContext = createContext({ ...initialState, username: localStorage.getItem("username") });

export const useUser = () => useContext(UserContext)

const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            localStorage.setItem("username", action.payload.username)
            return { ...state, username: action.payload.username }
        default:
            return state
    }
}

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    const setUser = (user) => {
        dispatch({ type: "SET_USER", payload: { username: user } })
    }

    return (
        <UserContext.Provider value={{ state, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
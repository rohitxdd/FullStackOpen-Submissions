import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

const initialState = ""

export const useNotification = () => useContext(NotificationContext)

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "NOTIFY":
            return action.payload
        case "REMOVE":
            return initialState
        default:
            return state
    }
}

export const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState)

    const setNotification = (notification, time = 1000) => {
        dispatch({ type: "NOTIFY", payload: notification })
        setTimeout(() => {
            dispatch({ type: "REMOVE" })
        }, time)
    }
    return (
        <NotificationContext.Provider value={{ state, setNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}
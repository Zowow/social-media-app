import {React, useReducer, createContext} from 'react'

export const UserContext = createContext();

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_PROFILE':
            return {userProfile: action.payload}
        case 'UPDATE_PROFILE':
            return {userProfile: action.payload};
        default:
            return state;
    }
}

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, {
        userProfile: null
    })

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}
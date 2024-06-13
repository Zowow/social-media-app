import {React, useReducer, createContext, useEffect} from 'react'

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {authUser: action.payload};
        case 'LOGOUT':
            return {authUser: null};
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer (authReducer, {
        authUser: null
    })

    useEffect(()=> {
        const authUser = JSON.parse(localStorage.getItem('authUser'))
        if(authUser){
            dispatch({type: "LOGIN", payload: authUser})
        }
    },[])

    console.log('AuthContext State:', state)

    return (
         <AuthContext.Provider value={{...state, dispatch}}>
            {children}
         </AuthContext.Provider>
    )
}
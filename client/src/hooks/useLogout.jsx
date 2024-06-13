import React from 'react'
import { useAuthContext } from './useContexts/useAuthContext'

export const useLogout = () => {
    const {authUser, dispatch} = useAuthContext();

    const logout = async () => {
        if(authUser){
            const response = await fetch("/api/auth/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if(response.ok){
                localStorage.removeItem('authUser');
                dispatch({type: 'LOGOUT'})
            }
        }
    }
    return ({logout})
}

import React, { useState } from 'react'
import { useAuthContext } from './useContexts/useAuthContext'

export const useSignup = () => {
    const {dispatch} = useAuthContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (inputs) => {
            setError(null)
            setIsLoading(true)

            const response = await fetch("/api/auth/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...inputs})
            })

            const userData = await response.json();

            if(!response.ok){
                setError(userData.message)
                setIsLoading(false)
            }

            if(response.ok){
                localStorage.setItem('authUser', JSON.stringify(userData))
                dispatch({type: 'LOGIN', payload: userData})
            }
    }
    
    return ({signup, isLoading, error})
}

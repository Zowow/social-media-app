import {useState} from 'react'
import { useAuthContext } from './useContexts/useAuthContext'

export const useLogin = () => {
    const {dispatch} = useAuthContext();
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })

        const userData = await response.json();

        if(!response.ok){
            setError(userData.message)
            setIsLoading(false)
            console.log(userData.message)
        }

        if(response.ok){
            localStorage.setItem('authUser', JSON.stringify(userData))
            dispatch({type: 'LOGIN', payload: userData})
        }
    }

    return {login, isLoading, error}
}

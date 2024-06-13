import { useState } from "react";

export const useFollowUnfollow = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const followUnfollowUser = async (id) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`api/user/${id}`)
        const userData = await response.json();

        if(!response.ok){
            setError(userData.message)
            setIsLoading(false)
            console.log(userData.message)
        }
    }

    return {followUnfollowUser, isLoading, error}
} 
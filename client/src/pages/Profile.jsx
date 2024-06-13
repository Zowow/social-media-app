import React, { useLayoutEffect, useState } from 'react'

import Navbar from '../components/navbar/Navbar'
import ProfileInfo from '../components/profile/ProfileInfo'
import CreatePost from "../components/posts/CreatePost"
import Post from '../components/posts/Post'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Profile = () => {
  const {username} = useParams()
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await fetch(`/api/user/profile/${username}`)
        const userData = await response.json();
        
        setUserProfile(userData)
      } catch (error) {
        console.log(error)
      }
    }

    getUserProfile()
  }, [username])

  if(!userProfile) return null
  
  return (
    <>
        <Navbar/>
        <ProfileInfo userProfile={userProfile}/>
        <div className='w-[90%] md:w-[80%] lg:w-[60%] 2xl:w-[50%] mx-auto md:mt-4'>
          <CreatePost/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </div>
    </>
  )
}

export default Profile
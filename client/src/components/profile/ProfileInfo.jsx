import React, { useState } from 'react'
// import { useFollowUnfollow } from '../../hooks/useFollowUnfollow';
import { useAuthContext } from '../../hooks/useContexts/useAuthContext'
import { Link } from 'react-router-dom'

import ModalEditCoverPhoto from './ModalEditCoverPhoto'

const ProfileInfo = ({userProfile}) => {
    const {authUser} = useAuthContext()
    const [following, setFollowing] = useState(userProfile.followers.includes(authUser._id))

    const [lockBody, setLockBody] = useState(false)
    const [modalCoverPhoto, setModalCoverPhoto] = useState(false)

    lockBody ? document.body.style.overflow ="hidden":document.body.style.overflow = "auto";

    const isAuthUser = authUser.username === userProfile.username


    const followUnfollowUser = async () => {
        try {
            await fetch(`api/user/follow/${userProfile._id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if(following) {
                userProfile.followers.pop()
            }else{
                userProfile.followers.push(authUser._id)
            }
            setFollowing(!following)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditCoverPhoto = (e) => {
        setLockBody(!lockBody)
        setModalCoverPhoto(!modalCoverPhoto)
    }

    return (
        <>
            {isAuthUser && modalCoverPhoto ? <ModalEditCoverPhoto modal={{handleEditCoverPhoto}}/> : ""}
            <div className='bg-white h-[300px] md:h-[350px] lg:h-[450px] sm:w-full lg:w-[70%] mx-auto lg:mt-8 mb-10 lg:rounded-[15px] relative'>
                <img src={authUser.coverPic} alt="" className='cover w-full h-full lg:rounded-[15px] object-cover'/>
                {isAuthUser ? <button className='absolute right-6 bottom-6 p-3 bg-slate-600 rounded-md text-white' onClick={handleEditCoverPhoto}>Edit Photo</button>: ""}
                <div className="absolute -bottom-6 left-6 md:-bottom-8 md:left-8  w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-[20px]  md:rounded-[40px] bg-white border-4 border-[#F2F2F2] ">
                    <img src={userProfile.profilePic} alt="Profile Photo" className='w-full h-full flex justify-center rounded-[17px]' />
                </div>
            </div>
            <div className=' min-h-[150px] md:w-[90%] lg:w-[70%] mx-auto rounded-[15px]'>
                <div className='h-full flex justify-between flex-wrap'>
                    <div className='p-4 lg:p-2 flex flex-col gap-1 flex-grow' >
                        <div className='flex gap-4'>
                            <p className='text-[20px] font-bold'>{userProfile.firstName} {userProfile.lastName}</p> 
                            {!isAuthUser
                                ?
                                <div className='flex gap-1'>
                                    {following ? <p className='bg-white px-4 py-1 rounded-md text-gray-400'>Following</p> : ""}
                                    <button className='px-4 py-1 bg-[green] text-white rounded-md' onClick={followUnfollowUser}>{following ? 'Unfollow': 'Follow'}</button>
                                </div>
                                :
                                <Link to="/update" className='bg-slate-600 px-4 py-1 rounded-md text-white'>Edit Profile</Link>
                            }
                        </div>
                        <p>( {userProfile.username} )</p>
                        <p className='max-w-[450px]'>{userProfile.bio}</p>
                    </div>
                    <div className='flex gap-2 p-2 flex-1 min-w-[300px]'>
                        <div className='basis-1/3 flex flex-col justify-center'>
                            <p className='flex flex-col text-center py-4 rounded-md font-semibold bg-white'>{userProfile.posts.length} <span>Posts</span></p>
                       </div>
                        <div className='basis-1/3 flex flex-col justify-center'>
                            <p className='flex flex-col text-center py-4 rounded-md font-semibold bg-white'>{userProfile.followers.length} <span>Followers</span></p>
                        </div>
                        <div className='basis-1/3 flex flex-col justify-center'>
                            <p className='flex flex-col text-center py-4 rounded-md font-semibold bg-white'>{userProfile.following.length} <span>Following</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileInfo
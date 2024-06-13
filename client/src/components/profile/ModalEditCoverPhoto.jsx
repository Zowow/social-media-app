import React, { useRef } from 'react'
import { useAuthContext } from '../../hooks/useContexts/useAuthContext'
import { usePreviewImg } from '../../hooks/usePreviewImg';

const ModalEditCoverPhoto = ({modal}) => {
    const {authUser} = useAuthContext();
    const {handleCoverImageChange, coverImgUrl} = usePreviewImg();

    const coverRef = useRef()

    const handleCoverImgSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`/api/user/update/${authUser._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({coverPic: coverImgUrl})
        })

        const userData = await response.json()

        console.log(userData)


        if(!response.ok){
            setError(userData.message)
            setIsLoading(false)
        }

        if(response.ok){
            localStorage.setItem("authUser", JSON.stringify(userData))
            
        }

    }

    console.log(authUser)
    return (
        <div className='modal-container fixed left-0 top-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50'>
            <div className='bg-white rounded-md p-8 w-[30em]'>
                <button className='p-2 bg-slate-600 float-right rounded-md text-white' onClick={modal.handleEditCoverPhoto}>x</button>
                <form className='flex flex-col gap-1' onSubmit={handleCoverImgSubmit}>
                    <img src={coverImgUrl || authUser.coverPic} alt="Cover Photo" className='w-[500px] h-[400px]' />
                    <button onClick={(e) => coverRef.current.click() } className="bg-slate-600  p-2 rounded-md text-white" >Change Cover Photo</button>
                    <input type="file" hidden ref={coverRef} onChange={handleCoverImageChange} />
                    <input type="submit" className='bg-slate-600  p-2 rounded-md text-white'/>
                </form>
            </div>
        </div>
    )
}

export default ModalEditCoverPhoto
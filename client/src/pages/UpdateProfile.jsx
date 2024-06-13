import { useAuthContext } from "../hooks/useContexts/useAuthContext"
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {usePreviewImg} from "../hooks/usePreviewImg";

import { IoMdArrowRoundBack } from "react-icons/io";


const UpdateProfile = () => {
    const {authUser} = useAuthContext();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();

    const imageRef = useRef(null)

    const {handleImageChange, imgUrl, handleCoverImageChange, coverImgUrl} = usePreviewImg()

    const [inputs, setInputs] = useState({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value})
        console.log({...inputs})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/user/update/${authUser._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...inputs, profilePic: imgUrl})
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


    return (
        <div className="relative">
        <Link to={-1} className="absolute top-8 right-8 p-2 bg-slate-400 rounded-md font-bold text-center text-white"><IoMdArrowRoundBack /></Link>
        <div className="h-screen flex flex-col items-center justify-around ">
            <form className='flex flex-col items-center gap-4 min-w-[320px] text-white bg-slate-400 rounded-md p-8' onSubmit={handleSubmit}>
                <h1 className='text-center text-[32px] font-semibold'>Update your Profile</h1>
                <p className='text-center'>Enter your details below and click submit to update your profile</p>
                <div className="flex items-center flex-wrap gap-4">
                    <img src={imgUrl || authUser.profilePic} alt=""  className="rounded-full w-32 h-32"/>
                    <div>
                        <button onClick={() => imageRef.current.click()} className="bg-slate-600 w-full p-2 rounded-md" >Change Avatar</button>
                        <input type="file" hidden ref={imageRef} onChange={handleImageChange}/>
                    </div>
                </div>
                <div className="flex items-center flex-wrap">
                    <label className="w-32">First Name</label>
                    <input 
                        className='rounded-md px-4 py-2 text-black'
                        type="text"
                        value={inputs.firstName}
                        name="firstName"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center flex-wrap">
                    <label className="w-32">Last Name</label>
                    <input 
                        className='rounded-md px-4 py-2 text-black'
                        type="text"
                        value={inputs.lastName}
                        name="lastName"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center flex-wrap">
                    <label className="w-32">Username</label>
                    <input 
                        className='rounded-md px-4 py-2 text-black'
                        type="text"
                        value={inputs.username}
                        name="username"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center flex-wrap">
                    <label className="w-32">Email</label>
                    <input 
                        className='rounded-md px-4 py-2 text-black'
                        type="email"
                        value={inputs.email}
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center flex-wrap">
                    <label className="w-32">Bio</label>
                    <textarea 
                        className='rounded-md px-4 py-2 text-black w-52 h-52 resize-none overflow-hidden'
                        value={inputs.bio}
                        name="bio"
                        onChange={handleChange}
                    />
                </div>
                <input 
                    className='bg-slate-600 rounded-md py-2 text-white cursor-pointer w-32'
                    type="submit"
                    disabled={isLoading} 
                />
                <p>{error}</p>
            </form>
        </div>
        </div>
    )
}

export default UpdateProfile
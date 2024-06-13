import { Link, json } from "react-router-dom";
import { useAuthContext } from "../../hooks/useContexts/useAuthContext";
import { LuImagePlus } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { usePreviewImg } from "../../hooks/usePreviewImg";

function CreatePost() {
    const {authUser} = useAuthContext();
    const {handleImageChange, imgUrl, setImgUrl} = usePreviewImg()
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();

    const [description, setDescription] = useState();

    const mediaRef = useRef()


    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const response = await fetch("api/post/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({description, postedBy: authUser._id, media: imgUrl })
        })

        const userData = await response.json()

        console.log(userData)

        if(!response.ok){
            setError(userData.message)
            setIsLoading(false)
            console.log(userData.message)
        }

    }

    const handleRemoveImg = () => {
        setImgUrl(null)
    }


    return ( 
        <div className="p-4 bg-white rounded-[15px] flex flex-col gap-4 mb-4">
            <div className="flex gap-4">
            <Link 
                to="/"
                className="nav--social_home h-[50px] min-w-[50px] rounded-[20px] text-[#141e46] bg-[#EEF2FB] "
            >
            <img src={authUser.profilePic} alt="Profile Photo" className="w-full h-full rounded-[20px]"/>
            </Link>
            <form className="w-full flex gap-2" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-2">
                    <textarea 
                        className="resize-none w-full min-h-[100px] border-none outline-none shadow-none p-2"
                        placeholder="What are you thinking?..."
                        value={description}
                        onChange={((e) => {setDescription(e.target.value)})}
                    >
                    </textarea>
                    <button type="button" onClick={() => mediaRef.current.click()} className="h-8 w-8 flex justify-center items-center rounded-full bg-gray-200 text-slate-400"><LuImagePlus size={16}/></button>
                    <input type="file" hidden ref={mediaRef} onChange={handleImageChange}/>
                </div>
                <input 
                    type="submit" 
                    value="Share"
                    className=" self-end bg-[#41B06E] h-[35px] w-[90px] text-white rounded-[5px] cursor-pointer"
                />
            </form>
            </div>
            {imgUrl && 
                <div className="w-48 h-48 relative border">
                    <img src={imgUrl} alt="media" className=" object-cover" />
                    <button className="py-0.25 px-2 absolute bg-slate-600 text-white right-2 top-2 rounded-sm" onClick={handleRemoveImg}>x</button>
                </div>
            }
        </div>
     );
}

export default CreatePost;
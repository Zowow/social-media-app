import React, { useState } from 'react'

export const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState(null);
    const [coverImgUrl, setCoverImgUrl] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file && file.type.startsWith("image/")){
            const reader = new FileReader();

            reader.onload = () => {
                setImgUrl(reader.result)
            }

            reader.readAsDataURL(file)
        }else{
            setImgUrl(null)
            console.log(imgUrl)
        }
    }
    
    const handleCoverImageChange = (e) => {
        const file2 = e.target.files[0];
        if(file2 && file2.type.startsWith("image/")){
            const reader2 = new FileReader();

            reader2.onload = () => {
                setCoverImgUrl(reader2.result)
            }

            reader2.readAsDataURL(file2)
            console.log(coverImgUrl)
        }else{
            setCoverImgUrl(null)
            console.log(coverImgUrl)
        }
    } 
    return {handleImageChange, imgUrl, setImgUrl, handleCoverImageChange, coverImgUrl}
}

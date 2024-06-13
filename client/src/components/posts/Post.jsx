import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiSmileyFill } from "react-icons/pi";
import { IoMdImage } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaShareSquare } from "react-icons/fa";


function Post() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return ( 
        <div className="w-full bg-white rounded-[15px] flex flex-col text-sm mb-4">
            <div className="relative h-[50px] flex items-center justify-end ">
                <div className="absolute top-[20px] left-[20px] bg-gradient-to-r from-cyan-500 to-blue-500 p-[2px] rounded-[22px] h-[50px] w-[50px] shadow-md z-10">
                <Link 
                    to="/"
                    className="nav--social_home h-full w-full flex justify-center items-center rounded-[20px] text-[#141e46] bg-[#EEF2FB]"
                >
                {/* Profile Image Here */}
                </Link>
                </div>
                <HiDotsHorizontal className="text-[#D9D9D9] mr-[20px]" size="30"/>
            </div>
            <div className="grid grid-cols-3 gap-1">
                <div className="img1 col-span-2 bg-[#D9D9D9] h-[316px] w-full"></div>
                <div className="img2 bg-[#D9D9D9] h-[316px] w-full"></div>
            </div>
            <div className="description p-4 leading-tight ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed magna mi, volutpat commodo laoreet finibus, gravida quis sapien. Etiam eget feugiat tortor. Proin est orci, lobortis eget lacus sit amet, congue euismod lacus.</div>
            <hr className="mx-[20px] py-2"/>
            <div className="flex px-4 pb-4">
                <form className="w-full comment flex gap-2 mr-2" onSubmit={handleSubmit}>
                    <div className="h-[35px] min-w-[35px] rounded-[15px]  bg-[#EEF2FB]  "></div>
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="h-[50px] w-full outline-none shadow-none resize-none bg-[#F2F2F2] py-2 pr-16 pl-4 rounded-[5px] "
                            placeholder="Add a comment..."
                            contentEditable="true"
                        />
                        <div className="flex absolute right-2 top-[25%]">
                            <PiSmileyFill className="text-[#979797] cursor-pointer" size="25" />
                            <IoMdImage className="text-[#979797] cursor-pointer" size="25" />
                        </div>
                        <button type="submit" className="none"></button>
                    </div>
                </form>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1"><FaHeart className="text-[#141e46] cursor-pointer" size="20"/><span>60</span></div>
                    <div className="flex items-center gap-1"><BiSolidCommentDetail className="text-[#141e46] cursor-pointer"  size="20"/><span>60</span></div>
                    <div className="flex items-center gap-1"><FaShareSquare className="text-[#141e46] cursor-pointer" size="20"/><span>60</span></div>
                </div>
            </div>

        </div>
     );
}

export default Post; 
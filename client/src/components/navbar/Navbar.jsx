import {Link} from "react-router-dom"
import { IoMdHome } from "react-icons/io";
import { FaUserFriends, FaHeart, FaSearch  } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";

// Logo
import logo from "../../assets/svgs/logo.svg"

// hooks
import { useLogout } from "../../hooks/useLogout";

import { useAuthContext } from "../../hooks/useContexts/useAuthContext";

function Navbar() {
    const {logout} = useLogout();
    const {authUser} = useAuthContext();

    return (
        <div className="nav flex justify-evenly items-center h-[75px] shadow-md bg-white">
            <div className="nav--logo">
                <img src="https://cdn-icons-png.flaticon.com/512/8443/8443294.png" alt="logo" className="w-12"/>
            </div>
            <div className="nav--social flex gap-1">
               <Link 
                    to="/"
                    className="nav--social_home h-[40px] w-[40px] flex justify-center items-center rounded-[15px] text-[#141e46] hover:bg-[#141e46] hover:text-white
                    transition duration-200 ease-out hover:ease-in"
                >
                <IoMdHome size="22px"/>
                </Link>
                <Link 
                    to="/"
                    className="nav--social_friend h-[40px] w-[40px] flex justify-center items-center rounded-[15px] text-[#141e46] hover:bg-[#141e46] hover:text-white
                    transition duration-200 ease-out hover:ease-in"
                >
                <FaUserFriends size="22px"/>
                </Link>
                <Link 
                    to="/"
                    className="nav--social_favorite h-[40px] w-[40px] flex justify-center items-center rounded-[15px] text-[#141e46] hover:bg-[#141e46] hover:text-white
                    transition duration-200 ease-out hover:ease-in"
                >
                <FaHeart size="22px"/>
                </Link>
            </div>
            <div className="nav--search">
                <form className="">
                    <div className="relative">
                        <input 
                            type="text" 
                            className="bg-[#EEF2FB] relative h-[40px] w-[300px] p-2 rounded-[5px] text-[12px]"
                            placeholder="Search for a friend..."
                        />
                        <FaSearch className="absolute right-[5%] top-[25%]"/>
                    </div>
                </form>
            </div>
            <div className="nav--profile flex justify-center items-center gap-2">
                <Link 
                    to="/"
                    className="nav--social_home h-[40px] w-[40px] flex justify-center items-center rounded-[15px] text-[#141e46] bg-[#EEF2FB] "
                >
                <AiFillMessage  className="" size="22px"/>
                </Link>
                <Link 
                    to="/"
                    className="nav--social_home h-[40px] w-[40px] flex justify-center items-center rounded-[15px] text-[#141e46] bg-[#EEF2FB]"
                    onClick={logout}
                >
                <IoNotifications  className="" size="22px"/>
                </Link>
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-[2px] rounded-[22px] ">
                    <Link 
                        to={`/${authUser.username}`}
                        className="nav--social_home h-[50px] w-[50px] flex justify-center items-center rounded-[20px] text-[#141e46] bg-white "
                    >
                    <img src={authUser.profilePic} alt="profile picture" className="h-[48px] w-[48px] flex justify-center items-center rounded-[19px]"/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
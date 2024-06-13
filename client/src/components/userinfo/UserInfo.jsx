import { Link } from "react-router-dom";

import { useAuthContext } from "../../hooks/useContexts/useAuthContext";

function UserInfo() {
    const {authUser} = useAuthContext();

    return ( 
        <div className="bg-white w-full max-h-[350px] min-w-[220px] rounded-[15px] p-4 relative">
            <div className="cover w-full h-[180px] rounded-[5px] bg-white ">
            <img src={authUser.coverPic} alt="Cover Photo" className="h-full w-full object-cover rounded-[5px]"/>
            </div>
            <div className="absolute top-[45%] left-[20%] md:left-[15%] xl:left-[10%] bg-gradient-to-r from-cyan-500 to-blue-500 p-[2px] h-[70px] w-[70px] rounded-[5px] drop-shadow-md">
                <Link 
                    to={`/${authUser.username}`}
                    className="profilePic flex justify-center items-center  h-full w-full rounded-[3px] bg-white"
                >
                <img src={authUser.profilePic} alt="profile picture" className="w-full h-full flex justify-center items-center rounded-[3px]"/>
                </Link>
            </div>
            <div className="follow flex justify-evenly items-center py-[40px]">
                <div className="follower flex flex-col items-center ">
                    <div className="font-bold text-xl">{authUser.followers.length}</div>
                    <div className=" text-[#828282]">Followers</div>
                </div>
                <div className="following flex flex-col items-center">
                    <div className="font-bold text-xl">{authUser.following.length}</div>
                    <div className=" text-[#828282]">Following</div>
                </div>
            </div>
        </div>
     );
}

export default UserInfo;
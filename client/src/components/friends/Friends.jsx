import { HiDotsHorizontal } from "react-icons/hi";

function Profile() {
    return ( 
        <div className="friends min-h-[400px] max-h-[800px] bg-white rounded-[15px] w-full flex flex-col grow">
            <div className="flex justify-between items-center p-[10px]">
                <div>Friends</div>
                <HiDotsHorizontal size="20px" className="cursor-pointer"/>
            </div>
            <hr className="mx-[10px]"/>
            <div className="friends--list">
                <div className="friend--list_item flex gap-4 items-center px-4 py-2">
                    {/* <img src="*https://cdn-icons-png.flaticon.com/512/8983/8983108.png}"  
                    className="h-[35px] w-[35px] rounded-[15px] border-[1.5px] border-slate-900"
                    alt="friend's profile picture"
                    /> */}
                    <div className="h-[35px] min-w-[35px] rounded-[15px] border-[1.5px] border-slate-900 bg-slate-500"></div>
                    <div className="friend-name">Abdul Jabbar</div>
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/14035/14035769.png" 
                        className="h-[8px]"
                        alt="online icon" 
                    />
                </div>
                <div className="friend--list_item flex gap-4 items-center px-4 py-2">
                    {/* <img src="*https://cdn-icons-png.flaticon.com/512/8983/8983108.png}"  
                    className="h-[35px] w-[35px] rounded-[15px] border-[1.5px] border-slate-900"
                    alt="friend's profile picture"
                    /> */}
                    <div className="h-[35px] min-w-[35px] rounded-[15px] border-[1.5px] border-slate-900 bg-slate-500"></div>
                    <div className="friend-name">Abdul Jabbar</div>
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/14035/14035769.png" 
                        className="h-[8px]"
                        alt="online icon" 
                    />
                </div>
                <div className="friend--list_item flex gap-4 items-center px-4 py-2">
                    {/* <img src="*https://cdn-icons-png.flaticon.com/512/8983/8983108.png}"  
                    className="h-[35px] w-[35px] rounded-[15px] border-[1.5px] border-slate-900"
                    alt="friend's profile picture"
                    /> */}
                    <div className="h-[35px] min-w-[35px] rounded-[15px] border-[1.5px] border-slate-900 bg-slate-500"></div>
                    <div className="friend-name">Abdul Jabbar</div>
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/14035/14035769.png" 
                        className="h-[8px]"
                        alt="online icon" 
                    />
                </div>
            </div>
        </div>
     );
}

export default Profile;

{/*https://cdn-icons-png.flaticon.com/512/8983/8983108.png*/}
import Navbar from "../components/navbar/Navbar";
import Friends from "../components/friends/Friends";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import UserInfo from "../components/userinfo/UserInfo";


function Home() {

    return ( 
        <>
            <Navbar/>
            <div className="grid lg:grid-cols-home md:grid-cols-3 grid-flow-* gap-4 p-[40px]">
                <div className="justify-center w-full hidden lg:flex">
                    <Friends/>
                </div>
                <div className="col-span-2 justify-self-center flex flex-col w-full max-w-[700px]">
                    <CreatePost/>
                    <Post/>
                    <Post/>
                </div>
                <div className="justify-center w-full hidden md:flex ">
                    <UserInfo/>
                </div>
            </div>
        </>
     );
}

export default Home;

{/* <div className="flex justify-evenly items-around gap-[40px] p-[40px]">
    <div className="flex justify-center border-2 border-slate-400 grow p-[20px]">
        <Friends/>
    </div>
    <div className="border-2 border-slate-400 grow-[2] p-[20px]">
        <Posting/>
    </div>
    <div className="border-2 border-slate-400 grow min-w-[200px] max-w-[400px]"></div>
</div> */}
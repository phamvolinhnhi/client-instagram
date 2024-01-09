import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isFollowing } from "../../Config/Logics";
import { followUserAction, unfollowUserAction } from "../../Redux/User/Action";

const ProfileUserDetails = ({user, isreqUser}) => {
    const {post} = useSelector((store)=>store);
    const {reqUser} = useSelector((store)=>store.user);
    const [isFollowed, setIsFollowed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    const data = {
        jwt: token,
        userId: user?.id
    }

    const handleFollowUser = () => {
        setIsFollowed(true);
        dispatch(followUserAction(data))
    }
    
    const handleUnFollowUser = () => {
        setIsFollowed(false);
        dispatch(unfollowUserAction(data));
    }

    useEffect(()=> {
        setIsFollowed(isFollowing(reqUser, user))
    },[user])
    
    return (
        <div className="py-10 w-full">
            <div className="flex items-center">
                <div className="w-[15%]">
                    <img className="w-32 h-32 rounded-full" src={user?.image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'} alt=""></img>
                </div>
                <div className="space-y-5">
                    <div className="flex space-x-10 items-center" >
                        <p>{user?.username}</p>
                        {
                            isreqUser ? 
                            <div className="flex">
                                <p onClick={()=>navigate('/account/edit')} className="bg-black text-white py-1 px-4 rounded-md cursor-pointer mr-1.5 text-sm">Edit Profile</p>
                            </div>
                            : isFollowed ? 
                            <p onClick={handleUnFollowUser} className="bg-black text-white py-1 px-4 rounded-md cursor-pointer text-sm">Following</p>
                            : <p onClick={handleFollowUser} className="bg-black text-white py-1 px-4 rounded-md cursor-pointer text-sm">Follow</p>
                        
                        }
                    </div>
                    <div className="flex space-x-10" >
                        <div>
                            <span className="font-semibold mr-2">{post.profilePost?.length}</span>
                            <span>post</span>
                        </div>
                        <div>
                            <span className="font-semibold mr-2">{user?.follower.length}</span>
                            <span>follower</span>
                        </div>
                        <div>
                            <span className="font-semibold mr-2">{user?.following.length}</span>
                            <span>following</span>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold" style={{textAlign: "left"}}>{user?.name}</p>
                        <p className="font-thin text-sm">{user?.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileUserDetails

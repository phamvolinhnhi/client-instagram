import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../Redux/Auth/Action";
import SuggestionCard from "./SuggestionCard";
const HomeRight = () => {
    const {user} = useSelector((store)=>store);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    
    const handleLogout = () => {
        dispatch(logoutAction())
        navigate('/login')
    };

    return (
        <div className="text-sm">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                        <img 
                            className="w-12 h-12 rounded-full"
                            src={user.reqUser?.image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'}
                            alt=""
                        />
                    <div className="ml-3 text-left">
                        <p className="font-semibold">{user.reqUser?.name}</p>
                        <p className="opacity-70">{user.reqUser?.username}</p>
                    </div>
                </div>
                <div className="">
                    <button onClick={handleLogout} className="text-blue-500 font-semibold">Switch</button>
                </div>
            </div>
            <div className="space-y-5 mt-10">
                {user.popularUser.map((item)=><SuggestionCard user={item}/>)}
            </div>
        </div>
    )
}
export default HomeRight
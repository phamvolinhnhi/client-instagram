import React from "react";
import { useNavigate } from "react-router-dom";

const StoryCircle = ({user}) => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/story/${user.id}`)
    }
    return (
        <div onClick={handleNavigate} className="text-sm font-thin cursor-pointer flex flex-col items-center mr-2.5">
            <img className="w-14 h-14 mb-2 rounded-full" 
            src={user?.image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'} alt=""></img>
            <p>{user.username}</p>
        </div>
    )
}
export default StoryCircle
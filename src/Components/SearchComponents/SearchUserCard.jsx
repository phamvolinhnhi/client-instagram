import React from "react";
import { useNavigate } from "react-router-dom";

const SearchUserCard = ({user}) => {
    const navigate = useNavigate();

    return (
        <div onClick={()=>navigate(`/${user.username}`)} className="py-2 cursor-pointer flex items-center justify-center py-2 group cursor-pointer text-sm">
            <img className="h-14 w-14 rounded-full"
                src={user?.image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'}
                alt=""/>
            <div className="pl-5 w-[80%] text-left">
                <p className="font-semibold">{user?.username}</p>
                <p className="opacity-70">{user?.name}</p>
            </div>      
        </div>
    )
}
export default SearchUserCard
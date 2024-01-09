import React from "react";

const SuggestionCard = ({user}) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <img 
                    className="w-9 h-9 rounded-full"
                    src={user?.image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'} 
                    alt=""/>
                <div className="ml-2">
                    <p className="text-sm font-semibold">{user.username}</p>
                    <p className="text-sm font-semibold opacity-70m">Popular</p>
                </div>
            </div>
            <p className="text-blue-700 text-sm font-semibold">Follow</p>
        </div>
    )
}
export default SuggestionCard
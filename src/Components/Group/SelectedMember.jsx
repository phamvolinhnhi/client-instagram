import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export const SelectedMember = ({handleRemoveMember, member}) => {
    return (
        <div className="flex items-center bg-slate-300 rounded-full">
            <img className="w-7 h-7 rounded-full" src={member.image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'} alt=""/>
            <p className="px-2">{member.username}</p>
            <AiOutlineClose onClick={()=>handleRemoveMember(member)} className="pr-1 cursor-pointer"/>
        </div>
    )
}
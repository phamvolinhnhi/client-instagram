import React, { useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { uploadToCloudnary } from "../../Config/UploadToCloudnary";
import { createGroupChatAction } from "../../Redux/Chat/Action";

export const NewGroup = ({groupMember, setIsGroup}) => {
    const token = localStorage.getItem('token');
    const {user} = useSelector((store)=>store)
    const [groupName, setGroupName] = useState();
    const [groupImage, setGroupImage] = useState("https://cdn.picpng.com/computer/computer-user-icon-peolpe-58180.png");
    const dispatch = useDispatch();

    const handleCreateGroup = () => {
        let userIds = [];
        for (let user of groupMember) {
            userIds.push(user.id)
        }
        userIds.push(user.reqUser?.id)
        const data = {
            data: {
                userIds,
                chat_name: groupName,
                chat_image: groupImage
            },
            token
        }
        console.log('data: ',data)
        dispatch(createGroupChatAction(data))
        setIsGroup(false)
    }

    async function handleChangeImage(event){
        const selectedFile = event.target.files[0];
        if(selectedFile){
            const tem = await uploadToCloudnary(selectedFile);
            console.log('file: ', tem)
            setGroupImage(tem)
        }
    }

    return (
        <div className="w-full h-full">
            <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
                <BsArrowLeft className="cursor-pointer text-2xl font-bold"/>
                <p className="text-xl font-semibold">New Group</p>
            </div>
            <div className="flex flex-col justify-center items-center my-12">
                <label htmlFor="imgInput" className="relative">
                    <img className="w-[200px] h-[200px] rounded-full" src={groupImage || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'} alt=""/>
                </label>
                <input type="file"
                    id="imgInput"
                    className="hidden"
                    onChange={(e)=>handleChangeImage(e)}
                    // value={''}
                />
            </div>
            <div className="w-full flex justify-between items-center py-2 px-5">
                <input className="w-full outline-none border-b-2 border-green-700 px-2 bg-transparent"
                    placeholder="Group name"
                    value={groupName}
                    type="text" 
                    onChange={(e)=>setGroupName(e.target.value)}
                    />
            </div>
            {groupName && <div className="py-10  flex items-center justify-center">
                <button onClick={handleCreateGroup}>
                    <div className="bg-[#0c977d] rounded-full p-4">
                        <BsCheck2 className="text-white font-bold text-3xl"/>
                    </div>
                </button>
                    
            </div>}
        </div>
    )
}
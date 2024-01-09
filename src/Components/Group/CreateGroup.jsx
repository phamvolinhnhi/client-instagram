import React, { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../Redux/User/Action";
import { ChatCard } from "../Chat/ChatCard";
import { NewGroup } from "./NewGroup";
import { SelectedMember } from "./SelectedMember";

export const CreateGroup = ({setIsGroup}) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const {user} = useSelector((store)=>store);
    const [newGroup, setNewGroup] = useState(false);
    const [groupMember, setGroupMember] = useState(new Set());
    const [query, setQuery] = useState('');
    const handleRemoveMember = (item) => {
        groupMember.delete(item);
        setGroupMember(groupMember);
    }
    const handleSearch = (key) => {
        const data = {
            query: key,
            jwt: token
        }
        dispatch(searchUserAction(data))
        // setIsGroup(false)
    }

    return (
        <div className="w-full h-full">
            {
                !newGroup && 
                <div>
                    <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
                        <BsArrowLeft className="cursor-pointer text-2xl font-bold"/>
                        <p className="text-xl font-semibold">Add Group Participants</p>
                    </div>
                    <div className="relative bg-white py-4 px-3">
                        <div className="flex space-x-2 flex-wrap">
                            {
                                groupMember.size > 0 && 
                                Array.from(groupMember).map((item)=><SelectedMember handleRemoveMember={handleRemoveMember} member={item}/>)
                            }
                        </div>
                        <input type="text" onChange={(e)=>{handleSearch(e.target.value); setQuery(e.target.value)}}
                            className="outline-none border-b border-[#8888] p-2 w-[93%]"
                            placeholder="Search user"
                            value={query}
                        />
                    </div>
                    <div className="bg-white overflow-y-scroll h-[50.2vh]">
                        { query && user.searchUser?.map((item)=>
                            <div onClick={()=>{
                                for (let user of groupMember) {
                                    if(user.id===item.id){
                                        setQuery('')
                                        return
                                    }
                                }
                                groupMember.add(item)
                                setGroupMember(new Set(groupMember));
                                setQuery('')
                            }}
                            key={item?.id}>
                                <ChatCard image={item?.image} name={item?.username}/>
                            </div>)}
                    </div>
                    <div className="bottom-10 py-10  flex items-center justify-center">
                        <div onClick={()=>{
                            setNewGroup(true)
                        }}
                        className="bg-green-600 rounded-full p-4 cursor-pointer">
                            <BsArrowRight className="text-white font-bold text-3xl"/>
                        </div>
                    </div>
                </div>
            }
            {newGroup && <NewGroup setIsGroup={setIsGroup} groupMember = {groupMember}/>}
        </div>
    )
}
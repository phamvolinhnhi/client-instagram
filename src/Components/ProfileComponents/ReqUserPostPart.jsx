import React, { useEffect, useState } from "react";
import { AiOutlineTable } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction } from "../../Redux/Post/Action";
import ReqUserPostCard from "./ReqUserPostCard";

const ReqUserPostPart = ({user, isreqUser}) => {
    const [activeTab,setActiveTab] = useState('Post');
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const {post} = useSelector((store)=>store);
    
    const tabs = isreqUser ? 
        [
            {
                tab: "Post",
                icon:<AiOutlineTable></AiOutlineTable>,
            },
            {
                tab:"Saved",
                icon:<BiBookmark/>
            },
            // {
            //     tab:"Tagged",
            //     icon:<AiOutlineUser></AiOutlineUser>
            // }
        ] :  [
            {
                tab: "Post",
                icon:<AiOutlineTable></AiOutlineTable>,
            }
        ];

    useEffect(() => {
        if(user){
            const data = {
                jwt: token,
                userId: user?.id,
            }
            dispatch(reqUserPostAction(data));                                                              
        }  
    },[user, post.createdPost])
        
    return (
        <div>
            <div className="flex border-t ralative space-x-14" >
                {tabs.map((item)=>
                <div onClick={()=>setActiveTab(item.tab)} className={`${activeTab===item.tab?"border-t border-black":"opacity-60"} flex items-center cursor-pointer py-2 text-sm`} style={{marginRight:"60px"}}>
                        <p>
                            {item.icon}
                        </p>
                        <p className="ml-1">
                            {item.tab}
                        </p>
                    </div>
                )}
            </div>
            <div>
                <div className="flex flex-wrap">
                    {activeTab==='Post' ? post.profilePost?.map((item)=><ReqUserPostCard post={item}/>)
                    : user?.savedPost.map((item) => <ReqUserPostCard post={item}/>)}
                </div>
            </div>
        </div>
    )
}
export default ReqUserPostPart
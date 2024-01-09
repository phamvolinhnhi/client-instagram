import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeRight from "../../Components/HomeRight/HomeRight";
import PostCard from "../../Components/Post/PostCard";
import CreateStoryModal from "../../Components/Story/CreateStoryModal";
import StoryCircle from "../../Components/Story/StoryCircle";
import { hasStory } from "../../Config/Logics";
import { findUserPostAction } from "../../Redux/Post/Action";
import { findUsersByUserIdsAction, getUserProfileAction } from "../../Redux/User/Action";


const HomePage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpenStory, onCloseStory, onOpenStory } = useDisclosure(); 
    const [userIds, setUserIds] = useState([]);
    const {user, post} = useSelector((store)=>store);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    sessionStorage.setItem("parent", "HomePage");

    useEffect(() => {
        dispatch(getUserProfileAction(token))
    }, [token])
    
    useEffect(() => {
        console.log('user.reqUser:', user.reqUser);
        const newIds = user.reqUser?.following?.map((user) => user.id) || [];
        console.log('newIds:', newIds);
        setUserIds([user.reqUser?.id, ...newIds]);
    }, [user.reqUser]);

    useEffect(()=>{
        const data = {
            jwt: token,
            userIds: userIds.join(','),
        }
        
        dispatch(findUserPostAction(data));
        dispatch(findUsersByUserIdsAction(data));
        console.log('posts: ', post.usersPost)
    },[userIds, post.createdPost]);
    

    const storyUser = hasStory(user.findByUserIds);

    const handleOpenCreateStory = () => {
        onOpen();
    }

    return (
        <div>
            <div className="mt-8 flex w-[100%] justify-center">
                <div className="w-[100%] max-w-screen-sm">
                    <div className="storyDiv flex rounded-md justify-start w-full">
                        <div onClick={handleOpenCreateStory} className="cursor-pointer flex flex-col items-center mr-2.5">
                            <div className="w-14 h-14 rounded-full border-4 border-zinc-700 ">
                                <img className="" 
                                src="/images/plus.png" alt=""></img>
                            </div>
                            <p>{user.username}</p>
                        </div>
                        {storyUser?.length > 0 && storyUser.map((item)=><StoryCircle user={item}/>)}
                    </div>
                    <div className="w-full mt-7 space-y-5">
                        {post.usersPost?.length > 0 && post.usersPost.map((item)=>(<PostCard post={item}/>))}
                    </div>
                </div>
                <div className="w-[18%]">
                    <HomeRight/>
                </div>
            </div>
            <CreateStoryModal onClose={onClose} isOpen={isOpen}/>
        </div>
    )
}
export default HomePage
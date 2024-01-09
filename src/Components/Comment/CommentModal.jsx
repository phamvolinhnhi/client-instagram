import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { timeDifference } from "../../Config/Logics";
import { createCommentAction } from '../../Redux/Comment/Action';
import { findPostByIdAction } from "../../Redux/Post/Action";
import CommentCard from "./CommentCard";
import "./CommentModal.css";

const CommentModal = ({ onClose, isOpen, isSaved, isDeleted, isPostLiked, handleDeletePost, handleEditPost, handlePostLike, handleSavePost, handlePostUnLike, handleUnSavePost}) => {
    const [commentContent, setCommentContent] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
    // const [isDeleted, setIsDeleted] = useState(false);

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const {postId} = useParams();
    const {post, comment, user} = useSelector((store)=>store);
    
    const handleClick = () => {
        setShowDropDown(!showDropDown);
    };

    const data = {
            jwt: token,
            postId,
        }

    useEffect(()=>{
        dispatch(findPostByIdAction(data))
        // if(post.singlePost){
        //     isPostLiked=isPostLikedByUser(post.singlePost, user.reqUser?.id)}
    },[comment?.createdComment, postId, isPostLiked])

    return (
        isDeleted ? <div></div>:
        <div>
            <Modal size={"6xl"} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalBody>
                        <div className="flex h-[90vh] ">
                            <div className="w-[65%] flex flex-col justify-center">
                                <img className="max-h-full w-full"
                                 src={post.singlePost?.image} alt=""/>
                            </div>
                            <div className="w-[35%] pl-7 relative">
                                <div className="flex justify-between items-center h-[7%]">
                                    <div className="flex items-center">
                                        <div>
                                            <img className="w-9 h-9 rounded-full"
                                            src={post.singlePost?.user?.image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'} alt=""/>
                                        </div>
                                        <div className="ml-2 font-semibold">
                                            <p>{post.singlePost?.user?.username}</p>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <BsThreeDots className="dots" onClick={handleClick}/>
                                        <div className="dropdown-content">
                                            {
                                                showDropDown && 
                                                <div className="shadow-slate-500 shadow-2xl bg-white text-black cursor-pointer w-max ">
                                                    <p onClick={handleDeletePost} className="px-4 py-2 hover:bg-gray-100">Delete</p>
                                                    <p onClick={handleEditPost} className="px-4 py-2 hover:bg-gray-100">Edit</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="overflow-y-scroll h-3/4">
                                    { post.singlePost?.caption && <div>
                                        <div className="flex items-center justify-between py-5">
                                            <div className="flex items-center">
                                                <div>
                                                    <img className="w-9 h-9 rounded-full"
                                                    src={post.singlePost?.user?.image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'} alt=""/>
                                                </div>
                                                <div className="ml-3">
                                                    <p>
                                                        <span className="font-semibold">{post.singlePost?.user?.username}</span>
                                                        <span className="ml-2">{post.singlePost?.caption}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                    <div className="">
                                        {post.singlePost?.comments?.map((item)=><CommentCard comment={item}/>)}
                                    </div>
                                </div>
                                
                                
                                <div className="absolute w-[90%] bottom-0">
                                    <hr/>
                                    <div className="flex justify-between items-center w-full py-2">
                                        <div className="flex items-center">
                                            {isPostLiked? <AiFillHeart style={{marginRight: "0.5rem"}} className="text-2xl hover:opacity-50 cursor-pointer text-red-500" onClick={handlePostUnLike}/> : <AiOutlineHeart style={{marginRight: "0.5rem"}} className="text-2xl hover:opacity-50 cursor-pointer" onClick={handlePostLike}/>}
                                            <FaRegComment style={{marginRight: "0.5rem"}} className="text-xl hover:opacity-50 cursor-pointer"/>
                                            {/* <RiSendPlaneLine style={{marginRight: "0.5rem"}} className="text-xl hover:opacity-50 cursor-pointer"/> */}
                                        </div>
                                        <div className="cursor-pointer">
                                            {isSaved? <BsBookmarkFill className="text-xl hover:opacity-50 cursor-pointer" onClick={handleUnSavePost}/> : <BsBookmark className="text-xl hover:opacity-50 cursor-pointer" onClick={handleSavePost}/>}
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        {
                                            post.singlePost?.likedByUsers?.length > 0 &&
                                            <p>{post.singlePost?.likedByUsers?.length} likes</p>
                                        }   
                                        <p className="opacity-50 text-sm">{timeDifference(post.singlePost?.createdAt)}</p>
                                    </div>  
                                    <div className="flex items-center ">
                                        <BsEmojiSmile/>
                                        <input className="commentInputs w-full" 
                                            type="text" placeholder="Add a comment..."
                                            onChange={(e)=>setCommentContent(e.target.value)}
                                            value={commentContent}
                                            onKeyPress={(e)=>{
                                                if(e.key === 'Enter' && commentContent.length > 0) {
                                                    const data = {
                                                        postId: postId, 
                                                        jwt: token, 
                                                        content: commentContent
                                                    };
                                                    console.log('DATA:', data);
                                                    dispatch(createCommentAction(data));
                                                    setCommentContent('');
                                                }
                                            }}
                                        />
                                    </div>
                                </div>                                              
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}
export default CommentModal
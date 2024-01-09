import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isDeletedPost, isPostLikedByUser, isSavedPost } from "../../Config/Logics";
import { createCommentAction } from "../../Redux/Comment/Action";
import { deletePostAction, likePostAction, savePostAction, unlikePostAction, unsavePostAction } from "../../Redux/Post/Action";
import CommentModal from "../Comment/CommentModal";
import "./PostCard.css";

const PostCard = ({post}) => {
    const [commentContent, setCommentContent] = useState();
    const [showDropDown, setShowDropDown]=useState(false);
    const [isPostLiked, setIsPostLiked] = useState();
    const [isSaved, setIsSaved] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, comment} = useSelector((store)=>store);
    const postStore = useSelector((store)=>store.post);
    const token = localStorage.getItem('token');
    
    const data = {
        jwt: token,
        postId: post?.id,
    }
    // console.log('post nayyyyyyyy: ',post)
    
    const handleClick = () => {
        setShowDropDown(!showDropDown);
    };
    const handlePostLike = () => {
        setIsPostLiked(true);
        dispatch(likePostAction(data));
    };
    const handlePostUnlike = () => {
        setIsPostLiked(false);
        dispatch(unlikePostAction(data))
    };
    const handleSavePost = () => {
        setIsSaved(true);
        dispatch(savePostAction(data));
    };
    const handleUnsavePost = () => {
        setIsSaved(false);
        dispatch(unsavePostAction(data));
    };
    const handleOpenCommentModal = () => {
        navigate(`/comment/${post.id}`);
        onOpen();
    };
    const handleDeletePost = () => {
        
        setIsDeleted(true);
        dispatch(deletePostAction(data));
        console.log('deleted post: ',post.deletedPost)
    }
    const handleEditPost = () => {
        
    }

    useEffect(() => {
        setIsPostLiked(isPostLikedByUser(post, user.reqUser?.id));
        setIsSaved(isSavedPost(user.reqUser, post.id));
        setIsDeleted(isDeletedPost(postStore.deletedPost,post))
    },[post, postStore.deletedPost])


    return (
        isDeleted ? <div></div>:
        <div className="max-w-lg text-sm text-left pt-0" >
            <div className=" rounded-md w-full">
                <div className="flex justify-between items-center w-full py-4">
                    <div className="flex items-center">
                        <img className="h-9 w-9 rounded-full" src={post.user?.image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'} alt=""></img>
                        <div className="pl-3">
                            <p className="font-semibold">{post?.user?.username}</p>
                            {
                                post?.location &&
                                <p className="font-thin">{post?.location}</p>
                            }
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
                <div>
                    <div className="w-full">
                        <img onClick={handleOpenCommentModal} className="w-full" src={post?.image} alt=""/>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full py-4">
                    <div className="flex items-center">
                        {isPostLiked? <AiFillHeart style={{marginRight: "0.5rem"}} className="text-2xl hover:opacity-50 cursor-pointer text-red-500" onClick={handlePostUnlike}/> : <AiOutlineHeart style={{marginRight: "0.5rem"}} className="text-2xl hover:opacity-50 cursor-pointer" onClick={handlePostLike}/>}
                        <FaRegComment
                            onClick={handleOpenCommentModal}
                            style={{marginRight: "0.5rem"}} 
                            className="text-xl hover:opacity-50 cursor-pointer"/>
                        {/* <RiSendPlaneLine style={{marginRight: "0.5rem"}} className="text-xl hover:opacity-50 cursor-pointer"/> */}
                    </div>
                    <div className="cursor-pointer">
                        {isSaved? <BsBookmarkFill className="text-xl hover:opacity-50 cursor-pointer" onClick={handleUnsavePost}/> : <BsBookmark className="text-xl hover:opacity-50 cursor-pointer" onClick={handleSavePost}/>}
                    </div>
                </div>
                <div className="w-full text-left font-semibold">
                    {
                        post.likedByUsers?.length > 0 &&
                        <p>{post.likedByUsers?.length} likes</p>
                    }
                    {
                        post?.caption && <p className="text-left flex font-normal">
                            <p className="pr-2 font-semibold">{post?.user?.username}</p>
                            {post?.caption}
                        </p>
                    }
                    
                    {
                        post?.comments?.length > 0 &&
                        <p onClick={handleOpenCommentModal} className="opacity-50 py-2 cursor-pointer font-normal">View all {post?.comments?.length} comments</p>
                    }
                </div>
                <div className=" w-full">
                    <div className="flex w-full items-center">
                        <input 
                            className="commentInput pl-0" 
                            type="text" 
                            placeholder="Add a comment..."
                            onChange={(e)=>setCommentContent(e.target.value)}
                            value={commentContent}
                            onKeyPress={(e)=>{
                                if(e.key === 'Enter' && commentContent.length > 0) {
                                    const data = {
                                        postId: post?.id, 
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
            <hr/>
            <CommentModal 
                post = {post}
                handlePostLike = {handlePostLike} 
                onClose = {onClose} 
                isOpen = {isOpen}
                isDeleted={isDeleted}
                handleDeletePost={handleDeletePost}
                handleEditPost={handleEditPost}
                handleSavePost = {handleSavePost} 
                handleUnSavePost={handleUnsavePost}
                handlePostUnLike={handlePostUnlike}
                isPostLiked = {isPostLiked} 
                isSaved = {isSaved}/>
        </div>
    )
}
export default PostCard

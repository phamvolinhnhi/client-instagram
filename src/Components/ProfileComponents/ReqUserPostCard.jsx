import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isDeletedPost, isPostLikedByUser, isSavedPost } from "../../Config/Logics";
import { deletePostAction, likePostAction, savePostAction, unlikePostAction, unsavePostAction } from "../../Redux/Post/Action";
import CommentModal from "../Comment/CommentModal";
import "./ReqUserPostCard.css";

const ReqUserPostCard = ({post}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const {user} = useSelector((store)=>store)
    const postStore = useSelector((store)=>store.post)

    const data = {
        jwt: token,
        postId: post?.id,
    }
    const handlePostLike = () => {
        setIsPostLiked(true);
        dispatch(likePostAction(data));
    };
    const handleSavePost = () => {
        setIsSaved(true);
        dispatch(savePostAction(data));
    };
    const handleOpenCommentModal = () => {
        navigate(`/comment/${post.id}`);
        onOpen();
    };
    const handlePostUnlike = () => {
        setIsPostLiked(false);
        dispatch(unlikePostAction(data))
    };
    const handleUnsavePost = () => {
        setIsSaved(false);
        dispatch(unsavePostAction(data));
    };
    const handleDeletePost = () => {
        
        setIsDeleted(true);
        dispatch(deletePostAction(data));
        console.log('deleted post: ',post.deletedPost)
    }

    useEffect(() => {
        setIsPostLiked(isPostLikedByUser(post, user.reqUser?.id));
        setIsSaved(isSavedPost(user.reqUser, post.id));
        setIsDeleted(isDeletedPost(postStore.deletedPost,post))
    },[post, postStore.deletedPost])

    return (
        isDeleted ? <div></div>:
        <div onClick={handleOpenCommentModal} className="p-2">
            <div className="post w-60 h-60">
                <img className="cursor-pointer"
                    src={post?.image}
                    alt=""></img>
                <div className="overlay">
                    <div className="overlay-text flex justify-between">
                        <div>
                            <AiFillHeart></AiFillHeart>
                            <span>{post?.likedByUsers?.length}</span>
                        </div>
                        <div><FaComment></FaComment><span>{post?.comments?.length}</span></div>
                    </div>
                </div>
            </div>
            <CommentModal 
                post = {post}
                handlePostLike = {handlePostLike} 
                onClose = {onClose} 
                isOpen = {isOpen}
                isDeleted={isDeleted}
                handleDeletePost={handleDeletePost}
                handleSavePost = {handleSavePost} 
                handleUnSavePost={handleUnsavePost}
                handlePostUnLike={handlePostUnlike}
                isPostLiked = {isPostLiked} 
                isSaved = {isSaved}/>
        </div>
    )
}
export default ReqUserPostCard
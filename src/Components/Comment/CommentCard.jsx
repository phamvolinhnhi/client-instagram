import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { isCommentLikedByUser, timeDifference } from "../../Config/Logics";
import { likeCommentAction, unlikeCommentAction } from "../../Redux/Comment/Action";

const CommentCard = ({comment}) => {
    const [isCommentLiked, setIsCommentLiked] = useState(false);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const {user} = useSelector((store) => store);
    const data = {
        jwt: token,
        commentId: comment.id,
    }

    const handleLikeComment = () => {
        setIsCommentLiked(true);
        dispatch(likeCommentAction(data));
    }

    const handleUnlikeComment = () => {
        setIsCommentLiked(false);
        dispatch(unlikeCommentAction(data));
    }

    useEffect(() => {
        setIsCommentLiked(isCommentLikedByUser(comment, user.reqUser?.id));
    },[comment, user.reqUser])

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-5 ">
                <div className="flex justify-between items-center w-[90%]">
                        <img className="w-9 h-9 rounded-full"
                        src={comment.user.image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'} alt=""/>
                    <div className="w-[85%] ml-2">
                        <p className="">
                            <span className="font-semibold">{comment.user.username}</span>
                            <span className="ml-2 ">{comment.content}</span>
                            
                        </p>
                        <div className="flex items-center text-xs opacity-60 pt-2">
                            <span>{timeDifference(comment.createdAt)}</span>
                            {
                                comment.likedByUsers?.length > 0 &&
                                <span style={{marginLeft:"0.75rem"}}>{comment.likedByUsers?.length} likes</span>
                            }
                        </div>
                    </div>
                </div>
                {
                    isCommentLiked? 
                    <AiFillHeart 
                        onClick={handleUnlikeComment} 
                        className="text-xs hover:opacity-50 cursor-pointer text-red-500"
                    /> : 
                    <AiOutlineHeart className="text-xs hover:opacity-50 cursor-pointer" 
                        onClick={handleLikeComment}/>
                }
            </div>
            
        </div>
    )
}
export default CommentCard
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileUserDetails from "../../Components/ProfileComponents/ProfileUserDetails";
import ReqUserPostPart from "../../Components/ProfileComponents/ReqUserPostPart";
import { isReqUser } from "../../Config/Logics";
import { findUserByUsernameAction, getUserProfileAction } from "../../Redux/User/Action";

const Profile = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const {username} = useParams();
    const {user} = useSelector((store)=>store);
    const isreqUser = isReqUser(user?.reqUser?.id, user?.findByUsername?.id);

    sessionStorage.setItem("parent", "Profile");

    useEffect(() => {
        const data = {
            jwt: token,
            username,
        }
        console.log('usnma:',username)
        if(username)
            dispatch(findUserByUsernameAction(data));
    }, [username, user?.follower, user?.following, user.reqUser]);
    
    useEffect(() => {
        dispatch(getUserProfileAction(token))
    }, [token])

    return (
        <div className="px-20">
            <div className="w-full">
                <ProfileUserDetails  
                    user = {isreqUser? user?.reqUser : user?.findByUsername}
                    isreqUser = {isreqUser}
                />
            </div>
            <div>
                <ReqUserPostPart
                    user = {isreqUser? user?.reqUser : user?.findByUsername}
                    isreqUser = {isreqUser}
                />
            </div>
        </div>
    )
}
export default Profile
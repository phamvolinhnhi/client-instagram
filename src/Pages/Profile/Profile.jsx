import React from "react";
import ProfileUserDetails from "../../Components/ProfileComponents/ProfileUserDetails";
import ReqUserPostPart from "../../Components/ProfileComponents/ReqUserPostPart";

const Profile = () => {
    return (
        <div className="px-20">
            <div className="w-full">
                <ProfileUserDetails></ProfileUserDetails>
            </div>
            <div>
                <ReqUserPostPart></ReqUserPostPart>
            </div>
        </div>
    )
}
export default Profile
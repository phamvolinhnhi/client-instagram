import React from "react";
import { TbCircleDashed } from "react-icons/tb";

const ProfileUserDetails = () => {
    return (
        <div className="py-10 w-full">
            <div className="flex items-center">
                <div className="w-[15%]">
                    <img className="w-32 h-32 rounded-full" src="https://i.pinimg.com/originals/e5/a7/10/e5a710e28fd8232acc7ae422995d6012.jpg" alt=""></img>
                </div>
                <div className="space-y-5" style={{marginTop: "1.25rem"}}>
                    <div className="flex space-x-10 items-center" style={{marginLeft: "2.25rem"}}>
                        <p>username</p>
                        <button>Edit Profile</button>
                        <TbCircleDashed></TbCircleDashed>
                    </div>
                    <div className="flex space-x-10" style={{marginLeft: "2.25rem"}}>
                        <div>
                            <span className="font-semibold mr-2">10</span>
                            <span>posts</span>
                        </div>
                        <div>
                            <span className="font-semibold mr-2">5</span>
                            <span>follower</span>
                        </div>
                        <div>
                            <span className="font-semibold mr-2">10</span>
                            <span>following</span>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold" style={{textAlign: "left"}}>Full Name</p>
                        <p className="font-thin text-sm">🐦: (twitter handle) 👻: (snapchat handle) 🎥: (youtube handle)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileUserDetails

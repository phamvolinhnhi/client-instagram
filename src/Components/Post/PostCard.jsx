import React from "react";
import { BsThreeDots } from "react-icons/bs";

const PostCard = () => {
    const [showDropdown, setShowDropDown]=useSate(false);
    const handleClick = () => {
        setShowDropDown(!setShowDropDown);
    }
    return (
        <div>
            <div className="border rounded-md w-full">
                <div className="flex justify-between items-center w-full py-4 px-5">
                    <div className="flex items-center">
                        <img className="h-12 w-12 rounded-full" src="https://th.bing.com/th/id/OIP.Dwx96HrXj8dVo9vhqEYHqQHaHa?w=161&h=180&c=7&r=0&o=5&pid=1.7" alt=""></img>
                        <div className="pl-2">
                            <p className="font-semibold text-sm">username</p>
                            <p className="font-thin text-sm">location</p>
                        </div>
                    </div>
                    <div>
                        <BsThreeDots/>
                        <div onClick={handleClick} className="dropdown-content">
                            <p className="bg-black text-white py-1 px-4 rounded-md cursor-pointer">Delete</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostCard
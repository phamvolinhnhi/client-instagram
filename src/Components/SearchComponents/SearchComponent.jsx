import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../Redux/User/Action";
import "./SearchComponent.css";
import SearchUserCard from "./SearchUserCard";

const SearchComponent = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const {user} = useSelector((store)=>store);

    const handleSearch = (e) => {
        dispatch(searchUserAction({
            jwt:token, 
            query: e.target.value,
        }))
        console.log('searchhhhhhhhhhhh ', user.searchUser)
    }
    useEffect(()=>{
        user.searchUser = null
    })
    return (
        <div className="shadow-slate-400 shadow-2xl w-[400px] relative text-left px-3 pt-5 pl-5">
            <div className="pb-5">
                <h1 className="text-2xl pb-8 font-semibold">Search</h1>
                <input 
                    onChange={handleSearch} 
                    className="outline-none pl-3 py-2 rounded-md bg-zinc-100 w-[100%] " 
                    type="text" 
                    placeholder="Search"/>
            </div>
            <hr/>
            <div className="pt-6">
                {user.searchUser !== null && user.searchUser?.map((item)=><SearchUserCard user={item}/>)}
            </div>
        </div>
    )
}
export default SearchComponent
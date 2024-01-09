import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { EditAccountDetails } from "../../Components/EditAccount/EditAccountDetails";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Auth from "../Auth/Auth";
import { Chat } from "../Chat/Chat";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";

const Router = () => {
    const location = useLocation();
    const {user} = useSelector((store)=>store);
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const getCommentModalElement = () => {
        if (sessionStorage.getItem('parent') === 'Profile') {
            return <Profile />;
        } else if (sessionStorage.getItem('parent') === 'HomePage') {
            return <HomePage/>;
        }
    };

    useEffect(() => {
        if(token === null && location.pathname!=="/login" && location.pathname!=="/signup") 
            navigate('/login') 
    })
    
    return(
        <div className="w-full">
            {(location.pathname!=="/login" && location.pathname!=="/signup") &&
                (<div className="flex">
                    <div className="w-auto border border-l-slate-500">
                        <Sidebar/>
                    </div>
                    <div className="w-full">
                        <Routes>
                            <Route path="/" element={<HomePage/>}></Route>
                            <Route path='/:username' element={<Profile/>}></Route>
                            <Route path="/story/:userId" element={<Story/>}></Route>
                            <Route path="/comment/:postId" element={getCommentModalElement()}></Route>
                            <Route path="/account/edit" element={<EditAccountDetails/>}></Route>
                            <Route path="/inbox" element={<Chat/>}></Route>
                        </Routes>
                    </div>
                </div>)
            }
            
            {(location.pathname==="/login" || location.pathname==="/signup") &&
            (<div>
                <Routes>
                    <Route path="/signup" element={<Auth/>}></Route>
                    <Route path="/login" element={<Auth/>}></Route>
                </Routes>
                
            </div>)}
        </div>
    );
};
export default Router
import React from "react";
import { useLocation } from "react-router-dom";
import Signin from "../../Components/Rester/Signin";
import Signup from "../../Components/Rester/Signup";
import "./Auth.css";

const Auth = () => {
    const location = useLocation();

    return (
        <div>
            <div className="flex items-center justify-center h-[100vh] space-x-5">
                <div className="relative hidden lg:block">
                    <div className="">
                        <img className="h-full w-full"
                            src="/images/home-phones.png"
                            alt=""/>
                        <div className="mobileWallpaper h-[33.9rem] w-[15.6rem] absolute top-7">

                        </div>
                        
                    </div>
                </div>
                <div className="w-[40vw] lg:w-[23vw]">
                    {location.pathname==="/login" ? <Signin/> : <Signup/>}
                </div>
            </div>
        </div>
    )
}
export default Auth
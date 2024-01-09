import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CreatePostModal from "../Post/CreatePostModal";
import SearchComponent from "../SearchComponents/SearchComponent";
import { menu } from "./SidebarConfig";

const Sidebar = () => {
    const [activeTab, setActiveTab]=useState("");
    const navigate=useNavigate();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const {onCloseSearch} = useDisclosure();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const {user} = useSelector((store)=>store);
    const location = useLocation();

    const handleOpenSearch = () => {
        setIsSearchVisible(true);
    }
    const handleCloseSearch = () => {
        setIsSearchVisible(false);
    }

    const handleTabClick=(title)=>{
        if(title==="Search"){
            if(isSearchVisible) {
                setIsSearchVisible(false)
                console.log('rightttttttttttttttt')
            }
            else {
                setIsSearchVisible(true)
                setActiveTab(title)
            }
        }
        else {
            setIsSearchVisible(false)
            if(title==="Profile"){
                const name = user.reqUser?.username;
                navigate(`/${user.reqUser?.username}`);
            }
            else if(title==="Home"){
                navigate("/")
            }
            else if(title==="Create"){
                onOpen()
            }
            else if(title==="Message"){
                navigate("/inbox")
            }
            setActiveTab(title)
        }
        console.log('active: ', activeTab)
    }

    useEffect(()=>{
        if(location.pathname === '/' && !isSearchVisible)
            setActiveTab("Home")
        else if(location.pathname === '/inbox')
            setActiveTab("Message")
        else if(location.pathname === `/${user.reqUser?.username}`)
            setActiveTab("Profile")
    }, [location.pathname, isSearchVisible])

    return (
        <div className="sticky top-0 h-[100vh] flex " >
            <div className={`flex flex-col justify-between h-full px-6  ${!isSearchVisible && activeTab!=="Message" ? "w-[250px]" : ""}`}>
                <div>
                    <div className="pt-10 h-16">
                    {!isSearchVisible && activeTab!=="Message" ? 
                        <img className="w-32 absolute" src="/images/logo.png" alt=""/> 
                        : <div/>
                    }
                    </div>
                    <div className="mt-12">
                        { menu.map((item) => (
                            <div onClick={()=>handleTabClick(item.title)} className="flex items-center mb-6 cursor-pointer">
                                <div className="text-3xl">
                                    {activeTab=== item.title? item.activeIcon : item.icon}
                                </div>
                                {!isSearchVisible && activeTab!=="Message" && <p className={`${activeTab===item.title?"font-bold":""}`} style={{paddingLeft:"16px", width:"fit-content"}}>{item.title}</p>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center cursor-pointer pb-10">
                    <IoReorderThreeOutline className="text-2xl" />
                    {!isSearchVisible && activeTab!=="Message" && <p className="ml-5">More</p>}
                </div>
            </div>
            <CreatePostModal onClose={onClose} isOpen={isOpen}/>
            {isSearchVisible && <SearchComponent/>}         
        </div>
    ) 
}
export default Sidebar
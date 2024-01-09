import { AiFillCompass, AiFillHeart, AiFillHome, AiFillMessage, AiFillPlusCircle, AiOutlineCompass, AiOutlineHeart, AiOutlineHome, AiOutlineMessage, AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from "react-icons/cg"
import { RiVideoFill, RiVideoLine } from "react-icons/ri"
export const menu = [
    {
        title:"Home", icon: <AiOutlineHome></AiOutlineHome>, activeIcon: <AiFillHome></AiFillHome>
    
    },
    {
        title:"Search", icon:<AiOutlineSearch></AiOutlineSearch>, activeIcon:<AiOutlineSearch></AiOutlineSearch>
    },
    {
        title:"Explore", icon:<AiOutlineCompass></AiOutlineCompass>, activeIcon:<AiFillCompass></AiFillCompass>
    },
    {
        title:"Reels", icon:<RiVideoLine></RiVideoLine>, activeIcon:<RiVideoFill></RiVideoFill>
    },
    {
        title:"Message",
        icon:<AiOutlineMessage></AiOutlineMessage>,
        activeIcon:<AiFillMessage></AiFillMessage>
    },
    {
        title:"Notification",
        icon:<AiOutlineHeart></AiOutlineHeart>,
        activeIcon:<AiFillHeart></AiFillHeart>
    },
    {
        title:"Create",
        icon:<AiOutlinePlusCircle></AiOutlinePlusCircle>,
        activeIcon:<AiFillPlusCircle></AiFillPlusCircle>
    },
    {
        title:"Profile",
        icon:<CgProfile></CgProfile>,
        activeIcon:<CgProfile></CgProfile>
    }
]
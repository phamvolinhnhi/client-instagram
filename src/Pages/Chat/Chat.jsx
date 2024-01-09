import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsMicFill, BsThreeDotsVertical } from "react-icons/bs";
import { GrDown } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChatCard } from "../../Components/Chat/ChatCard";
import { MessageCard } from "../../Components/Chat/MessageCard";
import { CreateGroup } from "../../Components/Group/CreateGroup";
import { logoutAction } from "../../Redux/Auth/Action";
import { createChatAction, getUserChatsAction } from "../../Redux/Chat/Action";
import { createMessageAction, getAllMessagesAction } from "../../Redux/Message/Action";
import { getUserProfileAction, searchUserAction } from "../../Redux/User/Action";
import "./Chat.css";

export const Chat = ()=> {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, chat, message} = useSelector((store)=>store);
    const [query, setQuery] = useState('');
    const [currentChat, setCurrentChat] = useState();
    const [content, setContent] = useState('');
    const [showDropDown, setShowDropDown]=useState(false);
    const [isGroup, setIsGroup] = useState(false);
    const [stompClient, setStompClient] = useState();
    const [isConnect, setIsConnect] = useState(false);
    const [messages, setMessages] = useState([]);
    
    const onError = (error) => {
        console.log('no error', error)
    }
    const onConnect = () => {
        console.log('WebSocket connected successfully');
        setIsConnect(true)
    }

    const handleClick = () => {
        setShowDropDown(!showDropDown);
    };
    const handleNavigate = () => {
        navigate(`/${user.reqUser?.username}`);
    }
    const handleCreateGroup = () => {
        setIsGroup(true)
    };
    const handleLogout = () => {
        dispatch(logoutAction())
        navigate('/login')
    };

    const handleSearch = (key) => {
        const data = {
            query: key,
            jwt: token
        }
        dispatch(searchUserAction(data))
    }
    const handleClickOnChatCard = (userId) => {
        const data = {
            token,
            data: userId
        }
        console.log('data: ',data)
        dispatch(createChatAction(data))
        setQuery('')
    }
    const handleCreateMessage = (content) => {
        const data = {
            token,
            data: {
                chatId: currentChat?.id,
                content
            }
        }
        dispatch(createMessageAction(data))
    }
    const handleCurrentChat = (item) => {
        setCurrentChat(item)
        console.log('current chat: ', currentChat)
    }

    // useEffect(()=>{
    //     if(message.createdMessage && stompClient) {
    //         setMessages([...messages, message.createdMessage])
    //         stompClient?.send("/app/chat", {}, JSON.stringify(message.createdMessage));
    //     }
    // },[message.createdMessage])


    useEffect(()=>{
        setMessages([...messages,message.messages])
    },[message.messages])

    // useEffect(() => {
    //     let sock = new SockJS("http://localhost:5454/app/ws")
    //     const stomp = Stom.over(sock)
    //     setStompClient(stomp)
    //     stomp.connect({ }, onConnect, onError)
    // },[])

    useEffect(() => {
        dispatch(getUserProfileAction(token))
    }, [token])

    useEffect(()=>{
        dispatch(getUserChatsAction(token))
    },[chat.createdChat, chat.createdGroup, token])

    useEffect(() => {
        if (currentChat?.id) {
            const data = {
                chatId: currentChat?.id,
                token
            };
            dispatch(getAllMessagesAction(data));
        }
    },[currentChat, message.createdMessage, token])

    return (
        <div className="relative">
            {isGroup && <CreateGroup setIsGroup = {setIsGroup}/>}
            {!isGroup && <div className="flex relative h-full">
                <div className="min-w-[400px] h-screen flex flex-col text-left px-3 pt-5 pl-5 shadow-slate-400 shadow-2xl ">
                    <div className=" text-left font-semibold">
                        <div className="flex items-center pb-6">
                            <img className="w-10 h-10 rounded-full"
                                src={user.reqUser?.image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'}
                                alt=""
                            />
                            <h1 className="text-xl font-semibold pl-3">{user.reqUser?.username}</h1>
                            <div className="pl-2 pt-1">
                                <div className="dropdown">
                                    <GrDown onClick={handleClick} className="right-5"/>
                                    <div className="dropdown-content">
                                        {
                                            showDropDown && 
                                            <div className="shadow-slate-500 font-normal shadow-2xl bg-white text-black cursor-pointer w-max">
                                                <p onClick={handleNavigate} className="px-4 py-2 hover:bg-gray-100">Profile</p>
                                                <p onClick={handleCreateGroup} className="px-4 py-2 hover:bg-gray-100">Create Group</p>
                                                <p onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100">Logout</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative font-normal flex justify-center items-center bg-white pb-5">
                            <input className="outline-none pl-3 py-2 rounded-md bg-zinc-100 w-[100%] " 
                                type="text"
                                placeholder="Search or start new chat"
                                onChange={(e)=>{
                                    setQuery(e.target.value)
                                    handleSearch(e.target.value)
                                }}
                                value={query}/>
                        </div>
                        <hr/>
                        <p>Messages</p>
                    </div>
                    
                    <div className="overflow-y-scroll max-h-[800px]">
                        {query && user.searchUser?.map((item) =>
                            <div onClick={()=>handleClickOnChatCard(item.id)}>
                                <ChatCard name = {item.username}
                                    image = {item.image}
                                />
                            </div>)
                        }
                        {chat.chats?.length > 0 && query==='' && chat.chats?.map((item) =>
                            <div onClick={()=>handleCurrentChat(item)}>
                                {
                                    item.group ? 
                                    <ChatCard name = {item.name}
                                        image = {item.image || "https://cdn.picpng.com/computer/computer-user-icon-peolpe-58180.png"}
                                    />
                                    :
                                    <ChatCard 
                                        name = {user.reqUser?.id !== item.users[0]?.id 
                                                ? item.users[0].username
                                                : item.users[1].username
                                            }
                                        image = {user.reqUser?.id !== item.users[0]?.id 
                                                ? item.users[0].image
                                                : item.users[1].image
                                            }
                                    />
                                }
                            </div>)
                        }
                    </div>
                    
                </div> 
            
                { !currentChat &&
                    <div className="right w-full flex-grow">
                        <div className="w-full flex flex-col items-center justify-center h-full">
                            <div className="max-w-[300px] text-center">
                                <img src="images/chat.png" alt=""/>
                                <img src="images/logo.png" alt=""/>
                            </div>
                        </div>
                    </div>
                }
                { currentChat &&
                    <div className="w-full h-screen relative flex flex-col text-left">
                        <div className="header"> 
                            <div className="flex justify-between">
                                <div className="py-3 space-x-4 flex items-center px-3">
                                    <img className="w-10 h-10 rounded-full cursor-pointer"
                                        src={ currentChat.group ? currentChat.image || "https://cdn.picpng.com/computer/computer-user-icon-peolpe-58180.png"
                                            : user.reqUser?.id !== currentChat.users[0]?.id 
                                                ? currentChat.users[0].image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'
                                                : currentChat.users[1].image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'
                                            }
                                        alt=""/>
                                    <p>{ currentChat.group ? currentChat.name 
                                        :   user.reqUser?.id !== currentChat?.users[0]?.id 
                                                ? currentChat?.users[0].username
                                                : currentChat?.users[1].username}</p>
                                </div>
                                <div className="py-3 space-x-4 items-center px-3 flex">
                                    <AiOutlineSearch/>
                                    <BsThreeDotsVertical/>
                                    
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="px-10 h-[85vh] overflow-y-scroll relative">
                            <div className="flex flex-col justify-center py-2">
                                { message.messages.length > 0 && 
                                    message.messages.map((item, i) =>
                                        <MessageCard isReqUserMessage={item.user?.id===user.reqUser?.id} content={item.content}/>)
                                }
                            </div>
                        </div>
                        <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 ">
                            <div  className="flex justify-between items-center px-5">
                                    {/* <BsEmojiSmile className="cursor-pointer absolute ml-2"/>
                                    <ImAttachment className="cursor-pointer absolute ml-7"/> */}
                                <input className="py-2 px-2 outline-none border-none bg-white rounded-md w-[100%]"
                                    type="text" 
                                    onChange={(e)=>setContent(e.target.value)}
                                    value={content}
                                    onKeyPress={(e)=>{
                                        if(e.key === 'Enter' && e.target.value !== '' && e.target.value !== null) {
                                            handleCreateMessage(e.target.value);
                                            setContent('');
                                        }
                                    }}
                                />
                                <BsMicFill className="cursor-pointer absolute right-7"/>
                            </div>
                        </div>
                    </div>
                }
            </div>
            }
        </div>
        
    )
}

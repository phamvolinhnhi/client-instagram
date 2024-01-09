import { Button, Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { GrEmoji } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { uploadToCloudnary } from "../../Config/UploadToCloudnary";
import { createPostAction } from "../../Redux/Post/Action";
import "./CreatePostModal.css";

export const EditPostModal = ({onClose, isOpen}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState('');
    const [location, setLocation] = useState('');
    const token = localStorage.getItem('token');
    const {user} = useSelector((store)=>store);

    const handleDrop = (event) => {
        event.preventDefault()
        const droppedFile = event.dataTransfer.file[0];
        if(droppedFile.type.startsWith("image/") || droppedFile.type.startsWith("video/")) {
            setFile(droppedFile);
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect="copy";
        setIsDragOver(true);
    }
    const handleDragLeave = () => {
        setIsDragOver(false);
    }
    const handleOnChange = async(e) => {
        const file = e.target.files[0];
        if(file && (file.type.startsWith("image/") || file.type.startsWith("video/"))){
            const imgUrl = await uploadToCloudnary(file);
            setImageUrl(imgUrl)
            setFile(imgUrl);
        }
        else{
            setFile(null);
            alert("Please select an image or video");
        }
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value)
    };
    const handleCreatePost = () => {
        // data = {jwt, }
        const data = {
            jwt: token,
            data: {
                caption, location, image: imageUrl,
            }
        }
        dispatch(createPostAction(data));
        onClose();
    }

    return (
        <div>
            <Modal size={"6xl"} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <div className="flex justify-between py-1 px-10 items-center">
                        <p>Create New Post</p>
                        <Button className="" 
                            variant={"ghost"} 
                            size="sm" 
                            colorScheme="blue"
                            onClick={handleCreatePost}>
                            Share
                        </Button>
                    </div>
                    <hr/>
                    <ModalBody>
                        <div className="h-[90vh] justify-between pb-5 flex">
                            <div className="w-[75%]">
                                <div onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                className="drag-drop h-full">
                                { !file &&
                                    <div>
                                        <FaPhotoVideo className="text-3xl"/>
                                        <p>Drag photos or videos here</p>
                                    </div>
                                }
                                    <label htmlFor="file-upload" className={`${file ? "" : "custom-file-upload"}`}>
                                        {file ? <img src={file} alt=""/> 
                                            : "Select From Computer"
                                        }
                                    </label>
                                    <input type="file"
                                        id="file-upload"
                                        accept="image/*, video/*"
                                        className="hidden"
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                            <div className="w-[1px] border h-full"></div>
                            <div className="w-[50%]">
                                <div className="flex items-center px-2">
                                    <img className="w-7 h-7 rounded-full" src={user.reqUser?.image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'} alt=""/>
                                    <p className="font-semibold ml-4">{user.reqUser?.username}</p>
                                </div>
                                <div className="px-2">
                                    <textarea 
                                        placeholder="Write a caption" 
                                        className="captionInput" 
                                        name="caption" 
                                        rows="8"
                                        onChange={handleCaptionChange}></textarea>
                                </div>
                                <div className="flex justify-between px-2">
                                    <GrEmoji/>
                                    <p className="opacity-70">{caption?.length}/2,200</p>
                                </div>
                                <hr/>
                                <div className="p-2 flex justify-between items-center">
                                    <input onChange={(e)=>setLocation(e.target.value)} className="locationInput" type="text" placeholder="location" name="location"/>
                                    <GoLocation/>
                                </div>
                                <hr/>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

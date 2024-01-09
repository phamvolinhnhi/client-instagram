import React, { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Progressbar from "./Progressbar"

const StoryViewerContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background-color: black;
`
const StoryImage = styled.img`
    max-height:90vh;
    object-fit:contain;
`
const StoryViewer = ({stories}) => {
    const [curentStoryIndex, setCurentStoryIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const handleNextStory=() => {
        if(curentStoryIndex<stories?.length-1) {
            setCurentStoryIndex(curentStoryIndex+1)
            setActiveIndex(activeIndex+1)
        }
        else  {
            setCurentStoryIndex(0);
            setActiveIndex(0);
        }
    }
    const handleNavigate = () => {
        navigate(-1);
    }
    useEffect(() => {
        const interval = setInterval(() => {handleNextStory()},2000)
        return () => clearInterval(interval)
    }, [curentStoryIndex])
    
    return (
        <div className="relative w-full flex justify-center items-center bg-black">
            <StoryViewerContainer>
                <StoryImage src={stories?.[curentStoryIndex].image}/>
                <div className="absolute top-0 flex w-[90%]">
                    {stories.map((item, index)=> <Progressbar key={index} duration={2000} index={index} activeIndex={activeIndex}/>)}
                </div>
            </StoryViewerContainer>
            <div>
                <AiOutlineClose onClick={handleNavigate} className="text-white text-4xl cursor-pointer absolute top-0 right-0"/>
            </div>
        </div>
    )
}
export default StoryViewer
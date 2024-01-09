import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StoryViewer from "../../Components/StoryComponent/StoryViewer";
import { findStoryByUserId } from "../../Redux/Story/Action";

const Story = () => {
    const {story} = useSelector((store)=>store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('token');
    const {userId} = useParams();

    useEffect(() => {
        const data = {jwt, userId};
        dispatch(findStoryByUserId(data));
    }, [userId]);

    return (
        <div>
            {story.stories?.length > 0 && <StoryViewer stories={story?.stories
            }/>}
        </div>
    )
}
export default Story
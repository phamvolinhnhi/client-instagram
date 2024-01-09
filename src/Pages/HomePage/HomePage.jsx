import React from "react";
import HomeRight from "../../Components/HomeRight/HomeRight";
import PostCard from "../../Components/Post/PostCard";
import StoryCircle from "../../Components/Story/StoryCircle";

const HomePage = () => {
    return (
        <div>
            <div className="mt-10 flex w-[100%] justify-center">
                <div className="w-[44%] px-10 ">
                    <div className="storyDiv flex border p-4 rounded-md justify-start w-full">
                        {[1,1,1,1].map((item)=><StoryCircle></StoryCircle>)}
                    </div>
                    <div className="w-full mt-10" style={{marginTop:"2.5rem"}}>
                        {[1,1].map((item)=><PostCard></PostCard>)}
                    </div>
                </div>
                <div className="w-[35%]">
                    <HomeRight></HomeRight>
                </div>
            </div>
        </div>
    )
}
export default HomePage
import React, { useEffect, useState } from "react";
import "./Progressbar.css";

const Progressbar = ({index, activeIndex, duration}) => {
    const isActive = index === activeIndex;
    const [progress, setProgress] = useState(0);
    useEffect( () => {
        const interval = setInterval(()=>{
            setProgress((prevProgress) => {
                if(prevProgress<100){
                    return prevProgress+1;
                }
                clearInterval(interval)
                return prevProgress;
            })
        },duration/100);
        
    },[duration, activeIndex])

    useEffect(()=>{
        setProgress(0);
    },[activeIndex])


    return (
        <div className={`progress-bar-container ${isActive? "active":""}`}>
            <div className={`${isActive? "progress-bar":""}`} style={{width:`${progress}%`}}>
            </div>
        </div>
    )
}
export default Progressbar
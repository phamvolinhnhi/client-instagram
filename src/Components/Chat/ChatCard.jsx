
export const ChatCard = ({image, name}) => {
    return (
        <div className="flex items-center justify-center py-2 group cursor-pointer text-sm">
            <img className="h-14 w-14 rounded-full" src={image || 'https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain'}/>
            <div className="pl-5 w-[80%]">
                <div className="flex justify-between items-center">
                    <p className="">{name}</p>
                    {/* <p className="text-xs font-thin">timestamp</p> */}
                </div>
                {/* <div className="flex justify-between items-center text-xs font-thin">
                    <p>message...</p>
                    <div className="flex space-x-2 items-center">
                        <p className="text-xs py-1 px-2 text-white bg-green-500 rounded-full">5</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
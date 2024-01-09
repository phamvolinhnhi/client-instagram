
export const MessageCard = ({isReqUserMessage, content}) => {
    return (
        <div className={`text-left mb-2 py-2 px-5 rounded-full max-w-[40%] ${!isReqUserMessage ? "self-start bg-gray-200" : "self-end bg-blue-400 text-white"}`}>
            <p>{content}</p>
        </div>
    )
}
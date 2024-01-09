import { CREATE_CHAT, CREATE_GROUP, GET_USER_CHATS } from "./ActionType"

const initialValue={
    chats: [],
    createdGroup: null,
    createdChat: null
}

export const ChatReducer = (store=initialValue, {type, payload})=>{
    if(type===CREATE_CHAT) {
        return {...store, createdChat: payload}
    }
    else if(type===CREATE_GROUP) {
        return {...store, createdGroup: payload}
    }
    else if(type===GET_USER_CHATS) {
        return {...store, chats: payload}
    }
    return store;
}